"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

type Feature = {
  title: string
  description: string
  href: string
  mediaAlt: string
  mediaSrc: string
}

const FEATURES: Feature[] = [
  {
    title: "Expert Role‑Based Prompt",
    description:
      "Turn short briefs into senior‑level output with role, credibility, and concrete deliverables.",
    href: "/prompt-generator/editor?template=expert-role-based",
    mediaAlt: "Expert role-based prompt preview",
    mediaSrc:
      "/placeholder.svg?height=461&width=533",
  },
  {
    title: "Feels familiar",
    description:
      "Keep your flow. Save prompts, reuse parameters, and adapt outputs to your style.",
    href: "/prompt-generator",
    mediaAlt: "Template library preview",
    mediaSrc:
      "/placeholder.svg?height=461&width=533",
  },
  {
    title: "Privacy options",
    description:
      "Use local context only or bring your own keys. You decide what the model sees.",
    href: "/profiles",
    mediaAlt: "Privacy options preview",
    mediaSrc:
      "/placeholder.svg?height=461&width=533",
  },
]

export default function FeaturedSection() {
  return (
    <section className="flex flex-col gap-8 md:gap-10 lg:gap-24">
      {/* Header row */}
      <div className="container mx-auto flex w-full flex-col gap-4 px-4 md:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-24 lg:max-w-[1120px]">
        <div className="flex flex-col gap-4 lg:flex-1">
          <h2 className="text-[3rem] leading-[3.375rem] font-semibold tracking-[-0.04em]">
            Build software faster
          </h2>
          <p className="text-pretty text-base/5 text-muted-foreground md:text-[1.125rem]/[1.6875rem]">
            Intelligent, fast, and familiar — start with expert prompts and ship with confidence.
          </p>
        </div>
        <Link
          href="/prompt-generator"
          className="relative inline-flex w-fit items-center justify-center whitespace-nowrap rounded-lg bg-black p-3 text-sm font-medium text-white transition md:px-4 md:py-3.5 md:text-base dark:bg-white dark:text-black"
        >
          <span className="relative z-10">See more features</span>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-lg bg-gradient-to-t from-neutral-800 to-neutral-600 opacity-30 dark:from-neutral-100 dark:to-neutral-200"
          />
        </Link>
      </div>

      {/* Mobile carousel (scroll snap) */}
      <div className="container-full -my-2 overflow-hidden py-2 lg:hidden">
        <div className="container mx-auto px-4 md:px-6">
          <ul
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollPadding: "16px" }}
          >
            {FEATURES.map((f) => (
              <li
                key={f.title}
                className="snap-start"
                style={{ minWidth: "min(calc(100vw - 83px), 420px)" }}
              >
                <FeatureCard feature={f} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop grid */}
      <ul className="container mx-auto hidden gap-4 px-4 md:px-6 lg:grid lg:max-w-[1120px] lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li key={f.title}>
            <FeatureCard feature={f} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Link
      href={feature.href}
      className="relative flex h-full flex-col justify-between rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:bg-neutral-950"
    >
      {/* Subtle glow layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <h3 className="text-[2rem] leading-[2.625rem] font-semibold tracking-[-0.04em]">
          {feature.title}
        </h3>
        <div className="min-h-18">
          <p className="text-pretty text-base/5 text-neutral-600 md:text-lg/6 dark:text-neutral-300">
            {feature.description}
          </p>
        </div>
      </div>
      <div className="relative aspect-[533/461] overflow-hidden rounded-b-2xl">
        <img
          src={feature.mediaSrc || "/placeholder.svg"}
          alt={feature.mediaAlt}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />
      </div>
    </Link>
  )
}
