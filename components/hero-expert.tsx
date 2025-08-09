"use client"

import { useRouter } from "next/navigation"
import { Wand2, Target } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroExpert() {
  const router = useRouter()

  return (
    <section
      aria-label="Expert Role-Based Prompt hero"
      className="container-full min-h-[40rem] md:max-h-[min(80rem,300vw)] md:min-h-[48rem] md:h-svh px-4 pb-4 pt-[calc(var(--navbar-height)+32px)] text-white dark:text-black md:px-6 md:pb-6 lg:pt-[calc(var(--navbar-height)+48px)] mb-18 md:mb-28"
    >
      <div className="relative flex flex-col justify-start mx-auto gap-4 pt-12 h-full max-w-[1808px] overflow-hidden rounded-2xl text-center md:justify-between md:gap-6 md:px-10 md:pt-24">
        {/* Multicolor gradient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1200px 800px at 10% 20%, rgba(155, 81, 224, 0.8), transparent 60%),
              radial-gradient(1000px 700px at 90% 15%, rgba(56, 189, 248, 0.9), transparent 60%),
              radial-gradient(900px 700px at 40% 100%, rgba(244, 63, 94, 0.8), transparent 60%),
              linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15))
            `,
          }}
        />
        {/* Grain overlay */}
        <img
          src="/textures/noise.png"
          alt=""
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40"
          style={{ backgroundSize: "125px 125px" }}
        />

        {/* Content */}
        <>
          <div className="relative z-50 px-4 md:px-6 text-white">
            <h1 className="text-[8rem] font-semibold leading-none -tracking-4 text-balance !text-[clamp(3.625rem,_1.6250rem_+_8.3333vw,_128px)] !leading-[0.95]">
              The v0 Expert
              <br className="md:hidden" /> Prompt
            </h1>
          </div>
        </>

<div className="relative z-50 mb-6 px-4 md:mb-4 md:px-0 text-white"><p className="[&amp;_b]:md:font-semibold [&amp;_strong]:md:font-semibold text-base/[1.25rem] md:text-1.5xl/[1.6875rem] !text-balance [&amp;&gt;br]:hidden sm:[&amp;&gt;br]:inline">   Compose high‑signal system prompts with role, credibility, and concrete deliverables —
            consistent expert output for any task.
            </p></div>


        {/* CTAs */}
        <div className="absolute bottom-0 left-0 z-50 mx-auto flex w-full flex-col justify-center gap-2 px-5 mb-4 md:static md:flex-row md:gap-4">
          <div className="flex w-full flex-col justify-center gap-2 md:w-auto md:flex-row md:gap-4">
            <GlowButton
              onClick={() => router.push("/prompt-generator/editor?template=expert-role-based")}
              primary
              icon={<Wand2 className="h-4 w-4" />}
              label="Use Expert Role-Based Prompt"
              badge="Primary"
            />
            <GlowButton
              onClick={() => router.push("/prompt-generator")}
              icon={<Target className="h-4 w-4" />}
              label="Browse Templates"
            />
          </div>
        </div>

        {/* Preview panel overlapping bottom edge (placeholder image) */}
        <div className="relative z-10 mx-auto w-full max-w-[1180px] flex-1 px-2 md:px-0">
          <div className="mx-auto w-full overflow-hidden rounded-md bg-white/80 shadow-md ring-1 ring-black/5 dark:bg-neutral-900/80">
            <img
              src="/placeholder.svg?height=640&width=1180"
              alt="Editor and assistant preview"
              className="block h-auto w-full select-none object-cover object-bottom"
            />
          </div>
        </div>

        {/* Subtle bottom gradient fade for small screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-b from-transparent via-transparent to-black/10 md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-64 w-full bg-gradient-to-b from-transparent to-black/60 md:hidden"
        />
      </div>
    </section>
  )
}

function GlowButton({
  label,
  onClick,
  primary,
  icon,
  badge,
}: {
  label: string
  onClick: () => void
  primary?: boolean
  icon?: React.ReactNode
  badge?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col rounded-xl border p-1 transition cursor-pointer
        ${primary ? "border-white/30 text-white" : "border-white/30 text-black dark:text-white"}
      `}
    >
      {/* Glow layers (approximation of Cursor’s effect) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity"
        style={{
          WebkitMaskImage:
            "radial-gradient(160px 80px at 30% 20%, rgba(0,0,0,0.85), transparent 70%)",
          background:
            "radial-gradient(64px 64px at 20% 10%, rgba(255,255,255,0.35), transparent 60%)",
        }}
      />
      <span className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-[0_4px_10px_rgba(0,0,0,0.35)] md:px-5 md:py-3.5 md:text-base">
        {icon}
        <span className="whitespace-nowrap">{label}</span>
        {badge ? (
          <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
            {badge}
          </Badge>
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20"
      />
      <style jsx>{`
        button {
          background: ${primary ? "black" : "white"};
        }
        :global(html.dark) button {
          background: ${primary ? "white" : "black"};
          color: ${primary ? "black" : "white"};
        }
      `}</style>
    </button>
  )
}
