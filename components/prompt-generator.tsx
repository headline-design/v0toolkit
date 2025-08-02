"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wand2,
  Copy,
  RotateCcw,
  Save,
  Eye,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Clock,
  X,
  Plus,
} from "lucide-react"
import type { usePromptGenerator } from "@/lib/hooks/use-prompt-generator"
import type { PromptField } from "@/lib/types/prompt-generator"

interface PromptGeneratorProps {
  hook?: ReturnType<typeof usePromptGenerator>
  onTemplateSelect?: (template: any) => void
}

export function PromptGenerator({ hook, onTemplateSelect }: PromptGeneratorProps) {
  const [activeTab, setActiveTab] = useState("generator")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})

  // Use passed hook or create a new one (fallback for standalone usage)
  const {
    templates,
    selectedTemplate,
    fieldValues,
    generatedPrompt,
    isGenerating,
    errors,
    selectTemplate,
    updateFieldValue,
    loadExample,
    validateAndGenerate,
    savePrompt,
    resetForm,
    estimateTokens,
  } = hook || {}

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

  const handleTagInput = (fieldId: string, value: string) => {
    setTagInputs((prev) => ({ ...prev, [fieldId]: value }))
  }

  const addTag = (fieldId: string, tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag) {
      const currentTags = (fieldValues[fieldId] as string[]) || []
      if (!currentTags.includes(trimmedTag)) {
        updateFieldValue(fieldId, [...currentTags, trimmedTag])
      }
      setTagInputs((prev) => ({ ...prev, [fieldId]: "" }))
    }
  }

  const removeTag = (fieldId: string, tagToRemove: string) => {
    const currentTags = (fieldValues[fieldId] as string[]) || []
    updateFieldValue(
      fieldId,
      currentTags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleTemplateClick = (template: any) => {
    if (onTemplateSelect) {
      onTemplateSelect(template)
    } else {
      selectTemplate(template)
    }
  }

  const renderField = (field: PromptField) => {
    const value = fieldValues[field.id] || (field.type === "tags" || field.type === "multiselect" ? [] : "")
    const hasError = !!errors[field.id]

    switch (field.type) {
      case "text":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              className={hasError ? "border-red-500" : ""}
            />
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
            {hasError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </p>
            )}
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              className={hasError ? "border-red-500" : ""}
              rows={3}
            />
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
            {hasError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </p>
            )}
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value as string} onValueChange={(val) => updateFieldValue(field.id, val)}>
              <SelectTrigger className={hasError ? "border-red-500" : ""}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
            {hasError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </p>
            )}
          </div>
        )

      case "multiselect":
        const selectedValues = (value as string[]) || []
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {selectedValues.map((val) => (
                  <Badge key={val} variant="secondary" className="flex items-center gap-1">
                    {val}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        const newValues = selectedValues.filter((v) => v !== val)
                        updateFieldValue(field.id, newValues)
                      }}
                    />
                  </Badge>
                ))}
              </div>
              <Select
                value=""
                onValueChange={(val) => {
                  if (!selectedValues.includes(val)) {
                    updateFieldValue(field.id, [...selectedValues, val])
                  }
                }}
              >
                <SelectTrigger className={hasError ? "border-red-500" : ""}>
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
            </div>
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
            {hasError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </p>
            )}
          </div>
        )

      case "tags":
        const tags = (value as string[]) || []
        const inputValue = tagInputs[field.id] || ""

        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(field.id, tag)} />
                  </Badge>
                ))}
              </div>
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
                  className={hasError ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(field.id, inputValue)}
                  disabled={!inputValue.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {field.suggestions && (
                <div className="flex flex-wrap gap-1">
                  {field.suggestions
                    .filter((suggestion) => !tags.includes(suggestion))
                    .slice(0, 6)
                    .map((suggestion) => (
                      <Button
                        key={suggestion}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => addTag(field.id, suggestion)}
                      >
                        + {suggestion}
                      </Button>
                    ))}
                </div>
              )}
            </div>
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
            {hasError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors[field.id]}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // If no template is selected, show template selection
  if (!selectedTemplate) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md border-2 hover:border-primary/20`}
            onClick={() => handleTemplateClick(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge
                      variant={
                        template.difficulty === "Beginner"
                          ? "default"
                          : template.difficulty === "Intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
                {template.successRate && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{template.successRate}%</div>
                    <div className="text-xs text-muted-foreground">success</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{template.description}</CardDescription>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {template.fields.length} fields
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />~{template.estimatedTokens} tokens
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  {template.examples.length} examples
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Show generator interface when template is selected
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedPrompt}>
            Preview
          </TabsTrigger>
        </TabsList>

        {/* Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          {selectedTemplate && (
            <>
              {/* Template Header */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedTemplate.name}
                        <Badge variant="outline">{selectedTemplate.category}</Badge>
                      </CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={resetForm}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                      {selectedTemplate.examples.length > 0 && (
                        <Select onValueChange={(value) => loadExample(Number.parseInt(value))}>
                          <SelectTrigger className="w-[140px]">
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
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Form Fields */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Prompt Configuration
                  </CardTitle>
                  <CardDescription>Fill in the fields below to generate your custom prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">{selectedTemplate.fields.map(renderField)}</div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <div className="flex justify-center">
                <Button onClick={validateAndGenerate} disabled={isGenerating} size="lg" className="min-w-[200px]">
                  {isGenerating ? (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Prompt
                    </div>
                  )}
                </Button>
              </div>

              {/* Live Preview */}
              {generatedPrompt && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Generated Prompt
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />~{estimateTokens(generatedPrompt)} tokens
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(generatedPrompt)}>
                          {copiedField === "prompt" ? (
                            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 mr-1" />
                          )}
                          {copiedField === "prompt" ? "Copied!" : "Copy"}
                        </Button>
                        <Button size="sm" onClick={savePrompt}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm font-mono">{generatedPrompt}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Validation Errors */}
              {Object.keys(errors).length > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Please fix the validation errors above to generate your prompt.</AlertDescription>
                </Alert>
              )}
            </>
          )}
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          {generatedPrompt && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Prompt</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleCopy(generatedPrompt)}>
                      {copiedField === "prompt" ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedField === "prompt" ? "Copied!" : "Copy Prompt"}
                    </Button>
                    <Button onClick={savePrompt}>
                      <Save className="h-4 w-4 mr-2" />
                      Save to History
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedPrompt}</pre>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Estimated tokens: {estimateTokens(generatedPrompt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Template: {selectedTemplate?.name}
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
