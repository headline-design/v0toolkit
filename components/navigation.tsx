"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Github } from "lucide-react"
import { useTheme } from "next-themes"

// Navigation structure
const navigationItems = [
  { href: "/patterns", label: "Patterns" },
  { href: "/prompts", label: "Prompts" },
  { href: "/architecture", label: "Architecture" },
  { href: "/examples", label: "Examples" },
  { href: "/tools", label: "Tools" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isToolsPage = pathname.startsWith("/tools");

  const isActiveSection = (href: string) => {
    return pathname.startsWith(href)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (isToolsPage) {
  return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">V0</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-none">V0 Toolkit</span>
              <span className="text-xs text-muted-foreground leading-none">Professional</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={isActiveSection(item.href) ? "secondary" : "ghost"}
                size="sm"
                className="h-9 px-4 text-sm font-medium transition-colors"
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* GitHub Link */}
            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent transition-colors" asChild>
              <a
                href="https://github.com/headline-design/v0toolkit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View V0 Toolkit on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 hover:bg-accent transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden hover:bg-accent transition-colors">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Navigation</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="h-9 w-9"
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
                    </Button>
                  </div>

                  {navigationItems.map((item) => (
                    <Button
                      key={item.href}
                      variant={isActiveSection(item.href) ? "secondary" : "ghost"}
                      className="justify-start h-12 px-4 text-base transition-colors"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <Button variant="ghost" className="justify-start h-12 px-4 text-base w-full" asChild>
                      <a
                        href="https://github.com/headline-design/v0toolkit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <Github className="h-4 w-4" />
                        <span>View on GitHub</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
