import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { ArrowRight, MessageSquare, Code2, Zap, Users, Star, Github, Copy, Lightbulb } from "lucide-react"

export default function PromptsPage() {
  const stats = [
    { label: "Prompt Templates", value: "25+", icon: MessageSquare },
    { label: "Use Cases", value: "100+", icon: Lightbulb },
    { label: "Contributors", value: "15+", icon: Users },
    { label: "Success Rate", value: "95%", icon: Star },
  ]

  const categories = [
    {
      title: "Component Generation",
      description: "Prompts for creating UI components, forms, and interactive elements.",
      icon: Code2,
      count: "8 prompts",
    },
    {
      title: "Application Scaffolding",
      description: "Complete application structures and boilerplate generation.",
      icon: Zap,
      count: "6 prompts",
    },
    {
      title: "Integration Patterns",
      description: "Database connections, API integrations, and third-party services.",
      icon: Users,
      count: "7 prompts",
    },
    {
      title: "Optimization",
      description: "Performance improvements, accessibility, and code quality.",
      icon: Star,
      count: "4 prompts",
    },
  ]

  const featuredPrompts = [
    {
      title: "Dashboard with Charts",
      description: "Generate a complete dashboard with data visualization components",
      category: "Application",
      complexity: "Advanced",
    },
    {
      title: "Authentication Flow",
      description: "Create login, signup, and password reset components with validation",
      category: "Component",
      complexity: "Intermediate",
    },
    {
      title: "E-commerce Product Grid",
      description: "Build a responsive product listing with filters and pagination",
      category: "Component",
      complexity: "Intermediate",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="relative">
          <div className="container mx-auto px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center">
                <Badge variant="outline" className="px-4 py-2">
                  <MessageSquare className="mr-2 h-3 w-3" />
                  AI Prompts & Templates
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Battle-Tested{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Prompt Templates
                </span>
              </h1>

              <p className="mb-10 text-xl text-muted-foreground leading-8 max-w-3xl mx-auto">
                Carefully crafted prompts that generate high-quality code consistently. Save time and get better results
                with prompts tested by thousands of developers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/tools/prompts">
                    Browse All Prompts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                  <a href="https://github.com/vercel/v0" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Contribute Prompt
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Prompt Categories</h2>
            <p className="text-lg text-muted-foreground">
              Organized by use case to help you find the right prompt for your project.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-all duration-200 border-muted">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <category.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Featured Prompts</h2>
            <p className="text-lg text-muted-foreground">
              Most popular prompts used by the community to generate high-quality code.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPrompts.map((prompt) => (
              <Card key={prompt.title} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{prompt.category}</Badge>
                    <Badge variant={prompt.complexity === "Advanced" ? "destructive" : "secondary"}>
                      {prompt.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{prompt.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-muted">
                    <span>View Prompt</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Start generating better code today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete collection of prompt templates and improve your V0 workflow.
            </p>
            <Button asChild size="lg">
              <Link href="/tools/prompts">
                Browse All Prompts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
