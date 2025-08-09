export type LibraryType = "prompts" | "sql"

export interface LibraryLink {
  label: string
  href: string
}

export interface LibraryCode {
  language: string
  value: string
  filename?: string
}

export interface LibraryItem {
  id: string
  title: string
  description?: string
  tags?: string[]
  code?: LibraryCode
  tips?: string[]
  links?: LibraryLink[]
  section?: string // section id this item belongs to
  highlightLines?: number[] // lines to emphasize
  diff?: {
    added?: number[]
    removed?: number[]
  }
}

export interface LibrarySection {
  id: string
  title: string
  description?: string
}

export interface LibraryDefinition {
  type: LibraryType
  title: string
  description: string
  icon: "MessageSquare" | "Database"
  sections?: LibrarySection[]
  items: LibraryItem[]
}
