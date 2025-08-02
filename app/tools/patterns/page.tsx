"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Copy, Check, Code2, Package, Eye } from "lucide-react"
import { patterns } from "@/lib/data/patterns"

export default function ToolsPatternsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Safe array handling with fallback
  const safePatterns = patterns || []
  const categories = Array.from(new Set(safePatterns.map((p) => p.category).filter(Boolean)))

  const filteredPatterns = safePatterns.filter((pattern) => {
    if (!pattern) return false

    const matchesSearch =
      (pattern.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pattern.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pattern.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || pattern.category === selectedCategory
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
          <h1 className="text-3xl font-bold tracking-tight">UI Patterns</h1>
          <p className="text-lg text-muted-foreground">
            Reusable UI patterns and components with complete code examples
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patterns..."
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
              All ({safePatterns.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category} ({safePatterns.filter((p) => p.category === category).length})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPatterns.length} of {safePatterns.length} patterns
      </div>

      {/* Patterns Grid */}
      <div className="grid gap-6">
        {filteredPatterns.map((pattern) => (
          <Card
            key={pattern.id}
            className="group hover:shadow-md transition-shadow border-0 shadow-sm ring-1 ring-border/50 hover:ring-border"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Code2 className="h-4 w-4 text-primary" />
                    <Badge variant="outline" className="text-xs capitalize">
                      {pattern.category}
                    </Badge>
                    <Badge className={`text-xs capitalize ${getComplexityColor(pattern.complexity)}`}>
                      {pattern.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{pattern.title}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              {pattern.tags && pattern.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {pattern.tags.slice(0, 6).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {pattern.tags.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{pattern.tags.length - 6} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Preview */}
              {pattern.preview && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Eye className="h-3 w-3" />
                    Preview
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{pattern.preview}</p>
                </div>
              )}

              {/* Dependencies */}
              {pattern.dependencies && pattern.dependencies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-3 w-3" />
                    Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {pattern.dependencies.map((dep) => (
                      <Badge key={dep} variant="secondary" className="text-xs font-mono">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {pattern.useCases && pattern.useCases.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Use Cases</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground">
                    {pattern.useCases.slice(0, 4).map((useCase, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                    {pattern.useCases.length > 4 && (
                      <li className="text-xs text-muted-foreground ml-3">
                        +{pattern.useCases.length - 4} more use cases
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Code</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(pattern.code, pattern.id)}
                    className="h-8 px-3"
                  >
                    {copiedId === pattern.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span className="ml-1 text-xs">{copiedId === pattern.id ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
                <Textarea
                  value={pattern.code}
                  readOnly
                  className="min-h-[200px] text-sm font-mono bg-muted/50 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatterns.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <Code2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No patterns found</h3>
            <p className="mt-2 text-muted-foreground">
              {searchTerm || selectedCategory
                ? "Try adjusting your search criteria or filters."
                : "Patterns are being added regularly. Check back soon!"}
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
