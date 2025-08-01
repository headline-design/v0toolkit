import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Code2,
  FileText,
  Layers,
  Zap,
  Shield,
  Gauge,
} from "lucide-react"

export default function BestPracticesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Code2 className="mr-2 h-3.5 w-3.5" />
              Best Practices
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Professional Development Standards
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Industry-proven practices for building maintainable, scalable, and performant V0 applications. Learn from
              teams shipping production software.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Prompting Excellence */}
          <div className="space-y-8 mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center justify-center">
                <FileText className="w-6 h-6 mr-2" />
                Effective Prompting
              </h2>
              <p className="text-muted-foreground">
                Master the art of communicating with V0 for consistent, high-quality results.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Do's Card */}
              <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                <div className="p-6">
                  <div className="flex items-center text-green-700 dark:text-green-300 mb-4">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Effective Prompting Techniques</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Be specific about functionality",
                        description:
                          '"Create a todo app with add, edit, delete, mark complete, and filter by status" vs "Create a todo app"',
                      },
                      {
                        title: "Specify design requirements",
                        description:
                          "Include color schemes, layout preferences, responsive behavior, and accessibility needs",
                      },
                      {
                        title: "Mention integrations early",
                        description:
                          '"Include Supabase authentication" or "Connect to Stripe for payments" in the initial prompt',
                      },
                      {
                        title: "Provide context and constraints",
                        description: "Mention target audience, performance requirements, and technical limitations",
                      },
                      {
                        title: "Iterate incrementally",
                        description: "Start with core functionality, then add features one by one with focused prompts",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Don'ts Card */}
              <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                <div className="p-6">
                  <div className="flex items-center text-red-700 dark:text-red-300 mb-4">
                    <XCircle className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Common Prompting Mistakes</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Don't be overly vague",
                        description: '"Make it look good" or "Add some styling" doesn\'t provide actionable guidance',
                      },
                      {
                        title: "Don't request everything at once",
                        description: "Break complex applications into smaller, manageable pieces for better results",
                      },
                      {
                        title: "Don't ignore accessibility",
                        description:
                          "Always consider screen readers, keyboard navigation, and ARIA labels from the start",
                      },
                      {
                        title: "Don't forget error handling",
                        description: "Specify how errors should be handled and what feedback users should see",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Project Structure */}
          <div className="space-y-8 mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center justify-center">
                <Layers className="w-6 h-6 mr-2" />
                Project Organization
              </h2>
              <p className="text-muted-foreground">
                Structure your projects for long-term maintainability and team collaboration.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
                <div className="p-6">
                  <div className="flex items-center text-blue-700 dark:text-blue-300 mb-4">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">File Organization</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      "Use kebab-case for file names (user-profile-form.tsx)",
                      "Group related components by feature, not by type",
                      "Keep components close to where they're used",
                      "Use descriptive names that explain purpose",
                      "Separate business logic into custom hooks",
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
                <div className="p-6">
                  <div className="flex items-center text-purple-700 dark:text-purple-300 mb-4">
                    <Code2 className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Code Organization</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      "Use Server Components by default, Client Components when needed",
                      "Implement proper error boundaries and loading states",
                      "Create reusable utility functions in lib/ directory",
                      "Use TypeScript for better development experience",
                      "Follow consistent import ordering and grouping",
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Performance & Security */}
          <div className="space-y-8 mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center justify-center">
                <Gauge className="w-6 h-6 mr-2" />
                Performance & Security
              </h2>
              <p className="text-muted-foreground">Build fast, secure applications that scale with your users.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <div className="p-6">
                  <div className="flex items-center text-foreground mb-4">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    <h3 className="font-semibold">Performance Optimization</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      {
                        title: "Image Optimization",
                        description: "Always use Next.js Image component with proper sizing and lazy loading",
                      },
                      {
                        title: "Bundle Optimization",
                        description: "Use dynamic imports for heavy components and libraries",
                      },
                      {
                        title: "Caching Strategy",
                        description: "Implement proper caching for API responses and static assets",
                      },
                      {
                        title: "Database Queries",
                        description: "Optimize queries and implement pagination for large datasets",
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center text-foreground mb-4">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    <h3 className="font-semibold">Security Best Practices</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    {[
                      {
                        title: "Authentication",
                        description: "Use established auth providers and implement proper session management",
                      },
                      {
                        title: "Data Validation",
                        description: "Validate all inputs on both client and server side",
                      },
                      {
                        title: "Environment Variables",
                        description: "Never expose sensitive data in client-side code",
                      },
                      {
                        title: "HTTPS & CSP",
                        description: "Always use HTTPS and implement Content Security Policy headers",
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Pro Tips */}
          <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border-primary/20">
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Critical Success Factors</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Development Process</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Start with wireframes and user flows</li>
                        <li>• Build incrementally and test frequently</li>
                        <li>• Use version control from day one</li>
                        <li>• Document decisions and architecture</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Quality Assurance</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Test on multiple devices and browsers</li>
                        <li>• Validate accessibility with screen readers</li>
                        <li>• Monitor performance in production</li>
                        <li>• Implement error tracking and logging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
