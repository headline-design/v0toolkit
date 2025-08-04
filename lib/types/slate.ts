export interface SlateProject {
  id: string
  name: string
  description: string
  template?: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  profileId?: string // Link to V0 profile
  settings: ProjectSettings
}

export interface ProjectSettings {
  autoSave: boolean
  promptFormat: "v0" | "markdown" | "plain"
  defaultCategory: string
  estimateTokens: boolean
}

export interface SlateItem {
  id: string
  type: "prompt" | "folder" | "note"
  title: string
  content?: string
  x: number
  y: number
  items?: SlateItem[] // For folders
  category?: string
  tags?: string[]
  promptType?: "create" | "refine" | "analyze" | "custom"
  variables?: PromptVariable[]
  estimatedTokens?: number
  version?: number
  parentId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PromptVariable {
  id: string
  name: string
  placeholder: string
  required: boolean
  defaultValue?: string
}

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  items: Omit<SlateItem, "id" | "x" | "y">[]
  tags: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}
