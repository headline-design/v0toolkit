"use client"

import { useState, useCallback, useEffect } from "react"
import { promptGeneratorService } from "@/lib/services/prompt-generator-service"
import type { PromptTemplate, PromptGeneratorState, GeneratedPrompt } from "@/lib/types/prompt-generator"

export function usePromptGenerator() {
  const [state, setState] = useState<PromptGeneratorState>({
    selectedTemplate: null,
    fieldValues: {},
    generatedPrompt: "",
    isGenerating: false,
    errors: {},
    history: [],
  })

  // Load history on mount
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      history: promptGeneratorService.getHistory(),
    }))
  }, [])

  const selectTemplate = useCallback((template: PromptTemplate) => {
    setState((prev) => ({
      ...prev,
      selectedTemplate: template,
      fieldValues: {},
      generatedPrompt: "",
      errors: {},
    }))
  }, [])

  const updateFieldValue = useCallback((fieldName: string, value: string | string[]) => {
    setState((prev) => {
      const newValues = {
        ...prev.fieldValues,
        [fieldName]: value,
      }

      // Clear error for this field
      const newErrors = { ...prev.errors }
      delete newErrors[fieldName]

      // Generate prompt if template is selected
      let generatedPrompt = ""
      if (prev.selectedTemplate) {
        try {
          generatedPrompt = promptGeneratorService.generatePrompt(prev.selectedTemplate, newValues)
        } catch (error) {
          console.error("Error generating prompt:", error)
        }
      }

      return {
        ...prev,
        fieldValues: newValues,
        generatedPrompt,
        errors: newErrors,
      }
    })
  }, [])

  const loadExample = useCallback(
    (exampleIndex: number) => {
      if (!state.selectedTemplate || !state.selectedTemplate.examples[exampleIndex]) return

      const example = state.selectedTemplate.examples[exampleIndex]
      setState((prev) => ({
        ...prev,
        fieldValues: { ...example.values },
        generatedPrompt: promptGeneratorService.generatePrompt(prev.selectedTemplate!, example.values),
        errors: {},
      }))
    },
    [state.selectedTemplate],
  )

  const validateAndGenerate = useCallback(() => {
    if (!state.selectedTemplate) return false

    setState((prev) => ({ ...prev, isGenerating: true }))

    const errors = promptGeneratorService.validateFields(state.selectedTemplate, state.fieldValues)

    setState((prev) => ({
      ...prev,
      errors,
      isGenerating: false,
    }))

    return Object.keys(errors).length === 0
  }, [state.selectedTemplate, state.fieldValues])

  const savePrompt = useCallback(() => {
    if (!state.selectedTemplate || !state.generatedPrompt) return

    const prompt: GeneratedPrompt = {
      id: `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      templateId: state.selectedTemplate.id,
      content: state.generatedPrompt,
      values: { ...state.fieldValues },
      createdAt: new Date(),
      estimatedTokens: promptGeneratorService.estimateTokens(state.generatedPrompt),
      category: state.selectedTemplate.category,
      tags: state.selectedTemplate.tags,
      prompt: state.generatedPrompt,
    }

    // Save to localStorage via service
    promptGeneratorService.saveToHistory(prompt)

    // Update local state
    setState((prev) => ({
      ...prev,
      history: [prompt, ...prev.history.slice(0, 49)],
    }))

    return prompt
  }, [state.selectedTemplate, state.generatedPrompt, state.fieldValues])

  const clearHistory = useCallback(() => {
    promptGeneratorService.clearHistory()
    setState((prev) => ({
      ...prev,
      history: [],
    }))
  }, [])

  const resetForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      fieldValues: {},
      generatedPrompt: "",
      errors: {},
    }))
  }, [])

  const resetGenerator = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedTemplate: null,
      fieldValues: {},
      generatedPrompt: "",
      errors: {},
    }))
  }, [])

  return {
    ...state,
    templates: promptGeneratorService.getTemplates(),
    selectTemplate,
    updateFieldValue,
    loadExample,
    validateAndGenerate,
    savePrompt,
    clearHistory,
    resetForm,
    resetGenerator,
    estimateTokens: (prompt: string) => promptGeneratorService.estimateTokens(prompt),
  }
}

// Separate hook for generated prompts history
export function useGeneratedPrompts() {
  const [prompts, setPrompts] = useState<GeneratedPrompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPrompts = () => {
      try {
        setLoading(true)
        const history = promptGeneratorService.getHistory()
        setPrompts(history)
      } catch (error) {
        console.error("Error loading prompts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPrompts()

    // Listen for storage changes to update prompts when saved from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "v0-toolkit-prompt-history") {
        loadPrompts()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return { prompts, loading }
}
