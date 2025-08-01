"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, Code2, Palette, Zap, Check, BookOpen } from "lucide-react"
import { patterns, type Pattern } from "@/lib/data/patterns"

interface PatternShowcaseProps {
  category?: Pattern["category"]
  limit?: number
}

export function PatternShowcase({ category, limit }: PatternShowcaseProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filter patterns based on props with safe fallbacks
  let displayPatterns = patterns || []

  if (category && displayPatterns.length > 0) {
    displayPatterns = displayPatterns.filter((pattern) => pattern.category === category)
  }

  if (limit && displayPatterns.length > 0) {
    displayPatterns = displayPatterns.slice(0, limit)
  }

  const copyToClipboard = async (code: string, patternId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(patternId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  const getDifficultyColor = (difficulty: Pattern["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryIcon = (category: Pattern["category"]) => {
    switch (category) {
      case "layout":
        return <Palette className="h-4 w-4" />
      case "navigation":
        return <BookOpen className="h-4 w-4" />
      case "forms":
        return <Code2 className="h-4 w-4" />
      case "data-display":
        return <Zap className="h-4 w-4" />
      case "feedback":
        return <Check className="h-4 w-4" />
      case "overlay":
        return <Code2 className="h-4 w-4" />
      default:
        return <Code2 className="h-4 w-4" />
    }
  }

  // Handle empty state
  if (!displayPatterns || displayPatterns.length === 0) {
    return (
      <div className="text-center py-12">
        <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No patterns found</h3>
        <p className="text-muted-foreground">
          {category ? `No patterns available in the ${category} category.` : "No patterns available at the moment."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {!category && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">UI Patterns</h2>
            <p className="text-muted-foreground">Production-ready UI patterns and components</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {displayPatterns.length} patterns
            </Badge>
          </div>
        </div>
      )}

      {/* Patterns Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {displayPatterns.map((pattern) => (
          <Card
            key={pattern.id}
            className="group relative overflow-hidden border-0 shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:shadow-lg hover:ring-border"
          >
            {/* Pattern Header */}
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(pattern.category)}
                    <Badge variant="outline" className="text-xs capitalize">
                      {pattern.category}
                    </Badge>
                    <Badge className={`text-xs capitalize ${getDifficultyColor(pattern.difficulty || "beginner")}`}>
                      {pattern.difficulty || "beginner"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{pattern.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{pattern.description}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              {pattern.tags && pattern.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {pattern.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {pattern.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{pattern.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Dependencies Preview */}
              {pattern.dependencies && pattern.dependencies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Dependencies</h4>
                  <ul className="space-y-1">
                    {pattern.dependencies.slice(0, 3).map((dep, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        <span className="font-mono">{dep}</span>
                      </li>
                    ))}
                    {pattern.dependencies.length > 3 && (
                      <li className="text-xs text-muted-foreground ml-3">
                        +{pattern.dependencies.length - 3} more dependencies
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(pattern.code || "", pattern.id)}
                    className="h-8 text-xs"
                  >
                    {copiedId === pattern.id ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {!limit && displayPatterns.length >= 6 && (
        <div className="text-center">
          <Button variant="outline">Load More Patterns</Button>
        </div>
      )}
    </div>
  )
}
