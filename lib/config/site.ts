/**
 * Site configuration for V0 Toolkit
 * Centralized configuration for V0 prompting and profile management
 */
export const siteConfig = {
  name: "V0 Toolkit",
  description:
    "Professional V0 prompting toolkit for developers. Create sophisticated AI prompts and personalized V0 profiles for optimal development assistance.",
  url: "https://v0toolkit.dev",
  ogImage: "https://v0toolkit.dev/og.jpg",
  links: {
    twitter: "https://twitter.com/v0toolkit",
    github: "https://github.com/headline-design/v0toolkit",
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
    "ai",
    "prompts",
    "profiles",
    "development",
    "code-generation",
    "ai-assistant",
    "prompt-engineering",
  ],
}

export type SiteConfig = typeof siteConfig
