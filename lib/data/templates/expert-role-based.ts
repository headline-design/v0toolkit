import { PromptTemplate } from "@/lib/core/types"
import { getAllProjectTypes, ProjectTypeName } from "@/lib/data/project-suggestions"

export const expertRoleBasedTemplate: PromptTemplate = {
  id: "expert-role-based",
  name: "Expert Role-Based Prompt",
  description:
    "Configure V0 as a specialized expert with defined expertise, experience, and deliverables for optimal responses",
  category: "Development",
  difficulty: "intermediate",
  icon: "UserCog",
  tags: ["expert", "role-based", "development", "context"],
  template: `You are a {expertiseType} expert (specializing in {workHistory} platforms) who {primaryWorkExperience} for {primaryCompany} and then worked with {additionalCompanies} on {features}, etc. We are building a {projectType} project{additionalContext}. I want you to {action} the {deliverables} for our {finalProduct}.`,
  fields: [
    {
      id: "projectType",
      label: "Project Type",
      type: "select",
      icon: "FolderOpen",
      placeholder: "Select your project type",
      description: "Choose the type of project you're building to get relevant suggestions",
      required: true,
      category: "Project Context",
      options: getAllProjectTypes().map((p) => p.name),
      validation: {
        required: true,
      },
    },
    {
      id: "expertiseType",
      label: "V0's Area of Expertise",
      type: "select",
      icon: "Target",
      placeholder: "Select V0's area of expertise",
      description: "Define what V0 should be an expert in for this conversation",
      required: true,
      category: "V0 Configuration",
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
      validation: {
        required: true,
      },
    },
    {
      id: "workHistory",
      label: "V0's Work History & Specializations",
      type: "tags",
      icon: "Briefcase",
      placeholder: "Add platforms and technologies V0 has worked with",
      description: "Technologies, platforms, or areas V0 should have professional experience with",
      required: true,
      category: "V0 Configuration",
      suggestions: [], // Will be populated dynamically based on project type
      validation: {
        required: true,
        minItems: 2,
      },
    },
    {
      id: "primaryCompany",
      label: "Primary Company Reference",
      type: "select",
      icon: "Building2",
      placeholder: "Select a well-known company for V0's background",
      description: "A reputable company where V0 did their primary work - this will determine available work experience options",
      required: true,
      category: "V0 Configuration",
      options: [], // Will be populated dynamically based on project type
      validation: {
        required: true,
      },
    },
    {
      id: "primaryWorkExperience",
      label: "V0's Primary Work Experience",
      type: "select",
      icon: "Star",
      placeholder: "Select what V0 built or worked on at the primary company",
      description: "The main type of work or project V0 completed at the selected primary company",
      required: true,
      category: "V0 Configuration",
      options: [
        // Documentation & Content
        "built the documentation website",
        "created the developer documentation platform",
        "developed the knowledge base system",
        "built the technical blog platform",

        // Web & Mobile Applications
        "developed the main web application",
        "built the mobile app",
        "created the progressive web app",
        "developed the customer portal",
        "built the admin dashboard",

        // Platform & Infrastructure
        "architected the core platform",
        "built the API infrastructure",
        "developed the microservices architecture",
        "created the cloud infrastructure",
        "built the DevOps pipeline",

        // E-commerce & Payments
        "built the e-commerce platform",
        "developed the payment processing system",
        "built the payment processing system",
        "created the checkout experience",
        "built the subscription management system",

        // Data & Analytics
        "developed the analytics platform",
        "built the data pipeline",
        "created the reporting dashboard",
        "developed the machine learning models",
        "built the recommendation engine",

        // Design & User Experience
        "designed the user interface",
        "created the design system",
        "built the component library",
        "developed the user experience framework",

        // Developer Tools & APIs
        "built the developer tools",
        "created the SDK",
        "developed the API gateway",
        "built the integration platform",

        // Security & Authentication
        "developed the authentication system",
        "built the security framework",
        "created the identity management system",

        // Content & Communication
        "built the content management system",
        "developed the communication platform",
        "created the collaboration tools",

        // Monitoring & Operations
        "built the monitoring system",
        "developed the logging infrastructure",
        "created the alerting system",
        "built the performance optimization tools",
      ],
      validation: {
        required: true,
      },
    },
    {
      id: "additionalCompanies",
      label: "Additional Companies",
      type: "multiselect",
      icon: "Building",
      placeholder: "Select additional companies for V0's background",
      description: "Other companies V0 worked with after the primary company experience",
      required: false,
      category: "V0 Configuration",
      options: [], // Will be populated dynamically based on project type
    },
    {
      id: "features",
      label: "Key Features/Areas V0 Should Know",
      type: "tags",
      icon: "Lightbulb",
      placeholder: "Add features or areas V0 should have experience with",
      description: "Specific features, practices, or areas V0 worked on at the additional companies",
      required: true,
      category: "Project Requirements",
      suggestions: [], // Will be populated dynamically based on project type
      validation: {
        required: true,
        minItems: 3,
      },
    },
    {
      id: "finalProduct",
      label: "Your Project Description",
      type: "text",
      icon: "Rocket",
      placeholder: "e.g., startup-investor matchmaking platform, fintech mobile app",
      description: "Brief description of the final product or application you're building",
      required: true,
      category: "Project Requirements",
      validation: {
        required: true,
        minLength: 10,
      },
    },
    {
      id: "additionalContext",
      label: "Additional Project Context",
      type: "textarea",
      icon: "FileText",
      placeholder: "Any additional context about your project, target users, or specific requirements...",
      description: "Optional additional details about your project, users, or specific needs",
      required: false,
      category: "Project Requirements",
    },
    {
      id: "action",
      label: "What You Want V0 to Do",
      type: "select",
      icon: "Play",
      placeholder: "What should V0 do for you?",
      description: "The primary action you want V0 to perform",
      required: true,
      category: "Task Definition",
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
        "improve the UI/UX",
        "redesign",
        "modernize",
      ],
      validation: {
        required: true,
      },
    },
    {
      id: "deliverables",
      label: "Expected Deliverables",
      type: "tags",
      icon: "Package",
      placeholder: "Add what you want V0 to deliver",
      description: "Specific outputs or deliverables you need from V0",
      required: true,
      category: "Task Definition",
      suggestions: [], // Will be populated dynamically based on project type
      validation: {
        required: true,
        minItems: 2,
      },
    },
  ],
  examples: [
    {
      name: "V0 Toolkit Example",
      description: "Example for building a V0-focused development toolkit",
      projectType: ProjectTypeName.GenAICoding,
      values: {
        projectType: ProjectTypeName.GenAICoding,
        expertiseType: "dev relations",
        workHistory: ["gen-ai coding", "V0", "Cursor", "Bolt"],
        primaryCompany: "Cursor",
        primaryWorkExperience: "built the documentation website",
        additionalCompanies: ["Loveable", "Bolt", "V0"],
        features: ["best-practices", "demo apps", "developer experience"],
        finalProduct: "V0-focused toolkit",
        additionalContext:
          " with useful tools, prompts, and best-practices for V0. This will be a combination of file-system structuring and interface visualization.",
        action: "build out",
        deliverables: ["technical framework", "UI design"],
      },
    },
    {
      name: "Fintech Investment Platform",
      description: "Example for creating a fintech investment platform",
      projectType: ProjectTypeName.Fintech,
      values: {
        projectType: ProjectTypeName.Fintech,
        expertiseType: "full-stack development",
        workHistory: ["payment processing", "financial analytics", "trading platforms"],
        primaryCompany: "Stripe",
        primaryWorkExperience: "built the payment processing system",
        additionalCompanies: ["Robinhood", "Plaid"],
        features: ["payment processing", "real-time analytics", "investment tracking"],
        finalProduct: "investment tracking platform",
        additionalContext:
          " for retail investors to track their portfolio performance and discover new investment opportunities.",
        action: "design and implement",
        deliverables: ["trading dashboard", "mobile app", "analytics platform"],
      },
    },
    {
      name: "Startup Matchmaking Platform",
      description: "Example for building a startup-investor matchmaking platform",
      projectType: ProjectTypeName.FundraisingTech,
      values: {
        projectType: ProjectTypeName.FundraisingTech,
        expertiseType: "product management",
        workHistory: ["venture capital platforms", "startup accelerators", "investment analytics"],
        primaryCompany: "AngelList",
        primaryWorkExperience: "developed the main web application",
        additionalCompanies: ["Crunchbase", "Y Combinator"],
        features: ["startup discovery", "investor matching", "due diligence workflows"],
        finalProduct: "startup-investor matchmaking platform",
        additionalContext:
          " that connects early-stage startups with relevant investors based on industry, stage, and investment criteria.",
        action: "improve the UI/UX",
        deliverables: ["investor dashboard", "mobile app", "matching algorithm"],
      },
    },
  ],
}
