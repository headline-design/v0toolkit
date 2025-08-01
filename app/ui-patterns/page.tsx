import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Palette, Layout, Smartphone, Monitor, Zap, Eye } from "lucide-react"

export default function UIPatternsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="space-y-4 mb-12">
        <Badge variant="secondary" className="mb-2">
          <Palette className="w-4 h-4 mr-2" />
          UI Patterns
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">UI Design Patterns</h1>
        <p className="text-xl text-muted-foreground">
          Reusable interface patterns and component compositions that work beautifully with V0's capabilities.
        </p>
      </div>

      {/* Pattern Categories */}
      <Tabs defaultValue="layout" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
        </TabsList>

        {/* Layout Patterns */}
        <TabsContent value="layout" className="space-y-6">
          <div className="grid gap-6">
            {/* Hero Section Pattern */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Layout className="w-5 h-5" />
                      <span>Hero Section Pattern</span>
                      <Badge variant="outline">Layout</Badge>
                    </CardTitle>
                    <CardDescription>Compelling hero sections that capture attention and drive action</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border">
                    <div className="text-center space-y-4">
                      <h2 className="text-2xl font-bold">Your Product Name</h2>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        A compelling description that explains your value proposition in one clear sentence.
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button>Get Started</Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Key Elements:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&bull; Clear, benefit-focused headline</li>
                      <li>&bull; Supporting description (1-2 sentences)</li>
                      <li>&bull; Primary and secondary CTAs</li>
                      <li>&bull; Visual hierarchy with typography</li>
                      <li>&bull; Responsive spacing and layout</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Layout Pattern */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Monitor className="w-5 h-5" />
                      <span>Dashboard Layout</span>
                      <Badge variant="outline">Layout</Badge>
                    </CardTitle>
                    <CardDescription>Organized dashboard layouts for data-heavy applications</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-blue-600">1.2k</div>
                        <div className="text-xs text-muted-foreground">Users</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-green-600">$12.5k</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-orange-600">89</div>
                        <div className="text-xs text-muted-foreground">Orders</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-purple-600">4.8</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                    <div className="bg-muted h-32 rounded flex items-center justify-center text-muted-foreground">
                      Chart Area
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Pattern Structure:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&bull; Metric cards in responsive grid</li>
                      <li>&bull; Chart/visualization section</li>
                      <li>&bull; Consistent spacing and alignment</li>
                      <li>&bull; Color-coded categories</li>
                      <li>&bull; Mobile-responsive breakpoints</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Navigation Patterns */}
        <TabsContent value="navigation" className="space-y-6">
          <div className="grid gap-6">
            {/* Sidebar Navigation */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Layout className="w-5 h-5" />
                      <span>Sidebar Navigation</span>
                      <Badge variant="outline">Navigation</Badge>
                    </CardTitle>
                    <CardDescription>Collapsible sidebar navigation for dashboard applications</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex">
                      <div className="w-64 bg-muted p-4 space-y-2">
                        <div className="font-semibold text-sm mb-4">Navigation</div>
                        <div className="space-y-1">
                          <div className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm">Dashboard</div>
                          <div className="px-3 py-2 text-sm text-muted-foreground hover:bg-background rounded cursor-pointer">
                            Projects
                          </div>
                          <div className="px-3 py-2 text-sm text-muted-foreground hover:bg-background rounded cursor-pointer">
                            Team
                          </div>
                          <div className="px-3 py-2 text-sm text-muted-foreground hover:bg-background rounded cursor-pointer">
                            Settings
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4 bg-background">
                        <div className="text-sm text-muted-foreground">Main content area</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Implementation Tips:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&bull; Use active states for current page</li>
                      <li>&bull; Include hover effects for interactivity</li>
                      <li>&bull; Group related navigation items</li>
                      <li>&bull; Consider collapsible mobile version</li>
                      <li>&bull; Add icons for better visual hierarchy</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breadcrumb Navigation */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5" />
                      <span>Breadcrumb Navigation</span>
                      <Badge variant="outline">Navigation</Badge>
                    </CardTitle>
                    <CardDescription>Hierarchical navigation showing user's location</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Home</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Products</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer">Electronics</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="font-medium">Laptop</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Best Practices:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&bull; Make intermediate levels clickable</li>
                      <li>&bull; Use consistent separators (/ or &gt;)</li>
                      <li>&bull; Highlight current page (non-clickable)</li>
                      <li>&bull; Truncate on mobile if necessary</li>
                      <li>&bull; Consider structured data for SEO</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forms Patterns */}
        <TabsContent value="forms" className="space-y-6">
          <div className="grid gap-6">
            {/* Multi-step Form */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Multi-step Form</span>
                      <Badge variant="outline">Forms</Badge>
                    </CardTitle>
                    <CardDescription>Progressive form with clear steps and validation</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-6">
                    {/* Progress indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          1
                        </div>
                        <div className="w-16 h-1 bg-primary rounded"></div>
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          2
                        </div>
                        <div className="w-16 h-1 bg-muted rounded"></div>
                        <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          3
                        </div>
                      </div>
                    </div>

                    {/* Form content */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First Name</label>
                          <div className="h-10 bg-muted rounded border"></div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last Name</label>
                          <div className="h-10 bg-muted rounded border"></div>
                        </div>
                      </div>
                      <div className="flex justify-between pt-4">
                        <Button variant="outline" disabled>
                          Previous
                        </Button>
                        <Button>Next Step</Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Key Components:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&bull; Visual progress indicator</li>
                      <li>&bull; Clear step titles and descriptions</li>
                      <li>&bull; Validation on each step</li>
                      <li>&bull; Previous/Next navigation</li>
                      <li>&bull; Save progress functionality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Display Patterns */}
        <TabsContent value="data" className="space-y-6">
          <div className="grid gap-6">
            {/* Data Table Pattern */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Layout className="w-5 h-5" />
                      <span>Data Table</span>
                      <Badge variant="outline">Data</Badge>
                    </CardTitle>
                    <CardDescription>Sortable, filterable data tables with actions</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Users</h3>
                        <div className="flex space-x-2">
                          <div className="w-48 h-8 bg-background border rounded"></div>
                          <Button size="sm">Add User</Button>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr className="text-left">
                            <th className="p-3 text-sm font-medium">Name</th>
                            <th className="p-3 text-sm font-medium">Email</th>
                            <th className="p-3 text-sm font-medium">Role</th>
                            <th className="p-3 text-sm font-medium">Status</th>
                            <th className="p-3 text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 text-sm">John Doe</td>
                            <td className="p-3 text-sm text-muted-foreground">john@example.com</td>
                            <td className="p-3 text-sm">Admin</td>
                            <td className="p-3">
                              <Badge variant="secondary" className="text-xs">
                                Active
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-t">
                            <td className="p-3 text-sm">Jane Smith</td>
                            <td className="p-3 text-sm text-muted-foreground">jane@example.com</td>
                            <td className="p-3 text-sm">User</td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">
                                Pending
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Essential Features:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&bull; Sortable column headers</li>
                      <li>&bull; Search and filter functionality</li>
                      <li>&bull; Row actions (edit, delete, view)</li>
                      <li>&bull; Status indicators with badges</li>
                      <li>&bull; Responsive design for mobile</li>
                      <li>&bull; Pagination for large datasets</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      {/* Design System Tips */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Design System Integration</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Consistent Spacing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Use Tailwind's spacing scale consistently:</p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <div>&bull; p-4, p-6, p-8 for padding</div>
                <div>&bull; space-y-4, space-y-6 for vertical spacing</div>
                <div>&bull; gap-4, gap-6 for grid/flex gaps</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-lg text-green-700 dark:text-green-300">Color Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Follow semantic color patterns:</p>
              <div className="bg-muted p-3 rounded font-mono text-xs">
                <div>&bull; primary for main actions</div>
                <div>&bull; destructive for dangerous actions</div>
                <div>&bull; muted for secondary content</div>
                <div>&bull; accent for highlights</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
