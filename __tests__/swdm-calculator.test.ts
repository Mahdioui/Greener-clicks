import {
  calculateSWDM,
  calculateYearlyCO2,
  calculateComparisons,
  categorizeResource,
  getConfigForRegion,
  allocateCO2ByResource,
  calculateGreenScore,
} from "@/lib/swdm-calculator";

describe("SWDM Calculator", () => {
  describe("calculateSWDM", () => {
    it("should calculate CO₂ for a small page (1MB)", () => {
      const result = calculateSWDM(0.001, false); // 1MB = 0.001GB
      expect(result.co2PerVisit).toBeGreaterThan(0);
      expect(result.co2PerVisit).toBeLessThan(1); // Should be small
      expect(result.breakdown.total).toBe(result.co2PerVisit);
    });

    it("should reduce CO₂ when using green hosting", () => {
      const regular = calculateSWDM(0.01, false); // 10MB
      const green = calculateSWDM(0.01, true);
      expect(green.co2PerVisit).toBeLessThan(regular.co2PerVisit);
    });

    it("should include breakdown components", () => {
      const result = calculateSWDM(0.01, false);
      expect(result.breakdown.dataCenter).toBeGreaterThan(0);
      expect(result.breakdown.network).toBeGreaterThan(0);
      expect(result.breakdown.client).toBeGreaterThan(0);
    });
  });

  describe("calculateYearlyCO2", () => {
    it("should calculate yearly CO₂ correctly", () => {
      const co2PerVisit = 0.5; // grams
      const monthlyVisits = 10000;
      const yearly = calculateYearlyCO2(co2PerVisit, monthlyVisits);
      expect(yearly).toBe(60000); // 0.5 * 10000 * 12
    });
  });

  describe("calculateComparisons", () => {
    it("should calculate car km equivalent", () => {
      const yearlyCO2 = 12000; // grams = 12kg
      const comparisons = calculateComparisons(yearlyCO2, "global");
      expect(comparisons.carKm).toBe(100); // 12000 / 120
    });

    it("should calculate trees needed", () => {
      const yearlyCO2 = 21000; // grams = 21kg
      const comparisons = calculateComparisons(yearlyCO2, "global");
      expect(comparisons.trees).toBe(1); // 21000 / 21000
    });

    it("should calculate smartphone charges", () => {
      const yearlyCO2 = 8; // grams
      const comparisons = calculateComparisons(yearlyCO2, "global");
      expect(comparisons.charges).toBe(1000); // 8 / 0.008
    });

    it("should calculate additional fun comparisons", () => {
      const yearlyCO2 = 700; // grams
      const comparisons = calculateComparisons(yearlyCO2, "global");
      expect(comparisons.kettleBoils).toBeCloseTo(10); // 700 / 70
      expect(comparisons.streamingHours).toBeGreaterThan(0);
      expect(comparisons.beefBurgers).toBeGreaterThan(0);
    });
  });

  describe("getConfigForRegion", () => {
    it("should override carbon intensity for a known region", () => {
      const euConfig = getConfigForRegion("eu");
      const globalConfig = getConfigForRegion("global");
      expect(euConfig.carbonIntensity).not.toBe(globalConfig.carbonIntensity);
    });
  });

  describe("allocateCO2ByResource", () => {
    it("should apportion CO₂ by byte share", () => {
      const breakdown = {
        images: 500,
        js: 300,
        css: 100,
        fonts: 50,
        other: 50,
        total: 1000,
      };
      const result = allocateCO2ByResource(10, breakdown); // 10g total
      const sum =
        result.images + result.js + result.css + result.fonts + result.other;
      expect(sum).toBeCloseTo(10, 1);
      // Images should get half of the emissions
      expect(result.images).toBeCloseTo(5, 1);
    });
  });

  describe("calculateGreenScore", () => {
    it("should give high score for very low CO₂", () => {
      expect(calculateGreenScore(0.1)).toBe(100);
    });

    it("should give low score for very high CO₂", () => {
      expect(calculateGreenScore(5)).toBe(0);
    });

    it("should be between 0 and 100", () => {
      const score = calculateGreenScore(1.5);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  describe("categorizeResource", () => {
    it("should categorize images correctly", () => {
      expect(categorizeResource("image/png", "test.png")).toBe("images");
      expect(categorizeResource("image/jpeg", "test.jpg")).toBe("images");
      expect(categorizeResource(null, "test.webp")).toBe("images");
    });

    it("should categorize JavaScript correctly", () => {
      expect(categorizeResource("application/javascript", "test.js")).toBe("js");
      expect(categorizeResource("text/javascript", "test.mjs")).toBe("js");
      expect(categorizeResource(null, "test.js")).toBe("js");
    });

    it("should categorize CSS correctly", () => {
      expect(categorizeResource("text/css", "test.css")).toBe("css");
      expect(categorizeResource(null, "test.css")).toBe("css");
    });

    it("should categorize fonts correctly", () => {
      expect(categorizeResource("font/woff2", "test.woff2")).toBe("fonts");
      expect(categorizeResource(null, "test.ttf")).toBe("fonts");
    });

    it("should default to other for unknown types", () => {
      expect(categorizeResource("text/html", "test.html")).toBe("other");
      expect(categorizeResource(null, "test.unknown")).toBe("other");
    });
  });
});

