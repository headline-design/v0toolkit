"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  X,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Zap,
  Target,
  Users,
  Star,
  ExternalLink,
  ChevronRight,
  Code,
  Palette,
  Database,
  Globe,
  Settings,
  TrendingUp,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

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
      title: "Be Specific",
      description: "The more specific your requirements, the better the AI will understand your needs.",
      example: "Instead of 'make a button', try 'create a primary CTA button with hover effects'",
    },
    {
      icon: <Code className="h-4 w-4" />,
      title: "Include Context",
      description: "Provide context about your project, tech stack, and constraints.",
      example: "Building a Next.js 14 app with TypeScript and Tailwind CSS",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Define Your Role",
      description: "Clearly state your expertise level and what kind of help you need.",
      example: "I'm a beginner developer learning React hooks",
    },
    {
      icon: <Palette className="h-4 w-4" />,
      title: "Describe Design Goals",
      description: "Include visual preferences, brand guidelines, and accessibility needs.",
      example: "Modern, minimalist design with high contrast for accessibility",
    },
  ]

  const resources = [
    {
      title: "V0 Documentation",
      description: "Official V0 documentation and guides",
      url: "https://v0.dev/docs",
      icon: <BookOpen className="h-4 w-4" />,
      category: "Official",
    },
    {
      title: "Next.js Documentation",
      description: "Complete Next.js framework documentation",
      url: "https://nextjs.org/docs",
      icon: <Globe className="h-4 w-4" />,
      category: "Framework",
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework documentation",
      url: "https://tailwindcss.com/docs",
      icon: <Palette className="h-4 w-4" />,
      category: "Styling",
    },
    {
      title: "shadcn/ui",
      description: "Beautiful UI components built with Radix UI",
      url: "https://ui.shadcn.com",
      icon: <Star className="h-4 w-4" />,
      category: "Components",
    },
    {
      title: "TypeScript Handbook",
      description: "Complete guide to TypeScript",
      url: "https://www.typescriptlang.org/docs",
      icon: <Code className="h-4 w-4" />,
      category: "Language",
    },
  ]

  const bestPractices = [
    {
      title: "Component Structure",
      practices: [
        "Use TypeScript for better type safety",
        "Implement proper error boundaries",
        "Follow the single responsibility principle",
        "Use composition over inheritance",
      ],
    },
    {
      title: "Performance",
      practices: [
        "Implement lazy loading for large components",
        "Use React.memo for expensive renders",
        "Optimize images with Next.js Image component",
        "Minimize bundle size with tree shaking",
      ],
    },
    {
      title: "Accessibility",
      practices: [
        "Use semantic HTML elements",
        "Implement proper ARIA labels",
        "Ensure keyboard navigation works",
        "Maintain sufficient color contrast",
      ],
    },
    {
      title: "Code Quality",
      practices: [
        "Write comprehensive tests",
        "Use ESLint and Prettier",
        "Follow consistent naming conventions",
        "Document complex logic with comments",
      ],
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
    <div className={cn("bg-background border-l flex flex-col", isMobile ? "w-full h-full" : "w-80 h-full")}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          <h2 className="font-semibold">Assistant</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          {isMobile ? <X className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
            <TabsTrigger value="tips" className="text-xs">
              Tips
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">
              Resources
            </TabsTrigger>
            <TabsTrigger value="practices" className="text-xs">
              Best Practices
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 pt-2">
                {/* Tips Tab */}
                <TabsContent value="tips" className="mt-0 space-y-4">
                  <div className="space-y-3">
                    {tips.map((tip, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {tip.icon}
                            <h4 className="font-medium text-sm">{tip.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                          <div className="bg-muted/50 p-2 rounded text-xs">
                            <strong>Example:</strong> {tip.example}
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
                            each field.
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
                            {resource.icon}
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{resource.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {resource.category}
                                </Badge>
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
                        <CardTitle className="text-sm">{section.title}</CardTitle>
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
                            applications.
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
    </div>
  )
}
