import { useEffect } from "react"
import { posts } from "@/content/posts"
import { PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

export default function BlogPage() {
  useEffect(() => {
    document.title = "Field notes · Xayen · Ekundayo Oyinkansola"
  }, [])

  const ghostSlots = Math.max(0, 3 - Math.min(3, posts.length))

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader kicker="03 · Field notes" title="Every post, newest first" />

        <div className="space-y-6">
          {posts.map((post) => (
            <Window key={post.slug} file={post.file} note={post.date}>
              <h3 className="font-mono text-lg">
                <a href={post.href}>{post.title}</a>
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">{post.teaser}</p>
            </Window>
          ))}

          {posts.length === 0 && (
            <Window file="field-notes.md" note="buffered draft state · 0 posts live">
              <p className="font-mono text-[12px] text-ink">
                <span className="text-accent">$</span> Xayen --publish "first post"
              </p>
              <p className="mt-1.5 font-mono text-[11.5px] text-ink/75">
                waiting on the write-up: notes are in the buffer
                <span className="caret-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-ink" />
              </p>
            </Window>
          )}

          {Array.from({ length: ghostSlots }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="border-2 border-ink/40 bg-paper/70 halftone"
              style={{ transform: `translateX(${(i + 1) * 10}px)`, minHeight: 128 }}
            >
              <div className="titlebar opacity-70">
                <span className="win-dot" />
                <span className="win-dot" />
                <span className="titlebar-name">draft-{ghostSlots - i}.md</span>
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
                  reserved · slot {ghostSlots - i}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Window file="how-posts-land.md" note="editing guide">
            <h3 className="font-mono text-lg">Publishing window</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Posts live in <code className="font-mono">src/content/posts.ts</code>:
              add a Post object, and the page renders it above the ghost slots,
              newest first. File names, dates, teasers, and links all come from
              the entry, nothing else needs touching.
            </p>
          </Window>

          <Window file="signal.md" note="06 · Signal">
            <h3 className="font-mono text-lg">Stay in orbit while the buffer fills.</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
              Write-ups, build logs and postmortems from the security and
              full-stack bench, published here as they&rsquo;re written, not
              before they&rsquo;re worth reading.
            </p>
            <PressLink to="/contact" variant="ghost" className="mt-4 self-start">
              Reach me
            </PressLink>
          </Window>
        </div>
      </div>
    </div>
  )
}
