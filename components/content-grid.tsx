"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Star,
  Copy,
  ExternalLink,
  Code2,
  Users,
  BookOpen,
  Zap,
} from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string
  type: "prompt" | "profile" | "pattern" | "template"
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  author?: string
  createdAt: Date
  updatedAt: Date
  featured?: boolean
  code?: string
}

const sampleContent: ContentItem[] = [
  {
    id: "1",
    title: "React Component Generator",
    description: "Generate modern React components with TypeScript and best practices",
    type: "prompt",
    category: "Components",
    difficulty: "intermediate",
    tags: ["React", "TypeScript", "Components"],
    author: "John Doe",
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 20),
    featured: true,
    code: "You are a React expert...",
  },
  {
    id: "2",
    title: "UI/UX Designer Profile",
    description: "Specialized AI assistant for design-related tasks and feedback",
    type: "profile",
    category: "Design",
    difficulty: "beginner",
    tags: ["Design", "UI/UX", "Figma"],
    author: "Jane Smith",
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 18),
  },
  {
    id: "3",
    title: "Dashboard Layout Pattern",
    description: "Responsive dashboard layout with sidebar and main content area",
    type: "pattern",
    category: "Layouts",
    difficulty: "advanced",
    tags: ["Layout", "Dashboard", "Responsive"],
    author: "Mike Johnson",
    createdAt: new Date(2024, 0, 5),
    updatedAt: new Date(2024, 0, 15),
  },
  {
    id: "4",
    title: "Authentication Flow Template",
    description: "Complete authentication system with login, signup, and password reset",
    type: "template",
    category: "Authentication",
    difficulty: "intermediate",
    tags: ["Auth", "Security", "Forms"],
    author: "Sarah Wilson",
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 12),
    featured: true,
  },
]

interface ContentGridProps {
  items?: ContentItem[]
  className?: string
}

export function ContentGrid({ items = sampleContent, className }: ContentGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("updated")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = selectedType === "all" || item.type === selectedType
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty

      return matchesSearch && matchesType && matchesCategory && matchesDifficulty
    })

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime()
        case "updated":
          return b.updatedAt.getTime() - a.updatedAt.getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [items, searchQuery, selectedType, selectedCategory, selectedDifficulty, sortBy])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((item) => item.category)))
    return cats.sort()
  }, [items])

  const getTypeIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "prompt":
        return <Code2 className="h-4 w-4" />
      case "profile":
        return <Users className="h-4 w-4" />
      case "pattern":
        return <BookOpen className="h-4 w-4" />
      case "template":
        return <Zap className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: ContentItem["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Content Library</h2>
            <p className="text-muted-foreground">Browse prompts, profiles, patterns, and templates</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="prompt">Prompts</SelectItem>
                <SelectItem value="profile">Profiles</SelectItem>
                <SelectItem value="pattern">Patterns</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? "item" : "items"} found
        </p>
      </div>

      {/* Content Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredAndSortedItems.map((item) => (
          <Card
            key={item.id}
            className={`transition-all duration-200 hover:shadow-md ${viewMode === "list" ? "flex flex-row" : ""}`}
          >
            <CardHeader className={viewMode === "list" ? "flex-1" : ""}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(item.type)}
                  <Badge variant="outline" className="text-xs capitalize">
                    {item.type}
                  </Badge>
                  <Badge className={`text-xs capitalize ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </Badge>
                  {item.featured && (
                    <Badge variant="default" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>

              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className={`space-y-3 ${viewMode === "list" ? "flex flex-col justify-between w-48" : ""}`}>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {formatDate(item.updatedAt)}</span>
                </div>
                {item.author && <span>by {item.author}</span>}
              </div>

              <div className="flex gap-2">
                {item.code && (
                  <Button size="sm" variant="outline" onClick={() => handleCopy(item.code!)} className="flex-1">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                )}
                <Button size="sm" className="flex-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No content found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedType("all")
              setSelectedCategory("all")
              setSelectedDifficulty("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
