"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { type editor as EditorNS } from "monaco-editor"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Code, FileText, Database, Wand2, Clipboard, RotateCcw, Download, Moon, Sun, Settings2 } from 'lucide-react'

// Monaco Editor (SSR disabled)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

type LanguageId = "typescript" | "markdown" | "sql"

const LANG_META: Record<
  LanguageId,
  { label: string; icon: React.ComponentType<{ className?: string }>; filename: string; monacoId: string }
> = {
  typescript: {
    label: "TSX",
    icon: Code,
    filename: "index.ts",
    monacoId: "inmemory://model/index.ts",
  },
  markdown: {
    label: "MD",
    icon: FileText,
    filename: "README.md",
    monacoId: "inmemory://model/README.md",
  },
  sql: {
    label: "SQL",
    icon: Database,
    filename: "query.sql",
    monacoId: "inmemory://model/query.sql",
  },
}

const INITIAL_SAMPLES: Record<LanguageId, string> = {
  typescript: `// TypeScript Sample
type User = {
  id: number
  name: string
}

function greet(user: User): string {
  return \`Hello, \${user.name} (#\${user.id})!\`
}

const u: User = { id: 1, name: "Ada Lovelace" }
console.log(greet(u))
`,
  markdown: `# Monaco Editor — Markdown

- Switch language via the toolbar tabs above.
- Use the wand to format (limited outside TS).
- Copy, Reset, and tweak editor settings for a tight workspace.

> Blockquote
>
> \`inline code\`

\`\`\`ts
const answer = 42
\`\`\`
`,
  sql: `-- SQL Sample
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (name, email)
VALUES ('Grace Hopper', 'grace@example.com');

SELECT id, name, email
FROM users
WHERE email LIKE '%@example.com'
ORDER BY id DESC;
`,
}

const STORAGE_KEY = "monaco-playground:v1"

export default function Page() {
  const { toast } = useToast()

  // UI State
  const [currentLang, setCurrentLang] = useState<LanguageId>("typescript")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Editor options
  const [wordWrap, setWordWrap] = useState<boolean>(true)
  const [lineNumbers, setLineNumbers] = useState<"on" | "off">("on")
  const [minimap, setMinimap] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<number>(14)
  const [tabSize, setTabSize] = useState<number>(2)

  // Code per language
  const [codeByLang, setCodeByLang] = useState<Record<LanguageId, string>>({
    typescript: INITIAL_SAMPLES.typescript,
    markdown: INITIAL_SAMPLES.markdown,
    sql: INITIAL_SAMPLES.sql,
  })

  // Editor and status refs
  const editorRef = useRef<EditorNS.IStandaloneCodeEditor | null>(null)
  const [status, setStatus] = useState({
    line: 1,
    col: 1,
    sel: 0,
    lines: 1,
    words: 0,
    chars: 0,
  })

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<typeof codeByLang>
        setCodeByLang((prev) => ({
          ...prev,
          ...parsed,
        }))
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage (debounced)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(codeByLang))
      } catch {
        // ignore
      }
    }, 250)
    return () => clearTimeout(id)
  }, [codeByLang])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      // Cmd/Ctrl+S => Format
      if (e.key.toLowerCase() === "s" && !e.shiftKey) {
        e.preventDefault()
        handleFormat()
      }
      // Shift+Cmd/Ctrl+S => Copy
      if (e.key.toLowerCase() === "s" && e.shiftKey) {
        e.preventDefault()
        handleCopy()
      }
      // Cmd/Ctrl+Backspace => Reset current
      if (e.key === "Backspace") {
        e.preventDefault()
        handleResetCurrent()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang, codeByLang])

  const updateStatus = useCallback(() => {
    const editor = editorRef.current
    const model = editor?.getModel()
    if (!editor || !model) return

    const pos = editor.getPosition()
    const sel = editor.getSelection()
    const text = model.getValue()
    const words = text.trim().length ? text.trim().split(/\s+/).length : 0

    setStatus({
      line: pos?.lineNumber ?? 1,
      col: pos?.column ?? 1,
      sel: sel ? model.getValueInRange(sel).length : 0,
      lines: model.getLineCount(),
      words,
      chars: text.length,
    })
  }, [])

  function handleEditorMount(editor: EditorNS.IStandaloneCodeEditor, monaco: typeof import("monaco-editor")) {
    editorRef.current = editor

    // Improve TS experience
    if (monaco?.languages?.typescript) {
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowJs: true,
        checkJs: false,
        strict: true,
        lib: ["es2020", "dom"],
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        noEmit: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
      })
    }

    // Cursor/selection/content updates for status bar
    const d1 = editor.onDidChangeCursorPosition(updateStatus)
    const d2 = editor.onDidChangeCursorSelection(updateStatus)
    const d3 = editor.onDidChangeModelContent(updateStatus)
    updateStatus()

    // Cleanup
    return () => {
      d1.dispose()
      d2.dispose()
      d3.dispose()
    }
  }

  function handleChange(value?: string) {
    setCodeByLang((prev) => ({
      ...prev,
      [currentLang]: value ?? "",
    }))
  }

  async function handleFormat() {
    try {
      const editor = editorRef.current
      await editor?.getAction("editor.action.formatDocument")?.run()
      toast({
        title: "Formatted",
        description: "Document formatted (if supported by the language).",
      })
    } catch {
      toast({
        title: "Formatting not available",
        description: "This language may not support formatting in Monaco.",
      })
    }
  }

  async function handleCopy() {
    try {
      const editor = editorRef.current
      const model = editor?.getModel()
      const selection = editor?.getSelection()
      const hasSelection = selection && !selection.isEmpty()
      const textToCopy =
        hasSelection && model ? model.getValueInRange(selection!) : codeByLang[currentLang]

      await navigator.clipboard.writeText(textToCopy ?? "")
      toast({
        title: "Copied",
        description: hasSelection ? "Copied selection to clipboard." : "Copied document to clipboard.",
      })
    } catch {
      toast({
        title: "Copy failed",
        description: "Clipboard access was blocked.",
        variant: "destructive",
      } as any)
    }
  }

  function handleResetCurrent() {
    const ok = window.confirm(`Reset ${LANG_META[currentLang].label} to its initial sample?`)
    if (!ok) return
    setCodeByLang((prev) => ({ ...prev, [currentLang]: INITIAL_SAMPLES[currentLang] }))
    toast({ title: "Reset", description: `${LANG_META[currentLang].label} restored.` })
  }

  function handleResetAll() {
    const ok = window.confirm("Reset ALL languages to their initial samples?")
    if (!ok) return
    setCodeByLang({ ...INITIAL_SAMPLES })
    toast({ title: "Reset all", description: "All languages restored." })
  }

  function handleClearStorage() {
    const ok = window.confirm("Clear saved contents from localStorage?")
    if (!ok) return
    try {
      localStorage.removeItem(STORAGE_KEY)
      toast({ title: "Storage cleared", description: "Local saved contents removed." })
    } catch {
      // ignore
    }
  }

  function handleDownload() {
    const blob = new Blob([codeByLang[currentLang] ?? ""], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = LANG_META[currentLang].filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded", description: `Saved ${LANG_META[currentLang].filename}` })
  }

  const LangIcon = LANG_META[currentLang].icon
  const filename = LANG_META[currentLang].filename

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
        <Card className="overflow-hidden border shadow-sm gap-0 py-0">
          {/* Toolbar inside Card, editor will be flush with it */}
          <div
            role="toolbar"
            aria-label="Editor toolbar"
            className="flex items-center justify-between gap-2 border-b bg-muted/50 px-2 py-2"
          >
            {/* Left: Language dropdown and file descriptor */}
            <div className="flex min-w-0 items-center gap-2">
              <Select value={currentLang} onValueChange={(v) => setCurrentLang(v as LanguageId)}>
                <SelectTrigger
                  aria-label="Select language"
                  className="h-8 w-[100px] sm:w-[120px] justify-between"
                >
                  <span className="inline-flex items-center gap-2 [&>span]:flex items-center">
                    <SelectValue placeholder="Language" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(LANG_META) as Array<LanguageId>).map((id) => {
                    const Ico = LANG_META[id].icon
                    return (
                      <SelectItem key={id} value={id}>
                        <span className="inline-flex items-center gap-2">
                          <Ico className="h-4 w-4" />
                          {LANG_META[id].label}
                        </span>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
              <div className="hidden min-w-0 items-center gap-2 truncate sm:inline-flex">
                <LangIcon className="h-4 w-4 text-muted-foreground" />
                <span className="truncate text-xs text-muted-foreground">{filename}</span>
              </div>
            </div>

            {/* Right: Actions */}
            <TooltipProvider delayDuration={200}>
              <div className="flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="secondary" onClick={handleFormat} aria-label="Format (⌘/Ctrl+S)">
                      <Wand2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Format (⌘/Ctrl+S)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="secondary" onClick={handleCopy} aria-label="Copy (⇧+⌘/Ctrl+S)">
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy (Shift+⌘/Ctrl+S)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" onClick={handleResetCurrent} aria-label="Reset current (⌘/Ctrl+⌫)">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset current (⌘/Ctrl+Backspace)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" onClick={handleDownload} aria-label="Download file">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download current file</TooltipContent>
                </Tooltip>

                <Separator orientation="vertical" className="mx-1 h-6" />

                {/* Theme toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
                      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                    >
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>

                {/* Settings */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="icon" variant="ghost" aria-label="Editor settings">
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wrap">Word wrap</Label>
                        <Switch id="wrap" checked={wordWrap} onCheckedChange={setWordWrap} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lineNumbers">Line numbers</Label>
                        <Switch
                          id="lineNumbers"
                          checked={lineNumbers === "on"}
                          onCheckedChange={(v) => setLineNumbers(v ? "on" : "off")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="minimap">Minimap</Label>
                        <Switch id="minimap" checked={minimap} onCheckedChange={setMinimap} />
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 items-center gap-2">
                        <Label className="text-sm">Font size</Label>
                        <Select defaultValue={String(fontSize)} onValueChange={(v) => setFontSize(Number(v))}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent>
                            {[12, 13, 14, 15, 16, 18].map((n) => (
                              <SelectItem key={n} value={String(n)}>
                                {n}px
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Label className="text-sm">Tab size</Label>
                        <Select defaultValue={String(tabSize)} onValueChange={(v) => setTabSize(Number(v))}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Tab" />
                          </SelectTrigger>
                          <SelectContent>
                            {[2, 4, 8].map((n) => (
                              <SelectItem key={n} value={String(n)}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <Button variant="secondary" size="sm" onClick={handleResetAll}>
                          Reset all
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleClearStorage}>
                          Clear storage
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipProvider>
          </div>

          {/* Editor area (flush with toolbar) */}
          <div className="h-[70vh] w-full">
            {/* @ts-expect-error dynamic component type */}
            <MonacoEditor
              height="100%"
              path={LANG_META[currentLang].monacoId}
              defaultLanguage={currentLang}
              language={currentLang}
              value={codeByLang[currentLang]}
              theme={theme === "dark" ? "vs-dark" : "light"}
              onChange={handleChange}
              onMount={handleEditorMount}
              options={{
                automaticLayout: true,
                tabSize,
                fontSize,
                minimap: { enabled: minimap },
                wordWrap: wordWrap ? "on" : "off",
                lineNumbers,
                renderWhitespace: "selection",
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                mouseWheelZoom: true,
                guides: { indentation: false, highlightActiveIndentation: false },
                bracketPairColorization: { enabled: true },
                cursorBlinking: "smooth",
                // Flush look
                padding: { top: 0, bottom: 0 },
                glyphMargin: false,
                lineDecorationsWidth: 8,
              }}
            />
          </div>

          {/* Status bar */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-3 py-1.5 text-xs",
              theme === "dark" ? "bg-neutral-950 text-neutral-300" : "bg-neutral-50 text-neutral-600"
            )}
          >
            <div className="inline-flex items-center gap-2">
              <span className="font-medium">Ln</span>
              <span>{status.line}</span>
              <span className="font-medium">Col</span>
              <span>{status.col}</span>
              <span className="font-medium">Sel</span>
              <span>{status.sel}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="inline-flex items-center gap-2">
              <span>{status.lines} lines</span>
              <span>{status.words} words</span>
              <span>{status.chars} chars</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="inline-flex items-center gap-2">
              <span>Theme</span>
              <span className="font-medium">{theme === "dark" ? "Dark" : "Light"}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="inline-flex items-center gap-2">
              <span>Wrap</span>
              <span className="font-medium">{wordWrap ? "On" : "Off"}</span>
              <span>Tab</span>
              <span className="font-medium">{tabSize}</span>
              <span>Font</span>
              <span className="font-medium">{fontSize}px</span>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
