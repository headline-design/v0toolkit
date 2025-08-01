export interface Example {
  id: string
  title: string
  description: string
  category: "productivity" | "ecommerce" | "dashboard" | "social" | "portfolio" | "blog"
  difficulty: "beginner" | "intermediate" | "advanced"
  buildTime: string
  complexity: "simple" | "moderate" | "complex"
  techStack: string[]
  features: string[]
  demoUrl?: string
  sourceUrl?: string
  tags: string[]
}

export const examples: Example[] = [
  {
    id: "task-manager",
    title: "Task Management App",
    description:
      "A comprehensive task management application with drag-and-drop functionality, due dates, and team collaboration features.",
    category: "productivity",
    difficulty: "intermediate",
    buildTime: "2-3 hours",
    complexity: "moderate",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "React DnD"],
    features: [
      "Drag and drop task organization",
      "Due date tracking and notifications",
      "Team collaboration and assignments",
      "Project categorization",
      "Progress tracking and analytics",
      "Real-time updates",
    ],
    tags: ["productivity", "collaboration", "drag-drop", "real-time"],
    demoUrl: "https://task-manager-demo.vercel.app",
    sourceUrl: "https://github.com/example/task-manager",
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description:
      "A full-featured online store with product catalog, shopping cart, payment processing, and order management.",
    category: "ecommerce",
    difficulty: "advanced",
    buildTime: "4-6 hours",
    complexity: "complex",
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "NextAuth"],
    features: [
      "Product catalog with search and filters",
      "Shopping cart and wishlist",
      "Secure payment processing",
      "Order tracking and history",
      "User authentication and profiles",
      "Admin dashboard for inventory",
      "Email notifications",
      "Responsive design",
    ],
    tags: ["ecommerce", "payments", "authentication", "admin"],
    demoUrl: "https://store-demo.vercel.app",
    sourceUrl: "https://github.com/example/ecommerce-store",
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization, custom reports, and interactive charts.",
    category: "dashboard",
    difficulty: "advanced",
    buildTime: "3-4 hours",
    complexity: "complex",
    techStack: ["Next.js", "TypeScript", "Chart.js", "React Query", "Tailwind CSS"],
    features: [
      "Real-time data visualization",
      "Interactive charts and graphs",
      "Custom date range filtering",
      "Export reports to PDF/CSV",
      "Responsive grid layout",
      "Dark/light theme toggle",
      "Performance metrics tracking",
    ],
    tags: ["dashboard", "analytics", "charts", "real-time"],
    demoUrl: "https://analytics-demo.vercel.app",
    sourceUrl: "https://github.com/example/analytics-dashboard",
  },
  {
    id: "social-media-app",
    title: "Social Media Platform",
    description:
      "A modern social media application with posts, comments, likes, real-time messaging, and user profiles.",
    category: "social",
    difficulty: "advanced",
    buildTime: "5-7 hours",
    complexity: "complex",
    techStack: ["Next.js", "TypeScript", "Socket.io", "Supabase", "Cloudinary"],
    features: [
      "User posts with images and videos",
      "Real-time commenting and likes",
      "Direct messaging system",
      "User profiles and following",
      "News feed algorithm",
      "Image and video upload",
      "Push notifications",
      "Mobile-responsive design",
    ],
    tags: ["social", "real-time", "messaging", "media-upload"],
    demoUrl: "https://social-demo.vercel.app",
    sourceUrl: "https://github.com/example/social-media",
  },
  {
    id: "portfolio-website",
    title: "Developer Portfolio",
    description:
      "A stunning portfolio website showcasing projects, skills, and experience with smooth animations and modern design.",
    category: "portfolio",
    difficulty: "beginner",
    buildTime: "1-2 hours",
    complexity: "simple",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    features: [
      "Responsive design",
      "Smooth scroll animations",
      "Project showcase gallery",
      "Skills and experience timeline",
      "Contact form with validation",
      "Dark/light theme",
      "SEO optimized",
      "Fast loading performance",
    ],
    tags: ["portfolio", "animations", "responsive", "seo"],
    demoUrl: "https://portfolio-demo.vercel.app",
    sourceUrl: "https://github.com/example/portfolio",
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description:
      "A feature-rich blog platform with markdown support, comments, categories, and content management system.",
    category: "blog",
    difficulty: "intermediate",
    buildTime: "3-4 hours",
    complexity: "moderate",
    techStack: ["Next.js", "TypeScript", "MDX", "Prisma", "NextAuth"],
    features: [
      "Markdown/MDX content support",
      "Comment system with moderation",
      "Category and tag organization",
      "Search functionality",
      "Author profiles and bios",
      "RSS feed generation",
      "SEO optimization",
      "Admin content management",
    ],
    tags: ["blog", "markdown", "cms", "seo"],
    demoUrl: "https://blog-demo.vercel.app",
    sourceUrl: "https://github.com/example/blog-platform",
  },
]
