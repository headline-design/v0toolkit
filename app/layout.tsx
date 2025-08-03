import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
