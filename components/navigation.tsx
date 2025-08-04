"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { Bot, FileText, Layers3, Palette } from "lucide-react"

const navigation = [
  { name: "Slate", href: "/slate", icon: Palette },
  { name: "Profiles", href: "/profiles", icon: FileText },
  { name: "Prompt Generator", href: "/prompt-generator", icon: Layers3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="text-sm font-semibold">v0 Toolkit</span>
            </Link>
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
