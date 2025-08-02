export interface PromptTemplate {
  id: string
  name: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  fields: PromptField[]
  template: string
  examples: PromptExample[]
  tags: string[]
  estimatedTokens: number
  successRate?: number
}

export interface PromptField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "multiselect" | "tags"
  placeholder?: string
  description?: string
  required: boolean
  options?: string[]
  suggestions?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface PromptExample {
  name: string
  description: string
  values: Record<string, any>
}

export interface GeneratedPrompt {
  id: string
  prompt: string
  templateId: string
  category: string
  fieldValues: Record<string, any>
  tags: string[]
  estimatedTokens: number
  createdAt: Date
}

export interface PromptGeneratorState {
  templates: PromptTemplate[]
  selectedTemplate: PromptTemplate | null
  fieldValues: Record<string, any>
  generatedPrompt: string
  isGenerating: boolean
  errors: Record<string, string>
}
