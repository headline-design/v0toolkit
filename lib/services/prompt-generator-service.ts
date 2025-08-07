import { PROMPT_TEMPLATES } from "@/lib/data/prompt-templates"
import { GeneratedPrompt, PromptTemplate } from "../core/types"

class PromptGeneratorService {
  private readonly STORAGE_KEY = "v0-toolkit-prompt-history"

  getTemplates(): PromptTemplate[] {
    return PROMPT_TEMPLATES
  }

  generatePrompt(template: PromptTemplate, values: Record<string, string | string[]>): string {
    let prompt = template.template

    // Replace placeholders with actual values
    template.fields.forEach((field) => {
      const value = values[field.id]
      let replacementValue = ""

      if (Array.isArray(value)) {
        if (value.length > 0) {
          replacementValue = value.join(", ")
        }
      } else if (typeof value === "string") {
        if (field.id === "additionalContext") {
          replacementValue = ` and ${value}` // Use placeholder if no value provided
        } else {
          replacementValue = value
      }
      }

      // Replace the placeholder in the template
      const placeholder = `{${field.id}}`
      prompt = prompt.replace(new RegExp(placeholder, "g"), replacementValue)
    })

    return prompt
  }

  validateFields(template: PromptTemplate, values: Record<string, string | string[]>): Record<string, string> {
    const errors: Record<string, string> = {}

    template.fields.forEach((field) => {
      const value = values[field.id]

      // Check required fields
      if (field.required) {
        if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === "string" && !value.trim())) {
          errors[field.id] = `${field.label} is required`
          return
        }
      }

      // Validate string fields
      if (typeof value === "string" && value.trim()) {
        if (field.validation?.minLength && value.length < field.validation.minLength) {
          errors[field.id] = `${field.label} must be at least ${field.validation.minLength} characters`
        }
        if (field.validation?.maxLength && value.length > field.validation.maxLength) {
          errors[field.id] = `${field.label} must be no more than ${field.validation.maxLength} characters`
        }
        if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value)) {
          errors[field.id] = `${field.label} format is invalid`
        }
      }
    })

    return errors
  }

  saveToHistory(prompt: GeneratedPrompt): void {
    if (typeof window === "undefined") return

    try {
      const history = this.getHistory()
      const updatedHistory = [prompt, ...history.slice(0, 49)] // Keep last 50
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Failed to save prompt to history:", error)
    }
  }

  getHistory(): GeneratedPrompt[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      return parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }))
    } catch (error) {
      console.error("Failed to load prompt history:", error)
      return []
    }
  }

  clearHistory(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear prompt history:", error)
    }
  }
}

export const promptGeneratorService = new PromptGeneratorService()
