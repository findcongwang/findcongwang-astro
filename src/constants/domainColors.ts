/**
 * Five major domain colors used across the site (CV, filters, badges, etc.).
 * Keys must match the `type` field on education/experience entries.
 */
export const DOMAIN_COLORS: Record<string, string> = {
  "Business, Technology, Entrepreneurship": "#660005",
  "Design and Futures Studies": "#523A78",
  "Health, Fitness, and Longevity Studies": "#21557A",
  "Sustainable Development": "#104747",
  "Learning Science": "#A35C2E",
} as const;

/** Domain names in display order (e.g. for legends). */
export const DOMAIN_NAMES = Object.keys(DOMAIN_COLORS) as (keyof typeof DOMAIN_COLORS)[];

/** CSS variable names for domain colors (theme-aware in global.css). */
export const DOMAIN_CSS_VAR_NAMES: Record<string, string> = {
  "Business, Technology, Entrepreneurship": "domain-business-technology-entrepreneurship",
  "Design and Futures Studies": "domain-design-and-futures-studies",
  "Health, Fitness, and Longevity Studies": "domain-health-fitness-longevity",
  "Sustainable Development": "domain-sustainable-development",
  "Learning Science": "domain-learning-science",
};
