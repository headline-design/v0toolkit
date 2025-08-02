"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { History, BookOpen, Lightbulb, Target, Zap, Clock, Sparkles } from "lucide-react"
import { PromptGenerator } from "@/components/prompt-generator"
import { InteractivePromptHero } from "@/components/interactive-prompt-hero"
import { usePromptGenerator, useGeneratedPrompts } from "@/lib/hooks/use-prompt-generator"

export default function PromptGeneratorPage() {
  const router = useRouter()
  const promptGeneratorHook = usePromptGenerator()
  const { prompts: generatedPrompts, loading: historyLoading } = useGeneratedPrompts()
  const [mainTab, setMainTab] = useState<"templates" | "history" | "guide">("templates")

  // Handle template selection - navigate to editor page
  const handleTemplateSelect = (template: any) => {
    router.push(`/tools/prompt-generator/editor?template=${template.id}`)
  }

  return (
    <div className="flex-1 p-6">

    <div className="container mx-auto px-6 py-8 max-w-7xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          V0 Prompt Generator
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Create Powerful AI Prompts</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Generate sophisticated, professional-grade prompts using structured templates. Transform simple ideas into
          detailed, context-rich instructions that get better results.
        </p>
      </div>

      {/* Interactive Hero */}
      <InteractivePromptHero />

      {/* Main Tabs */}
      <Tabs value={mainTab} onValueChange={(value) => setMainTab(value as "templates" | "history" | "guide")}>
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4 mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
            <p className="text-muted-foreground">
              Select a professionally crafted template to get started with your prompt generation
            </p>
          </div>
          <PromptGenerator hook={promptGeneratorHook} onTemplateSelect={handleTemplateSelect} />
        </TabsContent>

        <TabsContent value="history" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <History className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Prompt History</h2>
              <Badge variant="secondary" className="ml-auto">
                {generatedPrompts.length}
              </Badge>
            </div>

            {historyLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 animate-spin" />
                  <span>Loading history...</span>
                </div>
              </div>
            ) : generatedPrompts.length === 0 ? (
              <div className="text-center py-12">
                <History className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No prompts saved yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by selecting a template and generating your first prompt
                </p>
                <Button onClick={() => setMainTab("templates")}>Browse Templates</Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {generatedPrompts.map((prompt) => (
                  <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {prompt.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{prompt.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm bg-muted/50 p-3 rounded font-mono leading-relaxed">
                          {prompt.prompt.length > 120 ? `${prompt.prompt.substring(0, 120)}...` : prompt.prompt}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Zap className="h-3 w-3" />
                            {prompt.estimatedTokens} tokens
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(prompt.prompt)}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="guide" className="mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Usage Guide</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Getting Started */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5" />
                    Getting Started
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Choose a Template</p>
                        <p className="text-muted-foreground text-sm">
                          Browse our collection of professionally crafted templates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Fill the Fields</p>
                        <p className="text-muted-foreground text-sm">
                          Complete the form with your specific requirements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Generate & Use</p>
                        <p className="text-muted-foreground text-sm">
                          Copy your prompt and use it with V0 or other AI tools
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Practices */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5" />
                    Best Practices
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="font-medium">Be Specific</p>
                      <p className="text-muted-foreground text-sm">Provide detailed information for better results</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Use Examples</p>
                      <p className="text-muted-foreground text-sm">
                        Load example configurations to understand structure
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Iterate</p>
                      <p className="text-muted-foreground text-sm">Try variations and refine based on results</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Save Successful Prompts</p>
                      <p className="text-muted-foreground text-sm">Build a library of prompts that work well for you</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tips */}
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5" />
                    Pro Tips
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm">Use tag fields for multiple related concepts</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm">Multi-select allows comprehensive coverage</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm">Load examples to understand field usage</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm">Check token estimates to optimize length</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  )
}
