import type React from "react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Footer } from "@/components/footer"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarLayout>
        <div className="flex flex-col min-h-full">
          <div className="flex-1 p-6">{children}</div>
          <Footer />
        </div>
      </SidebarLayout>
    </div>
  )
}
