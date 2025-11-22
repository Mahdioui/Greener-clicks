/**
 * Sustainable Web Design Model (SWDM v4) inspired CO₂ calculator
 * Based on WebsiteCarbon.com methodology
 */

export interface ResourceBreakdown {
  images: number; // bytes
  js: number;
  css: number;
  fonts: number;
  other: number;
  total: number;
}

export interface SWDMConfig {
  // Energy per GB transferred (kWh)
  energyPerGB: number;
  // Global grid carbon intensity (gCO₂/kWh) - global average
  carbonIntensity: number;
  // Client device energy (kWh per GB)
  clientDeviceEnergy: number;
  // Data center energy (kWh per GB)
  dataCenterEnergy: number;
  // Network energy (kWh per GB)
  networkEnergy: number;
  // Green hosting factor (reduction when using green hosting)
  greenHostingFactor: number;
}

// SWDM v4 constants (approximations based on WebsiteCarbon methodology and
// public figures from Sustainable Web Design / WebsiteCarbon)
const DEFAULT_CONFIG: SWDMConfig = {
  // Energy per GB: ~0.06 kWh/GB (network + data center + production)
  energyPerGB: 0.06,
  // Global average carbon intensity: ~442 gCO₂/kWh (2023 average)
  carbonIntensity: 442,
  // Client device energy: ~0.02 kWh/GB
  clientDeviceEnergy: 0.02,
  // Data center energy: ~0.015 kWh/GB
  dataCenterEnergy: 0.015,
  // Network energy: ~0.025 kWh/GB
  networkEnergy: 0.025,
  // Green hosting reduces data center energy by ~50%
  greenHostingFactor: 0.5,
};

// Region-specific carbon intensity factors (gCO₂/kWh).
// Values are approximate and can be tweaked as better data becomes available.
const REGION_CARBON_INTENSITY: Record<string, number> = {
  global: 442,
  eu: 253,
  uk: 225,
  us: 493,
  asia: 575,
  africa: 700,
};

export interface CO2Result {
  co2PerVisit: number; // grams
  yearlyCO2: number; // grams
  breakdown: {
    dataCenter: number;
    network: number;
    client: number;
    total: number;
  };
}

/**
 * Calculate CO₂ emissions using SWDM v4 model
 */
export function calculateSWDM(
  dataTransferGB: number,
  greenHosting: boolean = false,
  config: SWDMConfig = DEFAULT_CONFIG
): CO2Result {
  const {
    carbonIntensity,
    clientDeviceEnergy,
    dataCenterEnergy,
    networkEnergy,
    greenHostingFactor,
  } = config;

  // Calculate energy consumption for each component
  const clientEnergy = dataTransferGB * clientDeviceEnergy;
  const networkEnergyConsumed = dataTransferGB * networkEnergy;
  
  // Data center energy (reduced if green hosting)
  const dataCenterEnergyConsumed = dataTransferGB * dataCenterEnergy * (greenHosting ? greenHostingFactor : 1);

  // Total energy (kWh)
  const totalEnergy = clientEnergy + networkEnergyConsumed + dataCenterEnergyConsumed;

  // CO₂ emissions (grams)
  const co2PerVisit = totalEnergy * carbonIntensity;

  return {
    co2PerVisit: Math.round(co2PerVisit * 100) / 100,
    yearlyCO2: 0, // Will be calculated with monthly visits
    breakdown: {
      dataCenter: Math.round(dataCenterEnergyConsumed * carbonIntensity * 100) / 100,
      network: Math.round(networkEnergyConsumed * carbonIntensity * 100) / 100,
      client: Math.round(clientEnergy * carbonIntensity * 100) / 100,
      total: Math.round(co2PerVisit * 100) / 100,
    },
  };
}

/**
 * Calculate yearly CO₂ based on monthly visits
 */
export function calculateYearlyCO2(co2PerVisit: number, monthlyVisits: number): number {
  return Math.round(co2PerVisit * monthlyVisits * 12 * 100) / 100;
}

/**
 * Build a region-aware SWDM configuration.
 * This lets us keep the core model the same while adapting grid intensity by region.
 */
export function getConfigForRegion(
  region: string,
  overrides: Partial<SWDMConfig> = {}
): SWDMConfig {
  const base: SWDMConfig = {
    ...DEFAULT_CONFIG,
    carbonIntensity: REGION_CARBON_INTENSITY[region] ?? DEFAULT_CONFIG.carbonIntensity,
  };

  return {
    ...base,
    ...overrides,
  };
}

/**
 * Distribute total CO₂ per visit across resource types (images, JS, CSS, fonts, other)
 * in proportion to their share of total bytes.
 */
export function allocateCO2ByResource(
  co2PerVisit: number,
  breakdown: ResourceBreakdown
): { images: number; js: number; css: number; fonts: number; other: number } {
  const { images, js, css, fonts, other, total } = breakdown;

  if (!total || total <= 0) {
    return { images: 0, js: 0, css: 0, fonts: 0, other: 0 };
  }

  const alloc = (bytes: number) =>
    Math.round(((bytes / total) * co2PerVisit) * 100) / 100;

  return {
    images: alloc(images),
    js: alloc(js),
    css: alloc(css),
    fonts: alloc(fonts),
    other: alloc(other),
  };
}

/**
 * Calculate a "green score" between 0–100 where higher is better.
 *
 * We use a soft scale based on CO₂ per visit:
 * - <= 0.2g  → score ~100 (excellent)
 * - 1.0g     → score ~70
 * - 4.0g+    → score ~0 (poor)
 */
export function calculateGreenScore(co2PerVisit: number): number {
  const BEST = 0.2; // g / visit
  const WORST = 4.0; // g / visit

  if (co2PerVisit <= BEST) return 100;
  if (co2PerVisit >= WORST) return 0;

  const ratio = (co2PerVisit - BEST) / (WORST - BEST);
  const score = 100 - ratio * 100;
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Calculate comparison metrics
 */
export function calculateComparisons(yearlyCO2: number, region: string = "global") {
  // Car emissions: varies by region
  // Global average: ~120g CO₂/km (petrol car)
  // EU average: ~95g CO₂/km
  // US average: ~180g CO₂/km
  const carEmissionsPerKm: Record<string, number> = {
    global: 120,
    eu: 95,
    us: 180,
    uk: 120,
  };

  const carKm = yearlyCO2 / (carEmissionsPerKm[region] || carEmissionsPerKm.global);

  // Trees: average tree absorbs ~21kg CO₂ per year
  const trees = yearlyCO2 / 21000;

  // Smartphone charges: ~0.008 kg CO₂ per charge (based on average phone battery)
  const charges = yearlyCO2 / 0.008;

  // Flight equivalent: short-haul flight ~115kg CO₂ per passenger
  const shortFlights = yearlyCO2 / 115000;

  // Everyday comparisons (approximate, for fun / education)
  // Electric kettle boil: ~70g CO₂
  const kettleBoils = yearlyCO2 / 70;
  // 1 hour of HD video streaming: ~55g CO₂
  const streamingHours = yearlyCO2 / 55;
  // Beef burger (250g burger): ~6kg CO₂
  const beefBurgers = yearlyCO2 / 6000;

  return {
    carKm: Math.round(carKm * 100) / 100,
    trees: Math.round(trees * 100) / 100,
    charges: Math.round(charges * 100) / 100,
    shortFlights: Math.round(shortFlights * 100) / 100,
    kettleBoils: Math.round(kettleBoils * 100) / 100,
    streamingHours: Math.round(streamingHours * 100) / 100,
    beefBurgers: Math.round(beefBurgers * 100) / 100,
  };
}

/**
 * Categorize resource by MIME type
 */
export function categorizeResource(mimeType: string | null, url: string): keyof ResourceBreakdown {
  if (!mimeType) {
    // Try to infer from URL
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(extension || "")) {
      return "images";
    }
    if (["js", "mjs"].includes(extension || "")) {
      return "js";
    }
    if (["css"].includes(extension || "")) {
      return "css";
    }
    if (["woff", "woff2", "ttf", "otf", "eot"].includes(extension || "")) {
      return "fonts";
    }
    return "other";
  }

  if (mimeType.startsWith("image/")) {
    return "images";
  }
  if (mimeType.includes("javascript") || mimeType.includes("ecmascript")) {
    return "js";
  }
  if (mimeType.includes("css")) {
    return "css";
  }
  if (mimeType.includes("font") || mimeType.includes("woff") || mimeType.includes("ttf")) {
    return "fonts";
  }
  return "other";
}

