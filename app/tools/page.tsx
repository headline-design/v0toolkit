import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, MessageSquare, Code2, Building, CheckCircle, Layers, ArrowRight } from "lucide-react"
import { patterns } from "@/lib/data/patterns"
import { prompts } from "@/lib/data/prompts"
import { examples } from "@/lib/data/examples"

const toolsData = [
  {
    title: "UI Patterns",
    description: "Production-ready interface patterns and components for modern web applications",
    icon: Palette,
    href: "/tools/patterns",
    count: patterns.length,
    color: "bg-blue-500",
    features: ["Responsive design", "Accessibility", "Dark mode support"],
  },
  {
    title: "AI Prompts",
    description: "Curated prompts and templates for generating high-quality code with AI assistants",
    icon: MessageSquare,
    href: "/tools/prompts",
    count: prompts.length,
    color: "bg-green-500",
    features: ["Component generation", "Application scaffolding", "Integration patterns"],
  },
  {
    title: "Code Examples",
    description: "Real-world examples and implementations showcasing best practices",
    icon: Code2,
    href: "/tools/examples",
    count: examples.length,
    color: "bg-purple-500",
    features: ["Full applications", "Component libraries", "Integration demos"],
  },
  {
    title: "Architecture",
    description: "System design patterns and architectural guidelines for scalable applications",
    icon: Building,
    href: "/tools/architecture",
    count: 12,
    color: "bg-orange-500",
    features: ["Scalability patterns", "Performance optimization", "Security guidelines"],
  },
  {
    title: "Best Practices",
    description: "Development guidelines and conventions for maintainable, high-quality code",
    icon: CheckCircle,
    href: "/tools/best-practices",
    count: 25,
    color: "bg-emerald-500",
    features: ["Code quality", "Testing strategies", "Performance tips"],
  },
  {
    title: "Project Structure",
    description: "File organization patterns and naming conventions for different project types",
    icon: Layers,
    href: "/tools/structure",
    count: 8,
    color: "bg-indigo-500",
    features: ["Folder structure", "Naming conventions", "Scalable organization"],
  },
]

export default function ToolsPage() {
  return (
    <div className="flex-1 p-6">
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">V0 Toolkit</h1>
          <p className="text-xl text-muted-foreground">
            Professional tools, patterns, and resources for modern web development
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>All tools active</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Last updated: January 2024</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {toolsData.map((tool) => (
          <Card
            key={tool.href}
            className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm ring-1 ring-border/50 hover:ring-border"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10`}>
                  <tool.icon className={`h-6 w-6 ${tool.color.replace("bg-", "text-")}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {tool.count} items
                </Badge>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features</h4>
                <ul className="space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <Button
                asChild
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <Link href={tool.href}>
                  Explore {tool.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{patterns.length + prompts.length + examples.length}</div>
            <p className="text-sm text-muted-foreground">Total Resources</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">6</div>
            <p className="text-sm text-muted-foreground">Tool Categories</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Open Source</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">Weekly</div>
            <p className="text-sm text-muted-foreground">Updates</p>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  )
}
