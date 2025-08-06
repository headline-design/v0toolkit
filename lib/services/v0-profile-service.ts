import type { V0Profile, ProfileTemplate, ComposedPrompt, GeneratedPrompt } from "@/lib/types/v0-profile"

class V0ProfileService {
  private readonly STORAGE_KEY = "v0-profiles"
  private readonly TEMPLATES_KEY = "v0-profile-templates"
  private readonly HISTORY_KEY = "v0-composed-prompts"
  private readonly GENERATED_PROMPTS_KEY = "v0-generated-prompts"

  // Profile Management
  getProfiles(): V0Profile[] {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const profiles = JSON.parse(stored)
      return profiles.map((profile: any) => ({
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

  getProfile(id: string): V0Profile | null {
    const profiles = this.getProfiles()
    return profiles.find((profile) => profile.id === id) || null
  }

  saveProfile(profile: V0Profile): void {
    if (typeof window === "undefined") return

    const profiles = this.getProfiles()
    const existingIndex = profiles.findIndex((p) => p.id === profile.id)

    if (existingIndex >= 0) {
      profiles[existingIndex] = profile
    } else {
      profiles.push(profile)
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles))
  }

  deleteProfile(id: string): void {
    if (typeof window === "undefined") return

    const profiles = this.getProfiles()
    const filtered = profiles.filter((profile) => profile.id !== id)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
  }

  // Create a new profile with minimal setup
  createQuickProfile(): V0Profile {
    const profileId = `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const profile: V0Profile = {
      id: profileId,
      name: profileId, // Use profile ID as name until user sets it
      displayName: "New Assistant",
      description: "A new AI assistant ready to be customized",
      category: "Development",
      avatar: `https://avatar.vercel.sh/${profileId}?size=400`,
      basePrompt: "You are a helpful AI assistant specialized in web development and design.",
      traits: [],
      tasks: [],
      tags: ["new", "assistant"],
      isActive: true,
      usageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.saveProfile(profile)
    return profile
  }

  // Template Management
  getProfileTemplates(): ProfileTemplate[] {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(this.TEMPLATES_KEY)
      if (!stored) {
        // Return default templates if none exist
        return this.getDefaultTemplates()
      }
      return JSON.parse(stored)
    } catch (error) {
      console.error("Failed to load templates:", error)
      return this.getDefaultTemplates()
    }
  }

  createProfileFromTemplate(template: ProfileTemplate, customName?: string): V0Profile {
    const profileId = `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const profile: V0Profile = {
      id: profileId,
      name: customName || template.name,
      displayName: template.name,
      description: template.description,
      basePrompt: template.basePrompt,
      avatar: `https://avatar.vercel.sh/${profileId}?size=400`,
      traits: template.suggestedTraits.map((trait, index) => ({
        ...trait,
        id: `trait-${Date.now()}-${index}`,
        isActive: true,
        insertionPoint: "after_base",
        priority: index + 1,
      })),
      tasks: template.suggestedTasks.map((task, index) => ({
        ...task,
        id: `task-${Date.now()}-${index}`,
        isActive: true,
        estimatedTokens: 100,
        variables: [],
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

  // Prompt Composition
  composePrompt(profile: V0Profile, taskId?: string, variables: Record<string, any> = {}): ComposedPrompt {
    let fullPrompt = ""

    // Start with base prompt
    if (profile.basePromptId) {
      const generatedPrompts = this.getAvailableBasePrompts()
      const basePrompt = generatedPrompts.find((p) => p.id === profile.basePromptId)
      if (basePrompt) {
        fullPrompt += basePrompt.prompt + "\n\n"
      }
    } else if (profile.basePrompt) {
      fullPrompt += profile.basePrompt + "\n\n"
    }

    // Add active traits
    const activeTraits = profile.traits.filter((trait) => trait.isActive).sort((a, b) => a.priority - b.priority)

    for (const trait of activeTraits) {
      if (trait.insertionPoint === "before_base") {
        fullPrompt = trait.value + "\n\n" + fullPrompt
      } else if (trait.insertionPoint === "after_base") {
        fullPrompt += trait.value + "\n\n"
      }
    }

    // Add task-specific prompt if provided
    let taskPrompt = ""
    if (taskId) {
      const allTasks = [...this.getCoreTasksForProfile(), ...profile.tasks]
      const task = allTasks.find((t) => t.id === taskId)
      if (task) {
        taskPrompt = this.interpolateVariables(task.prompt, variables)
        fullPrompt += taskPrompt
      }
    }

    // Create composed prompt record
    const composed: ComposedPrompt = {
      id: `composed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      profileId: profile.id,
      profileName: profile.name,
      taskId,
      taskPrompt,
      variables,
      fullPrompt: fullPrompt.trim(),
      estimatedTokens: this.estimateTokens(fullPrompt),
      generatedAt: new Date(),
    }

    // Save to history
    this.saveComposedPrompt(composed)

    // Update profile usage
    profile.usageCount = (profile.usageCount || 0) + 1
    profile.lastUsed = new Date()
    this.saveProfile(profile)

    return composed
  }

  private interpolateVariables(template: string, variables: Record<string, any>): string {
    let result = template
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{${key}}`
      result = result.replace(new RegExp(placeholder, "g"), String(value || ""))
    }
    return result
  }

  private estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4)
  }

  // Composed Prompts History
  getComposedPromptsHistory(): ComposedPrompt[] {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(this.HISTORY_KEY)
      if (!stored) return []

      const history = JSON.parse(stored)
      return history.map((prompt: any) => ({
        ...prompt,
        generatedAt: new Date(prompt.generatedAt),
      }))
    } catch (error) {
      console.error("Failed to load composed prompts history:", error)
      return []
    }
  }

  private saveComposedPrompt(prompt: ComposedPrompt): void {
    if (typeof window === "undefined") return

    const history = this.getComposedPromptsHistory()
    history.unshift(prompt) // Add to beginning

    // Keep only last 100 prompts
    const trimmed = history.slice(0, 100)
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(trimmed))
  }

  clearComposedPromptsHistory(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.HISTORY_KEY)
  }

  // Generated Prompts (from Prompt Generator)
  getAvailableBasePrompts(): GeneratedPrompt[] {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(this.GENERATED_PROMPTS_KEY)
      if (!stored) return []

      const prompts = JSON.parse(stored)
      return prompts.map((prompt: any) => ({
        ...prompt,
        createdAt: new Date(prompt.createdAt),
      }))
    } catch (error) {
      console.error("Failed to load generated prompts:", error)
      return []
    }
  }

  saveGeneratedPrompt(prompt: GeneratedPrompt): void {
    if (typeof window === "undefined") return

    const prompts = this.getAvailableBasePrompts()
    prompts.unshift(prompt)

    // Keep only last 50 generated prompts
    const trimmed = prompts.slice(0, 50)
    localStorage.setItem(this.GENERATED_PROMPTS_KEY, JSON.stringify(trimmed))
  }

  // Core tasks available to all profiles
  private getCoreTasksForProfile() {
    return [
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
  }

  // Default data
  private getDefaultTemplates(): ProfileTemplate[] {
    return [
      {
        id: "expert-role-based",
        name: "Expert Role-Based Assistant",
        description:
          "A highly specialized expert that adapts to any role or domain with deep knowledge and professional communication",
        category: "Development",
        difficulty: "Advanced",
        icon: "Crown",
        basePrompt: `You are an expert-level professional assistant with deep domain knowledge. You adapt your expertise based on the context and requirements of each request.

## Core Principles:
- Provide expert-level insights and solutions
- Communicate with professional clarity and precision
- Consider multiple perspectives and edge cases
- Offer practical, actionable recommendations
- Stay current with industry best practices

## Response Structure:
- Lead with the most important information
- Provide clear, step-by-step guidance when appropriate
- Include relevant examples and code snippets
- Anticipate follow-up questions and address them proactively
- Suggest optimizations and improvements beyond the basic request`,
        suggestedTraits: [
          {
            name: "Domain Expertise",
            description: "Deep knowledge across multiple technical domains",
            value:
              "You have extensive experience in web development, software architecture, UI/UX design, and modern development practices. You understand the nuances of different frameworks, tools, and methodologies.",
            category: "expertise",
          },
          {
            name: "Strategic Thinking",
            description: "Considers long-term implications and scalability",
            value:
              "You always consider the bigger picture - scalability, maintainability, performance, and future requirements. You provide solutions that work both now and as projects grow.",
            category: "behavior",
          },
          {
            name: "Best Practices Focus",
            description: "Emphasizes industry standards and proven patterns",
            value:
              "You prioritize established best practices, design patterns, and industry standards. You explain why certain approaches are recommended and what problems they solve.",
            category: "expertise",
          },
          {
            name: "Practical Communication",
            description: "Clear, actionable communication style",
            value:
              "You communicate complex concepts clearly, provide concrete examples, and structure your responses for maximum clarity and actionability.",
            category: "communication",
          },
        ],
        suggestedTasks: [
          {
            name: "Expert Analysis",
            description: "Provide expert-level analysis and recommendations",
            prompt:
              "As an expert in {domain}, analyze {subject} and provide comprehensive insights including best practices, potential issues, and optimization opportunities.",
            category: "Analysis",
          },
          {
            name: "Solution Architecture",
            description: "Design comprehensive solutions for complex problems",
            prompt:
              "Design a complete solution for {problem_description}. Consider architecture, implementation details, scalability, and maintenance requirements.",
            category: "Development",
          },
        ],
        tags: ["expert", "professional", "comprehensive", "best-practices"],
      },
      {
        id: "frontend-developer",
        name: "Frontend Developer",
        description: "Specialized in React, Next.js, and modern frontend development",
        category: "Development",
        difficulty: "Intermediate",
        icon: "FileCode",
        basePrompt:
          "You are an expert frontend developer with deep knowledge of React, Next.js, TypeScript, and modern web development practices. You excel at creating responsive, accessible, and performant user interfaces.",
        suggestedTraits: [
          {
            name: "React Expert",
            description: "Deep knowledge of React patterns and best practices",
            value:
              "You have extensive experience with React hooks, context, and modern patterns. You always consider performance and maintainability.",
            category: "expertise",
          },
          {
            name: "Accessibility Focused",
            description: "Always considers accessibility in implementations",
            value:
              "You prioritize accessibility in all your implementations, using semantic HTML, ARIA attributes, and ensuring keyboard navigation works properly.",
            category: "behavior",
          },
        ],
        suggestedTasks: [
          {
            name: "Component Creation",
            description: "Create reusable React components",
            prompt:
              "Create a {component_type} component that {functionality}. Make it accessible, responsive, and follow React best practices.",
            category: "Development",
          },
        ],
        tags: ["react", "frontend", "typescript", "nextjs"],
      },
      {
        id: "ui-designer",
        name: "UI/UX Designer",
        description: "Expert in user interface design and user experience optimization",
        category: "Design",
        difficulty: "Beginner",
        icon: "Palette",
        basePrompt:
          "You are a skilled UI/UX designer with expertise in creating beautiful, functional, and user-centered designs. You understand design systems, accessibility, and modern design trends.",
        suggestedTraits: [
          {
            name: "Design Systems Expert",
            description: "Deep understanding of design systems and consistency",
            value:
              "You always consider design system consistency, spacing, typography, and color usage in your designs.",
            category: "expertise",
          },
        ],
        suggestedTasks: [
          {
            name: "Design Review",
            description: "Review and improve existing designs",
            prompt:
              "Review this {design_element} and provide specific recommendations for improving the user experience and visual design.",
            category: "Design",
          },
        ],
        tags: ["design", "ui", "ux", "figma"],
      },
      {
        id: "code-reviewer",
        name: "Code Reviewer",
        description: "Thorough code analysis and improvement suggestions",
        category: "Analysis",
        difficulty: "Advanced",
        icon: "UserCog",
        basePrompt:
          "You are an experienced code reviewer with expertise across multiple programming languages and frameworks. You provide constructive feedback focusing on code quality, performance, security, and maintainability.",
        suggestedTraits: [
          {
            name: "Security Conscious",
            description: "Always considers security implications",
            value:
              "You actively look for security vulnerabilities and suggest secure coding practices in all your reviews.",
            category: "expertise",
          },
        ],
        suggestedTasks: [
          {
            name: "Code Analysis",
            description: "Analyze code for improvements",
            prompt:
              "Analyze this code for {focus_area} and provide specific recommendations for improvement with examples.",
            category: "Analysis",
          },
        ],
        tags: ["code-review", "security", "performance", "best-practices"],
      },
    ]
  }
}

export const v0ProfileService = new V0ProfileService()
