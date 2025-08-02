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
import { Menu, Wand2, Users, Home, Github, ExternalLink } from "lucide-react"
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
  },
  {
    name: "V0 Profiles",
    href: "/profiles",
    icon: Users,
    description: "Personalized AI assistants with custom traits and tasks",
    badge: "New",
  },
]

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn("justify-start gap-2 h-auto p-3", isActive && "bg-primary text-primary-foreground")}
            >
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <Badge variant={isActive ? "secondary" : "outline"} className="ml-auto text-xs">
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">V0 Toolkit</h2>
              <div className="space-y-1">
                <NavItems />
              </div>
            </div>

            {/* External Links */}
            <div className="px-3 py-2 border-t">
              <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">Resources</h3>
              <div className="space-y-1">
                <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto p-3">
                    <ExternalLink className="h-4 w-4" />
                    <span>V0.dev</span>
                  </Button>
                </Link>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto p-3">
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <NavigationMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 gap-2",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
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
  )
}
