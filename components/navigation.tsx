"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { Bot, FileText, Layers3, Book, Palette, Github, Menu, X, Moon, Sun, Radar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import {V0ToolkitTypeLogo} from "@/components/icons/v0-toolkit-typelogo"
import {LogoSparks} from "@/components/icons/logo-sparks"
import HomeNavigation from "./home-navigation"


const navigation = [
  {
    name: "Slate",
    href: "/slate",
    icon: Palette,
    description: "Visual prompt organization"
  },
  {
    name: "v0 Profiles",
    href: "/profiles",
    icon: FileText,
    description: "Manage V0 profiles"
  },
  {
    name: "Prompt Generator",
    href: "/prompt-generator",
    icon: Layers3,
    description: "Create optimized prompts"
  },
    {
    name: "Library",
    href: "/lib",
    icon: Book,
    description: "Explore library"
  },
  {
  name: "Issue Tracker",
  href: "/issues",
  icon: Radar,
  description: "Track v0 issues"
  }
]

function MobileThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-full justify-start gap-3 h-12 px-4"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <div className="flex flex-col items-start">
        <span className="font-medium">Theme</span>
        <span className="text-xs text-muted-foreground capitalize">{theme} mode</span>
      </div>
    </Button>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (pathname === "/") {
  return (
  <HomeNavigation />

  )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        {/* Desktop Logo & Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LogoSparks />
            <span className="hidden font-bold sm:inline-block"><V0ToolkitTypeLogo /></span>
          </Link>

          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground" : "text-foreground/60",
                  )}
                >

                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Mobile Logo */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <LogoSparks />
            <span className="font-bold">
            <V0ToolkitTypeLogo />
            </span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/headline-design/v0toolkit" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] px-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="px-6 pb-4 text-left">
                    <SheetTitle className="flex items-center gap-2">
                      <LogoSparks />
                      <span>
                      <V0ToolkitTypeLogo />
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <Separator />

                  {/* Navigation Links */}
                  <div className="flex-1 overflow-auto">
                    <nav className="px-4 py-6">
                      <div className="space-y-1">
                        {navigation.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center gap-4 rounded-lg px-4 py-3 text-sm transition-all hover:bg-accent/50",
                                isActive
                                  ? "bg-accent text-accent-foreground shadow-sm"
                                  : "text-foreground/70 hover:text-foreground"
                              )}
                            >
                              <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-md",
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              )}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-medium leading-none">{item.name}</span>
                                <span className="text-xs text-muted-foreground leading-none">
                                  {item.description}
                                </span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </nav>

                    <Separator className="mx-4" />

                    {/* Settings Section */}
                    <div className="px-4 py-6">
                      <div className="space-y-1">
                        <MobileThemeToggle />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Footer */}
                  <div className="px-6 py-6">
                    <div className="space-y-4">
                      <Button variant="outline" size="sm" className="w-full justify-start gap-3" asChild>
                        <Link
                          href="https://github.com/headline-design/v0toolkit"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                        >
                          <Github className="h-4 w-4" />
                          View on GitHub
                        </Link>
                      </Button>

                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          Built for the v0 community
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          Version 1.0.0
                        </p>
                      </div>
                    </div>
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
