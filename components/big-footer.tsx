"use client"

import type React from "react"

import Link from "next/link"
import { Github, Twitter, ArrowUpRight, ShieldCheck, Globe, ChevronDown } from "lucide-react"
import { LogoSparks } from "@/components/icons/logo-sparks"
import { useTheme } from "next-themes"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Monitor, Sun, Moon } from "lucide-react"

type FooterLink = { label: string; href: string; external?: boolean }

export default function BigFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Soft top vignette */}
        <div className="absolute -inset-x-24 -top-24 h-[420px] rounded-[100%] bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.zinc.200/.55),transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.zinc.900/.85),transparent_60%)]" />
        {/* Grain overlay */}
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.08] dark:opacity-[0.12] [background-image:url('/placeholder.svg?height=4&width=4')] [background-size:8px_8px]" />
      </div>

      <div className="container relative flex flex-col justify-between gap-16 py-10 text-center md:gap-24 md:pb-12 lg:gap-32 lg:pb-24 lg:pt-24 lg:text-start">
        {/* CTA Row */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="relative mx-auto w-[183px] lg:order-last lg:mx-0 lg:w-[300px]">
            <LogoSparks className="w-full h-full" />
          </div>
          <div className="flex flex-col items-center gap-4 lg:mt-16 lg:items-start lg:gap-9">
            <p className="-tracking-2 w-[101%] text-[clamp(2.625rem,_0.7086rem_+_8.1768vw,_7.25rem)] font-semibold leading-[clamp(2.938rem,_0.8144rem_+_9.0608vw,_8.063rem)] -tracking-4 flex-wrap flex w-full">
              Try v0 Toolkit Now
            </p>
            <button className="group relative rounded-xl p-1 before:absolute before:inset-0 before:z-10 before:rounded-xl before:bg-[linear-gradient(to_top,_#e6e6e600_0%,_#e6e6e6_73%)] before:p-px dark:before:bg-[linear-gradient(to_top,_#33333300_0%,_#333333_73%)] after:absolute after:inset-0 after:z-10 after:rounded-xl after:bg-brand-borders after:p-px after:transition-opacity after:duration-700 hover:after:opacity-0 motion-reduce:after:transition-none style-grad-withGradient w-fit">
              <div className="absolute inset-0 translate-y-1 scale-x-[97%] scale-y-[95%] overflow-hidden rounded-xl border border-brand-neutrals-100 opacity-0 blur-sm transition-opacity duration-700 group-hover:opacity-100 motion-reduce:transition-none"></div>
              <span className="relative inline-flex items-center justify-center gap-6 whitespace-nowrap rounded-lg bg-brand-black text-brand-white transition-colors motion-reduce:transition-none dark:text-brand-light-black px-4 py-3.5 text-base/[1.3125rem] font-medium">
                Download for free
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col min-[1120px]:flex-row justify-between h-full gap-x-8">
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-stretch min-[1120px]:ml-0 whitespace-nowrap gap-12 min-[1120px]:gap-20 text-brand-gray-400 min-[1120px]:flex-row from-brand-background via-brand-background to-transparent before:absolute before:-inset-x-16 before:-bottom-32 before:-top-16 before:hidden before:bg-[radial-gradient(circle_at_53%,_var(--tw-gradient-stops))] min-[1120px]:before:block justify-start">
            <div className="flex flex-col justify-between relative gap-y-10 min-[1120px]:gap-[4.50rem] order-1 min-[1120px]:order-none">
              <div className="flex justify-between w-full">
                <div className="flex justify-between w-full md:justify-start md:flex-col gap-y-4">
                  <div className="flex justify-between w-full">
                    <div className="flex justify-between w-full md:justify-start md:flex-col gap-y-4">
                      <a target="_blank" rel="noopener noreferrer" className="external-link group relative inline-flex items-center transition-colors duration-300 hover:text-brand-gray-800 motion-reduce:transition-none animate-line text-base/[1.125rem] text-brand-black min-[1120px]:text-lg/[1.25rem] min-[1120px]:mt-1" href="mailto:aaron@vibr.net">
                        aaron@vibr.net

                        <ArrowUpRight className="ml-[0.3em] mt-[0em] motion-reduce:transition-none size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 [motion-reduce:transition-none]" />
                      </a>
                      <div className="flex items-center gap-x-0.5 lg:gap-x-2 -translate-x-1.5">
                        <a
                          target="_blank"
                          className="grid place-items-center p-1.5 rounded-md bg-transparent dark:text-brand-gray-400 text-brand-gray-700 hover:bg-brand-gray-100 hover:text-brand-gray-800 dark:hover:text-brand-gray-800 transition-colors duration-200"
                          href="https://x.com/vibr_ai"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="size-[18px]"
                          >
                            <g clipPath="url(#clip0_6344_938)">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 0.5625H5.90625L10.1072 6.42434L15.1875 0.5625H17.4375L11.1257 7.8454L18 17.4375H12.0938L7.89276 11.5757L2.8125 17.4375H0.5625L6.87434 10.1546L0 0.5625ZM12.9605 15.75L3.28549 2.25H5.03951L14.7145 15.75H12.9605Z"
                                fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_6344_938">
                                <rect width={18} height={18} fill="var(--background)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </a>
                        <a
                          target="_blank"
                          className="grid place-items-center p-1.5 rounded-md bg-transparent dark:text-brand-gray-400 text-brand-gray-700 hover:bg-brand-gray-100 hover:text-brand-gray-800 dark:hover:text-brand-gray-800 transition-colors duration-200"
                          href="https://github.com/headline-design"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="size-[18px]"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 0C4.0275 0 0 4.02614 0 8.99695C0 12.9781 2.57625 16.3407 6.15375 17.5328C6.60375 17.6115 6.7725 17.3416 6.7725 17.1055C6.7725 16.8918 6.76125 16.1833 6.76125 15.4298C4.5 15.8459 3.915 14.8787 3.735 14.3726C3.63375 14.114 3.195 13.3155 2.8125 13.1018C2.4975 12.9331 2.0475 12.517 2.80125 12.5058C3.51 12.4945 4.01625 13.158 4.185 13.428C4.995 14.7887 6.28875 14.4064 6.80625 14.1702C6.885 13.5854 7.12125 13.1918 7.38 12.9669C5.3775 12.7419 3.285 11.9659 3.285 8.52461C3.285 7.5462 3.63375 6.73647 4.2075 6.10668C4.1175 5.88176 3.8025 4.95957 4.2975 3.72249C4.2975 3.72249 5.05125 3.48632 6.7725 4.64468C7.4925 4.44225 8.2575 4.34103 9.0225 4.34103C9.7875 4.34103 10.5525 4.44225 11.2725 4.64468C12.9938 3.47507 13.7475 3.72249 13.7475 3.72249C14.2425 4.95957 13.9275 5.88176 13.8375 6.10668C14.4113 6.73647 14.76 7.53495 14.76 8.52461C14.76 11.9772 12.6562 12.7419 10.6538 12.9669C10.98 13.248 11.2613 13.7878 11.2613 14.6313C11.2613 15.8346 11.25 16.8018 11.25 17.1055C11.25 17.3416 11.4187 17.6228 11.8688 17.5328C13.6554 16.9299 15.2079 15.782 16.3078 14.2508C17.4077 12.7195 17.9995 10.882 18 8.99695C18 4.02614 13.9725 0 9 0Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                        <a
                          target="_blank"
                          disabled
                          className="grid place-items-center p-1.5 rounded-md bg-transparent dark:text-brand-gray-400 text-brand-gray-700 hover:bg-brand-gray-100 hover:text-brand-gray-800 dark:hover:text-brand-gray-800 transition-colors duration-200"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="size-[18px]"
                          >
                            <path
                              d="M8.98438 0.0976562C13.8946 0.0976562 17.8758 4.07809 17.876 8.98828C17.876 13.8987 13.8947 17.8799 8.98438 17.8799C4.07418 17.8797 0.09375 13.8985 0.09375 8.98828C0.0939608 4.07822 4.07431 0.097867 8.98438 0.0976562ZM9.71387 3.65137C9.56592 3.61824 9.41795 3.71101 9.38477 3.86133V3.86523L8.72852 6.95117C7.49089 6.97113 6.28617 7.35103 5.26074 8.04492C4.73914 7.55434 3.91735 7.57877 3.42676 8.10254C2.93617 8.62415 2.9606 9.44594 3.48438 9.93652C3.58607 10.0315 3.70271 10.1134 3.83301 10.1709C3.82412 10.3013 3.82412 10.4321 3.83301 10.5625C3.83329 12.5535 6.15388 14.1729 9.01562 14.1729C11.8773 14.1728 14.198 12.5557 14.1982 10.5625C14.2071 10.4321 14.2071 10.3013 14.1982 10.1709C14.6447 9.9476 14.9249 9.48769 14.916 8.98828C14.8895 8.27234 14.2885 7.713 13.5703 7.7373C13.2521 7.74842 12.9495 7.879 12.7197 8.09766C11.7075 7.40814 10.5181 7.03038 9.2959 7.00391L9.87305 4.23047L11.7764 4.62988C11.8293 5.11829 12.2665 5.47208 12.7549 5.41895C13.2432 5.366 13.5969 4.92874 13.5439 4.44043C13.4908 3.95202 13.0529 3.59822 12.5645 3.65137C12.2839 3.68013 12.0326 3.84384 11.8936 4.08691L9.71387 3.65137ZM6.83008 11.9854C6.91839 11.9126 7.04413 11.9125 7.13477 11.9854C7.66956 12.3765 8.32157 12.5759 8.98438 12.5449C9.64737 12.5803 10.3014 12.3895 10.8428 12.0029C10.94 11.9079 11.0991 11.9106 11.1943 12.0078C11.2893 12.105 11.2874 12.2634 11.1904 12.3584V12.3232C10.5584 12.7984 9.78446 13.0418 8.99316 13.0088C8.20202 13.0419 7.42902 12.7983 6.79688 12.3232C6.7129 12.2215 6.72833 12.0693 6.83008 11.9854ZM11.0312 9.01953C11.5218 9.01953 11.9219 9.41957 11.9219 9.91016C11.9415 10.4008 11.5589 10.814 11.0684 10.834H11.0244L11.0312 10.8008C10.5407 10.8008 10.1407 10.4006 10.1406 9.91016C10.1406 9.41957 10.5407 9.01954 11.0312 9.01953ZM6.91602 8.98828C7.40653 8.98828 7.80653 9.38841 7.80664 9.87891C7.80664 10.3695 7.4066 10.7695 6.91602 10.7695C6.4233 10.7649 6.02539 10.3695 6.02539 9.87891C6.0255 9.38844 6.42554 8.98833 6.91602 8.98828Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                        <a
                          target="_blank"
                          disabled
                          className="grid place-items-center p-1.5 rounded-md bg-transparent dark:text-brand-gray-400 text-brand-gray-700 hover:bg-brand-gray-100 hover:text-brand-gray-800 dark:hover:text-brand-gray-800 transition-colors duration-200"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid"
                            viewBox="0 0 256 180"
                            className="size-[22px]"
                          >
                            <path
                              fill="currentColor"
                              d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
                            />
                            <path
                              fill="var(--background)"
                              d="m102.421 128.06 66.328-38.418-66.328-38.418z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              <div className="contents flex-col hidden min-[1120px]:flex">
                <p className="[&amp;_b]:md:font-semibold [&amp;_strong]:md:font-semibold text-base/[1.125rem] md:text-lg/[1.5rem] flex w-fit items-center gap-2 !whitespace-nowrap text-brand-gray-400 min-[1120px]:text-base col-start-1 row-start-2 min-[1120px]:row-start-1">© 2025 Made by <a target="_blank" rel="noopener noreferrer" className="external-link group relative inline-flex items-center transition-colors duration-300 hover:text-brand-gray-800 motion-reduce:transition-none animate-line" href="https://x.com/ussaaron_">ussaaron
                  <ArrowUpRight className="ml-[0.3em] mt-[0em] motion-reduce:transition-none size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 [motion-reduce:transition-none]" />
                </a></p></div>
            </div>
            {/* Link grid */}
            <div className="relative grid grid-cols-2 gap-y-12 md:grid-cols-4 gap-x-24">
              <FooterColumn
                title="Product"
                links={[
                  { label: "Home", href: "/" },
                  { label: "Prompt Generator", href: "/prompt-generator" },
                  { label: "V0 Profiles", href: "/profiles" },
                  { label: "Slate", href: "/slate" },
                  { label: "Library", href: "/lib" },
                  { label: "Issues", href: "/issues" },
                ]}
              />
              <FooterColumn
                title="Resources"
                links={[
                  { label: "v0 Platform", href: "https://v0.dev", external: true },
                  { label: "AI SDK", href: "https://sdk.vercel.ai", external: true },
                  { label: "Vercel", href: "https://vercel.com", external: true },
                  { label: "Changelog", href: "https://github.com/headline-design/v0toolkit/releases", external: true },
                ]}
              />
              <FooterColumn
                title="Company"
                links={[
                  { label: "GitHub", href: "https://github.com/headline-design/v0toolkit", external: true },
                  { label: "Twitter/X", href: "https://twitter.com/v0toolkit", external: true },
                ]}
              />
              <FooterColumn
                title="Legal"
                links={[
                  { label: "Terms", href: "/terms-of-service" },
                  { label: "Privacy", href: "/privacy" },
                  { label: "Security", href: "/security" },
                ]}
              />
            </div>

            {/* Bottom row */}
            <div className="flex flex-col items-center justify-between gap-6 md:hidden md:gap-8">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-md bg-white px-1.5 py-1 text-zinc-500 dark:bg-zinc-900">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs md:text-sm">Secure by design</span>
                </span>
              </p>


              <div className="block w-full md:hidden">
                <div className="ml-auto w-fit" aria-label="Theme selector" role="group">
                  <ThemeSegmentedControl />
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} V0 Toolkit. Built with V0 and Next.js.
              </p>
            </div>
          </div>

          <div className="flex-col justify-between gap-[4.75rem] z-5 relative hidden min-[1120px]:flex">
            <div className="flex flex-col gap-4">
              <>
                <div className="hidden w-auto min-[1120px]:block lg:w-40 min-[1420px]:w-60">
                  <button type="button" role="combobox" aria-controls="radix-_R_2mkj6ivb_" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex items-center justify-between whitespace-nowrap border border-brand-borders rounded-lg cursor-pointer outline-none w-full !bg-transparent text-brand-gray-600 dark:text-brand-gray-400 text-base/[1.5rem] relative z-10 pl-2 pr-1.5 py-0.5 disabled:cursor-not-allowed disabled:opacity-50">
                    <span className="inline-flex gap-x-2 items-center w-full"><Globe className="w-4 h-4 shrink-0"/> English <ChevronDown className="w-4 h-4 shrink-0 size-4 ml-auto"/></span></button></div>

                <div className="hidden lg:flex flex-col gap-3">
                  <div aria-label="Theme selector" role="group">
                    {/* Reuse the same segmented control used on mobile */}
                    <ThemeSegmentedControl />
                  </div>
                </div>

              </>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-md bg-white px-1.5 py-1 text-zinc-500 dark:bg-zinc-900">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs md:text-sm">Secure by design</span>
              </span>
            </p>
          </div>

        </div>

      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground/90">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 translate-y-[1px] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid place-items-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  )
}

function ThemeSegmentedControl() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Determine active key: "system" | "light" | "dark"
  const activeKey = useMemo<"system" | "light" | "dark">(() => {
    if (theme === "system") return "system"
    return (theme as "light" | "dark") || (resolvedTheme as "light" | "dark") || "system"
  }, [theme, resolvedTheme])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const sysRef = useRef<HTMLButtonElement | null>(null)
  const lightRef = useRef<HTMLButtonElement | null>(null)
  const darkRef = useRef<HTMLButtonElement | null>(null)

  const [indicator, setIndicator] = useState<{ x: number; w: number }>({ x: 0, w: 0 })

 const calcIndicator = () => {
    const container = containerRef.current
    if (!container) return
    const map = {
      system: sysRef.current,
      light: lightRef.current,
      dark: darkRef.current,
    } as const
    const el = map[activeKey]
    if (!el) return
    const cRect = container.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setIndicator({
      x: map[activeKey] === sysRef.current ? -1 : map[activeKey] === lightRef.current ? 23 : 47,
      w: 24
    }) // -1/+2 to cover border seam
  }

  useLayoutEffect(() => {
    calcIndicator()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])

  useEffect(() => {
    const onResize = () => calcIndicator()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const baseBtn =
    "option-tab relative z-[2] flex items-center justify-center -outline-offset-2 text-brand-borders hover:text-brand-neutrals-400 transition-colors duration-300 motion-reduce:transition-none aspect-square h-8 px-1.5 md:p-0 md:h-5.5 !bg-transparent"

  return (
    <div
      ref={containerRef}
      className="!bg-transparent relative z-10 flex w-fit overflow-hidden rounded-[0.375rem] border border-zinc-200 animate-in fade-in dark:border-zinc-800 [&>button]:aspect-[1/1]"
      style={{ gap: 2 }}
    >
      <button
        ref={sysRef}
        className={baseBtn}
        aria-label="System theme"
        aria-pressed={activeKey === "system"}
        onClick={() => setTheme("system")}
        type="button"
      >
        <span className="relative z-10">
          <Monitor className="size-5 md:size-4" aria-hidden="true" />
        </span>
      </button>
      <button
        ref={lightRef}
        className={baseBtn}
        aria-label="Light theme"
        aria-pressed={activeKey === "light"}
        onClick={() => setTheme("light")}
        type="button"
      >
        <span className="relative z-10">
          <Sun className="size-5 md:size-4" aria-hidden="true" />
        </span>
      </button>
      <button
        ref={darkRef}
        className={baseBtn + " text-zinc-400 hover:text-zinc-400 dark:text-muted-foreground"}
        aria-label="Dark theme"
        aria-pressed={activeKey === "dark"}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <span className="relative z-10">
          <Moon className="size-5 md:size-4" aria-hidden="true" />
        </span>
      </button>

      {/* Active indicator */}
      <span
        className="animate-in fade-in absolute top-1/2 z-[1] -translate-y-1/2 translate-x-[var(--transform-x)] h-[calc(100%_+_1px)] w-[var(--width)] rounded-md border bg-brand-white dark:bg-brand-neutrals-900 border-brand-neutrals-100 dark:border-brand-neutrals-800 transition-all duration-400 ease-out-cubic rounded-[0.375rem]"
        style={
          {
            // @ts-expect-error custom CSS vars
            "--transform-x": `${indicator.x}px`,
            "--width": `${indicator.w}px`,
            // keep initial alignment on mount
            "--tw-enter-translate-y": "-50%",
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
    </div>
  )
}
