# Prompt Templates

This directory contains all the prompt templates used in the V0 Toolkit. The content is organized into separate files to make it easy to contribute new prompts and maintain existing ones.

## Structure

- `types.ts` - TypeScript interfaces for prompt templates
- `components.ts` - UI component and interface pattern prompts
- `applications.ts` - Complete application example prompts
- `integrations.ts` - Third-party service integration prompts
- `index.ts` - Main export file that combines all prompts

## Adding New Prompts

To add a new prompt template:

1. Choose the appropriate category file (`components.ts`, `applications.ts`, or `integrations.ts`)
2. Add your prompt following the `PromptTemplate` interface:

\`\`\`typescript
{
  id: "unique-prompt-id",
  title: "Descriptive Title",
  description: "Brief description of what this prompt creates",
  category: "Category Name",
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  prompt: `Your detailed prompt content here...`,
  tags: ["tag1", "tag2", "tag3"],
}
\`\`\`

3. The prompt will automatically appear in the UI

## Guidelines

- Use kebab-case for IDs
- Keep descriptions concise but informative
- Include relevant tags for searchability
- Write comprehensive prompts with specific requirements
- Test prompts with V0 before submitting
