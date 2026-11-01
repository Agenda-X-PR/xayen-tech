import { useEffect } from "react"
import { HeroTerminal, MorphWordV, PressLink, WindowTileLink } from "@/components/site-bits"
import { Window } from "@/components/window"

export default function HomePage() {
  useEffect(() => {
    document.title = "xayen · Ekundayo Oyinkansola · Security & Full Stack"
  }, [])

  return (
    <div>
      {/* hero: greeting above the fold, terminal window to the right */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/60">
              Portfolio · system v3 · 2026
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2.8rem,9vw,5.5rem)] leading-[0.95] tracking-tight">
              Hello.
              <br />
              I&rsquo;m xayen.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/90">
              I <MorphWordV /> software to build it better.
            </p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/70">
              Security and full stack. Early-warning engines, payment SDKs, and
              AI security tooling, tested and shipped to production.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <PressLink to="/projects" variant="primary" aria-label="View work: open the projects page">
                View work
              </PressLink>
              <PressLink
                href="/assets/Ekundayo-Oyinkansola-Resume-2026.docx"
                download
                variant="ghost"
                aria-label="Résumé .docx: Word document download"
              >
                Résumé .docx ↓
              </PressLink>
            </div>
          </div>

          <HeroTerminal className="w-full max-w-md justify-self-center lg:max-w-none" />
        </div>
      </section>

      {/* quick links ride the halftone band */}
      <section className="halftone border-b-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
            Quick links
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <WindowTileLink to="/blog" label="Blog" />
            <WindowTileLink to="/projects" label="Projects" />
            <WindowTileLink to="/about" label="About" />
            <WindowTileLink to="/contact" label="Find me" />
          </div>
        </div>
      </section>

      {/* featured projects */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
                01 · Work
              </p>
              <h2 className="mt-2 font-mono text-3xl tracking-tight sm:text-4xl">Projects</h2>
            </div>
            <PressLink to="/projects" variant="ghost" className="shrink-0">
              All projects
            </PressLink>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Window file="triage-engine.md" note="Agenda X · 2026 to present">
              <h3 className="font-mono text-lg">Triage Engine</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
                Early-warning engine monitoring payment operators through public
                signals: ingestion, scoring, and alert dispatch on one pipeline.
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink/75">
                Backtested on Flutterwave 2024, Paystack 2025, and OPay 2026: critical status in ≤48 h. In-sample, public news only (n = 3).
              </p>
              <PressLink to="/projects" variant="ghost" className="mt-4 self-start">
                View project
              </PressLink>
            </Window>

            <Window file="llm-sentinel.md" note="Detection engineering · 25 tests">
              <h3 className="font-mono text-lg">LLM Sentinel</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
                Full-stack security dashboard integrating Llama 3.3 via Groq API
                for real-time incident summarization: React 19 + Vite frontend,
                FastAPI backend, and 25 unit tests on the Python detection engine.
              </p>
              <PressLink to="/projects" variant="ghost" className="mt-4 self-start">
                View project
              </PressLink>
            </Window>
          </div>
        </div>
      </section>

      {/* from the blog: the stacked window pile */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
                02 · Field notes
              </p>
              <h2 className="mt-2 font-mono text-3xl tracking-tight sm:text-4xl">From the blog</h2>
            </div>
            <PressLink to="/blog" variant="ghost" className="shrink-0">
              View all posts
            </PressLink>
          </div>

          <div className="relative h-72 max-w-2xl md:h-80">
            <div className="absolute top-0 left-1/2 w-[82%] -translate-x-1/2 md:w-[68%]" aria-hidden="true">
              <div className="border-2 border-ink/85 bg-paper/90">
                <div className="titlebar">
                  <span className="win-dot" />
                  <span className="win-dot" />
                  <span className="titlebar-name">draft-3.md</span>
                </div>
                <div className="halftone h-14 md:h-20" />
              </div>
            </div>
            <div className="absolute top-8 left-1/2 w-[82%] -translate-x-1/2 md:top-10 md:w-[68%]" aria-hidden="true">
              <div className="border-2 border-ink/90 bg-paper">
                <div className="titlebar">
                  <span className="win-dot" />
                  <span className="win-dot" />
                  <span className="titlebar-name">draft-2.md</span>
                </div>
                <div className="halftone-dense h-14 md:h-20" />
              </div>
            </div>
            <div className="absolute top-16 left-1/2 w-[82%] -translate-x-1/2 md:top-20 md:w-[68%]">
              <Window file="field-notes.md" note="buffered draft state · 0 posts live">
                <p className="font-mono text-[12px] text-ink">
                  <span className="text-matrix">$</span> xayen --publish "first post"
                </p>
                <p className="mt-1.5 font-mono text-[11.5px] text-ink/75">
                  waiting on the write-up: notes are in the buffer
                  <span className="caret-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-ink" />
                </p>
              </Window>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
