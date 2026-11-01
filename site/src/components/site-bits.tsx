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
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
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

const BOOT_WORDS = ["ready.", "armed.", "listening.", "booted."]

/**
 * The boot window: a System 7 boot sequence on a white phosphor CRT
 * with a wash of glyph rain. Pure chrome by design: it states no
 * metrics and invents none. Black and white only.
 */
export function BootTerminal({ className }: { className?: string }) {
  return (
    <Window
      file="boot.seq"
      note="themed boot screen · no real metrics shown"
      className={className}
      bodyClassName="p-0"
    >
      <div className="crtpanel scanlines relative min-h-[240px]">
        <div className="absolute inset-0">
          <MatrixRain />
        </div>
        <div className="relative z-10 px-4 py-4 font-mono text-[11.5px] leading-relaxed text-phosphor">
          <p>xayen os 7.5.3 · portfolio edition</p>
          <p className="mt-0.5">{'>'} checking disks............ ok</p>
          <p className="mt-0.5">{'>'} mounting /projects /blog /about /contact ✓</p>
          <p className="mt-0.5">{'>'} security module............... armed</p>
          <p className="mt-0.5 text-paper/85">
            {'>'} pixels placed by hand · shadows ruthless
          </p>
          <p className="mt-2 text-[12.5px] tracking-[0.08em]">
            <MorphWord interval={2100} words={BOOT_WORDS} />
            <span
              aria-hidden="true"
              className="caret-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-phosphor"
            />
          </p>
          <div
            role="presentation"
            className="mt-2 h-2 w-full border border-phosphor/50 bg-crt motion-safe:animate-boot-pulse"
          />
        </div>
      </div>
    </Window>
  )
}
