"use client"

import { CheckCircle2, Workflow, LibraryBig, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ExpertRoleExplainer() {
  return (
    <section className="container mx-auto max-w-[1120px] space-y-10 px-4 md:space-y-14 md:px-6">
      <header className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Why the Expert Role‑Based Prompt works</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-[1.05rem]/[1.6rem]">
          It applies a repeatable structure that turns vague requests into reliable expert output.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Technical explanation */}
        <Card className="border bg-background/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Technical breakdown
            </CardTitle>
            <CardDescription>How the template enforces signal and consistency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <FeatureItem text="Role framing pins the model to a specific senior persona with realistic scope and constraints." />
            <FeatureItem text="Credibility layer injects verifiable history, tools, and sources to ground outputs." />
            <FeatureItem text="Task contract enumerates deliverables, acceptance criteria, and formatting." />
            <FeatureItem text="Edge‑case prompts and failure modes reduce hallucinations and scope creep." />
            <FeatureItem text="Reusable parameters let you rehydrate the same expert across projects." />
          </CardContent>
        </Card>

        {/* Plain-language */}
        <Card className="border bg-background/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LibraryBig className="h-5 w-5" />
              In plain English
            </CardTitle>
            <CardDescription>What you get, every time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <FeatureItem text="Answers that sound like a seasoned specialist, not a generic bot." />
            <FeatureItem text="Clear lists, steps, and artifacts you can ship or paste into code." />
            <FeatureItem text="Less back‑and‑forth: the brief becomes the output." />
            <FeatureItem text="A prompt you can save and reuse for consistent quality." />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MiniCard
          icon={<Shield className="h-4 w-4" />}
          title="Scoped and safe"
          desc="Explicit guardrails reduce overreach and keep outputs on‑spec."
        />
        <MiniCard
          icon={<LibraryBig className="h-4 w-4" />}
          title="Combinable"
          desc="Compose with other templates (specs, critiques, tests) for full flows."
        />
        <MiniCard
          icon={<Workflow className="h-4 w-4" />}
          title="Tool‑aware"
          desc="Reference frameworks, repos, or APIs to ground reasoning."
        />
      </div>
    </section>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
      <p>{text}</p>
    </div>
  )
}

function MiniCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Card className="border bg-background/70 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-[13px]">{desc}</CardDescription>
      </CardHeader>
    </Card>
  )
}
