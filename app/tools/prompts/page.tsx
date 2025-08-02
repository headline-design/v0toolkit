"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Copy, Check, MessageSquare, Lightbulb, Tag } from "lucide-react"
import { prompts } from "@/lib/data/prompts"

export default function ToolsPromptsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Safe array handling with fallback
  const safePrompts = prompts || []
  const categories = Array.from(new Set(safePrompts.map((p) => p.category).filter(Boolean)))

  const filteredPrompts = safePrompts.filter((prompt) => {
    if (!prompt) return false

    const matchesSearch =
      (prompt.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prompt.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prompt.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || prompt.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "complex":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex-1 p-6">

    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">AI Prompts</h1>
          <p className="text-lg text-muted-foreground">
            Curated prompts for generating high-quality components and applications with V0
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All ({safePrompts.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category} ({safePrompts.filter((p) => p.category === category).length})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPrompts.length} of {safePrompts.length} prompts
      </div>

      {/* Prompts Grid */}
      <div className="grid gap-6">
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="group hover:shadow-md transition-shadow border-0 shadow-sm ring-1 ring-border/50 hover:ring-border"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <Badge variant="outline" className="text-xs capitalize">
                      {prompt.category}
                    </Badge>
                    <Badge className={`text-xs capitalize ${getComplexityColor(prompt.complexity)}`}>
                      {prompt.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  <CardDescription>{prompt.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.slice(0, 6).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {prompt.tags.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{prompt.tags.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Prompt Template */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Prompt Template</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(prompt.prompt, `${prompt.id}-prompt`)}
                    className="h-8 px-3"
                  >
                    {copiedId === `${prompt.id}-prompt` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span className="ml-1 text-xs">{copiedId === `${prompt.id}-prompt` ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
                <Textarea
                  value={prompt.prompt}
                  readOnly
                  className="min-h-[100px] text-sm font-mono bg-muted/50 resize-none"
                />
              </div>

              {/* Example Usage */}
              {prompt.example && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Example Usage</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(prompt.example, `${prompt.id}-example`)}
                      className="h-8 px-3"
                    >
                      {copiedId === `${prompt.id}-example` ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span className="ml-1 text-xs">{copiedId === `${prompt.id}-example` ? "Copied!" : "Copy"}</span>
                    </Button>
                  </div>
                  <Textarea value={prompt.example} readOnly className="min-h-[80px] text-sm bg-muted/30 resize-none" />
                </div>
              )}

              {/* Tips */}
              {prompt.tips && prompt.tips.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-3 w-3" />
                    Tips for Better Results
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {prompt.tips.slice(0, 4).map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                    {prompt.tips.length > 4 && (
                      <li className="text-xs text-muted-foreground ml-3">+{prompt.tips.length - 4} more tips</li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No prompts found</h3>
            <p className="mt-2 text-muted-foreground">
              {searchTerm || selectedCategory
                ? "Try adjusting your search criteria or filters."
                : "Prompts are being added regularly. Check back soon!"}
            </p>
            {(searchTerm || selectedCategory) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
