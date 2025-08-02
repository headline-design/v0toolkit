import type { PromptTemplate, GeneratedPrompt } from "@/lib/types/prompt-generator"

class PromptGeneratorService {
  private readonly STORAGE_KEY = "v0-toolkit-prompt-history"

  getTemplates(): PromptTemplate[] {
    return [
      {
        id: "expert-role-based",
        name: "Expert Role-Based Prompt",
        description: "Create prompts that establish expertise and context for complex development tasks",
        category: "Development",
        difficulty: "Intermediate",
        estimatedTokens: 150,
        successRate: 92,
        tags: ["expert", "role-based", "development", "context"],
        template: `You are a {expertiseType} expert (specializing in {platforms} platforms) who built the documentation website for {primaryCompany} and then worked with {additionalCompanies} on {features}, etc. We are building a {projectType}{additionalContext}. I want you to {action} {deliverables} for our {finalProduct}.`,
        fields: [
          {
            id: "expertiseType",
            label: "Expertise Type",
            type: "select",
            placeholder: "Select your area of expertise",
            description: "The primary domain of expertise for this prompt",
            required: true,
            options: [
              "dev relations",
              "full-stack development",
              "frontend development",
              "backend development",
              "DevOps engineering",
              "UI/UX design",
              "product management",
              "technical writing",
              "data engineering",
              "machine learning",
            ],
          },
          {
            id: "platforms",
            label: "Specialized Platforms",
            type: "tags",
            placeholder: "Add platforms (press Enter or comma to add)",
            description: "AI coding platforms, frameworks, or tools you specialize in",
            required: true,
            suggestions: [
              "gen-ai coding",
              "V0",
              "Cursor",
              "GitHub Copilot",
              "Loveable",
              "Bolt",
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
            ],
          },
          {
            id: "primaryCompany",
            label: "Primary Company Reference",
            type: "select",
            placeholder: "Select a well-known company",
            description: "A reputable company to establish credibility",
            required: true,
            options: [
              "Cursor",
              "Vercel",
              "GitHub",
              "OpenAI",
              "Anthropic",
              "Linear",
              "Stripe",
              "Figma",
              "Notion",
              "Discord",
              "Slack",
              "Spotify",
            ],
          },
          {
            id: "additionalCompanies",
            label: "Additional Companies",
            type: "multiselect",
            placeholder: "Select additional companies",
            description: "Other companies to mention for broader credibility",
            required: false,
            options: [
              "Loveable",
              "Bolt",
              "V0",
              "Replit",
              "CodeSandbox",
              "StackBlitz",
              "Supabase",
              "PlanetScale",
              "Railway",
              "Fly.io",
              "Netlify",
              "Cloudflare",
            ],
          },
          {
            id: "features",
            label: "Key Features/Areas",
            type: "tags",
            placeholder: "Add features or areas of work",
            description: "Specific features, practices, or areas you've worked on",
            required: true,
            suggestions: [
              "best-practices",
              "demo apps",
              "documentation",
              "developer experience",
              "API design",
              "component libraries",
              "design systems",
              "performance optimization",
              "accessibility",
              "testing strategies",
            ],
          },
          {
            id: "projectType",
            label: "Project Type",
            type: "text",
            placeholder: "e.g., V0-focused toolkit, React component library",
            description: "The main type of project you're building",
            required: true,
          },
          {
            id: "additionalContext",
            label: "Additional Context",
            type: "textarea",
            placeholder: "Any additional context about the project...",
            description: "Optional additional details about your project",
            required: false,
          },
          {
            id: "action",
            label: "Desired Action",
            type: "select",
            placeholder: "What do you want the AI to do?",
            description: "The primary action you want the AI to perform",
            required: true,
            options: [
              "build out",
              "design and implement",
              "create",
              "develop",
              "architect",
              "optimize",
              "refactor",
              "enhance",
              "prototype",
              "plan and execute",
            ],
          },
          {
            id: "deliverables",
            label: "Deliverables",
            type: "tags",
            placeholder: "Add deliverables",
            description: "Specific outputs or deliverables you need",
            required: true,
            suggestions: [
              "technical framework",
              "UI design",
              "component architecture",
              "API structure",
              "database schema",
              "deployment pipeline",
              "testing suite",
              "documentation",
              "style guide",
              "performance benchmarks",
            ],
          },
          {
            id: "finalProduct",
            label: "Final Product Description",
            type: "text",
            placeholder: "e.g., V0-focused toolkit app, enterprise dashboard",
            description: "Brief description of the final product or application",
            required: true,
          },
        ],
        examples: [
          {
            name: "V0 Toolkit Example",
            description: "Example for building a V0-focused development toolkit",
            values: {
              expertiseType: "dev relations",
              platforms: ["gen-ai coding", "V0", "Cursor", "Bolt"],
              primaryCompany: "Cursor",
              additionalCompanies: ["Loveable", "Bolt", "V0"],
              features: ["best-practices", "demo apps", "developer experience"],
              projectType: "V0-focused toolkit",
              additionalContext:
                " with useful tools, prompts, and best-practices for V0. This will be a combination of file-system structuring and interface visualization.",
              action: "build out",
              deliverables: ["technical framework", "UI design"],
              finalProduct: "V0-focused toolkit",
            },
          },
          {
            name: "Component Library",
            description: "Example for creating a React component library",
            values: {
              expertiseType: "frontend development",
              platforms: ["React", "TypeScript", "Tailwind CSS"],
              primaryCompany: "Vercel",
              additionalCompanies: ["Linear", "Stripe"],
              features: ["component libraries", "design systems", "accessibility"],
              projectType: "React component library",
              additionalContext:
                " focused on accessibility and performance with comprehensive documentation and Storybook integration.",
              action: "design and implement",
              deliverables: ["component architecture", "style guide", "documentation"],
              finalProduct: "enterprise-grade component library",
            },
          },
        ],
      },
      {
        id: "technical-specification",
        name: "Technical Specification",
        description: "Generate detailed technical requirements and specifications for development projects",
        category: "Architecture",
        difficulty: "Advanced",
        estimatedTokens: 200,
        successRate: 88,
        tags: ["technical", "specification", "architecture", "requirements"],
        template: `Create a comprehensive technical specification for {projectName}, a {projectType} that {projectDescription}. 

Requirements:
- Architecture: {architecture}
- Tech Stack: {techStack}
- Key Features: {keyFeatures}
- Performance Requirements: {performanceReqs}
- Security Considerations: {securityReqs}
- Scalability: {scalabilityReqs}

Please provide detailed implementation guidance including file structure, component architecture, API design, and deployment considerations.`,
        fields: [
          {
            id: "projectName",
            label: "Project Name",
            type: "text",
            placeholder: "Enter project name",
            description: "The name of your project",
            required: true,
          },
          {
            id: "projectType",
            label: "Project Type",
            type: "select",
            placeholder: "Select project type",
            description: "The type of application you're building",
            required: true,
            options: [
              "web application",
              "mobile app",
              "desktop application",
              "API service",
              "component library",
              "CLI tool",
              "browser extension",
              "microservice",
              "full-stack application",
              "static site",
            ],
          },
          {
            id: "projectDescription",
            label: "Project Description",
            type: "textarea",
            placeholder: "Describe what your project does...",
            description: "A clear description of your project's purpose and functionality",
            required: true,
          },
          {
            id: "architecture",
            label: "Architecture Pattern",
            type: "multiselect",
            placeholder: "Select architecture patterns",
            description: "Architectural patterns and approaches to use",
            required: true,
            options: [
              "Microservices",
              "Monolithic",
              "Serverless",
              "JAMstack",
              "MVC",
              "Component-based",
              "Event-driven",
              "Layered architecture",
              "Clean architecture",
              "Hexagonal architecture",
            ],
          },
          {
            id: "techStack",
            label: "Technology Stack",
            type: "tags",
            placeholder: "Add technologies",
            description: "Technologies, frameworks, and tools to use",
            required: true,
            suggestions: [
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Express",
              "PostgreSQL",
              "MongoDB",
              "Redis",
              "Docker",
              "AWS",
              "Vercel",
              "Tailwind CSS",
              "Prisma",
              "tRPC",
            ],
          },
          {
            id: "keyFeatures",
            label: "Key Features",
            type: "tags",
            placeholder: "Add key features",
            description: "Main features and capabilities of your application",
            required: true,
            suggestions: [
              "User authentication",
              "Real-time updates",
              "File upload",
              "Search functionality",
              "Data visualization",
              "API integration",
              "Offline support",
              "Push notifications",
              "Multi-language support",
              "Admin dashboard",
            ],
          },
          {
            id: "performanceReqs",
            label: "Performance Requirements",
            type: "multiselect",
            placeholder: "Select performance requirements",
            description: "Performance benchmarks and requirements",
            required: false,
            options: [
              "Sub-second page loads",
              "99.9% uptime",
              "Handle 10k+ concurrent users",
              "Mobile-first performance",
              "Offline functionality",
              "Progressive loading",
              "Optimistic updates",
              "Lazy loading",
              "Code splitting",
              "CDN optimization",
            ],
          },
          {
            id: "securityReqs",
            label: "Security Requirements",
            type: "multiselect",
            placeholder: "Select security requirements",
            description: "Security measures and compliance requirements",
            required: false,
            options: [
              "OAuth 2.0 authentication",
              "JWT tokens",
              "HTTPS only",
              "CSRF protection",
              "XSS prevention",
              "SQL injection protection",
              "Rate limiting",
              "Data encryption",
              "GDPR compliance",
              "SOC 2 compliance",
            ],
          },
          {
            id: "scalabilityReqs",
            label: "Scalability Requirements",
            type: "multiselect",
            placeholder: "Select scalability requirements",
            description: "How the application should scale",
            required: false,
            options: [
              "Horizontal scaling",
              "Vertical scaling",
              "Auto-scaling",
              "Load balancing",
              "Database sharding",
              "Caching strategy",
              "CDN distribution",
              "Microservices ready",
              "Container orchestration",
              "Multi-region deployment",
            ],
          },
        ],
        examples: [
          {
            name: "E-commerce Platform",
            description: "Technical spec for a modern e-commerce platform",
            values: {
              projectName: "ModernShop",
              projectType: "full-stack application",
              projectDescription:
                "enables small businesses to create and manage online stores with integrated payment processing, inventory management, and customer analytics",
              architecture: ["Microservices", "Event-driven"],
              techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe API"],
              keyFeatures: ["User authentication", "Payment processing", "Inventory management", "Analytics dashboard"],
              performanceReqs: ["Sub-second page loads", "Handle 10k+ concurrent users"],
              securityReqs: ["OAuth 2.0 authentication", "HTTPS only", "PCI compliance"],
              scalabilityReqs: ["Horizontal scaling", "Auto-scaling", "CDN distribution"],
            },
          },
        ],
      },
    ]
  }

  generatePrompt(template: PromptTemplate, values: Record<string, string | string[]>): string {
    let prompt = template.template

    // Replace placeholders with actual values
    template.fields.forEach((field) => {
      const value = values[field.id]
      let replacementValue = ""

      if (Array.isArray(value)) {
        if (value.length > 0) {
          replacementValue = value.join(", ")
        }
      } else if (typeof value === "string") {
        replacementValue = value
      }

      // Replace the placeholder in the template
      const placeholder = `{${field.id}}`
      prompt = prompt.replace(new RegExp(placeholder, "g"), replacementValue)
    })

    return prompt
  }

  validateFields(template: PromptTemplate, values: Record<string, string | string[]>): Record<string, string> {
    const errors: Record<string, string> = {}

    template.fields.forEach((field) => {
      const value = values[field.id]

      // Check required fields
      if (field.required) {
        if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === "string" && !value.trim())) {
          errors[field.id] = `${field.label} is required`
          return
        }
      }

      // Validate string fields
      if (typeof value === "string" && value.trim()) {
        if (field.validation?.minLength && value.length < field.validation.minLength) {
          errors[field.id] = `${field.label} must be at least ${field.validation.minLength} characters`
        }
        if (field.validation?.maxLength && value.length > field.validation.maxLength) {
          errors[field.id] = `${field.label} must be no more than ${field.validation.maxLength} characters`
        }
        if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value)) {
          errors[field.id] = `${field.label} format is invalid`
        }
      }
    })

    return errors
  }

  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4)
  }

  saveToHistory(prompt: GeneratedPrompt): void {
    if (typeof window === "undefined") return

    try {
      const history = this.getHistory()
      const updatedHistory = [prompt, ...history.slice(0, 49)] // Keep last 50
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Failed to save prompt to history:", error)
    }
  }

  getHistory(): GeneratedPrompt[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      return parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }))
    } catch (error) {
      console.error("Failed to load prompt history:", error)
      return []
    }
  }

  clearHistory(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear prompt history:", error)
    }
  }
}

export const promptGeneratorService = new PromptGeneratorService()
