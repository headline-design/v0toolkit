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
import { ArrowLeft, HelpCircle, Sparkles, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <div className="flex-1 flex flex-col h-full">
      {/* Mobile Header */}
      <div className="lg:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
        <div className="p-4 space-y-3">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack} className="h-8 px-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                className={cn("h-8 px-3", isAssistantOpen && "bg-primary text-primary-foreground")}
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                {isAssistantOpen ? "Hide" : "Help"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-8 w-8 p-0"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Template Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="outline" className="text-xs">
                {selectedTemplate.category}
              </Badge>
              <span className="text-sm font-medium truncate">{selectedTemplate.name}</span>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg z-10">
              <div className="p-4 space-y-3">
                <div className="text-sm font-medium">Template Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedTemplate.difficulty}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">{selectedTemplate.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack} className="h-9">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedTemplate.category}</Badge>
                  <Badge
                    variant={
                      selectedTemplate.difficulty === "Beginner"
                        ? "default"
                        : selectedTemplate.difficulty === "Intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedTemplate.difficulty}
                  </Badge>
                </div>
                <div className="text-lg font-semibold">{selectedTemplate.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                className={cn(isAssistantOpen && "bg-primary text-primary-foreground")}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {isAssistantOpen ? "Hide Assistant" : "Show Assistant"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Generator Content */}
        <div className="flex-1 min-w-0 overflow-auto">
          <div className="p-4 lg:p-6">
            <PromptGenerator hook={promptGeneratorHook} onTemplateSelect={handleBack} />
          </div>
        </div>

        {/* Desktop Assistant Panel */}
        <div className="hidden lg:block">
          <AssistantPanel
            isOpen={isAssistantOpen}
            onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
            isMobile={false}
          />
        </div>
      </div>

      {/* Mobile Assistant Panel Overlay */}
      {isAssistantOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute inset-x-0 bottom-0 h-[90vh] bg-background border-t rounded-t-xl shadow-2xl">
            <AssistantPanel
              isOpen={isAssistantOpen}
              onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}
