"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PromptGenerator } from "@/components/prompt-generator"
import { AssistantPanel } from "@/components/assistant-panel"
import { usePromptGenerator } from "@/lib/hooks/use-prompt-generator"
import { ArrowLeft, HelpCircle, Sparkles, Menu, X, InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

import * as React from "react"
import { Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            <h2 className="font-semibold">Assistant</h2>
          </div>

        </div>
      </SidebarHeader>
      <SidebarContent>
        <AssistantPanel isOpen={true} onToggle={() => { }} isMobile={false} />
        <SidebarSeparator className="mx-0" />

      </SidebarContent>
      <SidebarFooter className="hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <InfoIcon />
              <span>Learn More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


export default function PromptGeneratorEditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptGeneratorHook = usePromptGenerator()
  const { templates, selectedTemplate, selectTemplate, generatedPrompt } = promptGeneratorHook
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [templateInitialized, setTemplateInitialized] = useState(false)
  const templateId = searchParams.get("template") || ""

  // Get template from URL params and select it
  useEffect(() => {
    if (templateId && templates.length > 0 && !templateInitialized) {
      const template = templates.find((t) => t.id === templateId)
      if (template) {
        selectTemplate(template)
        setTemplateInitialized(true)
        setIsLoading(false)
      } else {
        // Template not found, redirect back
        router.push("/prompt-generator")
      }
    } else if (!templateId && templates.length > 0) {
      // No template ID in URL, redirect back
      router.push("/prompt-generator")
    }
  }, [templateId, templates, templateInitialized, selectTemplate, router])

  // Auto-open assistant on desktop when prompt is generated
  useEffect(() => {
    if (generatedPrompt && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsAssistantOpen(true)
    }
  }, [generatedPrompt])

  // Close mobile menu when assistant panel opens/closes
  useEffect(() => {
    if (isAssistantOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [isAssistantOpen])

  // Show loading state while templates are loading or template is being selected
  if (isLoading || !selectedTemplate) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-muted-foreground animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Loading Template...</h3>
                <p className="text-sm text-muted-foreground">
                  {templateId
                    ? "Preparing your selected template"
                    : "Please select a template to start generating prompts"}
                </p>
              </div>
              <Button onClick={() => router.push("/prompt-generator")} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {templateId ? "Back to Templates" : "Select a Template"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleBack = () => {
    router.push("/prompt-generator")
  }

  return (

    <>
      <SidebarProvider style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
          </header>
          {/* Main Content Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main Generator Content */}

            <div className="flex-1 min-w-0 overflow-auto">
              <div className="p-4 lg:p-6">
                <PromptGenerator hook={promptGeneratorHook} onTemplateSelect={handleBack} />
              </div>
            </div>


          </div>
        </SidebarInset>
        <AppSidebar side="right" />
      </SidebarProvider>
    </>
  )
}


