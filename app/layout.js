import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SOCIAL,
} from "@/lib/site";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · FONSI",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Himanshu Bhardwaj", url: SITE_URL }],
  creator: "Himanshu Bhardwaj",
  publisher: "FONSI",
  category: "Digital Marketing",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: SOCIAL.twitter,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0607" },
    { media: "(prefers-color-scheme: light)", color: "#0B0607" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Himanshu Bhardwaj",
  alternateName: "FONSI",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Digital Marketer & Full-Stack Web Developer",
  description: SITE_DESCRIPTION,
  knowsAbout: [
    "Performance Marketing",
    "Meta Ads",
    "Google Ads",
    "Next.js Development",
    "SEO",
    "Google My Business",
    "Graphic Design",
    "Video Editing",
  ],
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Worldwide" },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  priceRange: "$$",
  founder: { "@type": "Person", name: "Himanshu Bhardwaj" },
  areaServed: "Worldwide",
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Ads (Meta & Google)" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "High-Performance Websites" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google My Business Optimization" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Editing" } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </body>
    </html>
  );
}
