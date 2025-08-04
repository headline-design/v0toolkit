"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, Code2 } from "lucide-react"

// Interactive prompt highlighting data
const promptSegments = [
  {
    text: "You are a ",
    highlight: false,
  },
  {
    text: "dev relations expert",
    highlight: true,
    tooltip: "Establishes specific expertise and credibility",
    category: "expertise",
  },
  {
    text: " (specializing in ",
    highlight: false,
  },
  {
    text: "gen-ai coding platforms",
    highlight: true,
    tooltip: "Defines the specialized domain knowledge",
    category: "specialization",
  },
  {
    text: ") who built the documentation website for ",
    highlight: false,
  },
  {
    text: "Cursor",
    highlight: true,
    tooltip: "References credible, well-known companies",
    category: "credibility",
  },
  {
    text: " and then worked with ",
    highlight: false,
  },
  {
    text: "Loveable and Bolt and V0",
    highlight: true,
    tooltip: "Multiple company references strengthen credibility",
    category: "credibility",
  },
  {
    text: " on ",
    highlight: false,
  },
  {
    text: "best-practices, demo apps, etc",
    highlight: true,
    tooltip: "Specific areas of expertise and past work",
    category: "experience",
  },
  {
    text: ". We are building a ",
    highlight: false,
  },
  {
    text: "V0-focused toolkit with useful tools, prompts, and best-practices for V0",
    highlight: true,
    tooltip: "Clear project context and comprehensive scope",
    category: "context",
  },
  {
    text: ". I want you to build out the ",
    highlight: false,
  },
  {
    text: "technical framework and UI design",
    highlight: true,
    tooltip: "Specific, actionable deliverables",
    category: "deliverables",
  },
  {
    text: " for our V0-focused toolkit.",
    highlight: false,
  },
]

const legendItems = [
  {
    category: "expertise",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    label: "Expertise",
  },
  {
    category: "specialization",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    label: "Specialization",
  },
  {
    category: "credibility",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    label: "Credibility",
  },
  {
    category: "experience",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    label: "Experience",
  },
  {
    category: "context",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    label: "Context",
  },
  {
    category: "deliverables",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    label: "Deliverables",
  },
]

export default function InteractivePromptHero() {
  const [copiedExample, setCopiedExample] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const fullPrompt = promptSegments.map((segment) => segment.text).join("")

  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt)
      setCopiedExample(true)
      setTimeout(() => setCopiedExample(false), 2000)
    } catch (error) {
      console.error("Failed to copy example:", error)
    }
  }

  const getSegmentStyle = (category: string) => {
    const item = legendItems.find((item) => item.category === category)
    return item ? item.color : ""
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-muted rounded-full text-sm font-medium text-muted-foreground mb-3">
            <Code2 className="h-3 w-3" />
            Interactive Prompt Engineering
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">The Prompt That Built V0 Toolkit</h1>
        </div>

        {/* Code Block */}
        <div className="bg-card border rounded-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-muted border-b">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-muted-foreground text-sm font-mono">system-prompt.txt</span>
            </div>
            <Button onClick={handleCopyExample} variant="ghost" size="sm" className="h-6 px-2 text-xs">
              {copiedExample ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* Code Content */}
          <div className="p-3">
            <div className="flex">
              <div className="text-muted-foreground text-sm mr-3 select-none font-mono">
                <span>1</span>
              </div>
              <div className="flex-1 font-mono text-sm leading-6">
                {promptSegments.map((segment, index) => (
                  <span
                    key={index}
                    className={`${
                      segment.highlight
                        ? `px-1 py-0.5 rounded cursor-pointer font-medium transition-colors duration-200 ${getSegmentStyle(segment.category)}`
                        : "text-foreground"
                    }`}
                    onMouseEnter={() => segment.highlight && setHoveredCategory(segment.category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {segment.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex flex-wrap gap-3 justify-center mb-3">
            {legendItems.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded ${item.color.split(" ")[0]}`} />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="text-center min-h-[1.5rem] flex items-center justify-center">
            {hoveredCategory ? (
              <p className="text-foreground text-sm max-w-lg">
                {promptSegments.find((segment) => segment.category === hoveredCategory)?.tooltip}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">Hover over highlighted sections to see explanations</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
