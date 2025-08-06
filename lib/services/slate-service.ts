import type { SlateItem, SlateProject, ProjectTemplate } from "@/lib/types/slate"

class SlateService {
  private currentProject: SlateProject | null = null

  // Project Management
  createProject(name: string, template?: ProjectTemplate): SlateProject {
    const project: SlateProject = {
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: template?.description || "",
      tags: template?.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        defaultPromptType: "create",
        defaultCategory: "Components",
        autoSave: true,
      },
    }

    this.currentProject = project
    localStorage.setItem("slate-current-project", JSON.stringify(project))

    // Save to projects list
    const projects = this.getProjects()
    projects.push(project)
    localStorage.setItem("slate-projects", JSON.stringify(projects))

    return project
  }

  getCurrentProject(): SlateProject | null {
    if (this.currentProject) return this.currentProject

    const saved = localStorage.getItem("slate-current-project")
    if (saved) {
      try {
        this.currentProject = JSON.parse(saved)
        return this.currentProject
      } catch (error) {
        console.error("Failed to load current project:", error)
      }
    }
    return null
  }

  getProjects(): SlateProject[] {
    const saved = localStorage.getItem("slate-projects")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error("Failed to load projects:", error)
      }
    }
    return []
  }

  // Token Estimation
  estimateTokens(content: string): number {
    if (!content) return 0
    // Rough estimation: ~4 characters per token
    return Math.ceil(content.length / 4)
  }

  // Prompt Formatting
  formatPromptForV0(item: SlateItem): string {
    if (item.type !== "prompt") return item.content || ""

    let formatted = ""

    if (item.category) {
      formatted += `Category: ${item.category}\n`
    }

    if (item.promptType) {
      formatted += `Type: ${item.promptType}\n`
    }

    if (item.tags && item.tags.length > 0) {
      formatted += `Tags: ${item.tags.join(", ")}\n`
    }

    formatted += "\n"
    formatted += item.content || ""

    return formatted
  }

  // Export/Import
  exportProject(project: SlateProject, items: SlateItem[]): string {
    const exportData = {
      project,
      items,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    }
    return JSON.stringify(exportData, null, 2)
  }

  importProject(data: string): { project: SlateProject; items: SlateItem[] } {
    const parsed = JSON.parse(data)
    return {
      project: parsed.project,
      items: parsed.items,
    }
  }

  // Project Templates
  getProjectTemplates(): ProjectTemplate[] {
    return [
      {
        id: "dashboard-template",
        name: "Dashboard Project",
        description: "Complete dashboard with charts, tables, and analytics components",
        category: "Web App",
        difficulty: "intermediate",
        icon: "BarChart3",
        tags: ["dashboard", "analytics", "charts", "tables"],
        items: [
          {
            id: "temp-1",
            type: "prompt",
            title: "Dashboard Layout",
            content:
              "Create a modern dashboard layout with sidebar navigation, header with user profile, and main content area with grid layout for widgets",
            category: "Layout",
            promptType: "create",
            tags: ["layout", "dashboard", "sidebar"],
            estimatedTokens: 45,
            version: 1,
            x: 100,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-2",
            type: "prompt",
            title: "Analytics Charts",
            content:
              "Build interactive charts including line chart for trends, bar chart for comparisons, and pie chart for distributions using recharts",
            category: "Components",
            promptType: "create",
            tags: ["charts", "analytics", "recharts"],
            estimatedTokens: 38,
            version: 1,
            x: 400,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-3",
            type: "prompt",
            title: "Data Table",
            content: "Create a sortable, filterable data table with pagination, search, and export functionality",
            category: "Components",
            promptType: "create",
            tags: ["table", "data", "pagination"],
            estimatedTokens: 32,
            version: 1,
            x: 100,
            y: 300,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-4",
            type: "note",
            title: "Design Notes",
            content:
              "Color scheme: Use blue (#3B82F6) as primary, gray (#6B7280) as secondary. Keep consistent spacing with 4px grid system.",
            x: 400,
            y: 300,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: "ecommerce-template",
        name: "E-commerce Store",
        description: "Full e-commerce solution with product catalog, cart, and checkout",
        category: "E-commerce",
        difficulty: "advanced",
        icon: "ShoppingCart",
        tags: ["ecommerce", "shopping", "products", "cart"],
        items: [
          {
            id: "temp-5",
            type: "prompt",
            title: "Product Catalog",
            content:
              "Create a responsive product grid with filtering by category, price range, and ratings. Include product cards with images, titles, prices, and quick actions",
            category: "Pages",
            promptType: "create",
            tags: ["products", "catalog", "filtering"],
            estimatedTokens: 42,
            version: 1,
            x: 100,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-6",
            type: "prompt",
            title: "Shopping Cart",
            content:
              "Build a shopping cart component with add/remove items, quantity adjustment, price calculation, and persistent storage",
            category: "Components",
            promptType: "create",
            tags: ["cart", "shopping", "storage"],
            estimatedTokens: 35,
            version: 1,
            x: 400,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-7",
            type: "folder",
            title: "Checkout Process",
            items: [
              {
                id: "temp-8",
                type: "prompt",
                title: "Checkout Form",
                content: "Create multi-step checkout form with shipping info, payment details, and order review",
                category: "Components",
                promptType: "create",
                tags: ["checkout", "form", "payment"],
                estimatedTokens: 40,
                version: 1,
                x: 0,
                y: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            x: 100,
            y: 300,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: "landing-template",
        name: "Landing Page",
        description: "High-converting landing page with hero, features, testimonials, and CTA",
        category: "Marketing",
        difficulty: "beginner",
        icon: "Rocket",
        tags: ["landing", "marketing", "conversion", "hero"],
        items: [
          {
            id: "temp-9",
            type: "prompt",
            title: "Hero Section",
            content:
              "Create a compelling hero section with headline, subheadline, CTA button, and background image or video",
            category: "Sections",
            promptType: "create",
            tags: ["hero", "cta", "headline"],
            estimatedTokens: 30,
            version: 1,
            x: 100,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-10",
            type: "prompt",
            title: "Features Section",
            content: "Build a features section with icons, titles, descriptions in a 3-column grid layout",
            category: "Sections",
            promptType: "create",
            tags: ["features", "grid", "icons"],
            estimatedTokens: 28,
            version: 1,
            x: 400,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: "saas-template",
        name: "SaaS Application",
        description: "Complete SaaS app with authentication, dashboard, and billing",
        category: "SaaS",
        difficulty: "advanced",
        icon: "Crown",
        tags: ["saas", "auth", "billing", "subscription"],
        items: [
          {
            id: "temp-11",
            type: "prompt",
            title: "Authentication System",
            content:
              "Implement complete auth system with login, register, forgot password, and protected routes using NextAuth",
            category: "Features",
            promptType: "create",
            tags: ["auth", "nextauth", "login"],
            estimatedTokens: 45,
            version: 1,
            x: 100,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "temp-12",
            type: "prompt",
            title: "Billing Integration",
            content:
              "Add Stripe integration for subscription billing with pricing plans, payment methods, and invoice management",
            category: "Integrations",
            promptType: "create",
            tags: ["stripe", "billing", "subscription"],
            estimatedTokens: 50,
            version: 1,
            x: 400,
            y: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ]
  }
}

export const slateService = new SlateService()
