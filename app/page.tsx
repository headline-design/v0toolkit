import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InteractivePromptHero } from "@/components/interactive-prompt-hero"
import { Wand2, Users, ArrowRight, Sparkles, Zap, Target, Brain, Code, Lightbulb, Settings } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Wand2,
      title: "Advanced Prompt Generator",
      description: "Create sophisticated prompts using expert templates with dynamic variables and validation.",
      href: "/prompt-generator",
      badge: "Core",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      title: "V0 Profiles",
      description:
        "Build personalized AI assistants like 'Bob' or 'Alice' with custom traits, tasks, and specialized knowledge.",
      href: "/profiles",
      badge: "New",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
  ]

  const useCases = [
    {
      icon: Brain,
      title: "Expert Role-Based Prompts",
      description:
        "Create prompts that embody specific expertise like DevRel, UI/UX Design, or Technical Architecture.",
    },
    {
      icon: Target,
      title: "Task-Specific Instructions",
      description:
        "Generate prompts tailored for specific jobs like code review, architecture analysis, or design feedback.",
    },
    {
      icon: Code,
      title: "V0 Development Workflows",
      description: "Optimize your V0 development process with prompts designed for component creation and iteration.",
    },
    {
      icon: Lightbulb,
      title: "Personalized AI Assistants",
      description:
        "Create named AI personalities that combine base expertise with custom traits and specialized tasks.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                V0 Toolkit - Specialized AI Prompting
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Create Powerful{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  V0 Prompts
                </span>{" "}
                & Profiles
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Build sophisticated prompts using expert templates, then create personalized AI assistants like "Bob" or
                "Alice" with custom traits and specialized tasks for your V0 development workflow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/prompt-generator">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Generate Prompts
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                <Link href="/profiles">
                  <Users className="h-5 w-5 mr-2" />
                  Create Profiles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">See It In Action</h2>
              <p className="text-lg text-muted-foreground">
                Try our interactive prompt generator to see how easy it is to create expert-level prompts.
              </p>
            </div>
            <InteractivePromptHero />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold">Core Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create powerful V0 prompts and personalized AI assistants.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${feature.color}`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {feature.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-6">{feature.description}</CardDescription>
                    <Button asChild className="w-full">
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
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold">Perfect For</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're building components, reviewing code, or creating specialized workflows, our toolkit
                adapts to your V0 development needs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Example */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                From expert prompts to personalized AI assistants in three simple steps.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Generate Expert Prompts</h3>
                  <p className="text-muted-foreground">
                    Use our prompt generator to create sophisticated prompts based on expert templates like DevRel,
                    UI/UX Designer, or Technical Architect roles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Create V0 Profiles</h3>
                  <p className="text-muted-foreground">
                    Build on your generated prompts by creating named profiles like "Bob" or "Alice" with custom traits,
                    personality adjustments, and specialized tasks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Compose & Use</h3>
                  <p className="text-muted-foreground">
                    Generate final prompts that combine your base expertise with profile customizations and specific
                    task instructions. Copy, share, or export for use in V0.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Example Output
                </h4>
                <p className="text-sm text-muted-foreground font-mono bg-background p-3 rounded border">
                  "Your name is Bob. You are a dev relations expert (specializing in gen-ai coding platforms) who built
                  the documentation website for Cursor and then worked with Loveable and Bolt and V0 on best-practices,
                  demo apps, etc. Today your job is to analyze the forms in the project and determine proper schema..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Ready to Transform Your V0 Workflow?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start creating powerful prompts and personalized AI assistants that understand your specific needs and
                expertise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/prompt-generator">
                  <Wand2 className="h-5 w-5 mr-2" />
                  Start with Prompt Generator
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                <Link href="/profiles">
                  <Users className="h-5 w-5 mr-2" />
                  Create Your First Profile
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>No setup required</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Fully customizable</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Built for V0</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
