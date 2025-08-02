import { expertRoleBasedTemplate } from "./templates/expert-role-based"
import { technicalSpecificationTemplate } from "./templates/technical-specification"
import { uiComponentBuilderTemplate } from "./templates/ui-component-builder"
import type { PromptTemplate } from "@/lib/types/prompt-generator"

export const promptTemplates: PromptTemplate[] = [
  expertRoleBasedTemplate,
  technicalSpecificationTemplate,
  uiComponentBuilderTemplate,
]

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  expertRoleBasedTemplate,
  technicalSpecificationTemplate,
  uiComponentBuilderTemplate,
]
