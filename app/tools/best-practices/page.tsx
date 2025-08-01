"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Lightbulb } from "lucide-react"

const bestPractices = [
  {
    id: "component-design",
    title: "Component Design",
    description: "Best practices for creating reusable, maintainable React components",
    category: "React",
    practices: [
      {
        type: "do",
        title: "Use TypeScript for better type safety",
        description: "Define proper interfaces and types for component props",
        example: "interface ButtonProps { variant: 'primary' | 'secondary'; children: React.ReactNode }",
      },
      {
        type: "do",
        title: "Keep components small and focused",
        description: "Each component should have a single responsibility",
        example: "Split complex components into smaller, focused sub-components",
      },
      {
        type: "dont",
        title: "Don't use inline styles",
        description: "Use CSS classes or styled-components instead",
        example: "Avoid: <div style={{color: 'red'}}> Use: <div className='text-red-500'>",
      },
      {
        type: "warning",
        title: "Be careful with useEffect dependencies",
        description: "Always include all dependencies in the dependency array",
        example: "useEffect(() => { fetchData(userId) }, [userId]) // Include userId",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Techniques for building fast, efficient web applications",
    category: "Performance",
    practices: [
      {
        type: "do",
        title: "Implement code splitting",
        description: "Use dynamic imports to split your bundle",
        example: "const LazyComponent = lazy(() => import('./LazyComponent'))",
      },
      {
        type: "do",
        title: "Optimize images",
        description: "Use next/image for automatic optimization",
        example: "<Image src='/photo.jpg' alt='Photo' width={500} height={300} />",
      },
      {
        type: "dont",
        title: "Don't block the main thread",
        description: "Avoid heavy computations in the main thread",
        example: "Use Web Workers for CPU-intensive tasks",
      },
      {
        type: "tip",
        title: "Use React.memo for expensive components",
        description: "Prevent unnecessary re-renders of expensive components",
        example: "const ExpensiveComponent = React.memo(({ data }) => { ... })",
      },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility (a11y)",
    description: "Making your applications accessible to all users",
    category: "Accessibility",
    practices: [
      {
        type: "do",
        title: "Use semantic HTML elements",
        description: "Choose the right HTML element for the content",
        example: "Use <button> for actions, <a> for navigation",
      },
      {
        type: "do",
        title: "Provide alt text for images",
        description: "Describe the content and purpose of images",
        example: "<img src='chart.png' alt='Sales increased 25% this quarter' />",
      },
      {
        type: "dont",
        title: "Don't rely only on color",
        description: "Use multiple visual cues to convey information",
        example: "Use icons, patterns, or text in addition to color",
      },
      {
        type: "warning",
        title: "Ensure keyboard navigation works",
        description: "All interactive elements should be keyboard accessible",
        example: "Test your app using only the keyboard",
      },
    ],
  },
  {
    id: "security",
    title: "Security Best Practices",
    description: "Protecting your applications and user data",
    category: "Security",
    practices: [
      {
        type: "do",
        title: "Sanitize user input",
        description: "Always validate and sanitize data from users",
        example: "Use libraries like DOMPurify for HTML sanitization",
      },
      {
        type: "do",
        title: "Use HTTPS everywhere",
        description: "Encrypt all data in transit",
        example: "Configure your server to redirect HTTP to HTTPS",
      },
      {
        type: "dont",
        title: "Don't store sensitive data in localStorage",
        description: "Use secure, httpOnly cookies for sensitive information",
        example: "Store JWT tokens in httpOnly cookies, not localStorage",
      },
      {
        type: "warning",
        title: "Implement proper CORS policies",
        description: "Configure CORS to allow only trusted domains",
        example: "Don't use '*' for Access-Control-Allow-Origin in production",
      },
    ],
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "do":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "dont":
      return <XCircle className="h-4 w-4 text-red-600" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "tip":
      return <Lightbulb className="h-4 w-4 text-blue-600" />
    default:
      return <CheckCircle className="h-4 w-4 text-green-600" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "do":
      return "border-l-green-500 bg-green-50 dark:bg-green-950"
    case "dont":
      return "border-l-red-500 bg-red-50 dark:bg-red-950"
    case "warning":
      return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950"
    case "tip":
      return "border-l-blue-500 bg-blue-50 dark:bg-blue-950"
    default:
      return "border-l-green-500 bg-green-50 dark:bg-green-950"
  }
}

export default function ToolsBestPracticesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Best Practices</h1>
          <p className="text-lg text-muted-foreground">
            Development guidelines and conventions for maintainable, high-quality code
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>{bestPractices.length} categories</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Community curated</span>
          </div>
        </div>
      </div>

      {/* Best Practices Sections */}
      <div className="space-y-8">
        {bestPractices.map((section) => (
          <Card key={section.id} className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
                <Badge variant="outline">{section.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.practices.map((practice, index) => (
                  <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getTypeColor(practice.type)}`}>
                    <div className="flex items-start space-x-3">
                      {getIcon(practice.type)}
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-sm">{practice.title}</h4>
                        <p className="text-sm text-muted-foreground">{practice.description}</p>
                        {practice.example && (
                          <div className="bg-muted p-2 rounded text-xs font-mono">{practice.example}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Recommended practice</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span>Avoid this pattern</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>Important warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <span>Helpful tip</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
