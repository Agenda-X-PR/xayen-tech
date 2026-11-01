import * as React from "react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

import { pressClasses, type Variant } from "@/components/press-button"
import { MatrixRain } from "@/components/matrix-rain"
import { MorphWord } from "@/components/morph-word"
import { Window } from "@/components/window"
import { cn } from "@/lib/utils"

const MotionLink = motion.create(Link)
const MotionA = motion.a

const pressTap = { x: 4, y: 4, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
const pressHover = { y: -1 }
const pressTransition = { type: "spring" as const, stiffness: 700, damping: 28, mass: 0.7 }

export interface PressLinkProps {
  to?: string
  href?: string
  download?: boolean
  variant?: Variant
  size?: "default" | "lg"
  className?: string
  children: React.ReactNode
  "aria-label"?: string
}

/**
 * Press-button as a navigation link: SPA links keep the router,
 * external and download targets render as plain anchors. All variants
 * keep the key-press spring.
 */
export function PressLink({
  to,
  href,
  download,
  variant = "ghost",
  size = "default",
  className,
  children,
  ...rest
}: PressLinkProps) {
  const isExternal = (href ?? "").startsWith("http")
  const cls = cn(pressClasses(variant, size), className)

  const face = (
    <>
      <span className="pointer-events-none absolute inset-0 hidden bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_1px,transparent_1px,transparent_3px)] group-hover/link:block" />
      {children}
    </>
  )

  if (to != null && href == null) {
    return (
      <MotionLink
        to={to}
        className={cn(cls, "group/link")}
        whileHover={pressHover}
        whileTap={pressTap}
        transition={pressTransition}
        {...rest}
      >
        {face}
      </MotionLink>
    )
  }

  return (
    <MotionA
      href={href}
      download={download}
      className={cn(cls, "group/link")}
      whileHover={pressHover}
      whileTap={pressTap}
      transition={pressTransition}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...rest}
    >
      {face}
    </MotionA>
  )
}

export interface WindowTileLinkProps {
  to: string
  label: string
  muted?: boolean
  className?: string
}

/** Quick-links strip: full-bleed tile with a nudge arrow on hover. */
export function WindowTileLink({ to, label, muted, className }: WindowTileLinkProps) {
  return (
    <MotionLink
      to={to}
      data-slot="window-tile-link"
      data-muted={muted || undefined}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, x: 2 }}
      transition={{ type: "spring", stiffness: 640, damping: 30, mass: 0.6 }}
      className={cn(
        "group/tile flex items-center justify-between gap-3 border-2 border-ink bg-paper px-4 py-3",
        "shadow-brutal-sm hover:shadow-brutal outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix",
        "hover:bg-paper-dim",
        muted && "opacity-60",
        className
      )}
    >
      <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-ink">{label}</span>
      <ArrowUpRight className="size-5 text-ink transition-transform duration-200 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5" />
    </MotionLink>
  )
}

export interface HeroTerminalProps {
  className?: string
}

/** The hero terminal: matrix rain, the synth demo score and a live line. */
export function HeroTerminal({ className }: HeroTerminalProps) {
  return (
    <Window
      file="triage-engine --demo"
      note="LIVE · illustrative synthetic scenario"
      className={className}
      bodyClassName="p-0"
    >
      <div className="relative">
        <div className="absolute inset-0">
          <MatrixRain />
        </div>
        <div className="relative z-10 flex flex-col gap-3 p-5">
          <div className="flex items-end justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/85">
              risk score
            </p>
            <p className="font-mono text-matrix text-[26px] leading-none">
              54<span className="text-[13px] text-paper/70">/100</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {[86, 74, 61].map((w) => (
              <div
                key={w}
                className="h-1.5 border border-phosphor/25 bg-phosphor/10"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="crtpanel scanlines border border-phosphor/30 px-3 py-2 font-mono text-[11px]">
            <MorphWord
              interval={2300}
              words={[
                "> scanning nairaland.com",
                "> ingesting reddit batch 04",
                "> scoring tracked banks",
                "> baseline drift delta 0.02",
                "> buffer flush - 0 dropped",
              ]}
              className="text-phosphor"
            />
          </div>
          <PressLink
            href="https://agendax.com.ng/demo"
            variant="primary"
            aria-label="Open the demo: triage-engine --demo, live, 54 /100"
            className="self-start"
          >
            Open the demo
          </PressLink>
        </div>
      </div>
    </Window>
  )
}

interface MorphWordVProps {
  className?: string
}

/** The inline verb cycle inside the hero sentence. */
export function MorphWordV({ className }: MorphWordVProps) {
  return (
    <MorphWord
      interval={2400}
      words={["break", "debug", "harden", "ship"]}
      className={cn("inline-block text-matrix", className)}
    />
  )
}
