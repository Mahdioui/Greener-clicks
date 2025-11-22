import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import {
  calculateSWDM,
  calculateYearlyCO2,
  calculateComparisons,
  categorizeResource,
  getConfigForRegion,
  allocateCO2ByResource,
  calculateGreenScore,
  type ResourceBreakdown,
} from "@/lib/swdm-calculator";
import { checkGreenHosting } from "@/lib/green-hosting";
import { prisma } from "@/lib/db";

// Ensure this route always runs dynamically on the Node.js runtime.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

interface NetworkRequest {
  url: string;
  size: number;
  mimeType: string | null;
  resourceType: string;
}

// Helper delay function
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function POST(request: NextRequest) {
  let browser;
  try {
    const body = await request.json();
    const { url, monthlyVisits = 10000, region = "global" } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const domain = validUrl.hostname;

    // Launch a Chromium instance that is compatible with serverless environments
    // (Netlify, AWS Lambda, etc.) using @sparticuz/chromium.
    const executablePath = await chromium.executablePath();

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Track network requests
    const networkRequests: NetworkRequest[] = [];
    const resourceBreakdown: ResourceBreakdown = {
      images: 0,
      js: 0,
      css: 0,
      fonts: 0,
      other: 0,
      total: 0,
    };

    // Listen to network requests
    page.on("response", async (response) => {
      try {
        const url = response.url();
        const headers = response.headers();
        const mimeType = headers["content-type"] || null;
        const resourceType = response.request().resourceType();

        // Get response size
        const buffer = await response.buffer().catch(() => null);
        const size = buffer ? buffer.length : 0;

        if (size > 0) {
          networkRequests.push({
            url,
            size,
            mimeType,
            resourceType,
          });

          // Categorize resource
          const category = categorizeResource(mimeType, url);
          resourceBreakdown[category] += size;
          resourceBreakdown.total += size;
        }
      } catch (error) {
        console.warn("Error processing network request:", error);
      }
    });

    // Navigate to page with timeout
    try {
      await page.goto(validUrl.toString(), {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
    } catch (error: any) {
      await browser.close();
      if (error.name === "TimeoutError") {
        return NextResponse.json(
          { error: "Page load timeout. The website took too long to load." },
          { status: 408 }
        );
      }
      return NextResponse.json(
        { error: `Failed to load website: ${error.message}` },
        { status: 500 }
      );
    }

    // Wait a bit for any lazy-loaded resources
    await delay(2000);

    // Close browser
    await browser.close();

    // Check green hosting
    const greenHostingResult = await checkGreenHosting(domain);
    const isGreenHosting = greenHostingResult.green;

    // Convert total bytes to GB
    const dataTransferGB = resourceBreakdown.total / (1024 * 1024 * 1024);

    // Calculate CO₂ using SWDM with region-aware grid intensity
    const swdmConfig = getConfigForRegion(region);
    const swdmResult = calculateSWDM(dataTransferGB, isGreenHosting, swdmConfig);
    const yearlyCO2 = calculateYearlyCO2(swdmResult.co2PerVisit, monthlyVisits);
    const comparisons = calculateComparisons(yearlyCO2, region);

    // CO₂ allocation per resource type for insights & savings
    const co2ByResource = allocateCO2ByResource(
      swdmResult.co2PerVisit,
      resourceBreakdown
    );

    // Green score (0–100, higher is better)
    const greenScore = calculateGreenScore(swdmResult.co2PerVisit);

    // Comparison to an "average" website for friendly competition
    const AVERAGE_CO2_PER_VISIT = 1.76; // g, inspired by WebsiteCarbon's published averages
    const averageYearlyCO2 =
      AVERAGE_CO2_PER_VISIT * monthlyVisits * 12;
    const cleanerRatio =
      yearlyCO2 > 0 ? 1 - yearlyCO2 / averageYearlyCO2 : 0;
    // Optional multi-region impact comparison (uses same data transfer, different grid mix)
    const regionsToCompare = ["eu", "us", "asia", "africa"] as const;
    const regionalImpact = regionsToCompare.map((r) => {
      const cfg = getConfigForRegion(r);
      const result = calculateSWDM(dataTransferGB, isGreenHosting, cfg);
      const yearly = calculateYearlyCO2(result.co2PerVisit, monthlyVisits);
      return {
        region: r,
        co2PerVisit: result.co2PerVisit,
        yearlyCO2: yearly,
      };
    });
    const cleanerThanAverage = Math.round(
      Math.max(-100, Math.min(100, cleanerRatio * 100))
    );

    // Prepare analysis data
    const analysisData = {
      url: validUrl.toString(),
      domain,
      pageSizeMB: resourceBreakdown.total / (1024 * 1024),
      totalRequests: networkRequests.length,
      greenHosting: isGreenHosting,
      resourceBreakdown: {
        images: Math.round(resourceBreakdown.images / 1024), // KB
        js: Math.round(resourceBreakdown.js / 1024),
        css: Math.round(resourceBreakdown.css / 1024),
        fonts: Math.round(resourceBreakdown.fonts / 1024),
        other: Math.round(resourceBreakdown.other / 1024),
      },
      co2PerVisit: swdmResult.co2PerVisit,
      yearlyCO2,
      monthlyVisits,
      comparisons,
      breakdown: swdmResult.breakdown,
      greenHostingInfo: greenHostingResult,
      co2ByResource,
      greenScore,
      averageWebsite: {
        co2PerVisit: AVERAGE_CO2_PER_VISIT,
        yearlyCO2: Math.round(averageYearlyCO2 * 100) / 100,
        cleanerThanAverage, // positive = cleaner, negative = more polluting
      },
      regionalImpact,
    };

    // Save to database
    try {
      await prisma.analysis.create({
        data: {
          url: validUrl.toString(),
          domain,
          pageSizeMB: analysisData.pageSizeMB,
          totalRequests: analysisData.totalRequests,
          greenHosting: isGreenHosting,
          imagesSize: resourceBreakdown.images,
          jsSize: resourceBreakdown.js,
          cssSize: resourceBreakdown.css,
          fontsSize: resourceBreakdown.fonts,
          otherSize: resourceBreakdown.other,
          co2PerVisit: swdmResult.co2PerVisit,
          yearlyCO2,
          monthlyVisits,
          carKm: comparisons.carKm,
          trees: comparisons.trees,
          charges: comparisons.charges,
          region,
        },
      });
    } catch (dbError) {
      console.error("Failed to save analysis to database:", dbError);
    }

    return NextResponse.json(analysisData);
  } catch (error: any) {
    if (browser) {
      await browser.close().catch(() => {});
    }
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
