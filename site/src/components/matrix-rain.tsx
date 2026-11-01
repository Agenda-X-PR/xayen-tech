import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const GLYPH_POOL =
  "アイウエオカキクケコサシスセソナニヌネノ0123456789<>/\\|=+-_#xayen"

interface MatrixRainProps {
  className?: string
  /** 0 to 1, share of columns active at once. Lower = calmer. */
  density?: number
  fontSize?: number
}

/**
 * Matrix rain: falling phosphor glyphs inside CRT panels. Dims the
 * trail with translucent repaints, pauses when the tab hides, and
 * renders a single static frame under prefers-reduced-motion.
 */
export function MatrixRain({
  className,
  density = 0.55,
  fontSize = 15,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let running = true
    let columns = 0
    let drops: Array<{ y: number; speed: number; active: boolean }> = []

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.max(1, Math.round(w / fontSize))
      drops = Array.from({ length: columns }, (_, i) => ({
        y: Math.random() * (canvas.clientHeight / fontSize),
        speed: 0.5 + Math.random() * 1.4,
        active: Math.random() < density || i === Math.floor(columns / 2),
      }))
    }

    const frame = () => {
      if (!running || !ctx) return
      const h = canvas.clientHeight
      const w = canvas.clientWidth
      ctx.fillStyle = "rgba(26, 19, 10, 0.16)"
      ctx.fillRect(0, 0, w, h)
      ctx.font = `600 ${fontSize}px "Departure Mono", ui-monospace, monospace`

      for (let i = 0; i < columns; i++) {
        const col = drops[i]
        if (!col?.active) continue
        const x = i * fontSize + fontSize / 2
        const y = col.y * fontSize

        ctx.fillStyle = "rgba(255, 174, 0, 0.92)"
        const glyph = GLYPH_POOL[(Math.random() * GLYPH_POOL.length) | 0]
        ctx.fillText(glyph, x, y)

        ctx.fillStyle = "rgba(200, 120, 20, 0.45)"
        const tail = GLYPH_POOL[(Math.random() * GLYPH_POOL.length) | 0]
        ctx.fillText(tail, x, y - fontSize)

        col.y += col.speed
        if (col.y * fontSize > h + fontSize * 2) {
          col.y = -1
          col.speed = 0.5 + Math.random() * 1.4
          col.active = Math.random() < density
        }
      }

      raf = window.setTimeout(frame, 1000 / 22) as unknown as number
    }

    const staticFrame = () => {
      const h = canvas.clientHeight
      const w = canvas.clientWidth
      ctx.fillStyle = "#1a130a"
      ctx.fillRect(0, 0, w, h)
      ctx.font = `600 ${fontSize}px "Departure Mono", ui-monospace, monospace`
      ctx.fillStyle = "rgba(255, 174, 0, 0.5)"
      for (let i = 0; i < columns; i++) {
        const col = drops[i]
        if (!col?.active) continue
        const x = i * fontSize + fontSize / 2
        ctx.fillText(GLYPH_POOL[(Math.random() * GLYPH_POOL.length) | 0], x, col.y * fontSize)
      }
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const onVisibility = () => {
      running = !document.hidden
      if (running) frame()
    }

    size()
    if (reduce) {
      staticFrame()
    } else {
      frame()
      document.addEventListener("visibilitychange", onVisibility)
    }
    window.addEventListener("resize", size)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.clearTimeout(raf)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("resize", size)
    }
  }, [density, fontSize])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("crtpanel h-full w-full", className)}
    />
  )
}
