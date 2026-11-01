import { useEffect } from "react"
import { SectionHeader, Window } from "@/components/window"

const TIMELINE = [
  {
    file: "agenda-x.md",
    period: "2026 to present · Remote · Nigeria",
    role: "Founder & CEO, Agenda X",
    bullets: [
      "Founded and lead a technology and communications company; current focus is Triage Engine, a crisis early-warning product for Nigerian banks and fintechs.",
      "Designed, developed and deployed the Agenda X website: architecture, content, frontend and ongoing optimisation.",
      "End-to-end Meta Ads and TikTok Ads services: strategy, execution, audience targeting, optimisation and reporting.",
      "HR technology aimed at hiring, onboarding and workforce management; plus business development and client acquisition.",
      "Open-sourced six projects across Java, Python and TypeScript, all with CI and automated tests.",
    ],
  },
  {
    file: "geoplex-drillteq.md",
    period: "2024 · Remote / Hybrid",
    role: "Junior Cybersecurity Analyst & Full-Stack Developer, Geoplex Drillteq",
    bullets: [
      "Production website revamp in ReactJS and PHP: UX, content structure, responsiveness, performance.",
      "Supported recovery of critical business data after a LockBit ransomware incident.",
      "Reduced undetected threats by 25% with Splunk anomaly detection and SIEM monitoring.",
      "Built a C++ IDS that flagged 15+ malicious payloads weekly in testing.",
      "Automated 40% of security reporting with Python and SQL; real-time threat dashboards.",
    ],
  },
  {
    file: "clubzella.md",
    period: "2025 to 2026 · Remote",
    role: "Marketing Lead & Community Manager, ClubZella / Zella.Africa",
    bullets: [
      "Led marketing across campaigns, content, paid acquisition and community growth.",
      "Planned and optimised Meta and TikTok campaigns from audience research and analytics.",
      "Creator and brand outreach, partnership pitches, community events.",
      "Content for gaming, entertainment and fintech-oriented audiences.",
    ],
  },
  {
    file: "raybel-anime.md",
    period: "2025 to 2026 · Remote",
    role: "Social Media Manager, Raybel's Anime Corner",
    bullets: [
      "Grew TikTok to 19,000 followers with platform-specific content strategy.",
      "Delivered 50% Instagram growth through cadence, community interaction and tracking.",
      "Built audience strategies for anime and creative-content communities.",
    ],
  },
  {
    file: "geoplex-chevron.md",
    period: "2024 · Nigeria",
    role: "Computer Intern, Geoplex Drillteq / Chevron",
    bullets: [
      "Automated file-sorting with Excel and Power Automate: 10+ hours saved monthly.",
      "Python data-processing scripts; trained 3 staff on VBA macros, cutting repetitive work by 20%.",
    ],
  },
]

const EARLIER = [
  {
    file: "virtual-assistant.md",
    role: "Virtual Assistant · Freelance",
    period: "2024 to 2025 · Remote",
    line: "Scheduling, correspondence, reporting, research, data entry and project tracking for remote clients, on Trello, Slack and Google Workspace.",
  },
  {
    file: "bug-bounty.md",
    role: "Bug Bounty Hunter · Freelance",
    period: "2024 to 2025 · Remote",
    line: "Authorised reconnaissance, enumeration, vulnerability testing and exploitation in defined scopes, documented OWASP-aligned with proof of concept, impact analysis and remediation guidance.",
  },
  {
    file: "lea-ai.md",
    role: "Community Manager · LEA AI",
    period: "2024 · Remote",
    line: "Online communities, user support, engagement initiatives, feedback collection and analytics; fed product and marketing with actionable insights.",
  },
  {
    file: "caleb-radio.md",
    role: "Radio Host & Producer · Caleb University Radio",
    period: "2024 to 2025 · Lagos, Nigeria",
    line: "Hosted and produced live programs, scripted interviews and topical segments, coordinated guests, managed broadcast flow.",
  },
]

const COMPETENCIES: Array<[string, string[]]> = [
  ["Cybersecurity", ["Splunk SIEM", "IDS/IPS", "Threat hunting", "MITRE ATT&CK", "NIST", "Bug bounty"]],
  ["Development", ["Java", "Python", "TypeScript", "PHP", "ReactJS", "C++", "SQL", "REST APIs", "SDK development", "Open source"]],
  ["Frontend", ["React", "TypeScript", "Vite", "Tailwind CSS", "Lucide React"]],
  ["AI & LLM", ["Gemini", "Groq API", "Llama 3.3", "Model abstraction", "Ollama readiness", "Prompt engineering", "Structured summarisation"]],
  ["Detection & analytics", ["Baseline scoring", "Anomaly / burst detection", "Event correlation", "Backtesting", "Sigma rules", "STRIDE", "Prompt injection defence"]],
  ["Testing & CI", ["JUnit 5", "MockWebServer", "Pytest", "GitHub Actions", "Maven", "pnpm/npm", "Git"]],
  ["Deployment & infra", ["Render", "Vercel", "Netlify", "Docker", "Docker Compose", "PostgreSQL", "Redis", "Nginx"]],
  ["Marketing & ops", ["Meta Ads", "TikTok Ads", "Crisis comms", "Community", "Partnerships", "Technical writing", "SEO"]],
]

export default function AboutPage() {
  useEffect(() => {
    document.title = "About · xayen · Ekundayo Oyinkansola"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader kicker="04 · Record" title="About the operator" />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Window file="about.md" note="hand-built · every claim carries a paper trail">
            <h3 className="font-mono text-lg">xayen · Ekundayo Oyinkansola</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/90">
              Cybersecurity analyst, full-stack developer, AI tooling builder
              and SDK author from Lagos, Nigeria: remote-first, open
              to global remote roles. Founder and CEO of{" "}
              <strong>Agenda X</strong>, where I build early-warning systems
              and payment infrastructure designed to hold up under pressure.
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">
              The path here is wider than one lane: a B.Sc. in Computer
              Science (Cybersecurity track) at Caleb University, SIEM
              monitoring and incident response at Geoplex Drillteq, marketing
              leadership and community work at ClubZella and Zella.Africa,
              bug bounty in defined scopes, and a radio desk at Caleb
              University Radio. SIEM taught me to read systems; building web
              and SDK tooling taught me to fix them.
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">
              Six open-source projects shipped across Java, Python and
              TypeScript, each with CI pipelines and automated tests, two of
              them running as live demos. The tooling habit: write the tests,
              pin the CI, document it, then let the README do the bragging.
            </p>
          </Window>

          <Window file="method.md" note="scope discipline · keep the caveat visible">
            <h3 className="font-mono text-lg">Method</h3>
            <ul className="mt-3 space-y-2 font-mono text-[12px] leading-relaxed text-ink/80">
              <li>&gt; public news only, n = 3, in-sample: the backtest says what it is</li>
              <li>&gt; the boot screen is chrome, not data: it displays no invented stats</li>
              <li>&gt; uptime is measured, never invented</li>
              <li>&gt; every ship has tests and CI before anyone calls it production</li>
            </ul>
          </Window>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Window file="education.md" note="Caleb University · 2025">
            <h3 className="font-mono text-lg">Education</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Caleb University, B.Sc. Computer Science (Cybersecurity track),
              2025.
            </p>
            <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-ink/70">
              Languages: English (native) · Spanish (professional) · French
              (conversational)
            </p>
            <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-ink/70">
              Interests: chess · ethical hacking labs · web development ·
              technical writing
            </p>
          </Window>

          <Window
            file="competitions.md"
            note="picoCTF 2023 · Hack The Box · ECOWAS 2023/24"
          >
            <h3 className="font-mono text-lg">Competitions &amp; practice</h3>
            <ul className="mt-3 space-y-2 font-mono text-[11.5px] leading-relaxed text-ink/80">
              <li>&gt; picoCTF 2023: top 15% on exploit-development and reverse-engineering challenges</li>
              <li>&gt; Hack The Box: 50+ machines, focused on enumeration, privilege escalation, network exploitation</li>
              <li>&gt; ECOWAS Hacking Tournament: 2023 and 2024 regional participant, ethical hacking and defensive security</li>
            </ul>
          </Window>
        </div>

        <div className="mt-10">
          <SectionHeader kicker="05 · Record" title="Experience timeline" />
          <div className="space-y-4">
            {TIMELINE.map((entry) => (
              <Window key={entry.file} file={entry.file} note={entry.period}>
                <h3 className="font-mono text-[14.5px] leading-snug">{entry.role}</h3>
                <ul className="mt-2 grid gap-1.5 text-[13px] leading-relaxed text-ink/80">
                  {entry.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden="true" className="shrink-0 font-mono text-ink/50">
                        &gt;
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Window>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SectionHeader kicker="06 · Earlier" title="Where the reps came from" />
          <div className="grid gap-4 lg:grid-cols-2">
            {EARLIER.map((entry) => (
              <Window key={entry.file} file={entry.file} note={entry.period}>
                <h3 className="font-mono text-[13.5px] leading-snug">{entry.role}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">{entry.line}</p>
              </Window>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SectionHeader kicker="07 · Competencies" title="The full toolkit" />
          <Window file="competencies.tsv" note="verbatim from the résumé · grouped">
            <dl className="grid gap-4 sm:grid-cols-2">
              {COMPETENCIES.map(([group, items]) => (
                <div key={group}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                    {group}
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[10.5px]"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Window>
        </div>
      </div>
    </div>
  )
}
