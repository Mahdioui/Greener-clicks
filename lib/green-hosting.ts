/**
 * Green Web Foundation API integration
 * Checks if a domain uses green hosting
 */

export interface GreenHostingResult {
  green: boolean;
  hostedBy?: string;
  url?: string;
}

const GREEN_WEB_API_URL = "https://api.thegreenwebfoundation.org/greencheck";

/**
 * Check if a domain uses green hosting via Green Web Foundation API
 */
export async function checkGreenHosting(domain: string): Promise<GreenHostingResult> {
  try {
    // Extract domain from URL if needed
    const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();

    const response = await fetch(`${GREEN_WEB_API_URL}/${cleanDomain}`, {
      headers: {
        "User-Agent": "EcoSite-Analyzer/1.0",
      },
    });

    if (!response.ok) {
      // If API fails, return false (assume not green)
      console.warn(`Green hosting check failed for ${cleanDomain}: ${response.statusText}`);
      return { green: false };
    }

    const data = await response.json();
    
    return {
      green: data.green === true || data.green === "yes",
      hostedBy: data.hostedby,
      url: data.url,
    };
  } catch (error) {
    console.error(`Error checking green hosting for ${domain}:`, error);
    // On error, assume not green (conservative approach)
    return { green: false };
  }
}

/**
 * Fallback: Check against known green hosting providers
 */
const KNOWN_GREEN_HOSTS = [
  "greengeeks.com",
  "kualo.com",
  "dreamhost.com",
  "a2hosting.com",
  "siteground.com",
  "greenhost.net",
  "infomaniak.com",
  "hetzner.com",
  "ovh.com",
];

export function checkGreenHostingFallback(domain: string): boolean {
  const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
  return KNOWN_GREEN_HOSTS.some((host) => cleanDomain.includes(host));
}

