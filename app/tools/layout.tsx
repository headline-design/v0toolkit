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
          <>{children}</>
          <Footer />
        </div>
      </SidebarLayout>
    </div>
  )
}
