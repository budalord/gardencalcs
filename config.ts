export const siteConfig = {
  name: "Fertilizer Calculator & Seed Spacing Tools",
  shortName: "GardenCalc",
  description:
    "Free online gardening calculators for fertilizer rates, seed spacing, soil amendments, watering schedules, and more. Grow smarter with data-driven tools.",
  url: "https://fertilizer-calculator.vercel.app",
  ogImage: "/og-image.png",
  locale: "en_US",
  twitterHandle: "@gardencalc",
  keywords: [
    "fertilizer calculator",
    "seed spacing calculator",
    "soil amendment calculator",
    "garden planner",
    "NPK calculator",
    "watering schedule",
    "compost calculator",
    "plant spacing",
  ],
  nav: [
    { label: "All Tools", href: "/tools" },
    { label: "Fertilizer", href: "/tools?category=fertilizer" },
    { label: "Seed Spacing", href: "/tools?category=spacing" },
    { label: "Soil", href: "/tools?category=soil" },
  ],
  footerLinks: [
    {
      heading: "Popular Tools",
      links: [
        { label: "NPK Fertilizer Calculator", href: "/tools/npk-fertilizer-calculator" },
        { label: "Seed Spacing Calculator", href: "/tools/seed-spacing-calculator" },
        { label: "Soil Amendment Calculator", href: "/tools/soil-amendment-calculator" },
        { label: "Watering Schedule", href: "/tools/watering-schedule-calculator" },
      ],
    },
    {
      heading: "Categories",
      links: [
        { label: "Fertilizer Tools", href: "/tools?category=fertilizer" },
        { label: "Spacing Tools", href: "/tools?category=spacing" },
        { label: "Soil Tools", href: "/tools?category=soil" },
        { label: "Water Tools", href: "/tools?category=water" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Gardening Guides", href: "/guides" },
        { label: "About", href: "/about" },
      ],
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;