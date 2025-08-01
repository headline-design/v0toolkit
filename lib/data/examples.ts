export interface Example {
  id: string
  title: string
  description: string
  category: string
  techStack: string[]
  features: string[]
  demoUrl?: string
  sourceUrl: string
  complexity: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
}

export const examples: Example[] = [
  {
    id: "dashboard-analytics",
    title: "Analytics Dashboard",
    description: "A comprehensive analytics dashboard with charts, metrics, and real-time data visualization.",
    category: "Dashboard",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "shadcn/ui"],
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Responsive design",
      "Dark mode support",
      "Export functionality",
    ],
    demoUrl: "https://v0toolkit-analytics.vercel.app",
    sourceUrl: "https://github.com/headline-design/v0toolkit/tree/main/examples/analytics-dashboard",
    complexity: "Advanced",
    tags: ["dashboard", "analytics", "charts", "real-time"],
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description: "A modern e-commerce storefront with product catalog, shopping cart, and checkout flow.",
    category: "E-commerce",
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma", "shadcn/ui"],
    features: [
      "Product catalog with search",
      "Shopping cart functionality",
      "Stripe payment integration",
      "User authentication",
      "Order management",
    ],
    demoUrl: "https://v0toolkit-store.vercel.app",
    sourceUrl: "https://github.com/headline-design/v0toolkit/tree/main/examples/ecommerce-store",
    complexity: "Advanced",
    tags: ["ecommerce", "payments", "authentication", "database"],
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "A full-featured blog platform with markdown support, comments, and author management.",
    category: "Content",
    techStack: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "Contentlayer"],
    features: ["Markdown/MDX support", "Syntax highlighting", "Comment system", "Author profiles", "SEO optimization"],
    demoUrl: "https://v0toolkit-blog.vercel.app",
    sourceUrl: "https://github.com/headline-design/v0toolkit/tree/main/examples/blog-platform",
    complexity: "Intermediate",
    tags: ["blog", "markdown", "content", "seo"],
  },
  {
    id: "task-manager",
    title: "Task Management App",
    description: "A collaborative task management application with boards, lists, and team features.",
    category: "Productivity",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    features: [
      "Drag and drop interface",
      "Real-time collaboration",
      "Team management",
      "File attachments",
      "Activity tracking",
    ],
    demoUrl: "https://v0toolkit-tasks.vercel.app",
    sourceUrl: "https://github.com/headline-design/v0toolkit/tree/main/examples/task-manager",
    complexity: "Advanced",
    tags: ["productivity", "collaboration", "real-time", "drag-drop"],
  },
  {
    id: "landing-page",
    title: "SaaS Landing Page",
    description: "A high-converting SaaS landing page with pricing, testimonials, and feature sections.",
    category: "Marketing",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    features: ["Hero section with CTA", "Feature showcase", "Pricing tables", "Customer testimonials", "Contact forms"],
    demoUrl: "https://v0toolkit-landing.vercel.app",
    sourceUrl: "https://github.com/headline-design/v0toolkit/tree/main/examples/saas-landing",
    complexity: "Beginner",
    tags: ["landing-page", "marketing", "saas", "conversion"],
  },
  {
    id: "chat-application",
    title: "Real-time Chat App",
    description: "A modern chat application with real-time messaging, file sharing, and group chats.",
    category: "Communication",
    techStack: ["Next.js", "Socket.io", "TypeScript", "Tailwind CSS", "Redis"],
    features: [
      "Real-time messaging",
      "File and image sharing",
      "Group chat support",
      "Message history",
      "Online status indicators",
    ],
    demoUrl: "https://v0toolkit-chat.vercel.app",
    sourceUrl: "https://github.com/headline-design/v0toolkit/tree/main/examples/chat-app",
    complexity: "Advanced",
    tags: ["chat", "real-time", "websockets", "communication"],
  },
]

export const exampleCategories = [
  "All",
  "Dashboard",
  "E-commerce",
  "Content",
  "Productivity",
  "Marketing",
  "Communication",
]

export const complexityLevels = ["All", "Beginner", "Intermediate", "Advanced"]
