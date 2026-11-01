import { useEffect, useState, type ComponentType } from "react"
import { FileDown, Globe, Mail, Phone } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

const SOCIALS: Array<{
  label: string
  href: string
  aria: string
  target?: boolean
  icon: ComponentType<{ className?: string }>
}> = [
  {
    label: "GitHub",
    href: "https://github.com/Agenda-X-PR",
    aria: "GitHub profile of Agenda-X-PR",
    target: true,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/xayen",
    aria: "LinkedIn profile: xayen",
    target: true,
    icon: LinkedinIcon,
  },
  {
    label: "Agenda X",
    href: "https://agendax.com.ng",
    aria: "Agenda X site",
    target: true,
    icon: Globe,
  },
  {
    label: "Résumé .docx",
    href: "/assets/Ekundayo-Oyinkansola-Resume-2026.docx",
    aria: "Résumé .docx: Word document download",
    icon: FileDown,
  },
]

const DEMOS: Array<[string, string, string]> = [
  ["agendax.com.ng/demo", "https://agendax.com.ng/demo", "Triage Engine demo: agendax.com.ng/demo, synthetic data"],
  ["ai-triage-dashboard.vercel.app", "https://ai-triage-dashboard.vercel.app", "AI Triage Dashboard: ai-triage-dashboard.vercel.app, live demo"],
  ["webhook-relay-xxvu.onrender.com/docs", "https://webhook-relay-xxvu.onrender.com/docs", "Webhook Relay API docs: webhook-relay-xxvu.onrender.com/docs"],
]

export default function ContactPage() {
  useEffect(() => {
    document.title = "Find me · xayen · Ekundayo Oyinkansola"
  }, [])

  const [copied, setCopied] = useState<"email" | "phone" | null>(null)
  const email = "belikexen@proton.me"
  const phone = "+234 915 462 3767"

  const copy = async (value: string, which: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(which)
      window.setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  const chip =
    "border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] shadow-brutal-xs transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader kicker="07 · Signal" title="Find me" />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Window file="contact.md" note="open to global remote roles & collaborations">
            <h2 className="font-mono text-2xl tracking-tight sm:text-3xl">
              Let&rsquo;s build what comes next.
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/85">
              Tell me about the system that has to hold up under pressure:
              early-warning engines, payment rails, security tooling, the
              full stack behind them. I reply fastest by email.
            </p>

            <dl className="mt-6 grid gap-4 font-mono text-[12px] text-ink">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-ink/60">Email</dt>
                <dd className="mt-1.5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-[14px] underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {email}
                  </a>
                  <button type="button" onClick={() => copy(email, "email")} className={chip}>
                    {copied === "email" ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-ink/60">Phone</dt>
                <dd className="mt-1.5 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+2349154623767"
                    className="inline-flex items-center gap-2 text-[14px] underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {phone}
                  </a>
                  <button type="button" onClick={() => copy(phone, "phone")} className={chip}>
                    {copied === "phone" ? "Copied" : "Copy"}
                  </button>
                  <span className="font-mono text-[11px] text-ink/60">GMT+1</span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-ink/60">Base</dt>
                <dd className="mt-1.5">Lagos, Nigeria · remote-first</dd>
              </div>
            </dl>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? `${copied} copied to clipboard` : ""}
            </span>
          </Window>

          <Window file="links.md" note="ping before you patch">
            <ul className="space-y-3">
              {SOCIALS.map(({ label, href, aria, target, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={aria}
                    download={label === "Résumé .docx"}
                    target={target ? "_blank" : undefined}
                    rel={target ? "noopener noreferrer" : undefined}
                    className="group/row flex items-center justify-between gap-3 border-2 border-ink bg-paper px-4 py-3 shadow-brutal-xs hover:bg-paper-dim"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-8 shrink-0 items-center justify-center border-2 border-ink bg-ink text-paper"
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="font-mono text-[12px] uppercase tracking-[0.12em]">
                        {label}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[12px] transition-transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Window>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Window file="live-demos.md" note="all three run right now">
            <h3 className="font-mono text-lg">Live demos</h3>
            <ul className="mt-2 grid gap-2">
              {DEMOS.map(([label, href, aria]) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={aria}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11.5px] underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"
                  >
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-ink/60">
              The Triage Engine demo runs on synthetic data by design: the
              backtest numbers stay in their window, in-sample and
              public-news-only, n = 3.
            </p>
          </Window>

          <Window file="presence.txt" note="where the lights are on">
            <p className="text-[13.5px] leading-relaxed text-ink/85">
              Best door: email above. Second: the phone. Third: GitHub, for
              six ships with CI and tests, SDKs and postmortems. LinkedIn for
              the short version of the record. Elsewhere the lights burn at
              Agenda X, where the production stack actually lives.
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
