/* eslint react/jsx-key: off */
"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Highlight, type Language } from "prism-react-renderer"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

import {
  Cog,
  Download,
  FileCode2,
  Hash,
  Info,
  Maximize2,
  Minimize2,
  Moon,
  Quote,
  Search,
  Sun,
} from "lucide-react"

import github from "@/components/library/code-themes/github"
import dracula from "@/components/library/code-themes/dracula"

/* ------------------------------------------------------------------ */
/* utilities                                                          */
/* ------------------------------------------------------------------ */

const LANG_MAP: Record<string, Language> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  sql: "sql",
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  js: "javascript",
  javascript: "javascript",
  json: "json",
  md: "markdown",
  markdown: "markdown",
  txt: "markup",
  text: "markup",
}
const normLang = (l?: string): Language => LANG_MAP[(l || "text").toLowerCase()] ?? "markup"

const escapeRx = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const prefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches

/* ------------------------------------------------------------------ */
/* main component                                                     */
/* ------------------------------------------------------------------ */

type CodeTheme = "auto" | "light" | "dark"
type FontSize = "sm" | "md" | "lg"

export interface CodeViewerProps {
  value: string
  language?: string
  filename?: string
  /** UI toggles */
  showToolbar?: boolean
  showLineNumbers?: boolean
  initialWrap?: boolean
  initialTheme?: CodeTheme
  initialFontSize?: FontSize
  /** Decorations */
  highlightLines?: number[]
  diff?: { added?: number[]; removed?: number[] }
  /** Layout */
  minHeight?: number | string
  maxHeight?: number | string
  /** Behaviour */
  persistUserPrefs?: boolean
  enableFullscreen?: boolean
  className?: string
}

export function CodeViewer({
  value,
  language = "text",
  filename,
  showToolbar = true,
  showLineNumbers = true,
  initialWrap = false,
  initialTheme = "auto",
  initialFontSize = "md",
  highlightLines,
  diff,
  minHeight = 280,
  maxHeight = "65vh",
  persistUserPrefs = true,
  enableFullscreen = false,
  className,
}: CodeViewerProps) {
  /* ---------------- prefs (localStorage) ---------------- */
  const [prefs, setPrefs] = React.useState(() => {
    if (!persistUserPrefs) {
      return { wrap: initialWrap, theme: initialTheme, font: initialFontSize, ws: false }
    }
    try {
      const raw = localStorage.getItem("cv:prefs")
      return raw
        ? JSON.parse(raw)
        : { wrap: initialWrap, theme: initialTheme, font: initialFontSize, ws: false }
    } catch {
      return { wrap: initialWrap, theme: initialTheme, font: initialFontSize, ws: false }
    }
  })
  React.useEffect(() => {
    if (!persistUserPrefs) return
    localStorage.setItem("cv:prefs", JSON.stringify(prefs))
  }, [prefs, persistUserPrefs])

  const setPref = <K extends keyof typeof prefs>(k: K, v: (typeof prefs)[K]) =>
    setPrefs(old => ({ ...old, [k]: v }))

  /* ---------------- computed props ---------------- */
  const fontClass =
    prefs.font === "sm" ? "text-xs" : prefs.font === "lg" ? "text-sm md:text-base" : "text-sm"
  const theme =
    prefs.theme === "auto"
      ? prefersDark()
        ? dracula
        : github
      : prefs.theme === "dark"
      ? dracula
      : github
  const lang = normLang(language)

  /* ---------------- split lines (once) ------------- */
  const rawLines = React.useMemo(() => {
    const ls = value.replace(/\r\n?/g, "\n").split("\n")
    // drop trailing blank line so numbers are exact
    if (ls.length > 1 && ls[ls.length - 1] === "") ls.pop()
    return ls
  }, [value])
  const total = rawLines.length

  /* ---------------- search state ------------------ */
  const [searchBox, setSearchBox] = React.useState(false)
  const [q, setQ] = React.useState("")
  const [caseSens, setCaseSens] = React.useState(false)
  const [regex, setRegex] = React.useState(false)
  const matches = React.useMemo(() => {
    if (!q) return []
    let rx: RegExp
    try {
      rx = regex ? new RegExp(q, caseSens ? "g" : "gi") : new RegExp(escapeRx(q), caseSens ? "g" : "gi")
    } catch {
      rx = new RegExp(escapeRx(q), caseSens ? "g" : "gi")
    }
    const out: { line: number; start: number; end: number }[] = []
    rawLines.forEach((l, i) => {
      rx.lastIndex = 0
      let m: RegExpExecArray | null
      while ((m = rx.exec(l))) {
        if (!m[0]) break
        out.push({ line: i + 1, start: m.index, end: m.index + m[0].length })
        if (m.index === rx.lastIndex) rx.lastIndex++ // zero-width
      }
    })
    return out
  }, [q, caseSens, regex, rawLines])
  const [matchIdx, setMatchIdx] = React.useState(0)
  React.useEffect(() => setMatchIdx(0), [matches.length])

  /* ---------------- goto line --------------------- */
  const [gotoUI, setGotoUI] = React.useState(false)
  const [gotoVal, setGotoVal] = React.useState("")

  /* ---------------- refs for scrolling ------------ */
  const containerRef = React.useRef<HTMLDivElement>(null)
  const gotoLine = (n: number, center = false) => {
    const el = containerRef.current
    if (!el) return
    const lineHeight = parseFloat(getComputedStyle(el).getPropertyValue("--cv-line-h"))
    const y = (Math.max(1, Math.min(total, n)) - 1) * lineHeight
    el.scrollTo({ top: center ? y - el.clientHeight / 2 : y, behavior: "smooth" })
  }

  /* ---------------- clipboard helpers ------------- */
  const { toast } = useToast()
  const copyFenced = () =>
    navigator.clipboard
      ?.writeText(["```" + language, value, "```"].join("\n"))
      .then(() => toast({ title: "Copied fenced block" }))

  const download = () => {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename || `snippet.${language || "txt"}`
    a.click()
    URL.revokeObjectURL(url)
  }

  /* ---------------- full screen ------------------- */
  const [full, setFull] = React.useState(false)
  React.useEffect(() => {
    if (!full) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [full])

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    enableFullscreen && full
      ? createPortal(
          <div className="fixed inset-0 z-50 bg-background p-3 sm:p-6">
            <div className="h-full w-full overflow-hidden rounded-lg border bg-muted/30">{children}</div>
          </div>,
          document.body
        )
      : <div className={cn("overflow-hidden rounded-lg border bg-muted/30", className)}>{children}</div>

  /* ---------------- decorations ------------------- */
  const added = React.useMemo(() => new Set(diff?.added ?? []), [diff?.added])
  const removed = React.useMemo(() => new Set(diff?.removed ?? []), [diff?.removed])
  const highlighted = React.useMemo(() => new Set(highlightLines ?? []), [highlightLines])

  /* ------------------------------------------------------------------ */
  /* render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="relative w-full">
      <Wrapper>
        {/* ---------------- toolbar ---------------- */}
        {showToolbar && (
          <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b bg-background px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <FileCode2 className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline">{language.toUpperCase()}</Badge>
              {filename && (
                <span className="truncate text-xs text-muted-foreground" title={filename}>
                  {filename}
                </span>
              )}
              <span className="ml-2 hidden text-xs text-muted-foreground md:inline">{total} lines</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* search box */}
              {searchBox && (
                <div className="flex items-center gap-1 rounded-md border bg-background px-2 py-1">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="cv-search"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Find"
                    className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <span className="mx-1 text-xs text-muted-foreground">
                    {matches.length ? `${matchIdx + 1}/${matches.length}` : "0/0"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMatchIdx(i => (i - 1 + matches.length) % matches.length)}
                    disabled={!matches.length}
                  >
                    ←
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMatchIdx(i => (i + 1) % matches.length)}
                    disabled={!matches.length}
                  >
                    →
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Cog className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem
                        checked={caseSens}
                        onCheckedChange={v => setCaseSens(Boolean(v))}
                      >
                        Case sensitive
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={regex} onCheckedChange={v => setRegex(Boolean(v))}>
                        Regex
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="icon" onClick={() => setSearchBox(false)}>
                    ×
                  </Button>
                </div>
              )}

              <Button variant="outline" size="icon" onClick={() => setSearchBox(s => !s)}>
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setGotoUI(g => !g)
                  setTimeout(() => (document.getElementById("cv-goto") as HTMLInputElement)?.focus(), 0)
                }}
              >
                <Hash className="h-4 w-4" />
              </Button>
              <CopyButton value={value} size="sm" label="Copy code" />

              {/* prefs */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Cog className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Theme</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={prefs.theme}
                    onValueChange={v => setPref("theme", v as CodeTheme)}
                  >
                    <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-3.5 w-3.5" /> Light
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-3.5 w-3.5" /> Dark
                      </div>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Font size</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={prefs.font}
                    onValueChange={v => setPref("font", v as FontSize)}
                  >
                    <DropdownMenuRadioItem value="sm">Small</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="md">Medium</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lg">Large</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={prefs.wrap}
                    onCheckedChange={v => setPref("wrap", Boolean(v))}
                  >
                    Wrap long lines
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={prefs.ws}
                    onCheckedChange={v => setPref("ws", Boolean(v))}
                  >
                    Show whitespace
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showLineNumbers}
                    disabled
                    onCheckedChange={() => {}}
                  >
                    Line numbers&nbsp;(always on)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* extras */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Quote className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={copyFenced}>Copy fenced block</DropdownMenuItem>
                  <DropdownMenuItem onClick={download}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {enableFullscreen && (
                <Button variant="outline" size="icon" onClick={() => setFull(f => !f)}>
                  {full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* goto line UI */}
        {gotoUI && (
          <div className="border-b bg-muted/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <input
                id="cv-goto"
                value={gotoVal}
                onChange={e => setGotoVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    const n = parseInt(gotoVal, 10)
                    if (Number.isFinite(n)) gotoLine(n)
                    setGotoUI(false)
                  }
                  if (e.key === "Escape") setGotoUI(false)
                }}
                placeholder={`Line 1-${total}`}
                className="w-28 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="sm" onClick={() => gotoLine(Number(gotoVal))}>
                Go
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setGotoUI(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* line-height probe (sets CSS var) */}
        <span
          id="cv-lh-probe"
          aria-hidden
          className={cn("absolute opacity-0 pointer-events-none select-none font-mono", fontClass)}
          ref={el => {
            if (!el) return
            const lh = parseFloat(getComputedStyle(el).lineHeight)
            const host = containerRef.current
            if (host) host.style.setProperty("--cv-line-h", `${lh}px`)
          }}
        >
          A
        </span>

        {/* ---------------- scrollable code --------------- */}
        <div
          ref={containerRef}
          role="region"
          aria-label={filename ? `Code: ${filename}` : "Code block"}
          tabIndex={0}
          className="relative w-full overflow-auto bg-transparent"
          style={{
            minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
            maxHeight:
              full
                ? "calc(100vh - 56px)"
                : typeof maxHeight === "number"
                ? `${maxHeight}px`
                : maxHeight,
          }}
        >
          <Highlight code={value} language={lang} theme={theme}>
            {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                data-language={language}
                className={cn(
                  cls,
                  "m-0 px-0 py-0 font-mono",
                  fontClass,
                  prefs.wrap ? "whitespace-pre-wrap break-words" : "min-w-max"
                )}
                style={style}
              >
                {/* grid = gutter + code */}
                {tokens.map((line, i) => {
                  const lineNo = i + 1
                  const lineAdded = added.has(lineNo)
                  const lineRemoved = removed.has(lineNo)
                  const hl = highlighted.has(lineNo)
                  const lineMatches = matches.filter(m => m.line === lineNo)

                  let cursor = 0
                  return (
                    <div
                      key={lineNo}
                      {...getLineProps({ line })}
                      className={cn(
                        "grid grid-cols-[auto_1fr]",
                        lineAdded && "bg-green-500/10",
                        lineRemoved && "bg-red-500/10",
                        hl && "ring-1 ring-amber-500/40"
                      )}
                    >
                      {/* gutter */}
                      {showLineNumbers && (
                        <span
                          className="sticky left-0 z-10 flex select-none items-baseline justify-end border-r border-border bg-background/60 px-1 text-right tabular-nums text-[0.78rem] leading-[1.6] pl-8"
                          style={{ width: `${String(total).length + 1}ch` }}
                          aria-hidden
                        >
                          {lineNo}
                        </span>
                      )}

                      {/* code cells */}
                      <span className="pl-3">
                        {line.map((tok, k) => {
                          const props = getTokenProps({ token: tok, key: k })
                          const txt = String(props.children ?? "")
                          if (!txt || !lineMatches.length) {
                            cursor += txt.length
                            return <span key={k} {...props} />
                          }
                          // split text into mark / plain pieces
                          const segs: { txt: string; mark: boolean }[] = []
                          let idx = 0
                          while (idx < txt.length) {
                            const m = lineMatches.find(
                              m => cursor + idx >= m.start && cursor + idx < m.end
                            )
                            const nextBreak = m
                              ? Math.min(m.end - cursor, txt.length)
                              : Math.min(
                                  ...lineMatches
                                    .filter(m => cursor + idx < m.start)
                                    .map(m => m.start - cursor),
                                  txt.length
                                )
                            segs.push({
                              txt: txt.slice(idx, nextBreak),
                              mark: Boolean(m),
                            })
                            idx = nextBreak
                          }
                          cursor += txt.length
                          return (
                            <span key={k} className={props.className}>
                              {segs.map((s, si) =>
                                s.mark ? (
                                  <mark
                                    key={si}
                                    className="rounded bg-amber-400/30 ring-1 ring-amber-500/40"
                                  >
                                    {s.txt}
                                  </mark>
                                ) : (
                                  <span key={si}>{s.txt}</span>
                                )
                              )}
                            </span>
                          )
                        })}
                      </span>
                    </div>
                  )
                })}
              </pre>
            )}
          </Highlight>
        </div>

        {/* footer */}
        <div className="flex items-center gap-2 border-t bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" /> Shortcuts: Ctrl/Cmd F search · Ctrl/Cmd L go-to-line · Esc close
        </div>
      </Wrapper>
    </div>
  )
}
