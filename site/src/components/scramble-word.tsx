import { useEffect, useState } from "react"

/**
 * ScrambleWord: a one-shot text decode. On mount the word resolves
 * left to right out of a wash of code glyphs, the classic terminal
 * reveal. Named for the classic effect: text that assembles itself
 * out of code. Monospace advance means the scrambled state occupies
 * exactly the width of the final word, so nothing reflows.
 */

const GLYPHS = "01<>/{}[]()#%&$@;:=+*?!|xyzn"

export function ScrambleWord({
  text,
  className,
  intervalMs = 40,
}: {
  text: string
  className?: string
  intervalMs?: number
}) {
  const [display, setDisplay] = useState(() =>
    text.replace(/[^\s]/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0])
  )

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text)
      return
    }
    let settled = 0
    const settleEvery = 200 / intervalMs
    let acc = 0
    const iv = window.setInterval(() => {
      acc += 1
      settled = Math.min(text.length, Math.floor(acc / settleEvery))
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < settled || ch === " "
              ? ch
              : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("")
      )
      if (settled >= text.length) {
        setDisplay(text)
        window.clearInterval(iv)
      }
    }, intervalMs)
    return () => window.clearInterval(iv)
  }, [text, intervalMs])

  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className={className}>
        {display}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
