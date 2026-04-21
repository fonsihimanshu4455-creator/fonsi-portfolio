import { createClient } from "@/lib/supabase/server";

// ----- Fallback content (current hardcoded values) --------------------------
export const FALLBACKS = {
  hero: {
    heading_prefix: "Turning ",
    heading_highlight: "Ads",
    heading_suffix: " Into Actual Revenue",
    subheading:
      "I'm Himanshu Bhardwaj — FONSI. I run performance ads, grow brands, and design graphics & edit video that stop the scroll and move the numbers.",
    global_line:
      "Serving clients across India, US, UK, UAE & globally — async-first across time zones.",
    cta_primary_text: "Start a Project",
    cta_primary_link: "#contact",
    cta_secondary_text: "See My Work",
    cta_secondary_link: "#work",
  },
  stats: [
    { value: "100+", label: "Campaigns Run" },
    { value: "4.8x", label: "Average ROAS" },
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Countries · Global Clients" },
  ],
  services: [
    {
      title: "Paid Ads",
      description:
        "Meta & Google campaigns built around real buyer intent. Creatives that convert, funnels that scale.",
      icon_name: "megaphone",
    },
    {
      title: "Growth Strategy",
      description:
        "End-to-end marketing plans — offer, audience, channels, metrics. From first $1 to first $100K.",
      icon_name: "trending",
    },
    {
      title: "Graphic Design",
      description:
        "Ad creatives, brand kits, social posts. Clean, conversion-led, scroll-stopping visual work.",
      icon_name: "palette",
    },
    {
      title: "Video Editing",
      description:
        "UGC edits, reels, product videos. Punchy cuts with hooks that hold attention to the CTA.",
      icon_name: "film",
    },
  ],
  projects: [
    {
      title: "D2C Skincare Brand",
      category: "Meta Ads · Creative",
      description: "Scaled from 1.2x to 4.6x ROAS in 60 days with UGC-led creatives.",
      gradient: "from-[#ff6a88] via-[#ff99ac] to-[#fecfef]",
      link: "#contact",
      image_url: null,
    },
    {
      title: "SaaS Growth Launch",
      category: "Full Funnel · Google Ads",
      description: "$0 to $48K MRR in one quarter with a targeted search + retargeting funnel.",
      gradient: "from-[#8a5cf6] via-[#a78bfa] to-[#c4b5fd]",
      link: "#contact",
      image_url: null,
    },
    {
      title: "Lifestyle Brand Reel",
      category: "Video Editing",
      description: "3 reels averaging 1.2M organic views — hooks cut to the first 1.8s.",
      gradient: "from-[#fbbf24] via-[#fb923c] to-[#f87171]",
      link: "#contact",
      image_url: null,
    },
    {
      title: "Local Fitness Studio",
      category: "Design · Ads",
      description: "Rebranded creatives + lead-gen campaign — 3x qualified bookings.",
      gradient: "from-[#34d399] via-[#22d3ee] to-[#60a5fa]",
      link: "#contact",
      image_url: null,
    },
  ],
  future_projects: [
    { title: "Supplement Brand", category: "Ads", gradient: "from-[#6366f1] to-[#312e81]", link: "#contact", image_url: null },
    { title: "Fashion Reel Cut", category: "Video", gradient: "from-[#f59e0b] to-[#b45309]", link: "#contact", image_url: null },
    { title: "Café Launch Kit", category: "Design", gradient: "from-[#a78bfa] to-[#6d28d9]", link: "#contact", image_url: null },
    { title: "EdTech Funnel", category: "Ads", gradient: "from-[#ec4899] to-[#831843]", link: "#contact", image_url: null },
    { title: "Product Explainer", category: "Video", gradient: "from-[#10b981] to-[#065f46]", link: "#contact", image_url: null },
    { title: "Brand Starter Pack", category: "Design", gradient: "from-[#38bdf8] to-[#0c4a6e]", link: "#contact", image_url: null },
  ],
  journey_steps: [
    { step_number: "1", title: "Discover", description: "Audit your brand, offer, audience and numbers. Find the real bottleneck." },
    { step_number: "2", title: "Strategy", description: "Map the funnel, channels, creatives and KPIs. Zero fluff, clear plan." },
    { step_number: "3", title: "Execute", description: "Ads live, creatives shipped, video cut. Daily eyes on the dashboard." },
    { step_number: "4", title: "Scale", description: "Double down on what works, kill what doesn't. ROAS up, CAC down." },
  ],
  achievements: [
    {
      number: "20",
      label: "Brands Grown",
      description: "Brands grown across e-com, SaaS, and local services since I started FONSI.",
      is_headline: true,
    },
    {
      number: null,
      label: "Scaling Brands Beyond 7 Figures",
      description: "Multiple e-com clients crossed monthly revenue records with my campaigns.",
      is_headline: false,
    },
    {
      number: null,
      label: "Creative-First Performance",
      description: "In-house creatives consistently outperforming agency-made ads by 2–3x.",
      is_headline: false,
    },
    {
      number: null,
      label: "Retention Over Spray & Pray",
      description: "Built retention funnels that lift LTV so every rupee of ad spend earns more.",
      is_headline: false,
    },
  ],
  skills: [
    { label: "Meta Ads", display: "Meta Ads" },
    { label: "Google Ads", display: "Google Ads" },
    { label: "Graphic Design", display: "Graphic Design" },
    { label: "Video Editing", display: "Video Editing" },
  ],
  testimonials: [
    {
      name: "Aarav Mehta",
      role: "Founder, D2C",
      photo_url: null,
      rating: 5.0,
      review_text:
        "FONSI rebuilt our ad creatives and funnel from scratch. We went from 1.2x to 4x ROAS in under two months. Communication was sharp, no fluff.",
      days_ago: "2 days ago",
    },
    {
      name: "Priya Sharma",
      role: "Marketing Lead",
      photo_url: null,
      rating: 5.0,
      review_text:
        "Himanshu gets performance marketing AND design. Rare combo. Our reels started hitting six-figure views consistently.",
      days_ago: "1 week ago",
    },
    {
      name: "Rohan Kapoor",
      role: "Co-founder",
      photo_url: null,
      rating: 5.0,
      review_text:
        "Launched our D2C brand with FONSI. Clear numbers, clear reporting, and creatives that actually moved the needle.",
      days_ago: "3 weeks ago",
    },
    {
      name: "Sneha Iyer",
      role: "Owner",
      photo_url: null,
      rating: 5.0,
      review_text:
        "He treats your money like his own. Scaled our local studio with a lean budget — 3x qualified leads in one quarter.",
      days_ago: "1 month ago",
    },
    {
      name: "Kabir Joshi",
      role: "Growth Lead",
      photo_url: null,
      rating: 5.0,
      review_text:
        "Best creative + paid combo I've worked with. Hooks are tight, edits are clean, and reporting is brutally honest.",
      days_ago: "2 months ago",
    },
  ],
  site_settings: {
    contact_email: "hello@fonsi.co",
    contact_phone: "+91 00000 00000",
    address: "India · Worldwide",
    timezone_line: "Available across time zones · India · US · UK · UAE · Global",
    footer_description:
      "Himanshu Bhardwaj — digital marketer, designer, and editor helping brands grow with performance ads and creative that actually converts.",
    social_links: {
      twitter: "#",
      instagram: "#",
      youtube: "#",
      email: "mailto:hello@fonsi.co",
    },
    cta_heading_prefix: "Let's Build Something ",
    cta_heading_highlight: "Amazing",
    cta_heading_suffix: "",
    cta_subcopy:
      "Tell me about your brand and your market — wherever you're based. I work across time zones and deliver async, with clear updates every step.",
  },
};

// ----- Generic helpers ------------------------------------------------------
async function fetchList(table, fallback) {
  const supabase = await createClient();
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("is_visible", true)
      .order("order", { ascending: true });
    if (error || !data || data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

async function fetchSingleton(table, fallback) {
  const supabase = await createClient();
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase.from(table).select("*").eq("id", 1).maybeSingle();
    if (error || !data) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

// ----- Public exports -------------------------------------------------------
export const getHero = () => fetchSingleton("hero_content", FALLBACKS.hero);
export const getStats = () => fetchList("stats", FALLBACKS.stats);
export const getServices = () => fetchList("services", FALLBACKS.services);
export const getProjects = () => fetchList("projects", FALLBACKS.projects);
export const getFutureProjects = () => fetchList("future_projects", FALLBACKS.future_projects);
export const getJourneySteps = () => fetchList("journey_steps", FALLBACKS.journey_steps);
export const getSkills = () => fetchList("skills", FALLBACKS.skills);
export const getTestimonials = () => fetchList("testimonials", FALLBACKS.testimonials);
export const getSiteSettings = () => fetchSingleton("site_settings", FALLBACKS.site_settings);

export async function getAchievements() {
  const supabase = await createClient();
  if (!supabase) {
    return {
      headline: FALLBACKS.achievements.find((a) => a.is_headline) ?? null,
      wins: FALLBACKS.achievements.filter((a) => !a.is_headline),
    };
  }
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("is_visible", true)
      .order("order", { ascending: true });
    if (error || !data || data.length === 0) {
      return {
        headline: FALLBACKS.achievements.find((a) => a.is_headline) ?? null,
        wins: FALLBACKS.achievements.filter((a) => !a.is_headline),
      };
    }
    return {
      headline: data.find((a) => a.is_headline) ?? null,
      wins: data.filter((a) => !a.is_headline),
    };
  } catch {
    return {
      headline: FALLBACKS.achievements.find((a) => a.is_headline) ?? null,
      wins: FALLBACKS.achievements.filter((a) => !a.is_headline),
    };
  }
}
