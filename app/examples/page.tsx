import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { examples } from "@/lib/data/examples"
import { ArrowRight, Code2, ExternalLink, Github, Star, Users, Zap, Building } from "lucide-react"

export default function ExamplesPage() {
  const safeExamples = examples || []

  const stats = [
    { label: "Example Apps", value: `${safeExamples.length}+`, icon: Code2 },
    { label: "Tech Stacks", value: "12+", icon: Building },
    { label: "Contributors", value: "20+", icon: Users },
    { label: "Downloads", value: "5k+", icon: Star },
  ]

  const categories = [
    {
      title: "E-commerce",
      description: "Online stores, product catalogs, and shopping cart implementations.",
      icon: Building,
      count: safeExamples.filter((ex) => ex.category === "E-commerce").length,
    },
    {
      title: "Dashboard",
      description: "Admin panels, analytics dashboards, and data visualization apps.",
      icon: Zap,
      count: safeExamples.filter((ex) => ex.category === "Dashboard").length,
    },
    {
      title: "SaaS",
      description: "Software as a Service applications with user management and billing.",
      icon: Users,
      count: safeExamples.filter((ex) => ex.category === "SaaS").length,
    },
    {
      title: "Portfolio",
      description: "Personal websites, portfolios, and professional showcases.",
      icon: Star,
      count: safeExamples.filter((ex) => ex.category === "Portfolio").length,
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
                  <Code2 className="mr-2 h-3 w-3" />
                  Complete Applications
                </Badge>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Real-World{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Example Apps
                </span>
              </h1>

              <p className="mb-10 text-xl text-muted-foreground leading-8 max-w-3xl mx-auto">
                Complete application examples built with V0 and modern web technologies. Learn from production-ready
                code and best practices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/tools/examples">
                    Browse All Examples
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                  <a href="https://github.com/vercel/v0" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Contribute Example
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Example Categories</h2>
            <p className="text-lg text-muted-foreground">
              Organized by application type to help you find relevant examples for your project.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-all duration-200 border-muted">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <category.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {category.count} examples
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

      {/* Featured Examples */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Featured Examples</h2>
            <p className="text-lg text-muted-foreground">
              Popular examples that showcase different patterns and technologies.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {safeExamples.slice(0, 6).map((example) => (
              <Card key={example.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{example.category}</Badge>
                    <Badge variant="secondary">{example.complexity}</Badge>
                  </div>
                  <CardTitle className="text-xl">{example.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Tech Stack:</p>
                      <div className="flex flex-wrap gap-1">
                        {example.techStack &&
                          example.techStack.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        {example.techStack && example.techStack.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{example.techStack.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {example.demoUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                          <a href={example.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {example.sourceUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                          <a href={example.sourceUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
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
              Ready to build your next project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore all our examples and find the perfect starting point for your application.
            </p>
            <Button asChild size="lg">
              <Link href="/tools/examples">
                Browse All Examples
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
