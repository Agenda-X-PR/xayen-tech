import { useEffect } from "react"
import { PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

const strong = "font-semibold text-ink"
const em = "italic"
const code =
  "whitespace-nowrap border-2 border-ink bg-paper-dim px-1 py-0.5 font-mono text-[12px] text-ink"
const para = "mt-3.5 text-[14px] leading-relaxed text-ink/85"
const head = "mt-9 font-mono text-[17px] leading-snug tracking-tight text-ink"
const sub = "-mt-6"
const li = "mt-2 flex gap-2 text-[13.5px] leading-relaxed text-ink/85"
const marker = "shrink-0 font-mono text-ink/50"

const link =
  "underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"

export default function BlogPostPage() {
  useEffect(() => {
    document.title = "The Reconciliation Tool I Almost Didn't Finish · Xayen"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader
          kicker="03 · Field notes"
          title="The Reconciliation Tool I Almost Didn't Finish"
        />

        <Window file="reconcile.md" note="12 hours · 5 days · 9 tests · MIT">
          <article>
            <p className={para}>
              I want to tell you about the night I decided to build this. It
              wasn&rsquo;t when I sat down to write code: it was three hours
              into an Excel reconciliation for a client, at 11pm, when I
              noticed the sum of a column was off by{" "}
              <span className={code}>₦0.02</span> and spent 45 minutes finding
              out why.
            </p>
            <p className={para}>
              The answer: floating-point arithmetic. Excel was storing
              ₦5,000.00 as <span className={code}>5000.0000000000003</span>{" "}
              because of the way it handles decimals, and my VLOOKUP was
              failing because the two sides of the match had slightly
              different underlying values. The ₦0.02 wasn&rsquo;t real money.
              It was the way Excel represented the money.
            </p>
            <p className={para}>
              I closed the spreadsheet, opened a blank Python file, and wrote:
            </p>
            <pre className="mt-3 overflow-x-auto border-2 border-ink bg-crt p-4 font-mono text-[12.5px] leading-relaxed text-phosphor">
              <code>from decimal import Decimal</code>
            </pre>
            <p className={para}>
              That was the first line of <span className={code}>reconcile</span>
              . It&rsquo;s been the most important line I wrote all week.
            </p>

            <h2 className={head + " " + sub}>The first decision I made, and why it stuck</h2>
            <p className={para}>
              I knew within five minutes of starting that the tool needed{" "}
              <span className={code}>Decimal</span>, not{" "}
              <span className={code}>float</span>. Not because I&rsquo;m
              disciplined about types, I&rsquo;m not. But because I&rsquo;d
              just spent 45 minutes of my life on a bug that existed only
              because float arithmetic rounds in ways a spreadsheet hides.
            </p>
            <p className={para}>
              Money in <span className={code}>float</span> is a lie.{" "}
              <span className={code}>0.1 + 0.2 = 0.30000000000000004</span> in
              float math. For a chart, that doesn&rsquo;t matter. For
              reconciliation, it&rsquo;s the entire bug class I was trying to
              escape. <span className={code}>Decimal</span> doesn&rsquo;t have
              the problem. <span className={code}>Decimal</span> stores
              5000.00 as exactly 5000.00.
            </p>
            <p className={para}>
              I made that decision in the first five minutes and never
              reconsidered it. That&rsquo;s rare for me. Normally I&rsquo;d
              write the code with <span className={code}>float</span>, hit the
              bug, and rewrite. This time I&rsquo;d already hit the bug, in
              Excel, at 11pm, and I knew what the fix was going to look like.
            </p>
            <p className={para}>
              The lesson I didn&rsquo;t fully articulate at the time: the
              first decision sets the tone for the whole project. Getting the
              type right on Day 1 meant I never had a rounding bug on Days 2,
              3, 4, or 5. The bug was pre-empted, not debugged.
            </p>

            <h2 className={head}>The second decision: three sections, not one number</h2>
            <p className={para}>
              My first instinct for the report was a single line: &ldquo;N
              transactions matched, M didn&rsquo;t.&rdquo; That would be
              easier to write. It would also be useless.
            </p>
            <p className={para}>
              The question I wanted the tool to answer wasn&rsquo;t &ldquo;did
              everything match&rdquo;, it was &ldquo;what didn&rsquo;t match,
              and what should I do about it?&rdquo; A count of 47 matches
              doesn&rsquo;t tell you the three things that need fixing.
            </p>
            <p className={para}>
              So the report became three sections.{" "}
              <strong className={strong}>Matched</strong> so you can verify
              the good ones.{" "}
              <strong className={strong}>Unmatched processor rows</strong>: the
              transactions the processor says succeeded but that aren&rsquo;t
              in the bank. Those are the ones you chase.{" "}
              <strong className={strong}>Unmatched bank rows</strong>: bank
              entries with no matching processor transaction. Those are the
              ones you investigate. Are they refunds? Chargebacks? A different
              client paying into the same account?
            </p>
            <p className={para}>
              That decision added about 30 lines of output-formatting code on
              Day 2. Worth every line.
            </p>
            <p className={para}>
              The instinct I had to resist was &ldquo;make it as simple as
              possible.&rdquo; A single-number report would have been simpler
              to build and harder to use. The simplest thing the{" "}
              <em className={em}>user</em> needs is not the simplest thing the{" "}
              <em className={em}>code</em> can produce.
            </p>

            <h2 className={head}>The first thing that went wrong</h2>
            <p className={para}>
              On Day 2, I wrote the matcher. The exact-match version. The one
              that compares <span className={code}>reference</span> column to{" "}
              <span className={code}>reference</span> column, amount column to
              amount column.
            </p>
            <p className={para}>
              I ran it on the fixtures and got zero matches. All rows
              unmatched on both sides.
            </p>
            <p className={para}>
              The reason: the processor&rsquo;s reference is{" "}
              <span className={code}>ORD-001</span>. The bank&rsquo;s
              description is <span className={code}>TRF/ORD-001/PAYSTACK</span>
              . Different formats. The column I thought I was comparing was
              actually a free-text description that{" "}
              <em className={em}>contained</em> the reference somewhere inside
              it.
            </p>
            <p className={para}>
              This is the kind of bug that doesn&rsquo;t show up in a mental
              model. I <em className={em}>knew</em> references wouldn&rsquo;t
              be exact matches, that&rsquo;s why I&rsquo;d built in fuzzy
              matching for Day 3. But I wrote the exact-match version first
              anyway, because Day 2&rsquo;s job was the simplest possible
              thing. Simplest possible thing, it turned out, matched zero
              rows.
            </p>
            <p className={para}>
              The fix was a regex on Day 3.{" "}
              <span className={code}>[A-Z]+-\d+</span>, extract{" "}
              <span className={code}>ORD-001</span> from{" "}
              <span className={code}>TRF/ORD-001/PAYSTACK</span>,
              case-insensitive comparison. Ten lines of code.
            </p>
            <p className={para}>
              Should this have been on Day 2? Probably. I could have designed
              the fixture files to have exact-matching references and saved
              normalization for Day 3. But the fixtures I picked reflected
              what real bank statements actually look like, and the real
              problem was always going to need extraction.
            </p>
            <p className={para}>
              The bug you find on Day 2 is often the bug you should have
              designed for on Day 1. That&rsquo;s not a failure. That&rsquo;s
              what the process looks like.
            </p>

            <h2 className={head}>The thing I almost shipped but didn&rsquo;t</h2>
            <p className={para}>
              There was a moment on Day 3, after the fuzzy matching worked,
              where I thought: &ldquo;Let me add a{" "}
              <span className={code}>--verbose</span> flag to the
              CLI.&rdquo; The output was one line per match, and I wanted a
              flag that showed more detail for each row.
            </p>
            <p className={para}>I sat with it for five minutes and killed it.</p>
            <p className={para}>
              The reason: the output already showed everything. Adding{" "}
              <span className={code}>--verbose</span> would let the user{" "}
              <em className={em}>choose</em> to see less. But the tool&rsquo;s
              entire purpose was showing the full picture. A user who runs{" "}
              <span className={code}>reconcile</span> wants to see the three
              sections. A user who wants one line of output wants a different
              tool.
            </p>
            <p className={para}>
              This is the difference between &ldquo;a feature I could
              add&rdquo; and &ldquo;a feature the product needs.&rdquo; I
              default to adding. This time I didn&rsquo;t.
            </p>
            <p className={para}>
              The rule I&rsquo;d carry forward: if you&rsquo;re adding a flag
              to hide what&rsquo;s already there, you&rsquo;re probably
              building a different tool than the one you set out to build.
            </p>

            <h2 className={head}>The 5-day build, honestly</h2>
            <p className={para}>
              Here&rsquo;s what actually happened, not the polished version.
            </p>
            <p className={para}>
              <strong className={strong}>Day 1 (2 hours):</strong>{" "}
              <span className={code}>models.py</span>,{" "}
              <span className={code}>cli.py</span>, print row counts. The CLI
              reported &ldquo;4 processor rows, 3 bank rows&rdquo; and I
              closed the laptop.
            </p>
            <p className={para}>
              <strong className={strong}>Day 2 (3 hours):</strong>{" "}
              <span className={code}>matcher.py</span> with exact match, two
              tests. Got zero matches first, realized the
              reference-extraction problem, added a regex that probably
              belonged on Day 3. Tests passed eventually. Went to sleep at
              1am.
            </p>
            <p className={para}>
              <strong className={strong}>Day 3 (3 hours):</strong> fuzzy
              matching: amount tolerance, date window, case-insensitive
              reference, plus 7 more tests. 9 tests total. Felt like the hard
              part was done.
            </p>
            <p className={para}>
              <strong className={strong}>Day 4 (1.5 hours):</strong> README,
              LICENSE, CI, push. Most of this day was writing, not coding.
              Also spent 30 minutes fighting a Python PATH issue when{" "}
              <span className={code}>reconcile.exe</span> wasn&rsquo;t found.
              The fix was{" "}
              <span className={code}>python -m reconcile</span> instead of{" "}
              <span className={code}>reconcile</span>. Six minutes of work, 30
              minutes of not realizing it was six minutes of work.
            </p>
            <p className={para}>
              <strong className={strong}>Day 5 (2.5 hours):</strong>{" "}
              reconcile-demo. FastAPI wrapper, HTML form, Render deploy. First
              deploy failed. Second deploy worked. Total: 12 hours, five
              calendar days, most of it in 2-hour sessions.
            </p>
            <p className={para}>
              The honest part: every single day had a &ldquo;this
              isn&rsquo;t working&rdquo; moment. Day 2&rsquo;s was the
              zero-match. Day 3&rsquo;s was a test failing because the date
              math was off by one day: weekends don&rsquo;t post the same way
              weekdays do, and I hadn&rsquo;t thought about that. Day
              4&rsquo;s was the PATH issue. Day 5&rsquo;s was{" "}
              <span className={code}>ModuleNotFoundError</span> for the{" "}
              <span className={code}>reconcile</span> package because the temp
              files were being read incorrectly.
            </p>
            <p className={para}>
              Every day, something didn&rsquo;t work on the first try.
            </p>
            <p className={para}>
              The reason I finished anyway: each of those moments was a
              specific error message pointing at a specific line. None of
              them were &ldquo;I don&rsquo;t know where to start.&rdquo; They
              were all &ldquo;this one thing is wrong.&rdquo; And each one was
              fixable in under 20 minutes once I stopped trying variations of
              the same command and actually read what the error was saying.
            </p>

            <h2 className={head}>What&rsquo;s still not done, and why</h2>
            <p className={para}>
              Things I deliberately cut because they weren&rsquo;t part of the
              finish line:
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    No support for Xero or QuickBooks exports.
                  </strong>{" "}
                  Only the two CSV formats in the README.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>No CLI flags for tolerances.</strong>{" "}
                  Change <span className={code}>FuzzyMatchConfig</span> in code
                  if you need different tolerances.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>No JSON output.</strong> Text
                  only.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    No CI test for the <span className={code}>pip install</span>
                    ed command.
                  </strong>{" "}
                  Works locally; not tested on CI.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    No partial refunds, chargebacks, or multi-currency
                    settlement.
                  </strong>
                </span>
              </li>
            </ul>
            <p className={para}>
              Each one is in the README&rsquo;s &ldquo;Limitations&rdquo;
              section. The point of that section isn&rsquo;t to apologize,
              it&rsquo;s to make the boundary visible. Anyone using the tool
              knows exactly what it does and doesn&rsquo;t do.
            </p>

            <h2 className={head}>What I&rsquo;d do differently</h2>
            <p className={para}>One thing. I&rsquo;d write the fixture files before the matcher.</p>
            <p className={para}>
              I wrote <span className={code}>models.py</span> first, then the
              matcher, then the fixtures. Then on Day 2 I discovered the
              fixtures needed a specific format the matcher didn&rsquo;t
              expect. If the fixtures had come first, they&rsquo;d have shown
              me the reference-extraction problem before I wrote code that
              assumed it away. The matcher would have been written correctly
              on the first try.
            </p>
            <p className={para}>
              The rule I&rsquo;ll carry forward: write the test data before
              the code that uses it. The data tells you what the code needs to
              handle, and it&rsquo;s cheaper to change the data than to change
              the code.
            </p>

            <h2 className={head}>If you&rsquo;re doing this in Excel right now</h2>
            <p className={para}>
              Everything above is about a specific 12-hour project. The part
              that matters to you is whether Excel is the right tool for your
              situation.
            </p>
            <p className={para}>
              The honest answer:{" "}
              <strong className={strong}>
                for fewer than 20 transactions a month with fewer than 3
                clients, Excel is fine.
              </strong>{" "}
              The manual process takes 20 minutes and the discrepancies are
              rare enough that a tool is not the bottleneck.
            </p>
            <p className={para}>
              <strong className={strong}>
                For 20+ transactions a month with 3+ clients, no bookkeeper,
                and no spreadsheet discipline, Excel is losing money for you.
              </strong>{" "}
              Not visibly. Not in a way you can point to a line and say
              &ldquo;that&rsquo;s what Excel cost me.&rdquo; But every
              ₦15,000 missed payment that goes uncaught is real, and the same
              missed payment every month for a year is ₦180,000 that went to
              a bank&rsquo;s reconciliation queue and never came back.
            </p>
            <p className={para}>
              You can{" "}
              <a
                href="https://reconcile-demo.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                try the tool in the browser
              </a>{" "}
              without installing anything. Upload any two CSVs and see what it
              does. If it doesn&rsquo;t help, you&rsquo;ve lost nothing. If it
              does, the source is at{" "}
              <a
                href="https://github.com/Agenda-X-PR/reconcile"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                github.com/Agenda-X-PR/reconcile
              </a>{" "}
              and you can run it locally.
            </p>
            <p className={para}>
              Either way, you now know why your Excel is lying to you.
            </p>
          </article>

          <div className="mt-8 flex flex-wrap gap-3 border-t-2 border-ink pt-6">
            <PressLink to="/blog" variant="ghost">
              Back to all posts
            </PressLink>
            <PressLink to="/contact" variant="ghost">
              Reach me
            </PressLink>
          </div>
        </Window>
      </div>
    </div>
  )
}
