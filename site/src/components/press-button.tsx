import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type Variant = "primary" | "ghost"
type Size = "default" | "lg" | "icon"

/**
 * Retro press button: a System 7 style chunk on the page,
 * pressing INTO it like a physical key. Spring driven.
 */
export function pressClasses(variant: Variant, size: Size) {
  return cn(
    "group/press relative inline-flex items-center justify-center gap-2 border-2 border-ink font-mono text-[12px] uppercase tracking-[0.14em] whitespace-nowrap",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus-visible:outline-dashed",
    "disabled:pointer-events-none disabled:opacity-40",
    size === "default" && "h-10 px-5 rounded-[6px]",
    size === "lg" && "h-12 px-7 rounded-[6px] text-[13px]",
    size === "icon" && "size-10 rounded-[6px]",
    variant === "primary" && "bg-ink text-paper shadow-brutal-sm hover:bg-accent hover:text-paper",
    variant === "ghost" && "bg-paper text-ink shadow-brutal-sm hover:bg-paper-dim"
  )
}

interface PressButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"> {
  variant?: Variant
  size?: Size
  ref?: React.Ref<HTMLButtonElement>
}

export function PressButton({
  className,
  variant = "ghost",
  size = "default",
  children,
  ...props
}: PressButtonProps) {
  return (
    <motion.button
      data-slot="press-button"
      data-variant={variant}
      data-size={size}
      initial={false}
      whileTap={{ x: 4, y: 4, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 700, damping: 28, mass: 0.7 }}
      className={cn(pressClasses(variant, size), className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      <span className="pointer-events-none absolute inset-0 hidden bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_1px,transparent_1px,transparent_3px)] group-hover/press:block" />
      {children}
    </motion.button>
  )
}

export type { PressButtonProps, Variant, Size }
