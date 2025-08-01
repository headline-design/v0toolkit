export interface Prompt {
  id: string
  title: string
  description: string
  category: "components" | "layouts" | "applications" | "integrations" | "styling"
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  prompt: string
  example?: string
  tips: string[]
  useCase: string
}

export const prompts: Prompt[] = [
  {
    id: "responsive-navbar",
    title: "Responsive Navigation Bar",
    description: "Generate a modern, responsive navigation bar with mobile menu and smooth animations.",
    category: "components",
    difficulty: "beginner",
    tags: ["navigation", "responsive", "mobile-menu", "animations"],
    useCase: "Perfect for any website or application that needs a professional navigation system.",
    prompt: `Create a responsive navigation bar component with the following features:
- Logo on the left side
- Navigation links in the center (Home, About, Services, Contact)
- Mobile hamburger menu that slides in from the right
- Smooth animations for menu transitions
- Active link highlighting
- Sticky navigation on scroll
- Dark mode toggle button
- Use Tailwind CSS for styling
- Make it fully accessible with proper ARIA labels`,
    example:
      "A navigation bar that works seamlessly across desktop, tablet, and mobile devices with smooth animations.",
    tips: [
      "Use useState to manage mobile menu visibility",
      "Implement useEffect for scroll detection",
      "Add proper focus management for accessibility",
      "Consider using Framer Motion for smooth animations",
      "Test on multiple screen sizes",
    ],
  },
  {
    id: "dashboard-layout",
    title: "Admin Dashboard Layout",
    description: "Create a comprehensive admin dashboard layout with sidebar, header, and main content area.",
    category: "layouts",
    difficulty: "intermediate",
    tags: ["dashboard", "admin", "sidebar", "layout"],
    useCase: "Ideal for admin panels, business applications, or any interface requiring organized data display.",
    prompt: `Build a complete admin dashboard layout including:
- Collapsible sidebar with navigation menu
- Top header with user profile dropdown and notifications
- Main content area with breadcrumbs
- Responsive design that works on mobile
- Dark/light theme support
- Search functionality in the header
- Quick stats cards in the main area
- Data table with sorting and filtering
- Use modern design principles and Tailwind CSS
- Include proper TypeScript types`,
    example: "A professional dashboard layout similar to popular admin templates like Tailwind UI or Ant Design.",
    tips: [
      "Use React Context for theme management",
      "Implement proper state management for sidebar collapse",
      "Consider using React Query for data fetching",
      "Add loading states for better UX",
      "Make navigation keyboard accessible",
    ],
  },
  {
    id: "ecommerce-product-page",
    title: "E-commerce Product Page",
    description: "Generate a complete product page with image gallery, reviews, and purchase functionality.",
    category: "applications",
    difficulty: "advanced",
    tags: ["ecommerce", "product", "gallery", "reviews", "cart"],
    useCase: "Essential for online stores, marketplaces, or any product showcase application.",
    prompt: `Create a comprehensive e-commerce product page with:
- Image gallery with zoom functionality and thumbnails
- Product information (title, price, description, specifications)
- Size/color variant selection
- Quantity selector and add to cart button
- Customer reviews and ratings section
- Related products carousel
- Breadcrumb navigation
- Social sharing buttons
- Wishlist functionality
- Mobile-optimized design
- Loading states and error handling
- Use TypeScript and modern React patterns`,
    example: "A product page similar to Amazon or Shopify stores with all essential e-commerce features.",
    tips: [
      "Use React Hook Form for variant selection",
      "Implement image lazy loading for performance",
      "Add proper SEO meta tags",
      "Consider using Zustand for cart state management",
      "Include proper error boundaries",
    ],
  },
  {
    id: "authentication-system",
    title: "Complete Authentication System",
    description: "Build a full authentication system with login, register, password reset, and protected routes.",
    category: "integrations",
    difficulty: "advanced",
    tags: ["auth", "login", "register", "security", "protected-routes"],
    useCase: "Required for most applications that need user accounts and secure access control.",
    prompt: `Implement a complete authentication system featuring:
- Login and registration forms with validation
- Password reset functionality via email
- Email verification for new accounts
- Protected routes and middleware
- User profile management
- Social login options (Google, GitHub)
- JWT token handling and refresh
- Password strength indicator
- Remember me functionality
- Logout from all devices option
- Use NextAuth.js or Supabase Auth
- Include proper error handling and loading states
- TypeScript throughout`,
    example: "A secure authentication system similar to Firebase Auth or Auth0 with all modern features.",
    tips: [
      "Use secure HTTP-only cookies for tokens",
      "Implement proper CSRF protection",
      "Add rate limiting for login attempts",
      "Use Zod for form validation",
      "Test authentication flows thoroughly",
    ],
  },
  {
    id: "data-visualization",
    title: "Interactive Data Visualization",
    description: "Create interactive charts and graphs for displaying complex data with filtering and export options.",
    category: "components",
    difficulty: "intermediate",
    tags: ["charts", "data", "visualization", "interactive", "analytics"],
    useCase: "Perfect for dashboards, reports, or any application that needs to display data insights.",
    prompt: `Build an interactive data visualization component with:
- Multiple chart types (line, bar, pie, area charts)
- Interactive tooltips and legends
- Date range filtering
- Data export to CSV/PDF
- Responsive design for all screen sizes
- Real-time data updates
- Custom color themes
- Zoom and pan functionality
- Animation on data changes
- Loading states and error handling
- Use Chart.js or Recharts library
- TypeScript interfaces for data types
- Accessibility features for screen readers`,
    example: "Interactive charts similar to Google Analytics or business intelligence dashboards.",
    tips: [
      "Optimize for large datasets with virtualization",
      "Use React.memo for performance",
      "Implement proper color contrast for accessibility",
      "Add keyboard navigation support",
      "Consider using Web Workers for heavy calculations",
    ],
  },
]
