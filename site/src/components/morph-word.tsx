import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

interface MorphWordProps {
  /** Strings to cycle through. The current word belts the old one out. */
  words: string[]
  /** Milliseconds each word holds the stage before the next one lands. */
  interval?: number
  className?: string
}

/**
 * Text morph: the active word is swapped letter by letter with a spring
 * stagger, like a train-station split flip. Under reduced motion the
 * word still rotates, without any per-letter theatrics.
 */
export function MorphWord({ words, interval = 2600, className }: MorphWordProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    )
    return () => window.clearInterval(id)
  }, [words.length, interval])

  const word = words[index]
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (reduced) {
    return (
      <span className={cn("relative inline-block", className)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={word} className="inline-block">
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }

  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <span className="sr-only">{word}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={word} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((letter, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={{ y: "0.9em", opacity: 0, rotate: 4 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: "-0.9em", opacity: 0, rotate: -4 }}
              transition={{
                type: "spring",
                stiffness: 640,
                damping: 34,
                delay: i * 0.032,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
