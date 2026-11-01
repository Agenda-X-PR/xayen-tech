import { useEffect } from "react"
import { BootTerminal, PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

const TECH = [
  "Python detection engine",
  "FastAPI",
  "React 19 + Vite",
  "Llama 3.3 via Groq API",
  "Payment operator SDKs",
  "SIEM-grade monitoring",
  "Reddit + news ingestion",
  "25 unit tests",
]

const SKILLS = [
  "Cybersecurity analysis",
  "Full-stack development",
  "Early-warning engines",
  "Payment infrastructure",
  "AI security tooling",
  "Bug bounty triage",
  "Community management",
  "Technical writing",
]

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Projects · xayen · Ekundayo Oyinkansola"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader kicker="01 · Work" title="Projects" />

        <div className="grid gap-6 lg:grid-cols-2">
          <Window file="triage-engine.md" note="Agenda X · 2026 to present · live demo">
            <h3 className="font-mono text-lg">Triage Engine</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Early-warning engine monitoring payment operators through public
              signals: ingestion, scoring, and alert dispatch on one pipeline.
              Arc via Groq API for real-time incident summarization over a
              round-the-clock feed.
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink/75">
              Backtested on Flutterwave 2024, Paystack 2025, and OPay 2026:
              critical status in ≤48 h. In-sample, public news only (n = 3).
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; public signals in, scores out</li>
              <li>&gt; alerts queued, never shouted</li>
              <li>&gt; one audit trail end to end</li>
            </ul>
            <PressLink
              href="https://agendax.com.ng/demo"
              variant="primary"
              className="mt-4 self-start"
              aria-label="Open the demo: triage-engine --demo, live"
            >
              Open the demo
            </PressLink>
          </Window>

          <Window file="llm-sentinel.md" note="Detection engineering · 25 tests">
            <h3 className="font-mono text-lg">LLM Sentinel</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Full-stack security dashboard integrating Llama 3.3 via Groq API
              for real-time incident summarization: React 19 + Vite frontend,
              FastAPI backend, and 25 unit tests on the Python detection engine.
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink/75">
              Shops signals into one queue: scanning, scoring, alerting, and a
              hold-the-line audit trail.
            </p>
            <PressLink
              href="https://agendax.com.ng"
              variant="ghost"
              className="mt-4 self-start"
            >
              Agenda X
            </PressLink>
          </Window>

          <Window file="payment-sdk.md" note="Infrastructure · shipped to production">
            <h3 className="font-mono text-lg">Hardened Payment SDKs</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Payment infrastructure that holds up under pressure: SDKs wired
              through the Agenda X stack, rebuilt for Nigerian rails first and
              written to survive real traffic rather than staging.
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink/75">
              &gt; failure drills, rate limiting, and idempotent retries on by default
            </p>
          </Window>

          <Window file="record-summary.md" note="Method window · keep the caveat visible">
            <h3 className="font-mono text-lg">How claims are sized</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              The Triage Engine backtest is in-sample and public-news-only,
              with three operator cases. Statements about detection health stay
              tied to that scope, and the hero boot screen is pure chrome: it
              displays no live numbers and invents none.
            </p>
          </Window>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Window file="skills.tsv" note="Capabilities · boring and current">
            <h3 className="font-mono text-lg">Capabilities</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="border-2 border-ink bg-paper-dim px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Window>
          <BootTerminal />
        </div>

        <div className="mt-10">
          <SectionHeader kicker="02 · Stack" title="Tooling window" />
          <Window file="stack-ls.txt" note="reach for it first · learn the rest on call">
            <ul className="flex flex-wrap gap-2">
              {TECH.map((item) => (
                <li
                  key={item}
                  className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[11px]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Window>
        </div>
      </div>
    </div>
  )
}
