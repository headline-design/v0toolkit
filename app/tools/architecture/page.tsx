import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Database, Shield, Zap, Globe, Users, ArrowRight } from "lucide-react"

const architecturePatterns = [
  {
    id: "microservices",
    title: "Microservices Architecture",
    description:
      "Design scalable applications using microservices patterns with proper service boundaries and communication strategies.",
    icon: Building,
    difficulty: "Advanced",
    topics: ["Service decomposition", "API gateways", "Service mesh", "Event-driven architecture"],
    benefits: ["Scalability", "Technology diversity", "Team autonomy", "Fault isolation"],
  },
  {
    id: "serverless",
    title: "Serverless Architecture",
    description:
      "Build cost-effective, auto-scaling applications using serverless computing patterns and best practices.",
    icon: Zap,
    difficulty: "Intermediate",
    topics: ["Function composition", "Event triggers", "Cold start optimization", "State management"],
    benefits: ["Cost efficiency", "Auto-scaling", "Reduced operations", "Fast deployment"],
  },
  {
    id: "database-design",
    title: "Database Design Patterns",
    description:
      "Design efficient, scalable database schemas with proper indexing, relationships, and performance optimization.",
    icon: Database,
    difficulty: "Intermediate",
    topics: ["Schema design", "Indexing strategies", "Query optimization", "Data modeling"],
    benefits: ["Performance", "Data integrity", "Scalability", "Maintainability"],
  },
  {
    id: "security-patterns",
    title: "Security Architecture",
    description:
      "Implement comprehensive security patterns including authentication, authorization, and data protection.",
    icon: Shield,
    difficulty: "Advanced",
    topics: ["Zero trust", "OAuth/OIDC", "Data encryption", "Security monitoring"],
    benefits: ["Data protection", "Compliance", "Risk mitigation", "User trust"],
  },
  {
    id: "cdn-patterns",
    title: "Global Distribution",
    description:
      "Design globally distributed applications with CDN strategies, edge computing, and performance optimization.",
    icon: Globe,
    difficulty: "Intermediate",
    topics: ["CDN configuration", "Edge caching", "Geographic routing", "Performance monitoring"],
    benefits: ["Global performance", "Reduced latency", "High availability", "Cost optimization"],
  },
  {
    id: "team-architecture",
    title: "Team & Organizational Patterns",
    description: "Structure development teams and processes for optimal productivity and code quality.",
    icon: Users,
    difficulty: "Beginner",
    topics: ["Conway's law", "Team topologies", "DevOps practices", "Code ownership"],
    benefits: ["Team efficiency", "Code quality", "Faster delivery", "Better collaboration"],
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function ToolsArchitecturePage() {
  return (
    <div className="flex-1 p-6">

    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Architecture Patterns</h1>
          <p className="text-lg text-muted-foreground">
            System design patterns and architectural guidelines for building scalable, maintainable applications
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>{architecturePatterns.length} patterns available</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Updated monthly</span>
          </div>
        </div>
      </div>

      {/* Architecture Patterns Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {architecturePatterns.map((pattern) => (
          <Card
            key={pattern.id}
            className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm ring-1 ring-border/50 hover:ring-border"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <pattern.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {pattern.title}
                    </CardTitle>
                    <Badge className={`text-xs ${getDifficultyColor(pattern.difficulty)}`}>{pattern.difficulty}</Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed mt-2">{pattern.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Topics */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Topics</h4>
                <div className="flex flex-wrap gap-1">
                  {pattern.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Benefits</h4>
                <ul className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  {pattern.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">System Design</h3>
              <p className="text-sm text-muted-foreground">Comprehensive guides for designing large-scale systems</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Data Architecture</h3>
              <p className="text-sm text-muted-foreground">Best practices for data modeling and storage</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Security Patterns</h3>
              <p className="text-sm text-muted-foreground">Security-first architecture and implementation</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}
