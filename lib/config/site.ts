/**
 * Site configuration for V0 Toolkit
 * Centralized configuration for consistent branding and metadata
 */
export const siteConfig = {
  name: "V0 Toolkit",
  description:
    "Professional patterns, best practices, and tools for V0 development. Built by the community, for teams shipping production software.",
  url: "https://v0toolkit.dev",
  ogImage: "https://v0toolkit.dev/og.jpg",
  links: {
    twitter: "https://twitter.com/v0toolkit",
    github: "https://github.com/v0toolkit/toolkit",
    discord: "https://discord.gg/v0toolkit",
  },
  creator: "V0 Community",
  keywords: [
    "v0",
    "vercel",
    "nextjs",
    "react",
    "typescript",
    "tailwind",
    "shadcn",
    "ui",
    "components",
    "patterns",
    "best-practices",
    "toolkit",
    "development",
    "ai",
    "code-generation",
  ],
}

export type SiteConfig = typeof siteConfig
