import { useEffect } from "react"
import { SectionHeader, Window } from "@/components/window"

const RECORD = [
  {
    file: "agenda-x.md",
    period: "2026 to present",
    role: "Founder & CEO, Agenda X",
    place: "Remote · Nigeria",
    detail: "Early-warning systems and payment infrastructure that hold up under pressure.",
  },
  {
    file: "geoplex-drillteq.md",
    period: "2025 to 2026",
    role: "Junior Cybersecurity Analyst & Full-Stack Developer, Geoplex Drillteq",
    place: "Hybrid",
    detail: "SIEM analyst work and full-stack delivery on the monitoring bench.",
  },
  {
    file: "clubzella.md",
    period: "2025 to 2026",
    role: "Marketing Lead & Community Manager, ClubZella / Zella.Africa",
    detail: "Community, campaigns and product feedback loops.",
  },
  {
    file: "raybel-anime.md",
    period: "Earlier",
    role: "Social Media Manager, Raybel's Anime Corner",
    detail: "Content and audience ops.",
  },
  {
    file: "geoplex-chevron.md",
    period: "Earlier",
    role: "Computer Intern, Geoplex Drillteq / Chevron",
    detail: "First bench: computers in the wild.",
  },
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
          <Window file="about.md" note="hand-built · no frameworks before this one">
            <h3 className="font-mono text-lg">xayen</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/90">
              Founder &amp; CEO of <strong>Agenda X</strong>. I build early-warning
              systems and payment infrastructure that hold up under pressure.
              Previously SIEM analyst at Geoplex Drillteq, with a B.Sc. in
              Computer Science (Cybersecurity track), Caleb University. Open to
              remote roles.
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">
              On the bench: security analysis, full-stack delivery, and the
              writing that keeps honest claims honest.
            </p>
          </Window>

          <Window file="method.md" note="scope discipline · keep the caveat visible">
            <h3 className="font-mono text-lg">Method</h3>
            <ul className="mt-3 space-y-2 font-mono text-[12px] text-ink/80">
              <li>&gt; public news only, n = 3, in-sample: the backtest says what it is</li>
              <li>&gt; the boot screen is chrome, not data: it displays no invented stats</li>
              <li>&gt; uptime is measured, never invented</li>
            </ul>
          </Window>
        </div>

        <div className="mt-10">
          <SectionHeader kicker="05 · Record" title="Experience timeline" />
          <div className="space-y-4">
            {RECORD.map((entry) => (
              <Window key={entry.file} file={entry.file} note={entry.period}>
                <h3 className="font-mono text-[14.5px] leading-snug">{entry.role}</h3>
                {entry.place && (
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
                    {entry.place}
                  </p>
                )}
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">{entry.detail}</p>
              </Window>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SectionHeader kicker="06 · Earlier" title="Where the reps came from" />
          <Window file="earlier-log.txt" note="picoCTF 2023 · Hack The Box · ECOWAS CTF 2023/24">
            <p className="text-[13.5px] leading-relaxed text-ink/85">
              Earlier: virtual assistant, bug bounty, community manager (LEA
              AI), radio host &amp; producer (Caleb University Radio):
              picoCTF 2023 top 15% globally, 50+ Hack The Box machines,
              ECOWAS CTF 2023/24.
            </p>
          </Window>
        </div>
      </div>
    </div>
  )
}
