export interface CO2Analysis {
  co2_per_visit: number;
  yearly_co2: number;
  page_size_mb: number;
  green_hosting: boolean;
  comparisons: {
    car_km: number;
    trees: number;
    charges: number;
  };
}

export interface AnalysisInput {
  pageSizeMB: number;
  monthlyVisits?: number;
}

// Green hosting providers (dummy list for now)
const GREEN_HOSTING_PROVIDERS = [
  "greengeeks",
  "kualo",
  "dreamhost",
  "a2hosting",
  "siteground",
];

export function calculateCO2(input: AnalysisInput): CO2Analysis {
  const { pageSizeMB, monthlyVisits = 10000 } = input;

  // CO₂ per visit: 0.81 grams per MB transferred
  const co2_per_visit = pageSizeMB * 0.81;

  // Yearly emissions
  const yearly_co2 = co2_per_visit * monthlyVisits * 12;

  // Comparisons
  const car_km = yearly_co2 / 120; // 120g CO₂ per km
  const trees = yearly_co2 / 21000; // 21kg CO₂ absorbed per tree per year
  const charges = yearly_co2 / 0.008; // Smartphone charges

  // Check if hosting is green (dummy check - in real app, would check domain)
  const green_hosting = false; // Placeholder

  return {
    co2_per_visit: Math.round(co2_per_visit * 100) / 100,
    yearly_co2: Math.round(yearly_co2 * 100) / 100,
    page_size_mb: Math.round(pageSizeMB * 100) / 100,
    green_hosting,
    comparisons: {
      car_km: Math.round(car_km * 100) / 100,
      trees: Math.round(trees * 100) / 100,
      charges: Math.round(charges * 100) / 100,
    },
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toFixed(2);
}

