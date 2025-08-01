export interface PromptTemplate {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  prompt: string
  tags: string[]
}

export interface PromptCategory {
  id: string
  name: string
  description: string
  templates: PromptTemplate[]
}
