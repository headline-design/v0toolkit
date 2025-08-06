export interface Author {
  id: string
  name: string
  avatar?: string
  github?: string
  twitter?: string
  website?: string
}

export interface Pattern {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  author: Author
  tags: string[]
  featured: boolean
  verified: boolean
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  complexity: "simple" | "moderate" | "complex"
  code: string
  preview: string
  dependencies: Array<{
    name: string
    version: string
    type: "npm" | "builtin"
    required: boolean
  }>
  useCases: string[]
  relatedPatterns: string[]
  downloadCount: number
  likeCount: number
  viewCount: number
  v0Compatible: boolean
  v0Version: string
  lastTested: Date
}

export interface Prompt {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  author: Author
  tags: string[]
  featured: boolean
  verified: boolean
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  complexity: "simple" | "moderate" | "complex"
  prompt: string
  example?: string
  tips: string[]
  useCase: string
  successRate: number
  avgRating: number
  usageCount: number
  v0Optimized: boolean
  tokenCount: number
  expectedOutputType: "component" | "page" | "application" | "pattern"
}

export interface Example {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  author: Author
  tags: string[]
  featured: boolean
  verified: boolean
  category: string
  techStack: Array<{
    name: string
    version: string
    category: string
    logo?: string
  }>
  features: string[]
  demoUrl?: string
  sourceUrl?: string
  complexity: string
  buildTime: number
  bundleSize: number
  lighthouse: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
    lastUpdated: Date
  }
  generatedWithV0: boolean
  v0Prompts: string[]
  iterationCount: number
}

export interface SearchFilters {
  query?: string
  categories?: string[]
  difficulty?: Array<"beginner" | "intermediate" | "advanced">
  tags?: string[]
  featured?: boolean
  verified?: boolean
}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
  facets: SearchFacets
}

export interface SearchFacets {
  categories: Array<{ value: string; count: number }>
  tags: Array<{ value: string; count: number }>
  authors: Array<{ value: string; count: number }>
  difficulty: Array<{ value: string; count: number }>
  complexity: Array<{ value: string; count: number }>
}

export interface AnalyticsEvent {
  type: "view" | "download" | "like" | "copy" | "search"
  contentType: "pattern" | "prompt" | "example"
  contentId: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface UserInteraction {
  userId?: string
  action: "like" | "copy" | "download" | "view" | "share"
  contentType: "pattern" | "prompt" | "example"
  contentId: string
  timestamp: Date
}

// Prompt Generator Types
export interface PromptTemplate {
  id: string
  name: string
  description: string
  category: string
  template: string
  fields: PromptField[]
  examples: PromptExample[]
  tags: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  icon?: any
  createdAt?: Date
  updatedAt?: Date
}

export interface PromptField {
  id: string
  name?: string
  label: string
  icon?: any
  type: "text" | "textarea" | "select" | "multiselect" | "tags"
  category?: string
  placeholder: string
  description: string
  required: boolean
  options?: string[]
  defaultValue?: string | string[]
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    minItems?: number
    pattern?: string
  }
  suggestions?: string[]
}

export interface PromptExample {
  title?: string
  name?: string
  description: string
  fieldValues?: Record<string, string | string[]>
  values?: Record<string, string | string[]>
  expectedOutput?: string
  tags?: string[]
}

export interface GeneratedPrompt {
  id: string
  templateId: string
  prompt: string
  fieldValues: Record<string, string | string[]>
  createdAt: Date
  category: string
  tags: string[]
}
