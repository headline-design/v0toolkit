export interface FieldValidation {
  required?: boolean
  minLength?: number
  maxLength?: number
  minItems?: number
  maxItems?: number
  pattern?: string
}

// Update the PromptField interface to include validation and category:
export interface PromptField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "multiselect" | "tags"
  icon?: string
  placeholder?: string
  description?: string
  required?: boolean
  category?: string
  options?: string[]
  suggestions?: string[]
  validation?: FieldValidation
}
