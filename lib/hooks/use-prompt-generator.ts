"use client"

import { useState, useCallback, useEffect } from "react"
import { promptGeneratorService } from "@/lib/services/prompt-generator-service"
import { GeneratedPrompt, PromptTemplate } from "../core/types"

export function usePromptGenerator() {
  const [templates, setTemplates] = useState<PromptTemplate[]>(() => promptGeneratorService.getTemplates())
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectTemplate = useCallback((template: PromptTemplate) => {
    setSelectedTemplate(template)
    // Reset field values when a new template is selected
    const initialValues: Record<string, any> = {}
    template.fields.forEach((field) => {
      if (field.type === "tags" || field.type === "multiselect") {
        initialValues[field.id] = []
      } else {
        initialValues[field.id] = ""
      }
    })
    setFieldValues(initialValues)
    setGeneratedPrompt("") // Clear any previously generated prompt
    setErrors({}) // Clear any previous errors
  }, [])

  const updateFieldValue = useCallback((fieldId: string, value: any) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }, [])

  const loadExample = useCallback(
    (exampleIndex: number) => {
      if (!selectedTemplate) return

      const example = selectedTemplate.examples[exampleIndex]
      if (example) {
        setFieldValues(example.values as any)
        setErrors({})
      }
    },
    [selectedTemplate],
  )

  const validateAndGenerate = useCallback(() => {
    if (!selectedTemplate) return

    const validationErrors = promptGeneratorService.validateFields(selectedTemplate, fieldValues)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const prompt = promptGeneratorService.generatePrompt(selectedTemplate, fieldValues)
      setGeneratedPrompt(prompt)
    }
  }, [selectedTemplate, fieldValues])

  const savePrompt = useCallback(() => {
    if (!selectedTemplate || !generatedPrompt) return

    const generatedPromptData: GeneratedPrompt = {
      id: Date.now().toString(),
      templateId: selectedTemplate.id,
      category: selectedTemplate.category,
      prompt: generatedPrompt,
      fieldValues: { ...fieldValues },
      tags: selectedTemplate.tags,
      createdAt: new Date(),
    }

    promptGeneratorService.saveToHistory(generatedPromptData)
  }, [selectedTemplate, generatedPrompt, fieldValues])

  const resetForm = useCallback(() => {
    if (!selectedTemplate) return

    // Reset field values to initial state
    const initialValues: Record<string, any> = {}
    selectedTemplate.fields.forEach((field) => {
      if (field.type === "tags" || field.type === "multiselect") {
        initialValues[field.id] = []
      } else {
        initialValues[field.id] = ""
      }
    })
    setFieldValues(initialValues)
    setGeneratedPrompt("")
    setErrors({})
  }, [selectedTemplate])

  const estimateTokens = useCallback((text: string) => {
    return promptGeneratorService.estimateTokens(text)
  }, [])

  return {
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
  }
}

// Separate hook for generated prompts history
export function useGeneratedPrompts() {
  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPrompts = () => {
      try {
        const history = promptGeneratorService.getHistory()
        setPrompts(history)
      } catch (error) {
        console.error("Failed to load prompt history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPrompts()
  }, [])

  const addPrompt = (prompt: GeneratedPrompt) => {
    promptGeneratorService.saveToHistory(prompt)
    setPrompts((prev) => [prompt, ...prev.slice(0, 49)])
  }

  const clearHistory = () => {
    promptGeneratorService.clearHistory()
    setPrompts([])
  }

  return {
    prompts,
    isLoading,
    addPrompt,
    clearHistory,
  }
}

export function usePromptTemplates() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTemplates = () => {
      try {
        const allTemplates = promptGeneratorService.getTemplates()
        setTemplates(allTemplates)
      } catch (error) {
        console.error("Failed to load templates:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplates()
  }, [])

  return {
    templates,
    isLoading,
  }
}
