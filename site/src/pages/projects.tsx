import { useEffect } from "react"
import { BootTerminal, PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

const TECH = [
  "Java · Python · TypeScript · PHP · C++ · SQL",
  "React 19 + TypeScript + Vite + Tailwind",
  "FastAPI · REST APIs · SDK development",
  "Splunk SIEM · IDS/IPS · threat hunting",
  "Sigma rules · STRIDE · MITRE ATT&CK",
  "Llama 3.3 · Groq API · Gemini · Ollama-ready",
  "PostgreSQL · Redis · Nginx · Docker",
  "JUnit 5 · MockWebServer · Pytest · Maven",
  "GitHub Actions · Render · Vercel · Netlify",
]

const SKILLS = [
  "Threat hunting",
  "Incident response",
  "Baseline scoring",
  "Anomaly & burst detection",
  "Backtesting",
  "Prompt injection defence",
  "SDK design",
  "CI pipelines",
  "Meta & TikTok ads",
  "Power BI",
  "Excel VBA",
  "Technical writing",
]

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Projects · Xayen · Ekundayo Oyinkansola"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader kicker="01 · Work" title="Projects" />

        <div className="grid gap-6 lg:grid-cols-2">
          <Window
            file="triage-engine.md"
            note="Agenda X · live at agendax.com.ng/demo (synthetic data)"
          >
            <h3 className="font-mono text-lg">Triage Engine</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              A crisis early-warning platform for Nigerian fintech. It scans
              Nigerian news, Nairaland and Reddit every two hours, scores each
              tracked company 0 to 100 against that company&rsquo;s own
              baseline, and drafts holding statements plus response playbooks
              that a human reviews before anything ships.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; score inputs: negativity · growth vs baseline · source spread</li>
              <li>&gt; verdicts come with reasons attached, never a bare number</li>
              <li>&gt; drafts are holding statements and playbooks, human-reviewed</li>
              <li>&gt; cadence: every two hours, around the clock</li>
            </ul>
            <p className="mt-3 border-2 border-ink bg-paper-dim px-3 py-2 font-mono text-[11px] leading-relaxed">
              Backtest: three real incidents replayed on public news coverage
              (n = 3, news only, weights tuned on the same incidents). The
              score reached Critical within two days of the first story in
              each, and never rose above Watch in the three weeks before any
              of them. In-sample by construction: keep that in mind.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <PressLink
                href="https://agendax.com.ng/demo"
                variant="primary"
                size="lg"
                aria-label="Open the demo: agendax.com.ng/demo, synthetic data, live"
              >
                Open the demo
              </PressLink>
              <PressLink href="https://agendax.com.ng/methodology" variant="ghost">
                Methodology
              </PressLink>
            </div>
          </Window>

          <Window
            file="ai-triage-dashboard.md"
            note="Llama 3.3 via Groq · 25 unit tests · live demo"
          >
            <h3 className="font-mono text-lg">AI Triage Dashboard</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              A full-stack AI security dashboard. React 19 + TypeScript + Vite
              frontend, FastAPI backend, and Llama 3.3 through the Groq API for
              AI-generated incident summaries in real time. The Python
              detection engine under it is the tested one: 25 unit tests, and
              the model switches through environment variables whenever a
              different one fits better.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; frontend: react 19 + typescript + vite</li>
              <li>&gt; backend: fastapi, auto-generated API docs</li>
              <li>&gt; summarisation: llama 3.3 via groq, model configurable</li>
              <li>&gt; deploy: vercel (frontend) · render (backend)</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <PressLink
                href="https://ai-triage-dashboard.vercel.app"
                variant="primary"
                aria-label="Open the dashboard: ai-triage-dashboard.vercel.app, live"
              >
                Open the dashboard
              </PressLink>
              <PressLink href="https://github.com/Agenda-X-PR/ai-triage-dashboard" variant="ghost">
                Code on GitHub
              </PressLink>
            </div>
          </Window>

          <Window
            file="payments-detection.md"
            note="Docker · HMAC-SHA256 · Sigma-inspired rules"
          >
            <h3 className="font-mono text-lg">Payments Fraud &amp; Abuse Detection</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              A Dockerised detection pipeline for Nigerian fintech payment
              events: webhook ingestion with HMAC-SHA256 verification, a
              PostgreSQL event store, and a Sigma-inspired rule engine that
              catches payment velocity bursts, replay attacks,
              signature-failure spikes and amount anomalies.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; STRIDE threat model alongside the rules</li>
              <li>&gt; per-rule fixture tests + a synthetic attack harness</li>
              <li>&gt; industrial-operations alert dashboard on top</li>
              <li>&gt; CI: python syntax, YAML rule parsing, 6 security tests</li>
            </ul>
            <PressLink
              href="https://github.com/Agenda-X-PR/payments-detection"
              variant="ghost"
              className="mt-4 self-start"
            >
              Code on GitHub
            </PressLink>
          </Window>

          <Window
            file="webhook-relay.md"
            note="FastAPI · 28 tests · live at webhook-relay-xxvu.onrender.com/docs"
          >
            <h3 className="font-mono text-lg">Webhook Relay</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              A Python/FastAPI service for reliable payment webhook delivery:
              HMAC-SHA256 signature verification with constant-time
              comparison, idempotency keyed on (provider, event_id),
              exponential backoff retries from 30s to 480s, and a dead-letter
              queue once the attempts run out.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; 28 tests, CI on python 3.10 to 3.12</li>
              <li>&gt; retries: exponential 30s to 480s, then dead-letter</li>
              <li>&gt; signatures: hmac-sha256, constant-time compare</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <PressLink
                href="https://webhook-relay-xxvu.onrender.com/docs"
                variant="primary"
                aria-label="Open the API docs: webhook-relay-xxvu.onrender.com/docs, live"
              >
                Open the API docs
              </PressLink>
              <PressLink href="https://github.com/Agenda-X-PR/webhook-relay" variant="ghost">
                Code on GitHub
              </PressLink>
            </div>
          </Window>

          <Window file="alatpay-java-sdk.md" note="Java · Wema Bank · JUnit 5 · MIT">
            <h3 className="font-mono text-lg">ALATPay Java SDK</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              An open-source Java SDK for ALAT Pay (Wema Bank) payment
              integration: typed exception hierarchy, Jackson-based JSON
              deserialization, and shared HTTP client architecture underneath.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; JUnit 5 suite on MockWebServer</li>
              <li>&gt; GitHub Actions CI with pinned Surefire</li>
              <li>&gt; full Javadoc, README, CHANGELOG, MIT licence</li>
            </ul>
            <PressLink
              href="https://github.com/Agenda-X-PR/alatpay-java-sdk"
              variant="ghost"
              className="mt-4 self-start"
            >
              Code on GitHub
            </PressLink>
          </Window>

          <Window file="multi-gateway-java.md" note="one interface · four Nigerian rails">
            <h3 className="font-mono text-lg">Multi-Gateway Java SDK</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              A unified Java SDK putting four Nigerian payment providers:
              Paystack, Flutterwave, Monnify and Interswitch. One
              PaymentGateway interface, so switching rails is a configuration
              change rather than a rewrite.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; typed exception hierarchy across all four gateways</li>
              <li>&gt; amount normalisation: major to minor units</li>
              <li>&gt; webhook signature verification</li>
              <li>&gt; 23 MockWebServer tests, CI on Java 17 and 21</li>
            </ul>
            <PressLink
              href="https://github.com/Agenda-X-PR/multi-gateway-java"
              variant="ghost"
              className="mt-4 self-start"
            >
              Code on GitHub
            </PressLink>
          </Window>

          <Window file="sec-triage.md" note="stdlib-only offline CLI · 25 tests">
            <h3 className="font-mono text-lg">sec-triage</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              An offline Python CLI for first-pass triage of web and SSH logs:
              parses Apache/Nginx, JSON-lines and SSH auth formats, and flags
              repeated auth denials, SSH password guessing, sensitive-path
              probes, 404 bursts and request concentration. Strictly standard
              library, so it runs anywhere without dependencies.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; 25 tests, CI on python 3.9 to 3.12</li>
              <li>&gt; zero dependencies outside the standard library</li>
            </ul>
            <PressLink
              href="https://github.com/Agenda-X-PR/sec-triage"
              variant="ghost"
              className="mt-4 self-start"
            >
              Code on GitHub
            </PressLink>
          </Window>

          <Window
            file="bench-work.md"
            note="Geoplex Drillteq · SIEM benches, 2024"
          >
            <h3 className="font-mono text-lg">The bench years</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Security operations and delivery work from my cybersecurity
              analyst seat: SIEM monitoring in Splunk, anomaly detection, IDS
              development and reporting automation, alongside a production
              website revamp in ReactJS and PHP.
            </p>
            <ul className="mt-3 grid gap-1 font-mono text-[11.5px] text-ink/75">
              <li>&gt; reduced undetected threats by 25% via Splunk anomaly detection</li>
              <li>&gt; C++ IDS flagging 15+ malicious payloads weekly in testing</li>
              <li>&gt; automated 40% of security reporting with Python and SQL</li>
              <li>&gt; supported LockBit ransomware recovery, limiting disruption</li>
              <li>&gt; production website revamp: reactJS + PHP</li>
              <li>&gt; Power BI threat-intelligence dashboard on Splunk data</li>
            </ul>
          </Window>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Window file="skills.tsv" note="capabilities · boring and current">
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

        <div className="mt-10">
          <Window
            file="claims-scope.md"
            note="method window · keep the caveat visible"
          >
            <h3 className="font-mono text-lg">How claims are sized</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              The Triage Engine backtest is in-sample and public-news-only,
              with three operator cases. Statements about detection health
              stay tied to that scope, and the hero boot screen is pure
              chrome: it displays no live numbers and invents none. Tests
              counts, rollout numbers and demo links are the ones on the
              résumé, not the ones that would look nicer.
            </p>
          </Window>
        </div>
      </div>
    </div>
  )
}
