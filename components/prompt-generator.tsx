"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Wand2,
  Copy,
  RotateCcw,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Target,
  X,
  Plus,
  Sparkles,
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  ArrowRight,
  Lightbulb,
  Download,
  Share,
  UserCog,
  FileCode,
  Palette,
  Zap,
  Building2,
  TrendingUp,
  AlertTriangle,
  Package,
  MessageSquare,
  Folder,
  Code,
  Layers,
  Wrench,
  Shield,
  Square,
  Briefcase,
  Paintbrush,
  Smartphone,
  MousePointer,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { usePromptGenerator } from "@/lib/hooks/use-prompt-generator"
import type { PromptField, PromptTemplate } from "@/lib/types/prompt-generator"

interface PromptGeneratorProps {
  hook?: ReturnType<typeof usePromptGenerator>
  onTemplateSelect?: (template: PromptTemplate) => void
}

export function PromptGenerator({ hook, onTemplateSelect }: PromptGeneratorProps) {
  const [activeTab, setActiveTab] = useState("generator")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const promptRef = useRef<HTMLDivElement>(null)

  // Use passed hook or create a new one (fallback for standalone usage)
  const {
    templates,
    selectedTemplate,
    fieldValues,
    generatedPrompt,
    errors,
    selectTemplate,
    updateFieldValue,
    loadExample,
    validateAndGenerate,
    savePrompt,
    resetForm,
  } = hook || {}

  const categories = ["all", ...new Set(templates?.map((t: PromptTemplate) => t.category) || [])]
  const difficulties = ["all", ...new Set(templates?.map((t: PromptTemplate) => t.difficulty) || [])]

  const filteredTemplates =
    templates?.filter((template: PromptTemplate) => {
      const categoryMatch = selectedCategory === "all" || template.category === selectedCategory
      const difficultyMatch = selectedDifficulty === "all" || template.difficulty === selectedDifficulty
      return categoryMatch && difficultyMatch
    }) || []

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
        return <Users className="h-4 w-4" />
    }
  }

  const getFieldIcon = (iconName?: string) => {
    switch (iconName) {
      case "Target":
        return <Target className="h-4 w-4" />
      case "Zap":
        return <Zap className="h-4 w-4" />
      case "Building2":
        return <Building2 className="h-4 w-4" />
      case "TrendingUp":
        return <TrendingUp className="h-4 w-4" />
      case "FileText":
        return <FileText className="h-4 w-4" />
      case "AlertTriangle":
        return <AlertTriangle className="h-4 w-4" />
      case "Package":
        return <Package className="h-4 w-4" />
      case "MessageSquare":
        return <MessageSquare className="h-4 w-4" />
      case "Folder":
        return <Folder className="h-4 w-4" />
      case "Code":
        return <Code className="h-4 w-4" />
      case "Layers":
        return <Layers className="h-4 w-4" />
      case "Wrench":
        return <Wrench className="h-4 w-4" />
      case "Star":
        return <Star className="h-4 w-4" />
      case "Shield":
        return <Shield className="h-4 w-4" />
      case "Square":
        return <Square className="h-4 w-4" />
      case "Briefcase":
        return <Briefcase className="h-4 w-4" />
      case "Settings":
        return <Settings className="h-4 w-4" />
      case "Paintbrush":
        return <Paintbrush className="h-4 w-4" />
      case "Smartphone":
        return <Smartphone className="h-4 w-4" />
      case "Eye":
        return <Eye className="h-4 w-4" />
      case "MousePointer":
        return <MousePointer className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  // Auto-scroll to generated prompt when it appears
  useEffect(() => {
    if (generatedPrompt && promptRef.current) {
      promptRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [generatedPrompt])

  // If no hook is provided, show error
  if (!hook) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Prompt generator hook not provided</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleCopy = async (text: string, fieldId?: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldId || "prompt")
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleShare = async () => {
    if (!generatedPrompt) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${selectedTemplate?.name} - Generated Prompt`,
          text: generatedPrompt,
        })
      } else {
        await handleCopy(generatedPrompt)
      }
    } catch (error) {
      console.error("Failed to share:", error)
    }
  }

  const handleExport = () => {
    if (!generatedPrompt || !selectedTemplate) return

    const exportData = {
      template: selectedTemplate.name,
      category: selectedTemplate.category,
      prompt: generatedPrompt,
      fieldValues,
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prompt-${selectedTemplate.id}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleTagInput = (fieldId: string, value: string) => {
    setTagInputs((prev) => ({ ...prev, [fieldId]: value }))
  }

  const addTag = (fieldId: string, tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag) {
      const safeFieldValues = fieldValues ?? {};
      const currentTags = (safeFieldValues[fieldId] as string[]) || []
      if (!currentTags.includes(trimmedTag)) {
        if (typeof updateFieldValue === "function") {
          updateFieldValue(fieldId, [...currentTags, trimmedTag])
        }
      }
      setTagInputs((prev) => ({ ...prev, [fieldId]: "" }))
    }
  }

  const removeTag = (fieldId: string, tagToRemove: string) => {
    const safeFieldValues = fieldValues ?? {};
    const currentTags = (safeFieldValues[fieldId] as string[]) || []
    if (typeof updateFieldValue === "function") {
      updateFieldValue(
        fieldId,
        currentTags.filter((tag) => tag !== tagToRemove),
      )
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    // Add a small delay for better UX
    setTimeout(() => {
      if (typeof validateAndGenerate === "function") {
        validateAndGenerate()
      }
      setGenerationProgress(100)
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationProgress(0)
      }, 200)
    }, 1200)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    if (!selectedTemplate) return 0
    const requiredFields = selectedTemplate.fields.filter((field) => field.required)
    const completedFields = requiredFields.filter((field) => {
      const value = (fieldValues ?? {})[field.id]
      return value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== "")
    })
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  // Group fields by category for better organization
  const groupedFields =
    selectedTemplate?.fields.reduce(
      (acc, field) => {
        const category = field.category || "General"
        if (!acc[category]) acc[category] = []
        acc[category].push(field)
        return acc
      },
      {} as Record<string, PromptField[]>,
    ) || {}

  const renderField = (field: PromptField) => {
    const safeFieldValues = fieldValues ?? {};
    const value = safeFieldValues[field.id] || (field.type === "tags" || field.type === "multiselect" ? [] : "")
    const hasError = !!errors?.[field.id]

    const fieldWrapper = (children: React.ReactNode) => (
      <div key={field.id} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium">
            {field.icon && getFieldIcon(field.icon)}
            {field.label}
            {field.required && <span className="text-red-500 text-xs">*</span>}
          </Label>
          {field.description && <p className="text-xs text-muted-foreground leading-relaxed">{field.description}</p>}
        </div>
        {children}
        {hasError && (
          <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 p-2 rounded-md">
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            <span>{errors[field.id]}</span>
          </div>
        )}
      </div>
    )

    switch (field.type) {
      case "text":
        return fieldWrapper(
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => {
              if (typeof updateFieldValue === "function") {
                updateFieldValue(field.id, e.target.value)
              }
            }}
            className={cn(
              "transition-colors ",
              hasError && "border-red-500 focus-visible:ring-red-500",
            )}
          />,
        )

      case "textarea":
        return fieldWrapper(
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => {
              if (typeof updateFieldValue === "function") {
                updateFieldValue(field.id, e.target.value)
              }
            }}
            className={cn(
              "min-h-[100px] resize-y transition-colors ",
              hasError && "border-red-500 focus-visible:ring-red-500",
            )}
            rows={4}
          />,
        )

      case "select":
        return fieldWrapper(
          <Select value={value as string} onValueChange={(val) => {
            if (typeof updateFieldValue === "function") {
              updateFieldValue(field.id, val)
            }
          }}>
            <SelectTrigger className={cn("", hasError && "border-red-500")}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>,
        )

      case "multiselect":
        const selectedValues = (value as string[]) || []
        return fieldWrapper(
          <div className="space-y-3">
            {selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedValues.map((val) => (
                  <Badge key={val} variant="secondary" className="flex items-center gap-1.5 text-xs">
                    {val}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                      onClick={() => {
                        const newValues = selectedValues.filter((v) => v !== val)
                        if (typeof updateFieldValue === "function") {
                          updateFieldValue(field.id, newValues)
                        }
                      }}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <Select
              value=""
              onValueChange={(val) => {
                if (!selectedValues.includes(val)) {
                  if (typeof updateFieldValue === "function") {
                    updateFieldValue(field.id, [...selectedValues, val])
                  }
                }
              }}
            >
              <SelectTrigger className={cn("", hasError && "border-red-500")}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options
                  ?.filter((option) => !selectedValues.includes(option))
                  .map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>,
        )

      case "tags":
        const tags = (value as string[]) || []
        const inputValue = tagInputs[field.id] || ""

        return fieldWrapper(
          <div className="space-y-3">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1.5 text-xs">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                      onClick={() => removeTag(field.id, tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder={field.placeholder}
                value={inputValue}
                onChange={(e) => handleTagInput(field.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault()
                    addTag(field.id, inputValue)
                  }
                }}
                className={cn(
                  "flex-1 ",
                  hasError && "border-red-500 focus-visible:ring-red-500",
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addTag(field.id, inputValue)}
                disabled={!inputValue.trim()}
                className="px-3 shadow-soft"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {field.suggestions && field.suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Suggestions:</p>
                <div className="flex flex-wrap gap-1">
                  {field.suggestions
                    .filter((suggestion) => !tags.includes(suggestion))
                    .slice(0, 8)
                    .map((suggestion) => (
                      <Button
                        key={suggestion}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs px-2 hover:bg-primary/10"
                        onClick={() => addTag(field.id, suggestion)}
                      >
                        + {suggestion}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>,
        )

      default:
        return null
    }
  }

  // If no template is selected, show template selection
  if (!selectedTemplate) {
    return (
      <div className="space-y-6">
        {/* Filters */}
        <Card >
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger >
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

              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="">
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
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template: PromptTemplate) => (
            <Card
              key={template.id}
              className="group card-hover transition-all duration-200 cursor-pointer "
              onClick={() => {
                if (onTemplateSelect) {
                  onTemplateSelect(template)
                } else if (typeof selectTemplate === "function") {
                  selectTemplate(template)
                }
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-soft">
                      {getTemplateIcon(template.icon)}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {template.name}
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardDescription className="text-sm leading-relaxed">{template.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                  <Badge className={`text-xs border ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Examples count */}
                <div className="text-xs text-muted-foreground">
                  {template.examples.length} example{template.examples.length !== 1 ? "s" : ""} included
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">No templates found matching your filters.</div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all")
                setSelectedDifficulty("all")
              }}
              className="mt-4 shadow-soft"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Show generator interface when template is selected
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Generator</span>
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedPrompt} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </TabsTrigger>
        </TabsList>

        {/* Generator Tab */}
        <TabsContent value="generator" className="space-y-6 mt-6">
          {/* Template Description Card */}
          <Card >
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    {selectedTemplate.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{selectedTemplate.description}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.examples.length > 0 && typeof loadExample === "function" && (
                    <Select onValueChange={(value) => loadExample(Number.parseInt(value))}>
                      <SelectTrigger className="w-[160px] h-9">
                        <SelectValue placeholder="Load Example" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTemplate.examples.map((example, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {example.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Button variant="outline" size="sm" onClick={resetForm} className="h-9 shadow-soft bg-transparent">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Progress Indicator */}
          <Card >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Completion Progress</span>
                  <span className="text-muted-foreground">{getCompletionPercentage()}%</span>
                </div>
                <Progress value={getCompletionPercentage()} className="h-2" />
                <div className="text-xs text-muted-foreground">Fill in the required fields to generate your prompt</div>
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                V0 Expert Configuration
              </CardTitle>
              <CardDescription>
                Configure V0's expertise, background, and response style for optimal assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.keys(groupedFields).length > 1 ? (
                  // Render grouped fields with collapsible sections
                  Object.entries(groupedFields).map(([category, fields]) => {
                    const sectionId = `section-${category.toLowerCase().replace(/\s+/g, "-")}`
                    const isExpanded = expandedSections[sectionId] !== false // Default to expanded

                    return (
                      <div key={category} className="space-y-4">
                        <Button
                          variant="ghost"
                          onClick={() => toggleSection(sectionId)}
                          className="w-full justify-between p-0 h-auto font-medium text-left hover:bg-transparent"
                        >
                          <span className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            {category}
                            <Badge variant="outline" className="text-xs">
                              {fields.length}
                            </Badge>
                          </span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        {isExpanded && (
                          <div className="grid gap-6 md:grid-cols-2 pl-6 border-l-2 border-muted">
                            {fields.map(renderField)}
                          </div>
                        )}
                      </div>
                    )
                  })
                ) : (
                  // Render fields directly if only one category
                  <div className="grid gap-6 md:grid-cols-2">{selectedTemplate.fields.map(renderField)}</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="flex justify-center">
            <div className="space-y-4">
              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={generationProgress} className="w-[200px]" />
                  <div className="text-xs text-center text-muted-foreground">Generating your prompt...</div>
                </div>
              )}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || getCompletionPercentage() < 100}
                size="lg"
                className="min-w-[200px] h-12 text-base shadow-medium hover:shadow-large transition-all duration-200"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Wand2 className="h-5 w-5 mr-3" />
                    Generate Prompt
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Generated Prompt */}
          {generatedPrompt && (
            <Card ref={promptRef} className=" ">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generated Prompt
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(generatedPrompt)}
                      className="shadow-soft"
                    >
                      {copiedField === "prompt" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} className="shadow-soft bg-transparent">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport} className="shadow-soft bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" onClick={savePrompt} className="shadow-soft">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg ">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{generatedPrompt}</pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Validation Errors */}
          {Object.keys(errors as any).length > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                Please fix the validation errors above to generate your prompt.
              </AlertDescription>
            </Alert>
          )}

          {/* Tips Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 ">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">V0 Configuration Tips</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Be specific about V0's technical expertise for better code quality</li>
                    <li>• Define clear project context so V0 understands your needs</li>
                    <li>• Set appropriate experience level to match response complexity</li>
                    <li>• Use constraints to guide V0's recommendations and solutions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6 mt-6">
          {generatedPrompt && (
            <Card >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Prompt Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleCopy(generatedPrompt)} className="shadow-soft">
                      {copiedField === "prompt" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Prompt
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="shadow-soft bg-transparent">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" onClick={handleExport} className="shadow-soft bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button onClick={savePrompt} className="shadow-soft">
                      <Save className="h-4 w-4 mr-2" />
                      Save to History
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className=" p-6 rounded-lg ">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedPrompt}</pre>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Template: {selectedTemplate?.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Category: {selectedTemplate?.category}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
