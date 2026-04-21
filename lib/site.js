export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://fonsi-portfolio.vercel.app");

export const SITE_NAME = "FONSI";

export const SITE_TITLE = "FONSI — Digital Marketing, Websites, Design & Video";

export const SITE_TAGLINE =
  "Digital Marketing · High-Performance Websites · Design · Video";

export const SITE_DESCRIPTION =
  "Himanshu Bhardwaj (FONSI) — digital marketing expert running high-ROI Google and Meta ads, and full-stack web developer crafting blazing-fast, SEO-ready websites. Serving businesses across India, US, UK, UAE, and globally.";

export const SITE_KEYWORDS = [
  "FONSI",
  "Himanshu Bhardwaj",
  "digital marketing",
  "performance marketing",
  "Meta ads",
  "Google ads",
  "Facebook ads",
  "web development",
  "Next.js websites",
  "SEO",
  "Google My Business",
  "GMB optimization",
  "graphic design",
  "video editing",
  "UGC editing",
  "landing page design",
  "India marketer",
  "global digital marketing",
];

export const SOCIAL = {
  twitter: "@fonsi",
};
