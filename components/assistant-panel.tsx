"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  BookOpen,
  Zap,
  Target,
  Users,
  Star,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  Settings,
  PanelRightOpen,
  CheckCircle,
  Sparkles,
  Copy,
} from "lucide-react"

interface AssistantPanelProps {
  isOpen: boolean
  onToggle: () => void
  isMobile: boolean
}

export function AssistantPanel({ isOpen, onToggle, isMobile }: AssistantPanelProps) {
  const [activeTab, setActiveTab] = useState("tips")

  const tips = [
    {
      icon: <Target className="h-4 w-4" />,
      title: "Be Specific About Your Goals",
      description: "The more specific your requirements, the better V0 will understand your needs.",
      example: "Instead of 'make a button', try 'create a primary CTA button with hover effects and loading state'",
      category: "clarity",
    },
    {
      icon: <Code className="h-4 w-4" />,
      title: "Include Technical Context",
      description: "Provide context about your project, tech stack, and constraints.",
      example: "Building a Next.js 14 app with TypeScript, Tailwind CSS, and shadcn/ui components",
      category: "technical",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Define Your Experience Level",
      description: "Clearly state your expertise level and what kind of help you need.",
      example: "I'm a beginner developer learning React hooks and need detailed explanations",
      category: "context",
    },
    {
      icon: <Palette className="h-4 w-4" />,
      title: "Describe Design Requirements",
      description: "Include visual preferences, brand guidelines, and accessibility needs.",
      example: "Modern, minimalist design with high contrast for accessibility, using blue as primary color",
      category: "design",
    },
    {
      icon: <Database className="h-4 w-4" />,
      title: "Specify Data Structure",
      description: "When working with data, describe the structure and relationships clearly.",
      example: "User object with id, name, email, and nested profile object containing avatar and preferences",
      category: "data",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Mention Performance Needs",
      description: "If performance is critical, mention optimization requirements upfront.",
      example: "This component will render 1000+ items, so virtualization and memoization are important",
      category: "performance",
    },
  ]

  const resources = [
    {
      title: "V0 Documentation",
      description: "Official V0 documentation and guides",
      url: "https://v0.dev/docs",
      icon: <BookOpen className="h-4 w-4" />,
      category: "Official",
      isNew: false,
    },
    {
      title: "Next.js Documentation",
      description: "Complete Next.js framework documentation",
      url: "https://nextjs.org/docs",
      icon: <Globe className="h-4 w-4" />,
      category: "Framework",
      isNew: false,
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework documentation",
      url: "https://tailwindcss.com/docs",
      icon: <Palette className="h-4 w-4" />,
      category: "Styling",
      isNew: false,
    },
    {
      title: "shadcn/ui",
      description: "Beautiful UI components built with Radix UI",
      url: "https://ui.shadcn.com",
      icon: <Star className="h-4 w-4" />,
      category: "Components",
      isNew: false,
    },
    {
      title: "TypeScript Handbook",
      description: "Complete guide to TypeScript",
      url: "https://www.typescriptlang.org/docs",
      icon: <Code className="h-4 w-4" />,
      category: "Language",
      isNew: false,
    },
    {
      title: "React Patterns",
      description: "Modern React patterns and best practices",
      url: "https://react.dev/learn",
      icon: <Zap className="h-4 w-4" />,
      category: "Patterns",
      isNew: true,
    },
  ]

  const bestPractices = [
    {
      title: "Component Architecture",
      practices: [
        "Use TypeScript for better type safety and developer experience",
        "Implement proper error boundaries to handle component failures gracefully",
        "Follow the single responsibility principle - one component, one purpose",
        "Use composition over inheritance for flexible component design",
        "Keep components small and focused on a single concern",
      ],
    },
    {
      title: "Performance Optimization",
      practices: [
        "Implement lazy loading for large components and routes",
        "Use React.memo for expensive renders and pure components",
        "Optimize images with Next.js Image component and proper sizing",
        "Minimize bundle size with tree shaking and code splitting",
        "Use useMemo and useCallback judiciously for expensive computations",
      ],
    },
    {
      title: "Accessibility & UX",
      practices: [
        "Use semantic HTML elements (nav, main, section, article)",
        "Implement proper ARIA labels and roles for screen readers",
        "Ensure keyboard navigation works throughout your application",
        "Maintain sufficient color contrast (WCAG AA: 4.5:1 minimum)",
        "Provide loading states and error messages for better UX",
      ],
    },
    {
      title: "Code Quality & Maintenance",
      practices: [
        "Write comprehensive tests (unit, integration, and e2e)",
        "Use ESLint and Prettier for consistent code formatting",
        "Follow consistent naming conventions (camelCase, PascalCase)",
        "Document complex logic with clear comments and JSDoc",
        "Use meaningful variable and function names that explain intent",
      ],
    },
  ]

  const quickActions = [
    {
      title: "Copy Template Prompt",
      description: "Get a basic V0 prompt template",
      action: () => {
        const template = `You are an expert V0 developer. Please help me create:

[Describe what you want to build]

Requirements:
- [List your specific requirements]
- [Include technical constraints]
- [Mention design preferences]

Context:
- [Your experience level]
- [Project details]
- [Any existing code/components]`
        navigator.clipboard.writeText(template)
      },
      icon: <Copy className="h-4 w-4" />,
    },
    {
      title: "Component Checklist",
      description: "Essential items for any component",
      items: [
        "TypeScript interfaces defined",
        "Props properly typed",
        "Error handling implemented",
        "Loading states included",
        "Responsive design applied",
        "Accessibility attributes added",
      ],
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ]

  // Desktop collapsed state
  if (!isOpen && !isMobile) {
    return (
      <div className="w-12 border-l bg-background flex flex-col items-center py-4">
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          <PanelRightOpen className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Mobile - don't render if not open
  if (!isOpen && isMobile) {
    return null
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <div className="m-4 mb-4">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="tips" className="text-xs">
                Tips
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-xs">
                Resources
              </TabsTrigger>
              <TabsTrigger value="practices" className="text-xs">
                Best Practices
              </TabsTrigger>
              <TabsTrigger value="quick" className="text-xs">
                Quick
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="h-full">
            <div className="p-4 pt-2">
              {/* Tips Tab */}
              <TabsContent value="tips" className="mt-0 space-y-4">
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <Card key={index} className="p-4 hover:shadow-sm transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="p-1 bg-primary/10 rounded">{tip.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{tip.title}</h4>
                            <Badge variant="outline" className="text-xs mt-1">
                              {tip.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                        <div className="bg-muted/50 p-3 rounded text-xs border-l-2 border-primary/30">
                          <div className="font-medium text-primary mb-1">Example:</div>
                          <div className="text-muted-foreground">{tip.example}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Pro Tip</h4>
                        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                          Use the examples in each template to understand the expected format and level of detail for
                          each field. The more context you provide, the better V0 can assist you.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="mt-0 space-y-4">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-1 bg-primary/10 rounded">{resource.icon}</div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">{resource.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {resource.category}
                              </Badge>
                              {resource.isNew && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-purple-900 dark:text-purple-100 text-sm">Keep Learning</h4>
                        <p className="text-xs text-purple-800 dark:text-purple-200 leading-relaxed">
                          These resources are regularly updated. Bookmark them for quick reference during development.
                          The V0 community also shares great examples and patterns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Best Practices Tab */}
              <TabsContent value="practices" className="mt-0 space-y-4">
                {bestPractices.map((section, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {section.practices.map((practice, practiceIndex) => (
                          <div key={practiceIndex} className="flex items-start gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{practice}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Settings className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-orange-900 dark:text-orange-100 text-sm">Quality First</h4>
                        <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed">
                          Following these practices will help you build maintainable, scalable, and performant
                          applications. Start with the basics and gradually adopt more advanced patterns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quick Actions Tab */}
              <TabsContent value="quick" className="mt-0 space-y-4">
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-primary/10 rounded">{action.icon}</div>
                            <h4 className="font-medium text-sm">{action.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{action.description}</p>

                          {action.action && (
                            <Button size="sm" onClick={action.action} className="w-full h-8 text-xs">
                              <Copy className="h-3 w-3 mr-1" />
                              Copy Template
                            </Button>
                          )}

                          {action.items && (
                            <div className="space-y-2">
                              {action.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center gap-2 text-xs">
                                  <div className="w-3 h-3 border border-muted-foreground rounded-sm flex items-center justify-center">
                                    <div className="w-1 h-1 bg-muted-foreground rounded-full opacity-0 transition-opacity" />
                                  </div>
                                  <span className="text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-900 dark:text-green-100 text-sm">Quick Start</h4>
                        <p className="text-xs text-green-800 dark:text-green-200 leading-relaxed">
                          Use these quick actions to speed up your workflow. The template prompt provides a good
                          starting structure for most V0 requests.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  )
}
