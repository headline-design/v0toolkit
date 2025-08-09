"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import styles from "./hamburger.module.css"

type HamburgerToggleProps = {
  open?: boolean
  defaultOpen?: boolean
  onToggle?: (nextOpen: boolean) => void
  controlsId?: string
  className?: string
  "aria-label"?: string
}

export function HamburgerToggle({
  open,
  defaultOpen = false,
  onToggle,
  controlsId = "mobile-menu",
  className,
  "aria-label": ariaLabelProp,
}: HamburgerToggleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = typeof open === "boolean"
  const isOpen = isControlled ? (open as boolean) : internalOpen

  function handleClick() {
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onToggle?.(next)
  }

  const label = ariaLabelProp ?? (isOpen ? "Close menu" : "Open menu")

  return (

    <div className="contents">
      <button
        type="button"
        className={cn("relative size-6 lg:hidden !bg-transparent", className)}
        aria-expanded={isOpen}
        aria-controls={controlsId}
        aria-label={label}
        onClick={handleClick}
        data-state={isOpen ? "open" : "closed"}
      >
        <svg
          className={cn(styles.hamburger, 
          " -ml-2 -mt-2 size-10 !w-10",
          isOpen && styles.active,
          )}
          viewBox="0 0 100 100"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="5.5"
          fill="none"
          stroke="currentColor"
        >
          <path
            className={`${styles.line} ${styles.top}`}
            d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
          />
          <path className={`${styles.line} ${styles.middle}`} d="m 70,50 h -40" />
          <path
            className={`${styles.line} ${styles.bottom}`}
            d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
          />
        </svg>
      </button>
    </div>
  )
}
