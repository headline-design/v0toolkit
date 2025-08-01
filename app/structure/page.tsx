import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Folder, File, Layers, Code2, Database, Globe } from "lucide-react"

export default function StructurePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="space-y-4 mb-12">
        <Badge variant="secondary" className="mb-2">
          <Layers className="w-4 h-4 mr-2" />
          File Structure
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Project Structure Patterns</h1>
        <p className="text-xl text-muted-foreground">
          Optimal project organization patterns and file naming conventions for maintainable V0 projects.
        </p>
      </div>

      {/* Structure Types */}
      <Tabs defaultValue="basic" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic App</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="saas">SaaS Platform</TabsTrigger>
        </TabsList>

        {/* Basic App Structure */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code2 className="w-5 h-5 mr-2" />
                Basic Next.js App Structure
              </CardTitle>
              <CardDescription>Perfect for simple applications, landing pages, and prototypes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">app/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>layout.tsx</span>
                      <span className="text-muted-foreground text-xs">// Root layout with providers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>page.tsx</span>
                      <span className="text-muted-foreground text-xs">// Home page</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>globals.css</span>
                      <span className="text-muted-foreground text-xs">// Global styles</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>about/</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>contact/</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">components/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>ui/</span>
                      <span className="text-muted-foreground text-xs">// shadcn/ui components</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>header.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>footer.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>hero-section.tsx</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">lib/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>utils.ts</span>
                      <span className="text-muted-foreground text-xs">// Utility functions</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Structure */}
        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Dashboard Application Structure
              </CardTitle>
              <CardDescription>Organized structure for admin panels and data-heavy applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">app/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>layout.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>page.tsx</span>
                      <span className="text-muted-foreground text-xs">// Landing/login page</span>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>(dashboard)/</span>
                      <span className="text-muted-foreground text-xs">// Route group</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>layout.tsx</span>
                        <span className="text-muted-foreground text-xs">// Dashboard layout with sidebar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                        <span className="text-muted-foreground text-xs">// Dashboard home</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>users/</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center space-x-2">
                          <File className="w-4 h-4 text-green-500" />
                          <span>page.tsx</span>
                          <span className="text-muted-foreground text-xs">// Users list</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Folder className="w-4 h-4 text-blue-500" />
                          <span>[id]/</span>
                        </div>
                        <div className="ml-6">
                          <div className="flex items-center space-x-2">
                            <File className="w-4 h-4 text-green-500" />
                            <span>page.tsx</span>
                            <span className="text-muted-foreground text-xs">// User details</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>analytics/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>settings/</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>api/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>users/</span>
                      </div>
                      <div className="ml-6">
                        <div className="flex items-center space-x-2">
                          <File className="w-4 h-4 text-green-500" />
                          <span>route.ts</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>analytics/</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">components/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>ui/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>dashboard/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>sidebar.tsx</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>header.tsx</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>stats-card.tsx</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>charts/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>tables/</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* E-commerce Structure */}
        <TabsContent value="ecommerce" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                E-commerce Application Structure
              </CardTitle>
              <CardDescription>Scalable structure for online stores and marketplace applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">app/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>layout.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>page.tsx</span>
                      <span className="text-muted-foreground text-xs">// Store homepage</span>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>products/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                        <span className="text-muted-foreground text-xs">// Product listing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>[slug]/</span>
                      </div>
                      <div className="ml-6">
                        <div className="flex items-center space-x-2">
                          <File className="w-4 h-4 text-green-500" />
                          <span>page.tsx</span>
                          <span className="text-muted-foreground text-xs">// Product details</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>cart/</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>checkout/</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>account/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>page.tsx</span>
                        <span className="text-muted-foreground text-xs">// Account dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>orders/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>profile/</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>api/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>products/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>cart/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>checkout/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>webhooks/</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">components/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>ui/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>product/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>product-card.tsx</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>product-grid.tsx</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>product-filters.tsx</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>cart/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>checkout/</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">lib/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>utils.ts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>stripe.ts</span>
                      <span className="text-muted-foreground text-xs">// Payment integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>cart-store.ts</span>
                      <span className="text-muted-foreground text-xs">// Cart state management</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SaaS Structure */}
        <TabsContent value="saas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code2 className="w-5 h-5 mr-2" />
                SaaS Platform Structure
              </CardTitle>
              <CardDescription>Enterprise-ready structure for SaaS applications with multi-tenancy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">app/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>layout.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>page.tsx</span>
                      <span className="text-muted-foreground text-xs">// Landing page</span>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>(auth)/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>login/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>signup/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>forgot-password/</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>(app)/</span>
                      <span className="text-muted-foreground text-xs">// Protected routes</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-green-500" />
                        <span>layout.tsx</span>
                        <span className="text-muted-foreground text-xs">// App shell with navigation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>dashboard/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>projects/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>team/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>billing/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>settings/</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>api/</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>auth/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>projects/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>billing/</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>webhooks/</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">components/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>ui/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>auth/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>dashboard/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>billing/</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span>marketing/</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">lib/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>auth.ts</span>
                      <span className="text-muted-foreground text-xs">// Authentication logic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>db.ts</span>
                      <span className="text-muted-foreground text-xs">// Database connection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>stripe.ts</span>
                      <span className="text-muted-foreground text-xs">// Subscription billing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-green-500" />
                      <span>permissions.ts</span>
                      <span className="text-muted-foreground text-xs">// Role-based access</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      {/* Naming Conventions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">File Naming Conventions</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-700 dark:text-green-300">✅ Good Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Use kebab-case for files</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">user-profile-form.tsx</code>
              </div>
              <div>
                <p className="font-medium">Be descriptive and specific</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">product-search-filters.tsx</code>
              </div>
              <div>
                <p className="font-medium">Group related functionality</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">components/auth/login-form.tsx</code>
              </div>
              <div>
                <p className="font-medium">Use consistent suffixes</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">use-cart-store.ts (hooks)</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-red-700 dark:text-red-300">❌ Avoid These</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Generic names</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">component.tsx, utils.tsx</code>
              </div>
              <div>
                <p className="font-medium">Inconsistent casing</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">UserForm.tsx, user_form.tsx</code>
              </div>
              <div>
                <p className="font-medium">Abbreviations</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">usr-prof.tsx, prod-lst.tsx</code>
              </div>
              <div>
                <p className="font-medium">Deep nesting without purpose</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">components/ui/forms/auth/login/form.tsx</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
