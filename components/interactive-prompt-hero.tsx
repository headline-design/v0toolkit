"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, InfoIcon } from "lucide-react"

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
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    text: " (specializing in ",
    highlight: false,
  },
  {
    text: "gen-ai coding platforms",
    highlight: true,
    tooltip: "Defines the specialized domain knowledge",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    text: ") who built the documentation website for ",
    highlight: false,
  },
  {
    text: "Cursor",
    highlight: true,
    tooltip: "References a credible, well-known company",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    text: " and then worked with ",
    highlight: false,
  },
  {
    text: "Loveable, Bolt, V0",
    highlight: true,
    tooltip: "Additional credibility through multiple company references",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    text: " on ",
    highlight: false,
  },
  {
    text: "best-practices, demo apps",
    highlight: true,
    tooltip: "Specific areas of expertise and past work",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    text: ". We are building a ",
    highlight: false,
  },
  {
    text: "V0-focused toolkit",
    highlight: true,
    tooltip: "Clear project context and scope",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    text: ". I want you to ",
    highlight: false,
  },
  {
    text: "build out technical framework, UI design",
    highlight: true,
    tooltip: "Specific, actionable deliverables",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    text: " for our V0-focused toolkit.",
    highlight: false,
  },
]

export function InteractivePromptHero() {
  const [copiedExample, setCopiedExample] = useState(false)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

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

  return (
    <Card className="relative overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <InfoIcon className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">This prompt built V0 Toolkit</span>
          </div>
          <Button onClick={handleCopyExample} variant="outline" size="sm">
            {copiedExample ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Interactive Prompt */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-lg p-4 font-mono text-sm leading-relaxed">
            {promptSegments.map((segment, index) => (
              <span
                key={index}
                className={`relative transition-all duration-200 ${
                  segment.highlight
                    ? `${segment.color} px-1 py-0.5 rounded cursor-pointer border ${
                        hoveredSegment === index ? "shadow-md scale-105" : ""
                      }`
                    : ""
                }`}
                onMouseEnter={() => segment.highlight && setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {segment.text}
                {segment.highlight && hoveredSegment === index && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                      {segment.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                )}
              </span>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
              <span className="text-muted-foreground">Expertise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-100 border border-purple-200" />
              <span className="text-muted-foreground">Specialization</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-200" />
              <span className="text-muted-foreground">Credibility</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-100 border border-orange-200" />
              <span className="text-muted-foreground">Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-indigo-100 border border-indigo-200" />
              <span className="text-muted-foreground">Context</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-100 border border-red-200" />
              <span className="text-muted-foreground">Deliverables</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
