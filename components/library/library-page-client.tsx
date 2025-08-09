"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { LibraryDefinition, LibraryItem } from "@/lib/library/types"
import { ItemSidebar, type SidebarGroup } from "./item-sidebar"
import { ItemView } from "./item-view"
import { LibShell } from "./lib-shell"
import { TypeHeader } from "./type-header"

export default function LibraryPageClient({
  definition,
}: {
  definition: LibraryDefinition
}) {
  const router = useRouter()
  const params = useSearchParams()
  const selectedId = params.get("item") || undefined

  // Group items by section, preserving section order
  const groups = React.useMemo<SidebarGroup[]>(() => {
    const map = new Map<string | undefined, LibraryItem[]>()
    for (const it of definition.items) {
      const key = it.section
      const arr = map.get(key) ?? []
      arr.push(it)
      map.set(key, arr)
    }
    const ordered: SidebarGroup[] = []
    const sectionOrder = definition.sections?.map((s) => s.id) ?? []
    // Add defined sections in order
    for (const sid of sectionOrder) {
      ordered.push({
        section: definition.sections?.find((s) => s.id === sid),
        items: (map.get(sid) ?? []).sort((a, b) => a.title.localeCompare(b.title)),
      })
      map.delete(sid)
    }
    // Add any remaining items without a section
    if (map.size) {
      ordered.push({
        section: undefined,
        items: (map.get(undefined) ?? []).sort((a, b) => a.title.localeCompare(b.title)),
      })
    }
    return ordered.filter((g) => g.items.length > 0)
  }, [definition])

  const allItems = definition.items
  const current = React.useMemo<LibraryItem | undefined>(() => {
    if (selectedId) return allItems.find((i) => i.id === selectedId)
    return allItems[0]
  }, [allItems, selectedId])

  function handleSelect(id: string) {
    const url = new URL(window.location.href)
    url.searchParams.set("item", id)
    router.push(url.pathname + "?" + url.searchParams.toString())
  }

  return (
    <LibShell
      header={
        <TypeHeader
          title={definition.title}
          description={definition.description}
          icon={definition.icon}
        />
      }
      sidebar={
        <ItemSidebar
          groups={groups}
          selectedId={current?.id}
          onSelect={handleSelect}
        />
      }
      content={current ? <ItemView item={current} /> : null}
    />
  )
}
