import type { PromptTemplate, PromptCategory } from "./types"
import { componentPrompts } from "./components"
import { applicationPrompts } from "./applications"
import { integrationPrompts } from "./integrations"

export const promptCategories: PromptCategory[] = [
  {
    id: "components",
    name: "Components",
    description: "UI components and interface patterns",
    templates: componentPrompts,
  },
  {
    id: "applications",
    name: "Applications",
    description: "Complete application examples",
    templates: applicationPrompts,
  },
  {
    id: "integrations",
    name: "Integrations",
    description: "Third-party service integrations",
    templates: integrationPrompts,
  },
]

export const allPrompts: PromptTemplate[] = [...componentPrompts, ...applicationPrompts, ...integrationPrompts]

export * from "./types"
export { componentPrompts, applicationPrompts, integrationPrompts }
