"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Palette, MessageSquare, Code2, Building, CheckCircle, Layers, Wand2, Users, Sparkles } from "lucide-react"

interface SidebarLayoutProps {
  children: any
}

const navigationItems = [
  {
    title: "Prompt Generator",
    url: "/tools/prompt-generator",
    icon: Wand2,
    description: "Generate sophisticated AI prompts",
    badge: "Core",
  },
  {
    title: "V0 Profiles",
    url: "/tools/v0-profiles",
    icon: Users,
    description: "Personalized AI assistants",
    badge: "New",
  },
  {
    title: "Patterns",
    url: "/tools/patterns",
    icon: Palette,
    description: "UI patterns and components",
  },
  {
    title: "Prompts",
    url: "/tools/prompts",
    icon: MessageSquare,
    description: "AI prompts and templates",
  },
  {
    title: "Examples",
    url: "/tools/examples",
    icon: Code2,
    description: "Code examples and demos",
  },
  {
    title: "Architecture",
    url: "/tools/architecture",
    icon: Building,
    description: "System design patterns",
  },
  {
    title: "Best Practices",
    url: "/tools/best-practices",
    icon: CheckCircle,
    description: "Development guidelines",
  },
  {
    title: "Structure",
    url: "/tools/structure",
    icon: Layers,
    description: "File organization",
  },
]

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname()

  const deSlugify = (text: string) => {
    return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  }

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    // Always start with Tools
    breadcrumbs.push({
      label: "Tools",
      href: "/tools",
      isLast: segments.length === 1,
    })

    // Build path segments
    let currentPath = ""
    for (let i = 1; i < segments.length; i++) {
      currentPath += `/${segments[i]}`
      const fullPath = `/tools${currentPath}`
      const isLast = i === segments.length - 1

      breadcrumbs.push({
        label: deSlugify(segments[i]),
        href: fullPath,
        isLast,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <SidebarProvider>
      <Sidebar side="left" className="border-r-2">
        <SidebarHeader className="border-b-2 border-sidebar-border bg-gradient-to-r from-sidebar-background to-sidebar-background/80">
          <div className="flex h-14 items-center px-6">
            <Link href="/tools" className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg">V0 Toolkit</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-gradient-to-b from-sidebar-background to-sidebar-background/95">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium px-6 py-3">
              Tools & Resources
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-3">
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => {
                  // Check if current path starts with this item's URL
                  const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="h-11 px-3 rounded-lg transition-all duration-200"
                      >
                        <Link href={item.url} className="flex items-center gap-3 w-full">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="font-medium">{item.title}</span>
                            {item.description && (
                              <div className="text-xs text-sidebar-foreground/60 truncate">{item.description}</div>
                            )}
                          </div>
                          {item.badge && (
                            <Badge
                              variant={isActive ? "secondary" : "outline"}
                              className="text-xs px-2 py-0.5 flex-shrink-0"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 flex shrink-0 items-center gap-2 border-b-2 p-4 z-10">
          <SidebarTrigger className="-ml-1 h-8 w-8" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage className="font-medium">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href} className="font-medium hover:text-primary transition-colors">
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!crumb.isLast && <BreadcrumbSeparator className="hidden md:block" />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
