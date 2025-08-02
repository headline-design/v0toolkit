"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { History, BookOpen, Lightbulb, Target, Zap, Clock, PanelRightClose, PanelRightOpen } from "lucide-react"
import { useGeneratedPrompts } from "@/lib/hooks/use-prompt-generator"
import { useIsMobile } from "@/hooks/use-mobile"

interface AssistantPanelProps {
  isOpen: boolean
  onToggle: () => void
}

export function AssistantPanel({ isOpen, onToggle }: AssistantPanelProps) {
  const { prompts: generatedPrompts, loading: historyLoading } = useGeneratedPrompts()
  const isMobile = useIsMobile()

  const AssistantContent = () => (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="history" className="flex-1 flex flex-col">
        <div className="px-4 py-3 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guide
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="history" className="p-4 space-y-4 mt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Generated Prompts
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {generatedPrompts.length}
                </Badge>
              </div>

              {historyLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading...</span>
                  </div>
                </div>
              ) : generatedPrompts.length === 0 ? (
                <div className="text-center py-8">
                  <History className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">No prompts saved yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generatedPrompts.slice(0, 10).map((prompt) => (
                    <Card key={prompt.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {prompt.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {prompt.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-xs bg-muted/50 p-2 rounded font-mono">
                            {prompt.prompt.length > 80 ? `${prompt.prompt.substring(0, 80)}...` : prompt.prompt}
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {prompt.estimatedTokens} tokens
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
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

          <TabsContent value="guide" className="p-4 space-y-6 mt-0">
            <div className="space-y-6 text-sm">
              {/* Getting Started */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Getting Started
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Fill the Fields</p>
                      <p className="text-muted-foreground text-xs">
                        Complete the form fields with your specific requirements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Preview & Refine</p>
                      <p className="text-muted-foreground text-xs">Review the generated prompt and make adjustments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Copy & Use</p>
                      <p className="text-muted-foreground text-xs">
                        Copy your prompt and use it with V0 or other AI tools
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Best Practices */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Best Practices
                </h4>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="font-medium">Be Specific</p>
                    <p className="text-muted-foreground text-xs">Provide detailed information for better results</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Use Examples</p>
                    <p className="text-muted-foreground text-xs">Load example configurations to understand structure</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Iterate</p>
                    <p className="text-muted-foreground text-xs">Try variations and refine based on results</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pro Tips */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pro Tips
                </h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p>Use tag fields for multiple related concepts</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p>Multi-select allows comprehensive coverage</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p>Save successful prompts for future reference</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="right" className="w-80 p-0">
          <AssistantContent />
        </SheetContent>
      </Sheet>
    )
  }

  if (!isOpen) {
    return (
      <div className="w-12 border-l bg-background flex flex-col items-center py-4">
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          <PanelRightOpen className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="font-semibold text-sm">Assistant</h2>
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-7 w-7 p-0">
          <PanelRightClose className="h-4 w-4" />
        </Button>
      </div>
      <AssistantContent />
    </div>
  )
}
