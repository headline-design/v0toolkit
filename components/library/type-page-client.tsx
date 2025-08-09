"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Filter, List, Search, Tag } from 'lucide-react'
import { CodeSnippet } from "./code-snippet"
import type { LibraryDefinition, LibraryItem } from "@/lib/library/types"
import { cn } from "@/lib/utils"

function fuzzyIncludes(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

function groupBySection(items: LibraryItem[]) {
  const map = new Map<string, LibraryItem[]>()
  for (const item of items) {
    const key = item.section || "general"
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return Array.from(map.entries()).map(([id, list]) => ({ id, items: list }))
}

export default function TypePageClient({ def }: { def: LibraryDefinition }) {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [compact, setCompact] = useState(false)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    def.items.forEach((i) => i.tags?.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [def.items])

  const filtered = useMemo(() => {
    let items = def.items
    if (query) {
      items = items.filter(
        (i) =>
          fuzzyIncludes(i.title, query) ||
          fuzzyIncludes(i.description || "", query) ||
          (i.tags || []).some((t) => fuzzyIncludes(t, query)) ||
          fuzzyIncludes(i.code?.value || "", query)
      )
    }
    if (activeTag) {
      items = items.filter((i) => i.tags?.includes(activeTag))
    }
    return items
  }, [def.items, query, activeTag])

  const groups = useMemo(() => {
    const grouped = groupBySection(filtered)
    // stable sort by known section order if provided
    const order = def.sections?.map((s) => s.id) || []
    return grouped.sort((a, b) => {
      const ia = order.indexOf(a.id)
      const ib = order.indexOf(b.id)
      if (ia === -1 && ib === -1) return a.id.localeCompare(b.id)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
  }, [filtered, def.sections])

  const toc = useMemo(() => {
    return groups.map((g) => {
      const title =
        def.sections?.find((s) => s.id === g.id)?.title ?? g.id.charAt(0).toUpperCase() + g.id.slice(1)
      return { id: g.id, title, count: g.items.length }
    })
  }, [groups, def.sections])

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Left Column: sticky inside the single card */}
      <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-9rem)] lg:overflow-auto pr-0 lg:pr-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="lib-search" className="sr-only">
              Search {def.title}
            </label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="lib-search"
                placeholder={"Search " + def.title}
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                <span>Filter by tag</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={activeTag === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveTag(null)}
                >
                  All
                </Badge>
                {allTags.map((t) => (
                  <Badge
                    key={t}
                    variant={activeTag === t ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveTag(activeTag === t ? null : t)}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-muted-foreground">Sections</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setCompact((v) => !v)}
              >
                <List className="h-3.5 w-3.5 mr-1" />
                {compact ? "Detailed" : "Compact"}
              </Button>
            </div>
            <nav className="space-y-1">
              {toc.map((s) => (
                <a
                  key={s.id}
                  href={"#section-" + s.id}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{s.title}</span>
                  <span className="text-xs text-muted-foreground">{s.count}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Right Column: content */}
      <div className="space-y-8">
        {groups.length === 0 && (
          <div className="text-sm text-muted-foreground">No results. Try a different search or tag.</div>
        )}
        {groups.map((group) => {
          const sectionTitle =
            def.sections?.find((s) => s.id === group.id)?.title ??
            group.id.charAt(0).toUpperCase() + group.id.slice(1)

          return (
            <section key={group.id} id={"section-" + group.id} className="scroll-mt-24">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{sectionTitle}</h2>
                <span className="text-xs text-muted-foreground">{group.items.length} item(s)</span>
              </div>
              <Separator />
              <div className={cn("mt-4 grid gap-4", compact ? "grid-cols-1" : "md:grid-cols-2")}>
                {group.items.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className={cn(
                      "rounded-md border p-4 bg-card text-card-foreground transition-colors",
                      compact ? "py-3" : "py-4"
                    )}
                    aria-labelledby={item.id + "-title"}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 id={item.id + "-title"} className="font-medium">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      {item.tags && item.tags.length > 0 && !compact && (
                        <div className="hidden md:flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {item.code && (
                      <CodeSnippet language={item.code.language} value={item.code.value} className="mt-3" />
                    )}

                    {!compact && (item.tips?.length || item.links?.length) ? (
                      <div className="mt-3 space-y-2">
                        {item.tips && item.tips.length > 0 && (
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {item.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        )}
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((l) => (
                              <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-xs underline-offset-2 hover:underline text-muted-foreground"
                              >
                                {l.label}
                                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
