import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PatternShowcase } from "@/components/pattern-showcase"
import { Footer } from "@/components/footer"
import { ArrowRight, Code2, Palette, Zap, Users, Star, Github } from "lucide-react"

export default function PatternsPage() {
  const stats = [
    { label: "UI Patterns", value: "12+", icon: Palette },
    { label: "Code Examples", value: "50+", icon: Code2 },
    { label: "Contributors", value: "25+", icon: Users },
    { label: "GitHub Stars", value: "1.2k+", icon: Star },
  ]

  const benefits = [
    {
      title: "Production Ready",
      description: "All patterns are tested in real applications and follow best practices.",
      icon: Zap,
    },
    {
      title: "Copy & Paste",
      description: "Ready-to-use code that you can copy directly into your projects.",
      icon: Code2,
    },
    {
      title: "Responsive Design",
      description: "Every pattern works seamlessly across all device sizes.",
      icon: Palette,
    },
    {
      title: "Accessible",
      description: "Built with accessibility in mind, following WCAG guidelines.",
      icon: Users,
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
                  <Palette className="mr-2 h-3 w-3" />
                  UI Patterns & Components
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Professional{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  UI Patterns
                </span>
              </h1>

              <p className="mb-10 text-xl text-muted-foreground leading-8 max-w-3xl mx-auto">
                Production-ready interface patterns with real code examples. Copy, paste, and customize components that
                have been battle-tested in real applications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/tools/patterns">
                    Browse All Patterns
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                  <a href="https://github.com/vercel/v0" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Contribute Pattern
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

      {/* Featured Patterns */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Featured Patterns</h2>
            <p className="text-lg text-muted-foreground">
              Most popular UI patterns used by teams building production applications.
            </p>
          </div>

          <PatternShowcase />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Why Use Our Patterns?
            </h2>
            <p className="text-lg text-muted-foreground">
              Every pattern is crafted with care and tested in production environments.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-muted">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <benefit.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                </CardHeader>
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
              Ready to start building?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete collection of UI patterns and start building better interfaces today.
            </p>
            <Button asChild size="lg">
              <Link href="/tools/patterns">
                Browse All Patterns
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
