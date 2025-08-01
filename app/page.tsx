import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Github, Star, Code, Zap, BookOpen, Layers } from "lucide-react"
import { PatternShowcase } from "@/components/pattern-showcase"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <span className="text-lg font-bold text-primary-foreground">V0</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold leading-none">V0 Toolkit</span>
                <span className="text-sm text-muted-foreground leading-none">Professional</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Professional{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                V0 Development
              </span>{" "}
              Toolkit
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Curated patterns, prompts, and best practices for building production-ready applications with V0. Built by
              developers, for developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/tools">
                  Explore Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent" asChild>
                <a
                  href="https://github.com/headline-design/v0toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>50+ Patterns</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>25+ Prompts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Layers className="h-4 w-4" />
                <span>15+ Examples</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build with V0</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From UI patterns to complete application architectures, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>UI Patterns</CardTitle>
                </div>
                <CardDescription>
                  Production-ready components and layouts with copy-paste code examples.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/patterns">
                    Browse Patterns
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>AI Prompts</CardTitle>
                </div>
                <CardDescription>
                  Optimized prompts for generating high-quality V0 components and applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/prompts">
                    View Prompts
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Examples</CardTitle>
                </div>
                <CardDescription>Complete application examples with source code and live demos.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/examples">
                    See Examples
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pattern Showcase */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Patterns</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Popular UI patterns used by thousands of developers worldwide.
            </p>
          </div>

          <PatternShowcase />

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/patterns">
                View All Patterns
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build amazing apps?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers using V0 Toolkit to ship faster and build better.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/tools">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent" asChild>
              <a
                href="https://github.com/headline-design/v0toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Star className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
