import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Force this route to be treated as dynamic (it depends on query params)
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const domain = searchParams.get("domain");

    const where = domain ? { domain } : {};

    const analyses = await prisma.analysis.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        url: true,
        domain: true,
        createdAt: true,
        pageSizeMB: true,
        co2PerVisit: true,
        yearlyCO2: true,
        greenHosting: true,
        monthlyVisits: true,
      },
    });

    const total = await prisma.analysis.count({ where });

    return NextResponse.json({
      analyses,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch history", message: error.message },
      { status: 500 }
    );
  }
}

