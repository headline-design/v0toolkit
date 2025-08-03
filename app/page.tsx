"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Wand2,
  Users,
  Sparkles,
  Code2,
  Zap,
  Target,
  CheckCircle,
  Star,
  TrendingUp,
  BookOpen,
  Lightbulb,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Prompt Generator",
      description:
        "Create sophisticated AI prompts using expert templates designed for V0 and modern development workflows.",
      href: "/prompt-generator",
      badge: "Core",
      badgeVariant: "default" as const,
      stats: "50+ Templates",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "V0 Profiles",
      description:
        "Build personalized AI assistants with custom traits, tasks, and specialized knowledge for different use cases.",
      href: "/profiles",
      badge: "New",
      badgeVariant: "secondary" as const,
      stats: "Unlimited Profiles",
    },
  ]

  const benefits = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Expert-Crafted Templates",
      description: "Templates built by developers who've worked with Cursor, Loveable, Bolt, and V0 teams.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Production-Ready",
      description: "Generate prompts that follow best practices and produce high-quality, maintainable code.",
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Developer-Focused",
      description: "Built specifically for developers working with modern frameworks and V0 workflows.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Continuously Updated",
      description: "Regular updates with new templates and features based on community feedback.",
    },
  ]

  const stats = [
    { label: "Expert Templates", value: "50+", icon: <BookOpen className="h-4 w-4" /> },
    { label: "Active Users", value: "1.2K+", icon: <Users className="h-4 w-4" /> },
    { label: "Prompts Generated", value: "10K+", icon: <Wand2 className="h-4 w-4" /> },
    { label: "Success Rate", value: "94%", icon: <TrendingUp className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">Professional V0 Development Toolkit</span>
              <Badge variant="secondary" className="text-xs">
                v2.0
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  Build Better with
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-chart-1 bg-clip-text text-transparent">
                  V0 Toolkit
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Professional-grade prompts and AI profiles designed by DevRel experts. Create sophisticated V0
                applications with expert templates and best practices.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link href="/prompt-generator">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Start Creating Prompts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium bg-transparent" asChild>
                <Link href="/profiles">
                  <Users className="h-5 w-5 mr-2" />
                  Explore Profiles
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
                    {stat.icon}
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need to excel with V0</h2>
            <p className="text-lg text-muted-foreground">
              Professional tools designed by experts who've built documentation for Cursor and worked with leading AI
              coding platforms.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                          {feature.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={feature.badgeVariant} className="text-xs">
                            {feature.badge}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{feature.stats}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed mb-6">{feature.description}</CardDescription>
                  <Button className="w-full group-hover:shadow-md transition-all duration-200" asChild>
                    <Link href={feature.href}>
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why developers choose V0 Toolkit</h2>
            <p className="text-lg text-muted-foreground">
              Built by DevRel experts with deep experience in AI coding platforms and developer tools.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-none bg-transparent">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
        <div className="container mx-auto px-6">
          <Card className="mx-auto max-w-4xl border-2 border-primary/20 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2 text-primary mb-4">
                  <Lightbulb className="h-6 w-6" />
                  <Star className="h-5 w-5" />
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to build better V0 applications?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of developers using V0 Toolkit to create professional-grade applications with AI
                  assistance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button size="lg" className="h-12 px-8 text-base font-medium shadow-lg" asChild>
                    <Link href="/prompt-generator">
                      <Wand2 className="h-5 w-5 mr-2" />
                      Create Your First Prompt
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base font-medium bg-transparent"
                    asChild
                  >
                    <Link href="/profiles">
                      <Users className="h-5 w-5 mr-2" />
                      Build AI Profiles
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
