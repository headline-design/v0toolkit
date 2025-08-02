"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PromptGenerator } from "@/components/prompt-generator"
import { AssistantPanel } from "@/components/assistant-panel"
import { usePromptGenerator } from "@/lib/hooks/use-prompt-generator"

export default function PromptGeneratorEditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptGeneratorHook = usePromptGenerator()
  const { templates, selectedTemplate, selectTemplate } = promptGeneratorHook
  const [isAssistantOpen, setIsAssistantOpen] = useState(true)
  const templateId = searchParams.get("template")

  // Get template from URL params and select it
  useEffect(() => {
    if (templateId && templates.length > 0) {
      const template = templates.find((t) => t.id === templateId)
      if (template && !selectedTemplate) {
        selectTemplate(template)
      }
    }
  }, [templateId, templates, selectedTemplate, selectTemplate])

  // If no template is selected, redirect back
  if (!selectedTemplate) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No template selected</p>
          <Button onClick={() => router.push("/tools/prompt-generator")}>Select a Template</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 pl-6">

    <div className="flex h-full">
      {/* Main Editor Area */}
      <div className="flex-1 min-w-0">
        <div className="p-6 space-y-6">
          {/* Header with Template Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Using template:</span>
              <Badge variant="outline">{selectedTemplate.name}</Badge>
            </div>
            <div className="md:hidden">
              <Button variant="outline" size="sm" onClick={() => setIsAssistantOpen(!isAssistantOpen)}>
                {isAssistantOpen ? "Hide" : "Show"} Assistant
              </Button>
            </div>
          </div>

          {/* Generator Interface */}
          <PromptGenerator hook={promptGeneratorHook} />
        </div>
      </div>

      {/* Assistant Panel */}
      <AssistantPanel isOpen={isAssistantOpen} onToggle={() => setIsAssistantOpen(!isAssistantOpen)} />
    </div>
    </div>
  )
}
