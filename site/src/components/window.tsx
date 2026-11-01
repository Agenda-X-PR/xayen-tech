import * as React from "react"
import { cn } from "@/lib/utils"

/** Titlebar filename chip: the small mono metadata line, like macOS classic. */
export interface WindowProps extends React.ComponentProps<"section"> {
  file: string
  note?: string
  bodyClassName?: string
}

/**
 * A retro window: chunky ink border, title bar with the ◑ windows dots,
 * filename in the middle, hard offset shadow. The universal card of the system.
 */
export function Window({
  file,
  note,
  className,
  bodyClassName,
  children,
  ...props
}: WindowProps) {
  return (
    <section
      data-slot="window"
      className={cn(
        "flex flex-col border-2 border-ink bg-paper shadow-brutal",
        className
      )}
      {...props}
    >
      <div className="titlebar">
        <span className="win-dot" aria-hidden="true" />
        <span className="win-dot" aria-hidden="true" />
        <span className="titlebar-name">{file}</span>
      </div>
      <div className={cn("flex min-h-0 flex-1 flex-col p-5", bodyClassName)}>{children}</div>
      {note != null && (
        <div className="border-t-2 border-ink px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-ink/60 uppercase">
          {note}
        </div>
      )}
    </section>
  )
}

/** Section header used across pages: kicker row + display heading. */
export interface SectionHeaderProps extends React.ComponentProps<"div"> {
  kicker: string
  title: string
  link?: React.ReactNode
}

export function SectionHeader({
  kicker,
  title,
  link,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-3", className)} {...props}>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">{kicker}</p>
        <h2 className="mt-2 font-mono text-3xl font-normal leading-none tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {link != null && <div className="pb-1">{link}</div>}
    </div>
  )
}
