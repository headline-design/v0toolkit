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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Wand2, Copy, RotateCcw, Save, Eye, CheckCircle, AlertCircle, Target, X, Plus, Sparkles, FileText, Settings, ChevronDown, ChevronUp, Star, Users, ArrowRight, Lightbulb, Download, Share, UserCog, FileCode, Palette, Zap, Building2, TrendingUp, AlertTriangle, Package, MessageSquare, Folder, Code, Layers, Wrench, Shield, Square, Briefcase, Paintbrush, Smartphone, MousePointer, Clock, BookOpen, HelpCircle, FolderOpen, Play, Rocket } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { usePromptGenerator } from "@/lib/hooks/use-prompt-generator"
import type { PromptField } from "@/lib/types/prompt-generator"
import { getProjectTypeSuggestions, getAllProjectTypes } from "@/lib/data/project-suggestions"
import { PromptTemplate } from "@/lib/core/types"
import { ProgressChip } from "./ui/circular-progress"


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
  const [showPreview, setShowPreview] = useState(false)
  const promptRef = useRef<HTMLDivElement>(null)
  const [fieldCompletion, setFieldCompletion] = useState<Record<string, boolean>>({})
  const [requiredFieldsCompleted, setRequiredFieldsCompleted] = useState<Record<string, boolean>>({})
  const [selectedProjectType, setSelectedProjectType] = useState<string>("")
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set())

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
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400"
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400"
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/20 dark:text-gray-400"
    }
  }

  const getTemplateIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCog":
        return <UserCog className="h-3 w-3" />
      case "FileCode":
        return <FileCode className="h-3 w-3" />
      case "Palette":
        return <Palette className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  const getFieldIcon = (iconName?: string) => {
    switch (iconName) {
      case "Target":
        return <Target className="h-3 w-3" />
      case "Zap":
        return <Zap className="h-3 w-3" />
      case "Building2":
        return <Building2 className="h-3 w-3" />
      case "TrendingUp":
        return <TrendingUp className="h-3 w-3" />
      case "FileText":
        return <FileText className="h-3 w-3" />
      case "AlertTriangle":
        return <AlertTriangle className="h-3 w-3" />
      case "Package":
        return <Package className="h-3 w-3" />
      case "MessageSquare":
        return <MessageSquare className="h-3 w-3" />
      case "Folder":
        return <Folder className="h-3 w-3" />
      case "FolderOpen":
        return <FolderOpen className="h-3 w-3" />
      case "Code":
        return <Code className="h-3 w-3" />
      case "Layers":
        return <Layers className="h-3 w-3" />
      case "Wrench":
        return <Wrench className="h-3 w-3" />
      case "Star":
        return <Star className="h-3 w-3" />
      case "Shield":
        return <Shield className="h-3 w-3" />
      case "Square":
        return <Square className="h-3 w-3" />
      case "Briefcase":
        return <Briefcase className="h-3 w-3" />
      case "Settings":
        return <Settings className="h-3 w-3" />
      case "Paintbrush":
        return <Paintbrush className="h-3 w-3" />
      case "Smartphone":
        return <Smartphone className="h-3 w-3" />
      case "Eye":
        return <Eye className="h-3 w-3" />
      case "MousePointer":
        return <MousePointer className="h-3 w-3" />
      case "Play":
        return <Play className="h-3 w-3" />
      case "Rocket":
        return <Rocket className="h-3 w-3" />
      case "Lightbulb":
        return <Lightbulb className="h-3 w-3" />
      default:
        return <Settings className="h-3 w-3" />
    }
  }

  // Auto-scroll to generated prompt when it appears
  useEffect(() => {
    if (generatedPrompt && promptRef.current) {
      promptRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      setShowPreview(true)
    }
  }, [generatedPrompt])

  // If no hook is provided, show error
  if (!hook) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm">Prompt generator hook not provided</p>
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
      const safeFieldValues = fieldValues ?? {}
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
    const safeFieldValues = fieldValues ?? {}
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
    const completedRequiredFields = requiredFields.filter((field) => requiredFieldsCompleted[field.id] === true)
    return Math.round((completedRequiredFields.length / requiredFields.length) * 100)
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

  const FieldOverlay = ({ fieldIndex, fieldId, isActive }: {
    fieldIndex: number
    fieldId: string
    isActive: boolean
  }) => {
    if (currentFieldIndex >= fieldIndex || completedFields.has(fieldId)) {
      return null
    }

    const field = selectedTemplate?.fields[fieldIndex]
    if (!field) return null

    return (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
        <div className="text-center space-y-3 p-4 max-w-xs">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto">
            <span className="text-sm font-semibold text-muted-foreground">{fieldIndex + 1}</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm">Complete Previous Fields</h3>
            <p className="text-xs text-muted-foreground">
              Fill out the fields above to unlock this field
            </p>
          </div>
          {isActive && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Complete field {currentFieldIndex + 1} to continue
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderField = (field: PromptField, fieldIndex: number) => {
    const safeFieldValues = fieldValues ?? {}
    const value = safeFieldValues[field.id] || (field.type === "tags" || field.type === "multiselect" ? [] : "")
    const hasError = !!errors?.[field.id]

    const fieldWrapper = (children: React.ReactNode, fieldIndex: number) => {
      const isComplete = fieldCompletion[field.id] !== false && (fieldCompletion[field.id] || completedFields.has(field.id))
      const isRequired = field.required
      const isCurrentField = currentFieldIndex === fieldIndex
      const isAccessible = currentFieldIndex >= fieldIndex || completedFields.has(field.id)

      return (
        <TooltipProvider key={field.id}>
          <div className={cn(
            "relative space-y-3 p-4 border rounded-lg bg-card transition-all duration-200",
            isCurrentField && "ring-2 ring-blue-200 border-blue-300",
            isComplete && ""
          )}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                    isComplete
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : isCurrentField
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-muted text-muted-foreground border border-muted"
                  )}>
                    {isComplete ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <span>{fieldIndex + 1}</span>
                    )}
                  </div>
                  {field.icon && getFieldIcon(field.icon)}
                  {field.label}
                  {field.required && <span className="text-red-500 text-xs">*</span>}
                </Label>
                {field.description && field.description.length > 80 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p className="text-sm">{field.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              {field.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">{field.description}</p>
              )}
            </div>
            <div className="space-y-2">
              {children}
              {hasError && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-md">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span>{errors[field.id]}</span>
                </div>
              )}
              {!hasError && isRequired && !isComplete && isCurrentField && (
                <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded-md">
                  <Target className="h-3 w-3 flex-shrink-0" />
                  <span>Complete this field to continue</span>
                </div>
              )}
            </div>

            <FieldOverlay
              fieldIndex={fieldIndex}
              fieldId={field.id}
              isActive={isCurrentField}
            />
          </div>
        </TooltipProvider>
      )
    }

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
            className={cn("transition-colors h-9", hasError && "border-red-500 focus-visible:ring-red-500")}
            disabled={currentFieldIndex < fieldIndex && !completedFields.has(field.id)}
          />,
          fieldIndex
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
              "min-h-[100px] resize-y transition-colors text-sm",
              hasError && "border-red-500 focus-visible:ring-red-500",
            )}
            rows={4}
            disabled={currentFieldIndex < fieldIndex && !completedFields.has(field.id)}
          />,
          fieldIndex
        )

      case "select":
        return fieldWrapper(
          <Select
            value={value as string}
            onValueChange={(val) => {
              if (typeof updateFieldValue === "function") {
                updateFieldValue(field.id, val)
              }
              if (field.id === "projectType") {
                setFieldSuggestionsUpdated(false)
                setSelectedProjectType(val)
              }
            }}
            disabled={currentFieldIndex < fieldIndex && !completedFields.has(field.id)}
          >
            <SelectTrigger className={cn("h-9", hasError && "border-red-500")}>
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
          fieldIndex
        )

      case "multiselect":
        const selectedValues = (value as string[]) || []
        return fieldWrapper(
          <div className="space-y-3">
            {selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedValues.map((val) => (
                  <Badge key={val} variant="secondary" className="flex items-center gap-1 text-xs h-6 px-2 [&>svg]:!pointer-events-auto">
                    {val}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors !pointer-events-auto"
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
              disabled={currentFieldIndex < fieldIndex && !completedFields.has(field.id)}
            >
              <SelectTrigger className={cn("h-9", hasError && "border-red-500")}>
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
          fieldIndex
        )

      case "tags":
        const tags = (value as string[]) || []
        const inputValue = tagInputs[field.id] || ""

        return fieldWrapper(
          <div className="space-y-3">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs h-6 px-2 [&>svg]:!pointer-events-auto">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors !pointer-events-auto"
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
                className={cn("flex-1 h-9", hasError && "border-red-500 focus-visible:ring-red-500")}
                disabled={currentFieldIndex < fieldIndex && !completedFields.has(field.id)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addTag(field.id, inputValue)}
                disabled={!inputValue.trim() || (currentFieldIndex < fieldIndex && !completedFields.has(field.id))}
                className="h-9 px-3"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {field.suggestions && field.suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {field.suggestions
                    .filter((suggestion) => !tags.includes(suggestion))
                    .slice(0, 12)
                    .map((suggestion) => (
                      <Button
                        key={suggestion}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs px-2 hover:bg-muted border border-dashed border-muted-foreground/30"
                        onClick={() => addTag(field.id, suggestion)}
                        disabled={currentFieldIndex < fieldIndex && !completedFields.has(field.id)}
                      >
                        + {suggestion}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>,
          fieldIndex
        )

      default:
        return null
    }
  }

  // If no template is selected, show template selection
  if (!selectedTemplate) {
    return (
      <TooltipProvider>
        <div className="space-y-4">
          {/* Header */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-4 w-4" />
                Choose a Template
              </CardTitle>
              <CardDescription className="text-sm">
                Select a template to start generating your V0 prompt. Each template is designed for specific use cases
                and expertise levels.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-8">
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

                <div className="space-y-1 flex-1">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="h-8">
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template: PromptTemplate) => (
              <Card
                key={template.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
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
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        {getTemplateIcon(template.icon)}
                      </div>
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-start gap-2">
                    <CardDescription className="text-xs leading-relaxed flex-1">
                      {template.description.length > 80
                        ? `${template.description.substring(0, 80)}...`
                        : template.description}
                    </CardDescription>
                    {template.description.length > 80 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help flex-shrink-0 mt-0.5" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p className="text-sm">{template.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs h-4 px-1">
                      {template.category}
                    </Badge>
                    <Badge className={`text-xs h-4 px-1 ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs h-4 px-1">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs h-4 px-1">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Examples count */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{template.examples.length} examples</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="h-3 w-3" />
                      <span>{template.fields.length} fields</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <div className="text-muted-foreground text-sm">No templates found matching your filters.</div>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedDifficulty("all")
                }}
                className="mt-3 h-8"
                size="sm"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </TooltipProvider>
    )
  }

  // Show generator interface when template is selected
  const updateFieldSuggestions = (projectTypeName: string) => {
    if (!selectedTemplate) return

    const projectType = getAllProjectTypes().find((p) => p.name === projectTypeName)
    if (!projectType) return

    const suggestions = getProjectTypeSuggestions(projectType.id)
    if (!suggestions) return

    // Update template fields with project-specific suggestions
    selectedTemplate.fields.forEach((field) => {
      switch (field.id) {
        case "workHistory":
          field.suggestions = suggestions.workHistory
          break
        case "primaryCompany":
          field.options = suggestions.primaryCompanies
          break
        case "additionalCompanies":
          field.options = suggestions.additionalCompanies
          break
        case "features":
          field.suggestions = suggestions.features
          break
        case "deliverables":
          field.suggestions = suggestions.deliverables
          break
      }
    })
  }

  const [fieldSuggestionsUpdated, setFieldSuggestionsUpdated] = useState(false)

  useEffect(() => {
    if (selectedProjectType && !fieldSuggestionsUpdated) {
      updateFieldSuggestions(selectedProjectType)
      setFieldSuggestionsUpdated(true)
    }
  }, [selectedProjectType, fieldSuggestionsUpdated])

  useEffect(() => {
    if (!selectedTemplate || !fieldValues) return

    const completion: Record<string, boolean> = {}
    const newCompletedFields = new Set<string>()

    selectedTemplate.fields.forEach((field, index) => {
      const value = fieldValues[field.id]
      const isComplete = field.required
        ? value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== "")
        : value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== "")

      completion[field.id] = isComplete

      if (isComplete) {
        newCompletedFields.add(field.id)
      }

      if (field.required) {
        setRequiredFieldsCompleted((prev) => ({
          ...prev,
          [field.id]: isComplete,
        }))
      }
    })

    setFieldCompletion(completion)
    setCompletedFields(newCompletedFields)

    // Auto-advance to next incomplete field
    const nextIncompleteIndex = selectedTemplate.fields.findIndex((field, index) =>
      index >= currentFieldIndex && !newCompletedFields.has(field.id)
    )

    if (nextIncompleteIndex !== -1 && nextIncompleteIndex !== currentFieldIndex) {
      setCurrentFieldIndex(nextIncompleteIndex)
    }

  }, [selectedTemplate, fieldValues, currentFieldIndex])

  // Reset current field index when template changes
  useEffect(() => {
    if (selectedTemplate) {
      setCurrentFieldIndex(0)
      setCompletedFields(new Set())
    }
  }, [selectedTemplate])

  const [mobileProgressExpanded, setMobileProgressExpanded] = useState(false)

  return (
    <>

      <div className="flex-1 min-w-0 overflow-auto max-w-5xl mx-auto">
        <div className="py-4 space-y-4">
          {/* Quick Tips */}

          <div className="px-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Lightbulb className="h-3 w-3 text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                <strong>Quick Tips:</strong> Fill in all required fields to generate your prompt. Use the examples
                dropdown to load pre-configured settings, and check the assistant panel for help and guidance.
              </AlertDescription>
            </Alert>
          </div>

          <TooltipProvider>
            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4">
                  <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 h-9">
                    <TabsTrigger value="generator" className="flex items-center gap-2 text-sm">
                      <Settings className="h-3 w-3" />
                      <span className="hidden sm:inline">Configure</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview" disabled={!generatedPrompt} className="flex items-center gap-2 text-sm">
                      <Eye className="h-3 w-3" />
                      <span className="hidden sm:inline">Preview</span>
                      {generatedPrompt && (
                        <Badge variant="secondary" className="ml-1 h-3 w-3 rounded-full p-0 text-xs">
                          1
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Generator Tab */}
                <TabsContent value="generator" className="space-y-4 mt-4 sm:px-4">
                  {/* Template Header */}
                  <Card className="border-0 sm:border-1 rounded-none sm:rounded-lg">
                    <CardHeader className="pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="h-4 w-4" />
                            Templates
                          </CardTitle>
                          <div className="flex items-start gap-2">
                            <CardDescription className="text-sm leading-relaxed flex-1">
                              Get started quickly with our pre-built templates.
                            </CardDescription>
                            {selectedTemplate.description.length > 100 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help flex-shrink-0 mt-0.5" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-md">
                                  <p className="text-sm">{selectedTemplate.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.examples.length > 0 && typeof loadExample === "function" && (
                            <Select onValueChange={(value) => {
                              loadExample(Number.parseInt(value))
                              setSelectedProjectType(selectedTemplate.examples[Number.parseInt(value)].projectType || "")
                              console.log("Selected project type:", selectedTemplate.examples[Number.parseInt(value)].projectType || "", value)
                              updateFieldSuggestions(selectedTemplate.examples[Number.parseInt(value)].projectType || "")
                              setFieldSuggestionsUpdated(true)
                            }}>
                              <SelectTrigger className="w-[140px] h-9">
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
                          <Button variant="outline" size="sm" onClick={resetForm} className="h-9 bg-transparent">
                            <RotateCcw className="h-3 w-3 mr-2" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Form Fields - Clean Single Column Layout */}
                  <Card className="border-0 sm:border-1 rounded-none sm:rounded-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-4 w-4" />
                        Template Configuration
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Configure the template fields to customize your V0 prompt. Required fields are marked with an asterisk
                        and completion indicator.
                      </CardDescription>
                    </CardHeader>



                    <CardContent className="flex flex-row gap-8  ">




                      <div className="space-y-6 w-full">
                        {Object.keys(groupedFields).length > 1 ? (
                          // Render grouped fields with clean, minimal section separation
                          Object.entries(groupedFields).map(([category, fields], sectionIndex) => {
                            const sectionId = `section-${category.toLowerCase().replace(/\s+/g, "-")}`
                            const isExpanded = expandedSections[sectionId] !== false // Default to expanded
                            const typedFields = fields as PromptField[];
                            const completedFieldsInSection = typedFields.filter(field => completedFields.has(field.id)).length
                            const totalFieldsInSection = typedFields.length

                            return (
                              <div key={category} className="space-y-4 md:px-0 flex-col md:flex-row flex md:border-b md:py-8">
                                {/* Clean Section Header - No background, just typography */}
                                {sectionIndex > 0 && <div className="border-t border-border/50" />}

                                <div
                                  className="flex items-start justify-between cursor-pointer group py-2 min-w-[200px]"
                                  onClick={() => toggleSection(sectionId)}
                                >
                                  <div className="space-y-1">
                                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {category}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <span>{completedFieldsInSection} of {totalFieldsInSection} completed</span>
                                      <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(totalFieldsInSection, 8) }).map((_, index) => (
                                          <div
                                            key={index}
                                            className={cn(
                                              "w-1 h-1 rounded-full transition-colors",
                                              index < completedFieldsInSection ? "bg-green-500" : "bg-muted-foreground/30"
                                            )}
                                          />
                                        ))}
                                        {totalFieldsInSection > 8 && (
                                          <span className="text-xs text-muted-foreground ml-1">
                                            +{totalFieldsInSection - 8}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                {/* Section Fields - Clean spacing */}

                                <div className="space-y-4 w-full">
                                  {typedFields.map((field, index) => {
                                    const globalIndex = selectedTemplate?.fields.findIndex(f => f.id === field.id) ?? index
                                    return renderField(field, globalIndex)
                                  })}
                                </div>

                              </div>
                            )
                          })
                        ) : (
                          // Render fields directly if only one category - Single Column
                          <div className="space-y-4">
                            {selectedTemplate.fields.map((field, index) => renderField(field, index))}
                          </div>
                        )}
                        <div >
                          <div className="space-y-6">
                            {/* Generate Button */}

                            <div className="justify-end flex gap-3 ">
                              <Button variant="outline" size="sm" onClick={resetForm} className="h-8">
                                <RotateCcw className="h-3 w-3 mr-2" />
                                Reset Form
                              </Button>
                              <div className="space-y-3">

                                {isGenerating && (
                                  <div className="space-y-1">
                                    <Progress value={generationProgress} className="w-[160px]" />
                                    <div className="text-xs text-center text-muted-foreground">Generating your prompt...</div>
                                  </div>
                                )}
                                <Button
                                  onClick={handleGenerate}
                                  disabled={isGenerating || getCompletionPercentage() < 100}
                                  size="sm"
                                  className="min-w-[160px] h-8"
                                >
                                  {isGenerating ? (
                                    <div className="flex items-center">
                                      <div className="w-3 h-3 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                      Generating...
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      <Wand2 className="h-3 w-3 mr-2" />
                                      Generate Prompt
                                    </div>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </CardContent>
                  </Card>

                  {/* Generated Prompt */}
                  {generatedPrompt && (
                    <div className="p-4">
                      <Card ref={promptRef} className="border-2 border-foreground/20">
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Generated Prompt
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopy(generatedPrompt)}
                                className="bg-background h-7 text-xs"
                              >
                                {copiedField === "prompt" ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleShare} className="bg-background h-7 text-xs">
                                <Share className="h-3 w-3 mr-1" />
                                Share
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleExport} className="bg-background h-7 text-xs">
                                <Download className="h-3 w-3 mr-1" />
                                Export
                              </Button>
                              <Button size="sm" onClick={savePrompt} className="h-7 text-xs">
                                <Save className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[300px] w-full">
                            <div className="bg-muted/30 p-4 rounded-lg border">
                              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono break-words">{generatedPrompt}</pre>
                            </div>
                          </ScrollArea>
                          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Generated {new Date().toLocaleTimeString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>~{Math.ceil(generatedPrompt.length / 4)} tokens</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{generatedPrompt.length} characters</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveTab("preview")}
                              className="h-5 text-xs px-2"
                            >
                              View in Preview Tab
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Validation Errors */}
                  {Object.keys(errors || {}).length > 0 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <AlertDescription className="text-red-700 text-sm">
                        Please fix the validation errors above to generate your prompt.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="space-y-4 mt-4 mx-4">
                  {generatedPrompt && (
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Eye className="h-4 w-4" />
                            Prompt Preview
                          </CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant="outline"
                              onClick={() => handleCopy(generatedPrompt)}
                              size="sm"
                              className="h-7 text-xs"
                            >
                              {copiedField === "prompt" ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy Prompt
                                </>
                              )}
                            </Button>
                            <Button variant="outline" onClick={handleShare} size="sm" className="h-7 text-xs bg-transparent">
                              <Share className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <Button variant="outline" onClick={handleExport} size="sm" className="h-7 text-xs bg-transparent">
                              <Download className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                            <Button onClick={savePrompt} size="sm" className="h-7 text-xs">
                              <Save className="h-3 w-3 mr-1" />
                              Save to History
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-4 rounded-lg border-2 bg-background max-h-[500px] overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed break-words">{generatedPrompt}</pre>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              Template: {selectedTemplate?.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              Category: {selectedTemplate?.category}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Generated: {new Date().toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{generatedPrompt.length} characters</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TooltipProvider>
        </div>
      </div>
      {getCompletionPercentage() > 0 && (
        <>
          <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 shrink-0 items-center z-10">
            <div>
              <ProgressChip
                progress={[getCompletionPercentage()]}
                step={Object.values(requiredFieldsCompleted).filter(Boolean).length}
                steps={selectedTemplate?.fields.filter((f) => f.required).length}
              />
            </div>

          </div>
        </>
      )
      }
    </>
  )
}
