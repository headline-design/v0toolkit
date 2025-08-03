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
  Filter,
  X,
  Clock,
  Lightbulb,
  ChevronRight,
  Copy,
  Plus,
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

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch (error) {
      console.error("Failed to copy prompt:", error)
    }
  }

  // Show onboarding if no recent prompts
  if (recentPrompts.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Wand2 className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">V0 Prompt Generator</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Create sophisticated AI prompts using professional templates designed for V0 and modern development
                workflows. Configure V0's expertise, personality, and response style with expert-crafted templates.
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">How It Works</h2>
              <p className="text-muted-foreground">Generate professional V0 prompts in three simple steps</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center p-6 border-2">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Choose Template</h3>
                <p className="text-sm text-muted-foreground">
                  Select from expert-crafted templates designed for different V0 use cases and expertise levels
                </p>
              </Card>
              <Card className="text-center p-6 border-2">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Wand2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Configure Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Fill in the template fields to customize V0's expertise, personality, and response style
                </p>
              </Card>
              <Card className="text-center p-6 border-2">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Copy className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Copy & Use</h3>
                <p className="text-sm text-muted-foreground">
                  Generate your prompt and copy it to V0 for immediate use in your development workflow
                </p>
              </Card>
            </div>
          </div>

          {/* Featured Template */}
          {templates.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Get Started</h2>
                <p className="text-muted-foreground">Try our most popular template or browse all options</p>
              </div>

              <Card className="relative overflow-hidden border-2">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
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
                      className="shrink-0 h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Try This Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Template Grid */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-center">Popular Templates</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {templates.slice(1, 4).map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              {getTemplateIcon(template.icon)}
                            </div>
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{template.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Browse All Button */}
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("all-templates")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="h-12 px-8"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All {templates.length} Templates
                </Button>
              </div>
            </div>
          )}

          {/* Tips Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Pro Tips</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Be specific about your project context for better results</li>
                      <li>• Use examples to guide V0's understanding of your needs</li>
                      <li>• Save generated prompts to build V0 Profiles later</li>
                      <li>• Experiment with different templates for various use cases</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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
            <Card className="relative overflow-hidden border-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
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
                    className="shrink-0 h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
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
          <TabsContent value="templates" className="space-y-8" id="all-templates">
            {/* Search and Filters */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search templates by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-base transition-colors border-2 focus:border-primary"
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
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
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
                    <div className="grid gap-4 md:grid-cols-3 p-4 bg-muted/30 rounded-lg border">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="h-10">
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
                          <SelectTrigger className="h-10">
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
                          <SelectTrigger className="h-10">
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
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50 bg-background/60 backdrop-blur-sm"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
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
              <Card className="border-2 border-dashed bg-background/40 backdrop-blur-sm">
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
                      className="h-10"
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPrompts.slice(0, 12).map((prompt) => (
                <Card
                  key={prompt.id}
                  className="transition-all duration-300 border-2 hover:shadow-lg bg-background/60 backdrop-blur-sm"
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

                    <div className="bg-muted/30 p-4 rounded-lg border-0">
                      <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap line-clamp-6">
                        {prompt.prompt}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyPrompt(prompt.prompt)
                        }}
                        className="h-8"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/profiles/create?prompt=${prompt.id}`)}
                        className="h-8"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Create Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
