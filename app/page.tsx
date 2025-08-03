import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import InteractivePromptHero from "@/components/interactive-prompt-hero"
import Link from "next/link"
import { ArrowRight, Code2, Users, Zap, BookOpen } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Smart Prompt Generator",
    description: "Create sophisticated prompts using expert templates and AI-powered suggestions.",
    href: "/prompt-generator",
  },
  {
    icon: Users,
    title: "V0 Profiles",
    description: "Personalized AI assistants with custom traits, expertise, and specialized tasks.",
    href: "/profiles",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6" variant="secondary">
              Open Source V0 Development Tools
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">V0 Toolkit</span>
              <br />
              <span className="text-foreground">for Developers</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A collection of tools, prompts, and best practices to help you build better applications with V0.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/prompt-generator">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent" asChild>
                <Link href="/profiles">Explore Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <InteractivePromptHero />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tools for <span className="text-gradient">V0 Development</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to work more effectively with V0's AI-powered development platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="feature-card h-full transition-all duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for <span className="text-gradient">V0 Developers</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              This toolkit was created to help developers get the most out of V0's AI-powered development environment.
              It includes prompt engineering tools, reusable profiles, and curated best practices from the V0 community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/prompt-generator">Try the Prompt Generator</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/your-repo/v0-toolkit" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
