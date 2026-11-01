import { useEffect, useState } from "react"
import { PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

const LINKS: Array<[string, string, string, "_blank" | undefined]> = [
  ["GitHub", "https://github.com/Agenda-X-PR", "GitHub profile of Agenda-X-PR", "_blank"],
  ["LinkedIn", "https://linkedin.com/in/xayen", "LinkedIn profile: xayen", "_blank"],
  ["Agenda X", "https://agendax.com.ng", "Agenda X site", "_blank"],
  ["Résumé .docx", "/assets/Ekundayo-Oyinkansola-Resume-2026.docx", "Résumé .docx: Word document download", undefined],
]

export default function ContactPage() {
  useEffect(() => {
    document.title = "Find me · xayen · Ekundayo Oyinkansola"
  }, [])

  const [copied, setCopied] = useState(false)
  const email = "belikexen@proton.me"

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader kicker="07 · Signal" title="Find me" />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Window file="contact.md" note="open to remote roles & collaborations">
            <h2 className="font-mono text-2xl tracking-tight sm:text-3xl">
              Let&rsquo;s build what comes next.
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/85">
              Tell me about the system that has to hold up under pressure:
              early-warning engines, payment rails, security tooling, the full
              stack that goes behind them.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="font-mono text-[15px] underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] shadow-brutal-xs transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-ink"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <span role="status" aria-live="polite" className="font-mono text-[11px] text-accent">
                {copied ? "email copied to clipboard" : ""}
              </span>
            </div>
          </Window>

          <Window file="links.md" note="ping before you patch">
            <ul className="space-y-3">
              {LINKS.map(([label, href, aria, target]) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={aria}
                    download={label === "Résumé .docx"}
                    target={target}
                    rel={target === "_blank" ? "noopener noreferrer" : undefined}
                    className="group/row flex items-center justify-between gap-3 border-2 border-ink bg-paper px-4 py-3 shadow-brutal-xs hover:bg-paper-dim"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em]">{label}</span>
                    <span aria-hidden="true" className="font-mono text-[12px] transition-transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Window>
        </div>

        <div className="mt-10">
          <Window file="presence.txt" note="where the lights are on">
            <p className="text-[13.5px] leading-relaxed text-ink/85">
              Best door: email above. Second door: LinkedIn. Third: GitHub, for
              code, SDKs, and the occasional postmortem. Elsewhere the lights
              burn at Agenda X, where the production stack actually lives.
            </p>
            <PressLink to="/" variant="ghost" className="mt-4 self-start">
              Back to hello
            </PressLink>
          </Window>
        </div>
      </div>
    </div>
  )
}
