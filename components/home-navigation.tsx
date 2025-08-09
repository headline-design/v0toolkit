"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { LogoSparks } from "@/components/icons/logo-sparks"
import { V0ToolkitTypeLogo } from "@/components/icons/v0-toolkit-typelogo"
import { HamburgerToggle } from "@/components/home/hamburger/hamburger-toggle"
import { ArrowRight } from "lucide-react"

const navItems = [
  { name: "Slate", href: "/slate" },
  { name: "Prompt Generator", href: "/prompt-generator" },
  { name: "Library", href: "/lib" },
  { name: "Issue Tracker", href: "/issues" },
]

export default function HomeNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for subtle shadow/border polish.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock page scroll when menu is open and close on Escape.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false)
      }
      window.addEventListener("keydown", onKey)
      return () => {
        document.body.style.overflow = prev
        window.removeEventListener("keydown", onKey)
      }
    }
  }, [open])

  return (
    <>
      <nav className="fixed top-4 z-navbar w-full lg:top-6">
        <div className="container box-border !max-w-[1672px] !px-6 md:!px-9">
          <div
            className={cn(
              "relative flex h-[var(--navbar-height)] w-full items-center justify-between rounded-lg border border-transparent bg-brand-background px-2 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:rounded-2xl lg:py-[0.4375rem] lg:pr-[0.4375rem]",
              scrolled && !open
                ? "bg-brand-white shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)] dark:border-brand-neutrals-900 dark:bg-brand-white dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]"
                : "border-transparent",
            )}
            style={
              {
                ["--mask-x" as any]: "50%",
                ["--mask-y" as any]: "50%",
              } as React.CSSProperties
            }
          >
            {/* Brand (left) */}
            <Brand />

            {/* Center links (desktop) */}
            <ul className="col-start-2 hidden items-center gap-5 px-2 font-medium text-foreground/70 xl:gap-6 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-colors duration-300 p-2 hover:text-brand-foreground hover:bg-brand-neutrals-100 dark:hover:bg-brand-neutrals-900 rounded-md motion-reduce:transition-none",
                        isActive && "text-foreground",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Right actions (desktop) */}
            <div className="col-start-3 hidden w-full items-center justify-end gap-2 lg:flex">
              <SecondaryLink href="/api/auth/login" ariaLabel="Sign in">
                Sign in
              </SecondaryLink>
              <PrimaryCTA href="/prompt-generator">Try V0 Toolkit</PrimaryCTA>
            </div>

            {/* Mobile: right hamburger */}
            <HamburgerToggle open={open} onToggle={setOpen} controlsId="mobile-menu" />
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu overlay */}
      {open && (
        <nav
          id="mobile-menu"
          className={cn(
            "container fixed left-0 top-0 z-mobile-menu flex h-dvh w-full flex-col",
            "bg-brand-light-grey-wash dark:bg-brand-white",
            "!px-8 md:!px-10 pb-4 pt-[4.4rem] transition-none overflow-y-auto",
          )}
          aria-hidden={!open}
        >
          <ul className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.name} className="text-[3rem] leading-[3.375rem] font-semibold -tracking-4">
                  <Link
                    onClick={() => setOpen(false)}
                    target="_self"
                    href={item.href}
                    className={cn(
                      "font-medium outline-none transition-colors duration-300 motion-reduce:transition-none",
                      "text-brand-neutrals-700 hover:text-brand-foreground dark:text-brand-neutrals-200",
                      isActive && "text-brand-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex-1" />

          {/* Action buttons */}
          <div className="mt-4 flex w-full flex-row gap-4" id="action-buttons">
            <SecondaryLink href="/api/auth/login" className="w-full h-11" ariaLabel="Sign in">
              Sign in
            </SecondaryLink>
            <PrimaryCTA href="/prompt-generator" className="w-full h-11" onClick={() => setOpen(false)}>
              <span className="flex items-center gap-2">
                Try V0 Toolkit
                <ArrowRight className="w-4 h-4" />
              </span>
            </PrimaryCTA>
          </div>
        </nav>
      )}
    </>
  )
}

function Brand() {
  return (
    <Link aria-label="Homepage" href="/" className="relative flex w-fit items-center gap-1 overflow-hidden lg:px-3">
      <>
        <LogoSparks className="h-6 w-6 mix-blend-multiply dark:mix-blend-lighten lg:h-8 lg:w-8" />
        <V0ToolkitTypeLogo className="h-[13px] text-brand-foreground lg:h-[17px] overflow-visible" />
      </>
    </Link>
  )
}

function SecondaryLink({
  href,
  ariaLabel,
  children,
  className,
}: {
  href: string
  ariaLabel?: string
  children: React.ReactNode
  className?: string
}) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg",
        "overflow-hidden border border-brand-neutrals-100 dark:border-brand-neutrals-800",
        "bg-brand-white text-brand-black hover:!border-brand-gray-400",
        "p-3 md:px-4 md:py-3.5 font-medium text-sm/[1rem] md:text-base/[1.125rem]",
        "transition-[color,background-color,border-color,opacity] duration-300",
        className,
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="relative z-10 flex">{children}</span>
    </Link>
  )
}

function PrimaryCTA({
  href,
  children,
  onClick,
  className,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  // Radial highlight follows the cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty("--mask-x", `${x}%`)
    el.style.setProperty("--mask-y", `${y}%`)
  }

  const external = href.startsWith("http")

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg",
        "overflow-hidden bg-brand-black text-brand-white",
        "after:absolute after:inset-0 after:bg-gradient-to-t after:from-brand-neutrals-800 after:to-brand-neutrals-600",
        "dark:after:from-brand-neutrals-100 dark:after:to-brand-neutrals-100",
        "before:bg-[radial-gradient(circle_100px_at_var(--mask-x)_var(--mask-y),_var(--tw-gradient-stops))] before:from-brand-neutrals-700 before:via-brand-neutrals-700 before:to-transparent dark:before:from-brand-neutrals-300  before:transition-opacity before:duration-1000 hover:before:opacity-100 before:opacity-0 before:absolute before:inset-0",
        "hover:before:opacity-100",
        "before:bg-[radial-gradient(circle_100px_at_var(--mask-x)_var(--mask-y),_rgba(255,255,255,0.18),_rgba(255,255,255,0.12),_transparent_70%)]",
        "md:px-4 md:py-3.5 font-medium text-sm/[1.125rem] tracking-normal",
        className,
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={
        {
          ["--mask-x" as any]: "50%",
          ["--mask-y" as any]: "50%",
        } as React.CSSProperties
      }
    >
      <span className="relative z-10 flex">{children}</span>
    </Link>
  )
}
