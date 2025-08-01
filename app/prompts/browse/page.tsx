"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, Check } from "lucide-react"
import { prompts } from "@/lib/data/prompts"

const sidebarItems = [
  {
    id: "all",
    title: "All Prompts",
    href: "/prompts/browse",
    count: prompts.length,
  },
  {
    id: "ui-components",
    title: "UI Components",
    href: "/prompts/browse/ui-components",
    count: prompts.filter((p) => p.category === "ui-components").length,
  },
  {
    id: "full-applications",
    title: "Full Applications",
    href: "/prompts/browse/full-applications",
    count: prompts.filter((p) => p.category === "full-applications").length,
  },
  {
    id: "integrations",
    title: "Integrations",
    href: "/prompts/browse/integrations",
    count: prompts.filter((p) => p.category === "integrations").length,
  },
  {
    id: "patterns",
    title: "Patterns",
    href: "/prompts/browse/patterns",
    count: prompts.filter((p) => p.category === "patterns").length,
  },
  {
    id: "optimization",
    title: "Optimization",
    href: "/prompts/browse/optimization",
    count: prompts.filter((p) => p.category === "optimization").length,
  },
]

export default function PromptsBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredPrompts = prompts.filter((prompt) => {
    return (
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  return (
    <SidebarLayout
      title="Prompt Templates"
      description="Browse tested prompt templates"
      sidebarItems={sidebarItems}
      className="p-6"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Prompts</h1>
            <p className="text-muted-foreground">
              {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <Badge variant="secondary">{filteredPrompts.length} results</Badge>
        </div>

        {/* Prompts List */}
        <div className="space-y-6">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {prompt.category.replace("-", " ")}
                      </Badge>
                      <Badge
                        variant={
                          prompt.difficulty === "beginner"
                            ? "secondary"
                            : prompt.difficulty === "intermediate"
                              ? "default"
                              : "destructive"
                        }
                        className="text-xs capitalize"
                      >
                        {prompt.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{prompt.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{prompt.description}</p>
                  </div>
                  <Button size="sm" onClick={() => copyToClipboard(prompt.prompt, prompt.id)}>
                    {copiedId === prompt.id ? (
                      <>
                        <Check className="mr-2 h-3 w-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Prompt Preview */}
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="mb-2 text-xs font-medium text-foreground">Prompt Preview</div>
                  <div className="max-h-32 overflow-y-auto">
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {prompt.prompt.slice(0, 300)}...
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
