"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Star,
  Users,
  ArrowRight,
  Target,
  Wand2,
  BookOpen,
  History,
  UserCog,
  FileCode,
  Palette,
  TrendingUp,
  Zap,
  Filter,
  X,
  Clock,
} from "lucide-react"
import { promptGeneratorService } from "@/lib/services/prompt-generator-service"
import { useGeneratedPrompts } from "@/lib/hooks/use-prompt-generator"
import type { PromptTemplate } from "@/lib/types/prompt-generator"

export default function PromptGeneratorPage() {
  const router = useRouter()
  const { prompts: recentPrompts } = useGeneratedPrompts()
  const [templates, setTemplates] = useState<PromptTemplate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)

  // Load templates on mount
  useEffect(() => {
    const loadedTemplates = promptGeneratorService.getTemplates()
    setTemplates(loadedTemplates)
  }, [])

  // Filter and sort templates
  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || template.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "category":
          return a.category.localeCompare(b.category)
        case "difficulty":
          const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return 0
      }
    })

  const categories = ["all", ...new Set(templates.map((t) => t.category))]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const handleTemplateSelect = (template: PromptTemplate) => {
    router.push(`/prompt-generator/editor?template=${template.id}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400"
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/20 dark:text-gray-400"
    }
  }

  const getTemplateIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCog":
        return <UserCog className="h-4 w-4" />
      case "FileCode":
        return <FileCode className="h-4 w-4" />
      case "Palette":
        return <Palette className="h-4 w-4" />
      default:
        return <Wand2 className="h-4 w-4" />
    }
  }

  const activeFiltersCount = [selectedCategory !== "all", selectedDifficulty !== "all", searchQuery].filter(
    Boolean,
  ).length

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">

                <div>
                  <h1 className="text-3xl font-bold tracking-tight">V0 Prompt Generator</h1>
                  <p className="text-muted-foreground">Professional templates for sophisticated AI prompts</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Create sophisticated AI prompts using professional templates designed for V0 and modern development
                workflows. Configure V0's expertise, personality, and response style with expert-crafted templates.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 lg:flex-col lg:items-end">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="font-medium">{templates.length} expert templates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <History className="h-4 w-4 text-primary" />
                <span className="font-medium">{recentPrompts.length} prompts generated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-medium">94% success rate</span>
              </div>
            </div>
          </div>

          {/* Featured Template Highlight */}
          {templates.length > 0 && (
            <Card className="relative overflow-hidden ">
              <div className="absolute inset-0 bg-grid-small opacity-20" />
              <CardContent className="relative p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="font-semibold">Featured Template</span>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        Most Popular
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold">{templates[0].name}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                      {templates[0].description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-primary/30">
                        {templates[0].category}
                      </Badge>
                      <Badge className={getDifficultyColor(templates[0].difficulty)}>{templates[0].difficulty}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{templates[0].examples.length} examples</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleTemplateSelect(templates[0])}
                    size="lg"
                    className="shrink-0 h-12 px-8 shadow-medium hover:shadow-large transition-all duration-200"
                  >
                    Try This Template
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="templates" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 h-12 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="templates" className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4" />
              Browse Templates
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2 text-base">
              <History className="h-4 w-4" />
              Recent Prompts ({recentPrompts.length})
            </TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-8">
            {/* Search and Filters */}
            <Card >
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search templates by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-base transition-colors"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Filter Toggle */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="gap-2 shadow-soft"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>

                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                          setSelectedDifficulty("all")
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Clear all filters
                      </Button>
                    )}
                  </div>

                  {/* Filters */}
                  {showFilters && (
                    <div className="grid gap-4 md:grid-cols-3 p-4 bg-muted/30 rounded-lg">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="h-10 ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="capitalize">
                                {category === "all" ? "All Categories" : category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Difficulty</label>
                        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                          <SelectTrigger className="h-10 ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {difficulties.map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty} className="capitalize">
                                {difficulty === "all" ? "All Levels" : difficulty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="h-10 ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                            <SelectItem value="difficulty">Difficulty</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Active Filters Display */}
                  {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                          Search: "{searchQuery}"
                          <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">
                            ×
                          </button>
                        </Badge>
                      )}
                      {selectedCategory !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                          {selectedCategory}
                          <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-destructive">
                            ×
                          </button>
                        </Badge>
                      )}
                      {selectedDifficulty !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                          {selectedDifficulty}
                          <button onClick={() => setSelectedDifficulty("all")} className="ml-1 hover:text-destructive">
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="group card-hover cursor-pointer  hover:shadow-medium bg-background/60 backdrop-blur-sm transition-all duration-300"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-soft">
                          {getTemplateIcon(template.icon)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1 mb-2">
                            {template.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs border-primary/30">
                              {template.category}
                            </Badge>
                            <Badge className={`text-xs border ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {template.description}
                    </CardDescription>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Examples indicator */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>
                          {template.examples.length} example{template.examples.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{template.fields.length} fields</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results State */}
            {filteredTemplates.length === 0 && (
              <Card className="border-0 border-dashed shadow-soft bg-background/40 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                      <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">No templates found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Try adjusting your search criteria or filters to find what you're looking for.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                        setSelectedDifficulty("all")
                      }}
                      className="h-10 shadow-soft"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recent Prompts Tab */}
          <TabsContent value="recent" className="space-y-8">
            {recentPrompts.length === 0 ? (
              <Card className="border-0 shadow-soft bg-background/40 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                      <History className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">No recent prompts</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Start by selecting a template and generating your first V0 prompt.
                      </p>
                    </div>
                    <Button onClick={() => handleTemplateSelect(templates[0])} className="h-12 px-8 shadow-medium">
                      <Wand2 className="h-4 w-4 mr-2" />
                      Create Your First Prompt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPrompts.slice(0, 12).map((prompt) => (
                  <Card
                    key={prompt.id}
                    className="card-hover transition-all duration-300 border-0 shadow-soft bg-background/60 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {prompt.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{prompt.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg border-0 shadow-soft">
                        <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap line-clamp-6">
                          {prompt.prompt}
                        </pre>
                      </div>

                      <div className="flex items-center justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(prompt.prompt)
                          }}
                          className="h-8 shadow-soft"
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
