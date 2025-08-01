import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder, File, Layers, Lightbulb } from "lucide-react"

const projectStructures = [
  {
    id: "nextjs-app-router",
    title: "Next.js App Router",
    description: "Modern Next.js project structure using the App Router",
    type: "Framework",
    structure: [
      { name: "app/", type: "folder", description: "App Router directory" },
      { name: "  layout.tsx", type: "file", description: "Root layout component" },
      { name: "  page.tsx", type: "file", description: "Home page component" },
      { name: "  globals.css", type: "file", description: "Global styles" },
      { name: "  (auth)/", type: "folder", description: "Route group for auth pages" },
      { name: "    login/page.tsx", type: "file", description: "Login page" },
      { name: "    register/page.tsx", type: "file", description: "Register page" },
      { name: "  api/", type: "folder", description: "API routes" },
      { name: "    users/route.ts", type: "file", description: "Users API endpoint" },
      { name: "components/", type: "folder", description: "Reusable components" },
      { name: "  ui/", type: "folder", description: "UI components (shadcn/ui)" },
      { name: "  forms/", type: "folder", description: "Form components" },
      { name: "lib/", type: "folder", description: "Utility functions and configurations" },
      { name: "  utils.ts", type: "file", description: "Utility functions" },
      { name: "  validations.ts", type: "file", description: "Zod schemas" },
      { name: "public/", type: "folder", description: "Static assets" },
      { name: "package.json", type: "file", description: "Dependencies and scripts" },
      { name: "tailwind.config.js", type: "file", description: "Tailwind configuration" },
      { name: "tsconfig.json", type: "file", description: "TypeScript configuration" },
    ],
  },
  {
    id: "react-component-library",
    title: "React Component Library",
    description: "Structure for building and publishing React component libraries",
    type: "Library",
    structure: [
      { name: "src/", type: "folder", description: "Source code" },
      { name: "  components/", type: "folder", description: "Component implementations" },
      { name: "    Button/", type: "folder", description: "Button component" },
      { name: "      Button.tsx", type: "file", description: "Component implementation" },
      { name: "      Button.test.tsx", type: "file", description: "Component tests" },
      { name: "      Button.stories.tsx", type: "file", description: "Storybook stories" },
      { name: "      index.ts", type: "file", description: "Component exports" },
      { name: "  hooks/", type: "folder", description: "Custom React hooks" },
      { name: "  utils/", type: "folder", description: "Utility functions" },
      { name: "  types/", type: "folder", description: "TypeScript type definitions" },
      { name: "  index.ts", type: "file", description: "Main library exports" },
      { name: "dist/", type: "folder", description: "Built library files" },
      { name: "stories/", type: "folder", description: "Storybook configuration" },
      { name: "tests/", type: "folder", description: "Test utilities and setup" },
      { name: "package.json", type: "file", description: "Package configuration" },
      { name: "rollup.config.js", type: "file", description: "Build configuration" },
      { name: ".storybook/", type: "folder", description: "Storybook configuration" },
    ],
  },
  {
    id: "fullstack-saas",
    title: "Full-Stack SaaS Application",
    description: "Complete SaaS application structure with authentication, database, and payments",
    type: "Application",
    structure: [
      { name: "apps/", type: "folder", description: "Application packages" },
      { name: "  web/", type: "folder", description: "Next.js frontend application" },
      { name: "    app/", type: "folder", description: "App Router pages" },
      { name: "    components/", type: "folder", description: "React components" },
      { name: "    lib/", type: "folder", description: "Frontend utilities" },
      { name: "  api/", type: "folder", description: "Backend API (Express/Fastify)" },
      { name: "    src/routes/", type: "folder", description: "API route handlers" },
      { name: "    src/middleware/", type: "folder", description: "Express middleware" },
      { name: "    src/models/", type: "folder", description: "Database models" },
      { name: "packages/", type: "folder", description: "Shared packages" },
      { name: "  ui/", type: "folder", description: "Shared UI components" },
      { name: "  database/", type: "folder", description: "Database schema and migrations" },
      { name: "  auth/", type: "folder", description: "Authentication utilities" },
      { name: "  config/", type: "folder", description: "Shared configuration" },
      { name: "docs/", type: "folder", description: "Documentation" },
      { name: "package.json", type: "file", description: "Workspace configuration" },
      { name: "turbo.json", type: "file", description: "Turborepo configuration" },
    ],
  },
]

const namingConventions = [
  {
    category: "Files",
    conventions: [
      { pattern: "kebab-case", example: "user-profile.tsx", usage: "Component files, pages" },
      { pattern: "camelCase", example: "useUserData.ts", usage: "Hooks, utilities" },
      { pattern: "PascalCase", example: "UserProfile.tsx", usage: "Component names" },
      { pattern: "UPPER_CASE", example: "API_BASE_URL", usage: "Constants, environment variables" },
    ],
  },
  {
    category: "Folders",
    conventions: [
      { pattern: "kebab-case", example: "user-settings/", usage: "General folders" },
      { pattern: "camelCase", example: "userSettings/", usage: "JavaScript/TypeScript modules" },
      { pattern: "(groupName)", example: "(auth)/", usage: "Next.js route groups" },
      { pattern: "[dynamic]", example: "[userId]/", usage: "Next.js dynamic routes" },
    ],
  },
]

export default function ToolsStructurePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Project Structure</h1>
          <p className="text-lg text-muted-foreground">
            File organization patterns and naming conventions for different project types
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <span>{projectStructures.length} structure templates</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Industry standard patterns</span>
          </div>
        </div>
      </div>

      {/* Project Structures */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Project Templates</h2>
        <div className="grid gap-6">
          {projectStructures.map((project) => (
            <Card key={project.id} className="border-0 shadow-sm ring-1 ring-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{project.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                  {project.structure.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2 py-1">
                      <div className="flex items-center space-x-1 min-w-0 flex-1">
                        {item.type === "folder" ? (
                          <Folder className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        ) : (
                          <File className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        )}
                        <span className="text-foreground">{item.name}</span>
                      </div>
                      <span className="text-muted-foreground text-xs hidden sm:block">{item.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Naming Conventions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Naming Conventions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {namingConventions.map((section) => (
            <Card key={section.category} className="border-0 shadow-sm ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-lg">{section.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.conventions.map((convention, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-semibold bg-muted px-2 py-1 rounded">{convention.pattern}</code>
                        <span className="text-xs text-muted-foreground">{convention.usage}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Example: <code className="bg-muted px-1 rounded">{convention.example}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-600 flex-shrink-0" />
              <span>Keep folder nesting to a maximum of 3-4 levels deep</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-600 flex-shrink-0" />
              <span>Group related files together (components, tests, styles)</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-600 flex-shrink-0" />
              <span>Use index files to create clean import paths</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="mt-1.5 h-1 w-1 rounded-full bg-blue-600 flex-shrink-0" />
              <span>Be consistent with naming conventions across your project</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
