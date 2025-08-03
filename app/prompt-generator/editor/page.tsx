"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PromptGenerator } from "@/components/prompt-generator"
import { AssistantPanel } from "@/components/assistant-panel"
import { usePromptGenerator } from "@/lib/hooks/use-prompt-generator"
import { ArrowLeft, HelpCircle, Sparkles, InfoIcon, Lightbulb, Target, Users } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Alert, AlertDescription } from "@/components/ui/alert"

import type * as React from "react"

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
        <AssistantPanel isOpen={true} onToggle={() => {}} isMobile={false} />
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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="sm" onClick={handleBack} className="h-9">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/prompt-generator">Prompt Generator</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedTemplate.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <SidebarTrigger className="-mr-1 rotate-180" />
        </header>

        {/* Template Info Banner */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">{selectedTemplate.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {selectedTemplate.category}
                </Badge>
                <Badge
                  variant={
                    selectedTemplate.difficulty === "Beginner"
                      ? "default"
                      : selectedTemplate.difficulty === "Intermediate"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs flex-shrink-0"
                >
                  {selectedTemplate.difficulty}
                </Badge>
                {selectedTemplate.examples.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{selectedTemplate.examples.length} examples</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 min-w-0 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Quick Tips */}
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Quick Tips:</strong> Fill in all required fields to generate your prompt. Use the examples
                dropdown to load pre-configured settings, and check the assistant panel for help and guidance.
              </AlertDescription>
            </Alert>

            <PromptGenerator hook={promptGeneratorHook} onTemplateSelect={handleBack} />
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  )
}
