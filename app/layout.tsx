import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "v0 Toolkit - Tools for V0 Development",
    template: "%s - v0 Toolkit",
  },
  icons: {
    icon: "/favicon.svg",
  },
  description: "Professional tools for V0 development workflows",
  openGraph: {
    title: "v0 Toolkit - Tools for V0 Development",
    description:
      "A collection of tools designed to enhance your V0 development workflow, including prompt generation, profile management, and more.",
    url: "https://v0toolkit.com",
    siteName: "v0 Toolkit",
    images: [
      {
        url: "https://v0toolkit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "v0 Toolkit - Tools for V0 Development",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "v0 Toolkit - Tools for V0 Development",
    description:
      "A collection of tools designed to enhance your V0 development workflow, including prompt generation, profile management, and more.",
    creator: "@ussaaron_",
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
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased flex min-h-screen flex-col bg-brand-background-base`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen ">
            <Navigation />
            <main>{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
