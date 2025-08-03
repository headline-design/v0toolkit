export interface V0Profile {
  id: string
  name: string
  displayName: string
  description: string
  category: string
  avatar?: string // URL to avatar image (typically from avatar.vercel.sh)
  basePrompt?: string // Custom base prompt
  basePromptId?: string // Reference to generated prompt
  traits: ProfileTrait[]
  tasks: ProfileTask[]
  tags: string[]
  isActive: boolean
  usageCount?: number
  lastUsed?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ProfileTrait {
  id: string
  name: string
  description: string
  value: string // The actual prompt text/instruction
  category: "personality" | "expertise" | "communication" | "behavior" | "constraints"
  isActive: boolean
  insertionPoint: "before_base" | "after_base" | "replace_section"
  priority: number // 1-10, lower numbers have higher priority
}

export interface ProfileTask {
  id: string
  name: string
  description: string
  prompt: string // Template with {variable} placeholders
  category: string
  variables?: TaskVariable[]
  examples?: string[]
  estimatedTokens: number
  isActive: boolean
}

export interface TaskVariable {
  id: string
  name: string
  label: string
  type: "text" | "textarea" | "select" | "number" | "boolean"
  required: boolean
  placeholder?: string
  options?: string[] // For select type
  defaultValue?: any
}

export interface ProfileTemplate {
  id: string
  name: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  icon?: string
  basePrompt: string
  suggestedTraits: Omit<ProfileTrait, "id" | "isActive" | "insertionPoint" | "priority">[]
  suggestedTasks: Omit<ProfileTask, "id" | "isActive" | "estimatedTokens" | "variables">[]
  tags: string[]
}

export interface ComposedPrompt {
  id: string
  profileId: string
  profileName: string
  taskId?: string
  taskPrompt?: string
  variables: Record<string, any>
  fullPrompt: string
  estimatedTokens: number
  generatedAt: Date
}

export interface GeneratedPrompt {
  id: string
  prompt: string
  category?: string
  tags?: string[]
  createdAt: Date
  metadata?: Record<string, any>
}
