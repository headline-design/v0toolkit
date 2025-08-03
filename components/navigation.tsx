"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, Wand2, Users, Home, Github, ExternalLink, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "V0 Toolkit overview and getting started",
  },
  {
    name: "Prompt Generator",
    href: "/prompt-generator",
    icon: Wand2,
    description: "Create sophisticated prompts using expert templates",
    badge: "Core",
    badgeVariant: "default" as const,
  },
  {
    name: "V0 Profiles",
    href: "/profiles",
    icon: Users,
    description: "Personalized AI assistants with custom traits and tasks",
    badge: "New",
    badgeVariant: "secondary" as const,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  const NavItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        return (
          <Link key={item.name} href={item.href} onClick={onItemClick}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "justify-start gap-3 h-auto p-3 w-full transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <Badge variant={isActive ? "secondary" : item.badgeVariant} className="ml-auto text-xs px-2 py-0.5">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        )
      })}
    </>
  )

  if (isMobile) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-lg">V0 Toolkit</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex h-full flex-col">
                  <div className="border-b p-6">
                    <Link href="/" className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-lg">V0 Toolkit</span>
                    </Link>
                  </div>

                  <div className="flex-1 overflow-auto p-6">
                    <div className="space-y-2">
                      <NavItems />
                    </div>
                  </div>

                  <div className="border-t p-6">
                    <div className="space-y-2">
                      <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                          <ExternalLink className="h-4 w-4" />
                          <span>V0.dev</span>
                        </Button>
                      </Link>
                      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            V0 Toolkit
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 gap-2",
                        isActive && "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant={isActive ? "secondary" : item.badgeVariant} className="text-xs px-2 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
