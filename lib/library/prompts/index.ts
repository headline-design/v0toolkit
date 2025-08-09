import type { LibraryItem, LibrarySection } from "../types"

// Existing prompts
import { conciseAssistant } from "./system/concise-assistant"
import { selfCritique } from "./patterns/self-critique"

// New: installation section
import { installationItems } from "./installation"

export const sections: LibrarySection[] = [
  { id: "system", title: "System Prompts" },
  { id: "patterns", title: "Patterns" },
  { id: "installation", title: "Installation" },
]

export const items: LibraryItem[] = [
  // System
  conciseAssistant,
  // Patterns
  selfCritique,
  // Installation
  ...installationItems,
]
