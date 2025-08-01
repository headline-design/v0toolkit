import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Folder, File, Database, ArrowRight } from "lucide-react"

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Database className="mr-2 h-3.5 w-3.5" />
              Architecture Patterns
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Scalable Project Architecture
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Production-ready project structures, file organization patterns, and architectural decisions for
              maintainable V0 applications.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="basic" className="mx-auto max-w-6xl">
            <div className="mb-12 flex justify-center">
              <TabsList className="grid w-full max-w-2xl grid-cols-4">
                <TabsTrigger value="basic">Basic App</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
                <TabsTrigger value="saas">SaaS Platform</TabsTrigger>
              </TabsList>
            </div>

            {/* Basic App Architecture */}
            <TabsContent value="basic" className="space-y-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        Beginner
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Next.js 15
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Basic Application Structure</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Perfect for landing pages, portfolios, and simple applications. Clean, minimal structure that's
                      easy to understand and extend.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Key Principles</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>File-based routing with intuitive page structure</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Component co-location for better maintainability</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Shared utilities and reusable components</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Clear separation of concerns</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Best For</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Landing Pages
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Portfolios
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Marketing Sites
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Prototypes
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="border-0 shadow-sm ring-1 ring-border/50">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-medium text-foreground">Project Structure</h4>
                        <Button size="sm" variant="outline">
                          Copy Structure
                        </Button>
                      </div>
                      <div className="space-y-1 font-mono text-sm">
                        <div className="flex items-center space-x-2">
                          <Folder className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">app/</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>layout.tsx</span>
                            <span className="text-xs text-muted-foreground">// Root layout</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>page.tsx</span>
                            <span className="text-xs text-muted-foreground">// Homepage</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>globals.css</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>about/page.tsx</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>contact/page.tsx</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <Folder className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">components/</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>ui/</span>
                            <span className="text-xs text-muted-foreground">// shadcn components</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>header.tsx</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>footer.tsx</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>hero-section.tsx</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <Folder className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">lib/</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>utils.ts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>constants.ts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg border bg-background p-3">
                      <div className="text-lg font-semibold text-foreground">~15</div>
                      <div className="text-xs text-muted-foreground">Files</div>
                    </div>
                    <div className="rounded-lg border bg-background p-3">
                      <div className="text-lg font-semibold text-foreground">2-5</div>
                      <div className="text-xs text-muted-foreground">Pages</div>
                    </div>
                    <div className="rounded-lg border bg-background p-3">
                      <div className="text-lg font-semibold text-foreground">1-2</div>
                      <div className="text-xs text-muted-foreground">Weeks</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Dashboard Architecture */}
            <TabsContent value="dashboard" className="space-y-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        Intermediate
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Data-Heavy
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Dashboard Architecture</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Optimized for admin panels and analytics applications. Handles complex data flows, real-time
                      updates, and user management.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Architecture Features</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Route groups for protected dashboard areas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Shared layouts with persistent navigation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>API routes for data management</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>Component organization by feature</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Includes</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Authentication
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Data Tables
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Charts
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        User Management
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Real-time Updates
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="border-0 shadow-sm ring-1 ring-border/50">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-medium text-foreground">Dashboard Structure</h4>
                        <Button size="sm" variant="outline">
                          Copy Structure
                        </Button>
                      </div>
                      <div className="space-y-1 font-mono text-sm max-h-80 overflow-y-auto">
                        <div className="flex items-center space-x-2">
                          <Folder className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">app/</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>layout.tsx</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <File className="h-4 w-4 text-green-500" />
                            <span>page.tsx</span>
                            <span className="text-xs text-muted-foreground">// Landing</span>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>(auth)/</span>
                            <span className="text-xs text-muted-foreground">// Route group</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>login/page.tsx</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>register/page.tsx</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>(dashboard)/</span>
                            <span className="text-xs text-muted-foreground">// Protected routes</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4 text-green-500" />
                              <span>layout.tsx</span>
                              <span className="text-xs text-muted-foreground">// Dashboard shell</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4 text-green-500" />
                              <span>page.tsx</span>
                              <span className="text-xs text-muted-foreground">// Overview</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>users/</span>
                            </div>
                            <div className="ml-6 space-y-1">
                              <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-green-500" />
                                <span>page.tsx</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Folder className="h-4 w-4 text-blue-500" />
                                <span>[id]/page.tsx</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>analytics/page.tsx</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>settings/page.tsx</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>api/</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>auth/route.ts</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>users/route.ts</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Folder className="h-4 w-4 text-blue-500" />
                              <span>analytics/route.ts</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <Folder className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">components/</span>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>ui/</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>dashboard/</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4 text-green-500" />
                              <span>sidebar.tsx</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4 text-green-500" />
                              <span>header.tsx</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4 text-green-500" />
                              <span>stats-card.tsx</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>charts/</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>tables/</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg border bg-background p-3">
                      <div className="text-lg font-semibold text-foreground">~45</div>
                      <div className="text-xs text-muted-foreground">Files</div>
                    </div>
                    <div className="rounded-lg border bg-background p-3">
                      <div className="text-lg font-semibold text-foreground">8-12</div>
                      <div className="text-xs text-muted-foreground">Pages</div>
                    </div>
                    <div className="rounded-lg border bg-background p-3">
                      <div className="text-lg font-semibold text-foreground">4-6</div>
                      <div className="text-xs text-muted-foreground">Weeks</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* E-commerce Architecture */}
            <TabsContent value="ecommerce" className="space-y-12">
              <div className="text-center py-12">
                <p className="text-muted-foreground">E-commerce architecture patterns coming soon...</p>
              </div>
            </TabsContent>

            {/* SaaS Architecture */}
            <TabsContent value="saas" className="space-y-12">
              <div className="text-center py-12">
                <p className="text-muted-foreground">SaaS platform architecture patterns coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Best Practices Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Architecture Best Practices</h2>
              <p className="text-lg text-muted-foreground">
                Universal principles that apply across all project types and scales.
              </p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h3>File Organization</h3>
                  <ul>
                    <li>Use kebab-case for file names (user-profile-form.tsx)</li>
                    <li>Group related components by feature, not by type</li>
                    <li>Keep components close to where they're used</li>
                    <li>Use descriptive names that explain purpose</li>
                    <li>Separate business logic into custom hooks</li>
                    <li>Create index files for clean imports</li>
                  </ul>

                  <h3>Component Structure</h3>
                  <ul>
                    <li>Use Server Components by default</li>
                    <li>Add "use client" only when necessary</li>
                    <li>Implement proper error boundaries</li>
                    <li>Include loading states for async operations</li>
                    <li>Use TypeScript for better development experience</li>
                  </ul>
                </div>

                <div>
                  <h3>Performance</h3>
                  <ul>
                    <li>Optimize images with Next.js Image component</li>
                    <li>Use dynamic imports for heavy components</li>
                    <li>Implement proper caching strategies</li>
                    <li>Minimize bundle size with tree shaking</li>
                    <li>Use React.memo for expensive components</li>
                    <li>Implement pagination for large datasets</li>
                  </ul>

                  <h3>Maintainability</h3>
                  <ul>
                    <li>Follow consistent import ordering</li>
                    <li>Use absolute imports with path mapping</li>
                    <li>Document complex business logic</li>
                    <li>Create reusable utility functions</li>
                    <li>Implement proper error handling</li>
                    <li>Use environment variables for configuration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
              Ready to build with these patterns?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Start with our proven architectures and adapt them to your specific needs.
            </p>
            <Button size="lg" className="h-12 px-8 text-base font-medium" asChild>
              <a href="/examples">
                View Complete Examples <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
