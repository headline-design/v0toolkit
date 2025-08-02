"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Github, Code2, Clock, Layers } from "lucide-react"
import { examples } from "@/lib/data/examples"

export default function ToolsExamplesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Safe array handling with fallback
  const safeExamples = examples || []
  const categories = Array.from(new Set(safeExamples.map((e) => e.category).filter(Boolean)))

  const filteredExamples = safeExamples.filter((example) => {
    if (!example) return false

    const matchesSearch =
      (example.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (example.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (example.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || example.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (complexity: string) => {
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
          <h1 className="text-3xl font-bold tracking-tight">Application Examples</h1>
          <p className="text-lg text-muted-foreground">
            Complete application examples showcasing modern development patterns and best practices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search examples..."
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
              All ({safeExamples.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category} ({safeExamples.filter((e) => e.category === category).length})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredExamples.length} of {safeExamples.length} examples
      </div>

      {/* Examples Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredExamples.map((example) => (
          <Card
            key={example.id}
            className="group hover:shadow-md transition-shadow border-0 shadow-sm ring-1 ring-border/50 hover:ring-border"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Code2 className="h-4 w-4 text-primary" />
                    <Badge variant="outline" className="text-xs capitalize">
                      {example.category}
                    </Badge>
                    <Badge className={`text-xs capitalize ${getDifficultyColor(example.complexity)}`}>
                      {example.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              {example.tags && example.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {example.tags.slice(0, 6).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {example.tags.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{example.tags.length - 6} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Tech Stack */}
              {example.techStack && example.techStack.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-3 w-3" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {example.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {example.techStack.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{example.techStack.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              {example.features && example.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Features</h4>
                  <ul className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                    {example.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {example.features.length > 4 && (
                      <li className="text-xs text-muted-foreground ml-3">
                        +{example.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {example.demoUrl && (
                  <Button size="sm" asChild className="flex-1">
                    <a href={example.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {example.sourceUrl && (
                  <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                    <a href={example.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
                {!example.demoUrl && !example.sourceUrl && (
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled>
                    <Clock className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredExamples.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <Code2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No examples found</h3>
            <p className="mt-2 text-muted-foreground">
              {searchTerm || selectedCategory
                ? "Try adjusting your search criteria or filters."
                : "Examples are being added regularly. Check back soon!"}
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
