import type { PromptTemplate } from "./types"

export const integrationPrompts: PromptTemplate[] = [
  {
    id: "supabase-auth",
    title: "Supabase Authentication",
    description: "Complete authentication setup with Supabase backend",
    category: "Database",
    difficulty: "Intermediate",
    prompt: `Implement comprehensive Supabase authentication with:
- User registration and login with email/password
- Email verification flow with custom email templates
- Password reset functionality with secure token handling
- Social authentication (Google, GitHub, Apple, Discord)
- Protected routes with middleware authentication checks
- User profile management with avatar upload
- Role-based access control (RBAC) with custom claims
- Session management with automatic token refresh
- Multi-factor authentication (MFA) setup
- Account deletion and data export functionality
- Admin panel for user management
- Audit logging for security events
- Rate limiting for authentication endpoints
- Custom authentication flows (magic links, phone OTP)
- Integration with Next.js App Router and Server Components
- Client and server-side authentication helpers
- Error handling with user-friendly messages
- Loading states and optimistic updates
- Responsive design for all authentication screens
- Accessibility compliance for form elements
- Security best practices (CSRF protection, secure cookies)`,
    tags: ["supabase", "authentication", "security", "backend"],
  },
  {
    id: "stripe-payments",
    title: "Stripe Payment Integration",
    description: "Complete e-commerce checkout with subscription support",
    category: "Payments",
    difficulty: "Advanced",
    prompt: `Create a comprehensive Stripe payment system with:
- Product catalog with pricing, images, and descriptions
- Shopping cart functionality with quantity management
- Secure checkout flow using Stripe Elements
- Multiple payment methods (cards, Apple Pay, Google Pay, SEPA)
- Subscription management with multiple pricing tiers
- Customer portal for managing subscriptions and payment methods
- Invoice generation and automatic email delivery
- Webhook handling for payment events (success, failure, disputes)
- Tax calculation with automatic tax collection
- Discount codes and promotional pricing
- Recurring billing with proration and upgrades/downgrades
- Failed payment handling with retry logic
- Refund processing through admin interface
- Analytics dashboard with revenue metrics and customer insights
- Multi-currency support with automatic conversion
- Compliance features (PCI DSS, GDPR, data retention)
- Mobile-responsive checkout with optimized conversion
- A/B testing for checkout flow optimization
- Integration with accounting systems (QuickBooks, Xero)
- Customer communication (payment confirmations, receipts)
- Fraud detection and prevention measures
- Performance optimization for fast checkout experience`,
    tags: ["stripe", "payments", "subscriptions", "e-commerce"],
  },
  {
    id: "openai-integration",
    title: "OpenAI API Integration",
    description: "AI-powered features using OpenAI's GPT models",
    category: "AI",
    difficulty: "Intermediate",
    prompt: `Integrate OpenAI API for AI-powered features with:
- Text generation with customizable prompts and parameters
- Chat completion interface with conversation history
- Content summarization and key point extraction
- Language translation with context awareness
- Code generation and explanation features
- Image generation using DALL-E integration
- Text-to-speech and speech-to-text capabilities
- Content moderation and safety filtering
- Custom fine-tuned model integration
- Streaming responses for real-time interaction
- Token usage tracking and cost management
- Rate limiting and error handling
- User context and conversation memory
- Multiple model selection (GPT-3.5, GPT-4, etc.)
- Prompt engineering and optimization
- Response caching for improved performance
- Integration with existing user authentication
- Analytics and usage reporting
- A/B testing for different prompts
- Fallback mechanisms for API failures`,
    tags: ["openai", "ai", "gpt", "machine-learning"],
  },
  {
    id: "vercel-deployment",
    title: "Vercel Deployment Setup",
    description: "Complete deployment pipeline with Vercel platform",
    category: "Deployment",
    difficulty: "Beginner",
    prompt: `Set up comprehensive Vercel deployment with:
- Automatic deployments from Git repository
- Environment variable management for different stages
- Custom domain configuration with SSL certificates
- Preview deployments for pull requests
- Edge functions for server-side logic
- Static file optimization and CDN distribution
- Database integration (Vercel Postgres, external databases)
- Analytics and performance monitoring
- A/B testing with Vercel's edge network
- Serverless function deployment
- Build optimization and caching strategies
- Integration with CI/CD pipelines
- Custom build commands and output configuration
- Redirects and rewrites configuration
- Security headers and CSP setup
- Performance budgets and monitoring
- Team collaboration and access controls
- Rollback capabilities for failed deployments
- Integration with monitoring services (Sentry, LogRocket)
- Cost optimization and usage monitoring`,
    tags: ["vercel", "deployment", "hosting", "devops"],
  },
]
