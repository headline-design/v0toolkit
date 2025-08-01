import type { PromptTemplate } from "./types"

export const componentPrompts: PromptTemplate[] = [
  {
    id: "hero-section",
    title: "Hero Section",
    description: "Conversion-optimized hero sections with clear value propositions",
    category: "Layout",
    difficulty: "Beginner",
    prompt: `Create a modern hero section with:
- Compelling headline that clearly states the main benefit
- Supporting subheading (1-2 sentences) explaining the value proposition
- Primary CTA button and secondary "Learn More" button
- Trust indicators (customer logos, testimonials, or stats)
- Responsive design that works on mobile and desktop
- Subtle background gradient or pattern
- Professional typography hierarchy
- Accessibility features (proper heading structure, alt text)
- Loading states and smooth animations`,
    tags: ["landing-page", "conversion", "responsive"],
  },
  {
    id: "dashboard-layout",
    title: "Dashboard Layout",
    description: "Data-rich dashboard interfaces with metrics and visualizations",
    category: "Layout",
    difficulty: "Intermediate",
    prompt: `Build a comprehensive dashboard with:
- Header with user profile, notifications, and search
- Collapsible sidebar navigation with icons and labels
- Main content area with metric cards showing KPIs
- Interactive charts (bar chart, line chart, pie chart)
- Data tables with sorting, filtering, and pagination
- Recent activity feed or timeline
- Responsive grid layout that adapts to screen size
- Dark mode support with proper contrast
- Loading skeletons for data fetching states
- Export functionality for reports
- Real-time data updates with WebSocket integration`,
    tags: ["dashboard", "analytics", "data-visualization"],
  },
  {
    id: "auth-forms",
    title: "Authentication Forms",
    description: "Complete authentication system with validation and error handling",
    category: "Forms",
    difficulty: "Intermediate",
    prompt: `Create a complete authentication system with:
- Login form with email/username and password fields
- Registration form with validation (name, email, password, confirm password)
- Password strength indicator and requirements
- Form validation with real-time feedback and error messages
- Loading states during form submission
- Success and error notifications
- "Remember me" checkbox and "Forgot password" link
- Social login buttons (Google, GitHub, Apple)
- Two-factor authentication setup
- Password reset flow with email verification
- Responsive design with mobile-friendly inputs
- Accessibility features (proper labels, ARIA attributes)
- Security best practices (CSRF protection, rate limiting)`,
    tags: ["authentication", "forms", "security"],
  },
  {
    id: "product-grid",
    title: "E-commerce Product Grid",
    description: "Product listing with advanced filtering and search capabilities",
    category: "E-commerce",
    difficulty: "Advanced",
    prompt: `Build an e-commerce product grid with:
- Product cards showing image, title, price, rating, and quick actions
- Advanced search with autocomplete and suggestions
- Multi-level category filtering (sidebar or dropdown)
- Price range slider and brand filters
- Sort options (price, rating, newest, popularity, relevance)
- Grid/list view toggle with different layouts
- Infinite scroll or pagination with URL state management
- Add to cart with quantity selector and size/color variants
- Wishlist/favorites functionality with heart icon
- Quick view modal with product details
- Stock status indicators and availability
- Responsive grid (1-4 columns based on screen size)
- Loading states, empty states, and error handling
- SEO optimization with structured data
- Performance optimization with image lazy loading`,
    tags: ["e-commerce", "filtering", "search", "performance"],
  },
  {
    id: "data-table",
    title: "Data Table",
    description: "Sortable, filterable data tables with advanced features",
    category: "Layout",
    difficulty: "Intermediate",
    prompt: `Create a comprehensive data table with:
- Column sorting (ascending, descending, none)
- Global search across all columns
- Column-specific filtering with appropriate input types
- Pagination with configurable page sizes
- Row selection (single and multiple)
- Bulk actions for selected rows
- Column visibility toggle
- Responsive design with horizontal scrolling
- Loading states and skeleton rows
- Empty state with helpful messaging
- Export functionality (CSV, PDF)
- Inline editing capabilities
- Row expansion for detailed views
- Sticky headers for long tables
- Accessibility features (ARIA labels, keyboard navigation)`,
    tags: ["table", "data", "sorting", "filtering"],
  },
  {
    id: "navigation-menu",
    title: "Navigation Menu",
    description: "Responsive navigation with dropdowns and mobile support",
    category: "Navigation",
    difficulty: "Beginner",
    prompt: `Build a responsive navigation menu with:
- Logo/brand area on the left
- Horizontal menu items for desktop
- Dropdown menus for nested navigation
- Mobile hamburger menu with slide-out drawer
- Active state indicators for current page
- Smooth animations and transitions
- Search functionality integrated into nav
- User profile dropdown with avatar
- Dark mode toggle button
- Accessibility features (keyboard navigation, ARIA)
- Sticky/fixed positioning options
- Breadcrumb integration for deep pages`,
    tags: ["navigation", "responsive", "mobile", "dropdown"],
  },
]
