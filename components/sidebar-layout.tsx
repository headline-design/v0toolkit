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
import { Palette, MessageSquare, Code2, Building, CheckCircle, Layers, Wand2, Users } from "lucide-react"

interface SidebarLayoutProps {
  children: any
}

const navigationItems = [
  {
    title: "Prompt Generator",
    url: "/tools/prompt-generator",
    icon: Wand2,
    description: "Generate sophisticated AI prompts",
  },
  {
    title: "V0 Profiles",
    url: "/tools/v0-profiles",
    icon: Users,
    description: "Personalized AI assistants",
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
      <Sidebar side="left">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex h-[2.75rem] items-center px-4">
            <Link href="/tools" className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                V0
              </div>
              <span className="font-semibold">Toolkit</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  // Check if current path starts with this item's URL
                  const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
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
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!crumb.isLast && <BreadcrumbSeparator className="hidden md:block" />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
