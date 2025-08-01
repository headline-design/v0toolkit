"use client"

import type React from "react"
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
import { Separator } from "@/components/ui/separator"
import { Palette, MessageSquare, Code2, Building, CheckCircle, Layers } from "lucide-react"

interface SidebarLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex h-12 items-center px-4">
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
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
