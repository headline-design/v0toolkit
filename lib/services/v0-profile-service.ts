import type { V0Profile, ComposedPrompt, ProfileTemplate } from "@/lib/types/v0-profile"
import { promptGeneratorService } from "./prompt-generator-service"
import type { GeneratedPrompt } from "@/lib/types/prompt-generator"

class V0ProfileService {
  private readonly PROFILES_STORAGE_KEY = "v0-toolkit-profiles"
  private readonly COMPOSED_PROMPTS_KEY = "v0-toolkit-composed-prompts"

  // Define core tasks directly in the service
  private CORE_TASKS = [
    {
      id: "create",
      name: "Create",
      description: "Build new components, features, or complete applications from scratch",
      prompt:
        "Today your job is to create {creation_request}. Build this as a complete, production-ready implementation with proper error handling, accessibility, and responsive design.",
      category: "Development",
      variables: [
        {
          id: "creation_request",
          name: "creation_request",
          label: "What you want to create",
          type: "textarea" as const,
          required: true,
          placeholder:
            "• a user dashboard with analytics charts\n• a complete e-commerce checkout flow\n• a real-time chat component with WebSocket\n• a drag-and-drop file upload system\n• a multi-step form with validation",
        },
      ],
      examples: ["Create a user dashboard", "Build a checkout system", "Design a chat interface"],
      estimatedTokens: 100,
      isActive: true,
    },
    {
      id: "refine",
      name: "Refine",
      description: "Improve, enhance, or modify existing code, designs, or implementations",
      prompt:
        "I want you to refine {refinement_request}. Prioritize best practices from your expertise and provide the complete refined implementation.",
      category: "Development",
      variables: [
        {
          id: "refinement_request",
          name: "refinement_request",
          label: "What you want to refine",
          type: "textarea" as const,
          required: true,
          placeholder:
            "• the user experience when they click on the home page because there is a slight delay\n• the UI/UX on the dashboard and settings pages\n• the user workflow from login to checkout\n• the database queries for better performance\n• the component architecture for better maintainability",
        },
      ],
      examples: ["Refine the checkout flow", "Enhance the dashboard", "Improve form validation"],
      estimatedTokens: 90,
      isActive: true,
    },
    {
      id: "analyze",
      name: "Analyze",
      description: "Review, audit, and provide detailed analysis of code, designs, or systems",
      prompt:
        "Today your job is to analyze {analysis_target} and provide a comprehensive review covering {analysis_focus}. Include specific recommendations for improvement.",
      category: "Analysis",
      variables: [
        {
          id: "analysis_target",
          name: "analysis_target",
          label: "What you want to analyze",
          type: "textarea" as const,
          required: true,
          placeholder:
            "• the current user authentication system\n• the React component architecture\n• the database schema and queries\n• the API endpoint design\n• the overall user experience flow",
        },
        {
          id: "analysis_focus",
          name: "analysis_focus",
          label: "Analysis focus areas",
          type: "select" as const,
          required: true,
          options: [
            "Performance and optimization",
            "Security and best practices",
            "User experience and accessibility",
            "Code quality and maintainability",
            "Architecture and scalability",
            "All aspects (comprehensive review)",
          ],
        },
      ],
      examples: ["Analyze component structure", "Review API design", "Audit security practices"],
      estimatedTokens: 110,
      isActive: true,
    },
  ]

  // Profile Management
  getProfiles(): V0Profile[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.PROFILES_STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      return parsed.map((profile: any) => ({
        ...profile,
        createdAt: new Date(profile.createdAt),
        updatedAt: new Date(profile.updatedAt),
        lastUsed: profile.lastUsed ? new Date(profile.lastUsed) : undefined,
      }))
    } catch (error) {
      console.error("Failed to load profiles:", error)
      return []
    }
  }

  saveProfile(profile: V0Profile): void {
    if (typeof window === "undefined") return

    try {
      const profiles = this.getProfiles()
      const existingIndex = profiles.findIndex((p) => p.id === profile.id)

      if (existingIndex >= 0) {
        profiles[existingIndex] = { ...profile, updatedAt: new Date() }
      } else {
        profiles.push(profile)
      }

      localStorage.setItem(this.PROFILES_STORAGE_KEY, JSON.stringify(profiles))
    } catch (error) {
      console.error("Failed to save profile:", error)
    }
  }

  deleteProfile(profileId: string): void {
    if (typeof window === "undefined") return

    try {
      const profiles = this.getProfiles().filter((p) => p.id !== profileId)
      localStorage.setItem(this.PROFILES_STORAGE_KEY, JSON.stringify(profiles))
    } catch (error) {
      console.error("Failed to delete profile:", error)
    }
  }

  getProfile(profileId: string): V0Profile | null {
    return this.getProfiles().find((p) => p.id === profileId) || null
  }

  // Get available base prompts from prompt generator history
  getAvailableBasePrompts(): GeneratedPrompt[] {
    return promptGeneratorService.getHistory()
  }

  // Prompt Composition
  composePrompt(profile: V0Profile, taskId?: string, variables?: Record<string, any>): ComposedPrompt {
    let basePrompt = ""

    // Get the base prompt - either from generated prompts or direct text
    if (profile.basePromptId) {
      const generatedPrompts = this.getAvailableBasePrompts()
      const baseGeneratedPrompt = generatedPrompts.find((p) => p.id === profile.basePromptId)
      if (baseGeneratedPrompt) {
        basePrompt = baseGeneratedPrompt.prompt
      } else {
        throw new Error(`Base prompt ${profile.basePromptId} not found. Please select a base prompt first.`)
      }
    } else if (profile.basePrompt) {
      basePrompt = profile.basePrompt
    } else {
      throw new Error("No base prompt selected. Please choose a generated prompt as the foundation for this profile.")
    }

    // Start building the full prompt
    let fullPrompt = ""

    // Add name introduction if profile has a custom name
    if (profile.name && profile.name.toLowerCase() !== "v0") {
      fullPrompt += `Your name is ${profile.name}. `
    }

    // Add traits that come before base
    const beforeTraits = profile.traits
      .filter((t) => t.isActive && t.insertionPoint === "before_base")
      .sort((a, b) => a.priority - b.priority)

    for (const trait of beforeTraits) {
      fullPrompt += `${trait.value} `
    }

    // Add base prompt content (this is the generated prompt from prompt generator)
    fullPrompt += basePrompt

    // Add traits that come after base
    const afterTraits = profile.traits
      .filter((t) => t.isActive && t.insertionPoint === "after_base")
      .sort((a, b) => a.priority - b.priority)

    for (const trait of afterTraits) {
      fullPrompt += ` ${trait.value}`
    }

    // Add task-specific prompt if specified
    let taskPrompt = ""
    if (taskId) {
      // Look for task in both core tasks and profile tasks
      const allTasks = [...this.CORE_TASKS, ...profile.tasks]
      const task = allTasks.find((t) => t.id === taskId && t.isActive !== false)
      if (task) {
        taskPrompt = this.processTaskVariables(task.prompt, variables || {})
        fullPrompt += ` ${taskPrompt}`
      }
    }

    // Estimate tokens
    const estimatedTokens = this.estimateTokens(fullPrompt)

    const composedPrompt: ComposedPrompt = {
      profileId: profile.id,
      profileName: profile.name,
      basePrompt: basePrompt,
      traits: profile.traits.filter((t) => t.isActive).map((t) => t.value),
      taskPrompt: taskPrompt || undefined,
      variables: variables || {},
      fullPrompt: fullPrompt.trim(),
      estimatedTokens,
      generatedAt: new Date(),
    }

    // Save to history
    this.saveComposedPrompt(composedPrompt)

    // Update profile usage
    this.updateProfileUsage(profile.id)

    return composedPrompt
  }

  private processTaskVariables(prompt: string, variables: Record<string, any>): string {
    let processedPrompt = prompt

    // Replace variables in the format {variableName}
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{${key}}`
      const replacement = Array.isArray(value) ? value.join(", ") : String(value)
      processedPrompt = processedPrompt.replace(new RegExp(placeholder, "g"), replacement)
    })

    // Clean up duplicate words that might occur from task injection
    // For example: "I want you to refine Refine the..." becomes "I want you to refine the..."
    processedPrompt = this.cleanDuplicateWords(processedPrompt)

    return processedPrompt
  }

  private cleanDuplicateWords(text: string): string {
    // Split into sentences and clean each one
    return text
      .split(". ")
      .map((sentence) => {
        const words = sentence.split(" ")
        const cleanedWords: string[] = []

        for (let i = 0; i < words.length; i++) {
          const currentWord = words[i].toLowerCase().replace(/[^\w]/g, "")
          const nextWord = words[i + 1]?.toLowerCase().replace(/[^\w]/g, "")

          // Skip if the next word is the same (case-insensitive)
          if (currentWord && nextWord && currentWord === nextWord) {
            continue
          }

          cleanedWords.push(words[i])
        }

        return cleanedWords.join(" ")
      })
      .join(". ")
  }

  private estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4)
  }

  private updateProfileUsage(profileId: string): void {
    const profiles = this.getProfiles()
    const profileIndex = profiles.findIndex((p) => p.id === profileId)

    if (profileIndex >= 0) {
      profiles[profileIndex].usageCount = (profiles[profileIndex].usageCount || 0) + 1
      profiles[profileIndex].lastUsed = new Date()
      localStorage.setItem(this.PROFILES_STORAGE_KEY, JSON.stringify(profiles))
    }
  }

  // Composed Prompts History
  saveComposedPrompt(composedPrompt: ComposedPrompt): void {
    if (typeof window === "undefined") return

    try {
      const history = this.getComposedPromptsHistory()
      const updatedHistory = [composedPrompt, ...history.slice(0, 49)] // Keep last 50
      localStorage.setItem(this.COMPOSED_PROMPTS_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Failed to save composed prompt:", error)
    }
  }

  getComposedPromptsHistory(): ComposedPrompt[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.COMPOSED_PROMPTS_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      return parsed.map((item: any) => ({
        ...item,
        generatedAt: new Date(item.generatedAt),
      }))
    } catch (error) {
      console.error("Failed to load composed prompts history:", error)
      return []
    }
  }

  clearComposedPromptsHistory(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(this.COMPOSED_PROMPTS_KEY)
    } catch (error) {
      console.error("Failed to clear composed prompts history:", error)
    }
  }

  // Create profile from generated prompt
  createProfileFromGeneratedPrompt(generatedPrompt: GeneratedPrompt, customName?: string): V0Profile {
    const profile: V0Profile = {
      id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: customName || "V0 Assistant",
      displayName: customName || "V0 Assistant",
      description: `Profile based on ${generatedPrompt.category} prompt`,
      basePromptId: generatedPrompt.id,
      avatar: "UserCog",
      traits: [],
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      tags: generatedPrompt.tags || [],
      category: generatedPrompt.category,
      usageCount: 0,
    }

    this.saveProfile(profile)
    return profile
  }

  // Profile Templates (predefined profiles for quick setup)
  getProfileTemplates(): ProfileTemplate[] {
    return [
      {
        id: "devrel-expert",
        name: "DevRel Expert",
        description: "Developer Relations expert specializing in AI coding platforms",
        category: "Development",
        basePrompt:
          "You are a dev relations expert (specializing in gen-ai coding platforms) who built the documentation website for Cursor and then worked with Loveable and Bolt and V0 on best-practices, demo apps, etc. We are building a V0-focused toolkit with useful tools, prompts, and best-practices for V0. This will be a combination of file-system structuring and interface visualization. I want you to build out the technical framework and UI design for our V0-focused toolkit. This will be a public V0 project so include inline comments wherever relevant. We are going to call this project V0 Toolkit.",
        suggestedTraits: [
          {
            name: "Technical Focus",
            description: "Emphasizes technical accuracy and best practices",
            value:
              "You prioritize technical accuracy, performance optimization, and following industry best practices in all recommendations.",
            category: "expertise",
            insertionPoint: "after_base",
            priority: 1,
          },
          {
            name: "Community-Minded",
            description: "Focuses on community building and developer experience",
            value:
              "You always consider the developer community impact and strive to create inclusive, accessible solutions.",
            category: "personality",
            insertionPoint: "after_base",
            priority: 2,
          },
        ],
        suggestedTasks: [
          {
            name: "Code Review",
            description: "Review code for best practices and improvements",
            prompt:
              "Today your job is to review the following code and provide detailed feedback on best practices, performance, and potential improvements: {code}",
            category: "Development",
            variables: [
              {
                id: "code",
                name: "code",
                label: "Code to Review",
                type: "textarea",
                required: true,
                placeholder: "Paste the code you want reviewed...",
              },
            ],
            examples: ["Review React component", "Analyze API endpoint", "Check TypeScript types"],
            estimatedTokens: 150,
          },
          {
            name: "Architecture Analysis",
            description: "Analyze system architecture and suggest improvements",
            prompt:
              "Today your job is to analyze the architecture of {project_type} and determine the best approach for {specific_goal}. Consider scalability, maintainability, and developer experience.",
            category: "Architecture",
            variables: [
              {
                id: "project_type",
                name: "project_type",
                label: "Project Type",
                type: "select",
                required: true,
                options: ["Web Application", "Mobile App", "API Service", "Component Library", "Documentation Site"],
              },
              {
                id: "specific_goal",
                name: "specific_goal",
                label: "Specific Goal",
                type: "text",
                required: true,
                placeholder: "e.g., improve performance, add real-time features...",
              },
            ],
            examples: ["Analyze React app structure", "Review API design", "Optimize component architecture"],
            estimatedTokens: 120,
          },
        ],
        icon: "UserCog",
        difficulty: "Advanced",
        tags: ["devrel", "expert", "technical", "community"],
      },
      {
        id: "ui-designer",
        name: "UI/UX Designer",
        description: "Expert UI/UX designer focused on modern web interfaces",
        category: "Design",
        basePrompt:
          "You are an expert UI/UX designer with extensive experience in modern web interfaces, design systems, and user experience optimization. You specialize in creating beautiful, accessible, and user-friendly interfaces using the latest design principles and technologies.",
        suggestedTraits: [
          {
            name: "Accessibility First",
            description: "Always considers accessibility in design decisions",
            value:
              "You prioritize accessibility and inclusive design in every recommendation, ensuring interfaces work for all users.",
            category: "constraints",
            insertionPoint: "after_base",
            priority: 1,
          },
          {
            name: "Modern Aesthetics",
            description: "Focuses on contemporary design trends",
            value: "You stay current with modern design trends while maintaining timeless usability principles.",
            category: "expertise",
            insertionPoint: "after_base",
            priority: 2,
          },
        ],
        suggestedTasks: [
          {
            name: "Design Review",
            description: "Review UI designs for usability and aesthetics",
            prompt:
              "Today your job is to review this {design_type} design and provide feedback on usability, accessibility, and visual appeal: {design_description}",
            category: "Design",
            variables: [
              {
                id: "design_type",
                name: "design_type",
                label: "Design Type",
                type: "select",
                required: true,
                options: ["Landing Page", "Dashboard", "Mobile App", "Component", "Form", "Navigation"],
              },
              {
                id: "design_description",
                name: "design_description",
                label: "Design Description",
                type: "textarea",
                required: true,
                placeholder: "Describe the design or paste a link to the design...",
              },
            ],
            examples: ["Review dashboard layout", "Analyze mobile interface", "Evaluate form design"],
            estimatedTokens: 130,
          },
        ],
        icon: "Palette",
        difficulty: "Intermediate",
        tags: ["design", "ui", "ux", "accessibility"],
      },
    ]
  }

  createProfileFromTemplate(template: ProfileTemplate, customName?: string): V0Profile {
    const profile: V0Profile = {
      id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: customName || template.name,
      displayName: template.name,
      description: template.description,
      basePrompt: template.basePrompt, // Use direct prompt text instead of template ID
      avatar: template.icon,
      traits: template.suggestedTraits.map((trait, index) => ({
        ...trait,
        id: `trait-${Date.now()}-${index}`,
        isActive: true,
      })),
      tasks: template.suggestedTasks.map((task, index) => ({
        ...task,
        id: `task-${Date.now()}-${index}`,
        isActive: true,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      tags: template.tags,
      category: template.category,
      usageCount: 0,
    }

    this.saveProfile(profile)
    return profile
  }
}

export const v0ProfileService = new V0ProfileService()
