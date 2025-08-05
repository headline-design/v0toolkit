"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { Bot, FileText, Layers3, Palette, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const LogoSparks = () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m17.713 10.128l-.246.566a.506.506 0 0 1-.934 0l-.246-.566a4.36 4.36 0 0 0-2.22-2.25l-.759-.339a.53.53 0 0 1 0-.963l.717-.319a4.37 4.37 0 0 0 2.251-2.326l.253-.611a.506.506 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.718.32a.53.53 0 0 1 0 .962l-.76.338a4.36 4.36 0 0 0-2.219 2.251M2.828 12l4.243 4.243l-1.414 1.414L0 12l5.657-5.657L7.07 7.757zm15.515 5.657L24 12l-2.83-2.828l-1.414 1.414L21.171 12l-4.242 4.243z"
    />
  </svg>
)


const navigation = [
  { name: "Slate", href: "/slate", icon: Palette },
  { name: "Profiles", href: "/profiles", icon: FileText },
  { name: "Generator", href: "/prompt-generator", icon: Layers3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
           <LogoSparks />
            <span className="hidden font-bold sm:inline-block">v0 Toolkit</span>
          </Link>

          {/* Main Navigation */}
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
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <LogoSparks className="h-6 w-6" />
            <span className="font-bold">v0 Toolkit</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile Menu - Simple for now */}
          <div className="flex md:hidden">
            <nav className="flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-foreground/60",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/headline-design/v0toolkit" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
