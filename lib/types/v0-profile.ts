export interface V0Profile {
  id: string
  name: string // The name given to this V0 instance (e.g., "Bob", "Alice")
  displayName: string // User-friendly display name
  description: string
  basePromptId?: string // Reference to a generated prompt from prompt generator
  basePrompt?: string // Direct prompt text if not using a generated prompt
  avatar?: string // Optional avatar/icon
  traits: V0Trait[]
  tasks: V0Task[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  tags: string[]
  category: string
  usageCount: number
  lastUsed?: Date
}

export interface V0Trait {
  id: string
  name: string
  description: string
  value: string // The actual trait text to inject
  category: "personality" | "expertise" | "communication" | "behavior" | "constraints"
  isActive: boolean
  insertionPoint: "before_base" | "after_base" | "replace_section"
  priority: number // For ordering when multiple traits exist
}

export interface V0Task {
  id: string
  name: string
  description: string
  prompt: string // The task-specific prompt to append
  category: string
  isActive: boolean
  variables: TaskVariable[]
  examples: string[]
  estimatedTokens: number
}

export interface TaskVariable {
  id: string
  name: string
  label: string
  type: "text" | "textarea" | "select" | "multiselect"
  required: boolean
  defaultValue?: string
  options?: string[]
  placeholder?: string
}

export interface ComposedPrompt {
  profileId: string
  profileName: string
  basePrompt: string
  traits: string[]
  taskPrompt?: string
  variables: Record<string, any>
  fullPrompt: string
  estimatedTokens: number
  generatedAt: Date
}

export interface ProfileTemplate {
  id: string
  name: string
  description: string
  category: string
  basePrompt: string
  suggestedTraits: Omit<V0Trait, "id" | "isActive">[]
  suggestedTasks: Omit<V0Task, "id" | "isActive">[]
  icon?: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
}
