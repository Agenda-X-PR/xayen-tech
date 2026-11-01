import { useEffect } from "react"
import { MorphWord } from "@/components/morph-word"
import { BootTerminal, PressLink, WindowTileLink } from "@/components/site-bits"
import { Window } from "@/components/window"

const VERBS = ["spot", "score", "triage", "stop"]

const TAGLINE = [
  "Cybersecurity analyst",
  "Full-stack developer",
  "AI tooling",
  "SDK author",
]

const FACTS = [
  "Splunk SIEM · SIEM monitoring",
  "Six open-source projects, all with CI",
  "Llama 3.3 + FastAPI + React 19",
  "picoCTF 2023 · top 15%",
  "Open to global remote roles",
]

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
            <p className="mt-5 max-w-md font-mono text-[15px] leading-relaxed text-ink">
              I{" "}
              <MorphWord
                interval={2400}
                words={VERBS}
                className="inline-block text-accent"
              />{" "}
              trouble before payouts notice.
            </p>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/75">
              Cybersecurity and full stack. SIEM monitoring and incident
              response on one bench, production websites and SDK authorship on
              the other. Every tool I ship carries automated tests and a CI
              pipeline, and the honest ones say what they do not know.
            </p>
            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink/70">
              Lagos, Nigeria: remote-first. Open to global remote roles.
            </p>
            <ul className="mt-4 flex max-w-md flex-wrap gap-2" aria-label="Tagline">
              {TAGLINE.map((tag) => (
                <li
                  key={tag}
                  className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                >
                  {tag}
                </li>
              ))}
            </ul>
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

          <BootTerminal className="w-full max-w-md justify-self-center lg:max-w-none" />
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
            <Window file="triage-engine.md" note="Agenda X · live at agendax.com.ng/demo (synthetic data)">
              <h3 className="font-mono text-lg">Triage Engine</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
                Crisis early-warning for Nigerian fintech. Scans Nigerian
                news, Nairaland and Reddit every two hours, scores each
                company 0 to 100 against its own baseline from negativity,
                baseline growth and source spread, shows the reasons, and
                drafts holding statements plus playbooks that a person
                reviews before anything goes out.
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink/75">
                Backtested on public news coverage of Flutterwave 2024,
                Paystack 2025, and OPay 2026: critical within two days of the
                first story in all three, never above Watch in the three
                weeks before each. Weights were tuned on the same incidents,
                so it is in-sample, public news only (n = 3).
              </p>
              <PressLink to="/projects" variant="ghost" className="mt-4 self-start">
                How it is built
              </PressLink>
            </Window>

            <Window file="ai-triage-dashboard.md" note="Llama 3.3 via Groq · 25 unit tests · live demo">
              <h3 className="font-mono text-lg">AI Triage Dashboard</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
                Full-stack AI security dashboard. React 19 + TypeScript + Vite
                frontend, FastAPI backend, and Llama 3.3 via Groq generating
                incident summaries in real time from a tested Python
                detection engine: 25 unit tests, configurable model through
                environment variables.
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink/75">
                Live at ai-triage-dashboard.vercel.app · code on GitHub
              </p>
              <PressLink to="/projects" variant="ghost" className="mt-4 self-start">
                Read the build
              </PressLink>
            </Window>

            <Window file="open-ports.md" note="six open-source ships · CI on every one">
              <h3 className="font-mono text-lg">The SDK fleet</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
                Six open-source projects across Java, Python and TypeScript:
                a tested ALATPay Java SDK (Wema Bank), a multi-gateway SDK
                unifying Paystack, Flutterwave, Monnify and Interswitch, a
                Python webhook reliability service, a defensive log-triaging
                CLI, the AI dashboard above, and a payments fraud and abuse
                detection platform. All six carry CI pipelines and automated
                tests; the dashboard and the webhook relay run as live demos.
              </p>
              <PressLink to="/projects" variant="ghost" className="mt-4 self-start">
                Every ship, in detail
              </PressLink>
            </Window>

            <Window file="operator.facts" note="kept short · verified against the record">
              <h3 className="font-mono text-lg">Operator facts</h3>
              <ul className="mt-3 space-y-1.5 font-mono text-[11.5px] leading-relaxed text-ink/80">
                {FACTS.map((fact) => (
                  <li key={fact}>&gt; {fact}</li>
                ))}
              </ul>
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
                  <span className="text-accent">$</span> xayen --publish "first post"
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
