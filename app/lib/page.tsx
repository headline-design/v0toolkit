import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function LibraryIndexPage() {
  const libs = [
    {
      id: "sql",
      title: "SQL Snippets",
      description: "Common Postgres queries for schema inspection, policies, and maintenance.",
      tags: ["postgres", "introspection", "policies"],
    },
    {
      id: "prompts",
      title: "Prompt Snippets",
      description: "Reusable prompt patterns for AI coding workflows.",
      tags: ["roles", "patterns", "system"],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
        <p className="text-sm text-muted-foreground">Curated snippets and notes to speed up your workflow.</p>
        <Separator className="mt-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {libs.map((lib) => (
          <Link key={lib.id} href={`/lib/${lib.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{lib.title}</CardTitle>
                <CardDescription>{lib.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {lib.tags.map((t) => (
                    <Badge key={t} variant="outline" className="h-5 text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
