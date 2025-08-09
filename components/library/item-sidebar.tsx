"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { LibraryItem, LibrarySection } from "@/lib/library/types"

export type SidebarGroup = {
  section?: LibrarySection
  items: LibraryItem[]
}

export function ItemSidebar({
  groups,
  selectedId,
  onSelect,
  className,
}: {
  groups: SidebarGroup[]
  selectedId?: string
  onSelect: (id: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        // Mobile: limit height so the first screen isn't entirely links
        // Desktop (lg+): sticky with a taller viewport-constrained height
        "max-h-[40vh] lg:sticky lg:top-0 lg:max-h-[70vh]",
        className
      )}
    >
      <ScrollArea
        className="h-[40vh] lg:h-[70vh] pr-2"
        aria-label="Library item navigation"
        role="navigation"
      >
        <nav className="space-y-4">
          {groups.map((g, gi) => (
            <div key={gi}>
              {g.section ? (
                <div className="px-1 pb-1 text-[0.75rem] font-medium text-muted-foreground uppercase tracking-wide">
                  {g.section.title}
                </div>
              ) : null}
              <ul className="space-y-1">
                {g.items.map((it) => (
                  <li key={it.id}>
                    <button
                      onClick={() => onSelect(it.id)}
                      className={cn(
                        "w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                        selectedId === it.id &&
                          "bg-muted font-medium ring-1 ring-border"
                      )}
                      title={it.title}
                      aria-current={selectedId === it.id ? "page" : undefined}
                    >
                      {it.title}
                    </button>
                  </li>
                ))}
              </ul>
              {gi < groups.length - 1 ? (
                <Separator className="my-3 opacity-50" />
              ) : null}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
