import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "V0 Toolkit - Professional V0 Development Resources",
  description:
    "Curated patterns, prompts, and best practices for building production-ready applications with V0. Built by developers, for developers.",
  keywords: ["v0", "vercel", "react", "nextjs", "ui", "components", "patterns", "toolkit"],
  authors: [{ name: "V0 Toolkit Community" }],
  creator: "V0 Toolkit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://v0toolkit.dev",
    title: "V0 Toolkit - Professional V0 Development Resources",
    description: "Curated patterns, prompts, and best practices for building production-ready applications with V0.",
    siteName: "V0 Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "V0 Toolkit - Professional V0 Development Resources",
    description: "Curated patterns, prompts, and best practices for building production-ready applications with V0.",
    creator: "@v0toolkit",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
