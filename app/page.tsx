import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PatternShowcase } from "@/components/pattern-showcase"
import { Footer } from "@/components/footer"
import { ArrowRight, Code2, Palette, MessageSquare, Building, CheckCircle, Layers, Github, Star } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Palette,
      title: "UI Patterns",
      description: "Production-ready interface patterns with real code examples",
      href: "/patterns",
      count: "12+ patterns",
    },
    {
      icon: MessageSquare,
      title: "Prompt Templates",
      description: "Battle-tested prompts for generating high-quality code",
      href: "/prompts",
      count: "25+ prompts",
    },
    {
      icon: Code2,
      title: "Example Apps",
      description: "Complete application examples with best practices",
      href: "/examples",
      count: "8+ examples",
    },
    {
      icon: Building,
      title: "Architecture",
      description: "System design patterns and project structures",
      href: "/architecture",
      count: "6+ guides",
    },
    {
      icon: CheckCircle,
      title: "Best Practices",
      description: "Development guidelines and coding standards",
      href: "/best-practices",
      count: "15+ practices",
    },
    {
      icon: Layers,
      title: "File Structure",
      description: "Recommended project organization templates",
      href: "/structure",
      count: "5+ templates",
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
                  <Star className="mr-2 h-3 w-3" />
                  Open Source & Community Driven
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Professional{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  V0 Toolkit
                </span>
              </h1>

              <p className="mb-10 text-xl text-muted-foreground leading-8 max-w-3xl mx-auto">
                A comprehensive collection of patterns, prompts, and best practices for building exceptional
                applications with V0. Created by developers, for developers shipping production software.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/tools">
                    Browse Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                  <a href="https://github.com/vercel/v0" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Everything you need to build with V0
            </h2>
            <p className="text-lg text-muted-foreground">
              From UI patterns to complete applications, find the resources you need to ship faster.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.href} className="group hover:shadow-lg transition-all duration-200 border-muted">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {feature.count}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full justify-between group-hover:bg-muted">
                    <Link href={feature.href}>
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Patterns */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Featured Patterns</h2>
            <p className="text-lg text-muted-foreground">
              Popular UI patterns used by teams building production applications.
            </p>
          </div>

          <PatternShowcase />

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/tools/patterns">
                View All Patterns
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers using V0 Toolkit to ship better applications faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tools">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contributing">Contribute</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
