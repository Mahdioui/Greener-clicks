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

// SWDM v4 constants (approximations based on WebsiteCarbon methodology)
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
  const { carbonIntensity, clientDeviceEnergy, dataCenterEnergy, networkEnergy, greenHostingFactor } = config;

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

  return {
    carKm: Math.round(carKm * 100) / 100,
    trees: Math.round(trees * 100) / 100,
    charges: Math.round(charges * 100) / 100,
    shortFlights: Math.round(shortFlights * 100) / 100,
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

