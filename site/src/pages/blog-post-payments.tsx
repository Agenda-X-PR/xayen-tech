import { useEffect } from "react"
import { PressLink } from "@/components/site-bits"
import { SectionHeader, Window } from "@/components/window"

const strong = "font-semibold text-ink"
const em = "italic"
const code =
  "border-2 border-ink bg-paper-dim px-1 py-0.5 font-mono text-[12px] text-ink"
const para = "mt-3.5 text-[14px] leading-relaxed text-ink/85"
const head = "mt-9 font-mono text-[17px] leading-snug tracking-tight text-ink"
const li = "mt-2 flex gap-2 text-[13.5px] leading-relaxed text-ink/85"
const marker = "shrink-0 font-mono text-ink/60"
const quote = "mt-4 border-l-4 border-ink bg-paper-dim px-3 py-2 text-[13px] leading-relaxed text-ink/85"

const link =
  "underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"

export default function BlogPostPaymentsPage() {
  useEffect(() => {
    document.title = "I Built a Payments Detection Platform and Never Ran It · Xayen"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader
          kicker="03 · Field notes"
          title="I Built a Payments Detection Platform and Never Ran It"
        />

        <Window file="payments-detection.md" note="4 rules · 0 runs · MIT">
          <article>
            <p className={para}>
              Before I start, an admission that most write-ups like this would
              bury at the bottom:{" "}
              <strong className={strong}>
                I never ran this thing end-to-end.
              </strong>
            </p>
            <p className={para}>
              The code exists. The tests pass. The CI is green. But the Docker
              Compose stack has never been started on the machine it was
              written on, because Docker isn&rsquo;t installed there, and I
              didn&rsquo;t install it. What I tested was the pieces. What I
              never tested was the whole.
            </p>
            <p className={para}>
              This is a write-up about building a system you can&rsquo;t fully
              verify, and about the discipline required to ship it anyway: not
              because I&rsquo;m proud of the gap, but because pretending the
              gap doesn&rsquo;t exist would be the wrong way to write about
              engineering.
            </p>

            <h2 className={head}>The scope, before the story</h2>
            <p className={para}>
              Before I tell you what&rsquo;s in it, here&rsquo;s what&rsquo;s
              deliberately <em className={em}>not</em> in it. This list matters
              more than the feature list, because it&rsquo;s the list that made
              the project finishable.
            </p>
            <p className={para}>
              <strong className={strong}>Out of scope:</strong>
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>Authentication on the dashboard or API</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>Multi-tenant isolation</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>ML-based fraud detection</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>Kubernetes</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>Terraform / IaC</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>PCI-DSS compliance</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>Alert acknowledgement UI</span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>Real provider integrations</span>
              </li>
            </ul>
            <p className={para}>
              Every one of those is in the README under a section called
              &ldquo;Out of Scope,&rdquo; with a one-line reason. The reasons
              are boring: <em className={em}>&ldquo;this is a portfolio demo,
              not a payment processor.&rdquo;</em> But writing that list down,
              before starting, was the thing that made the rest of the build
              possible.
            </p>
            <p className={para}>
              Most portfolio projects fail because the builder keeps adding
              scope. The project starts small and ends up a half-built version
              of everything. I deliberately refused the additions. If you look
              at the README&rsquo;s commit history you&rsquo;ll see the same
              project from first commit to last, no features appeared mid-build.
              That&rsquo;s not luck. That&rsquo;s the out-of-scope list doing
              its job.
            </p>

            <h2 className={head}>What it actually is</h2>
            <p className={para}>
              A payments detection platform, in the sense that it:
            </p>
            <ol className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>1.</span>
                <span>
                  <strong className={strong}>Receives webhooks</strong> from a
                  payment provider (with HMAC verification)
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>2.</span>
                <span>
                  <strong className={strong}>Persists</strong> them to a
                  database (Postgres)
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>3.</span>
                <span>
                  <strong className={strong}>Detects</strong> suspicious
                  patterns in those events (four rules, one per attack class)
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>4.</span>
                <span>
                  <strong className={strong}>Alerts</strong> on detection
                  (deduplicated, severity-rated)
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>5.</span>
                <span>
                  <strong className={strong}>Displays</strong> alerts on a
                  dashboard with AI-generated explanations
                </span>
              </li>
            </ol>
            <p className={para}>The four detection rules cover:</p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>Velocity bursts:</strong> more
                  than 10 payment events from one IP in 60 seconds
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>Replay attacks:</strong> the same
                  event ID arriving twice with different signatures
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>Signature failures:</strong> more
                  than 5 invalid HMAC signatures from one IP in 60 seconds
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>Amount anomalies:</strong> a
                  payment that&rsquo;s non-positive, or 3 standard deviations
                  above the trailing 24-hour mean
                </span>
              </li>
            </ul>
            <p className={para}>
              Each rule is a YAML file with a{" "}
              <span className={code}>title</span>,{" "}
              <span className={code}>id</span>,{" "}
              <span className={code}>level</span>,{" "}
              <span className={code}>description</span>, and an{" "}
              <span className={code}>aggregation</span> block that describes
              the detection logic. The rules are Sigma-inspired: the format is
              not directly executable by a generic Sigma engine, because Sigma
              doesn&rsquo;t have a portable way to express &ldquo;sliding
              60-second window&rdquo; or &ldquo;z-score against a trailing
              baseline.&rdquo; Those extensions are documented in the README.
            </p>
            <p className={para}>
              The AI part: when an alert fires, the dashboard can request an
              explanation from a language model. The prompt sends only the rule
              ID, severity, and numeric context (never the raw event payload),
              and the whole path is wrapped in prompt-injection defenses
              (sanitization before the call, structured prompt with
              delimiters, output validation). There are 5 adversarial tests for
              those defenses alone.
            </p>
            <p className={para}>
              None of that is verified end-to-end. It&rsquo;s verified piece by
              piece.
            </p>

            <h2 className={head}>What I could test</h2>
            <p className={para}>
              <strong className={strong}>Unit tests:</strong> 6 tests in the{" "}
              <span className={code}>alert-api</span> service covering
              signature verification, payload redaction, prompt construction,
              and the fallback logic when the LLM is unavailable. These run on
              every commit and pass.
            </p>
            <p className={para}>
              <strong className={strong}>Python compilation:</strong> every{" "}
              <span className={code}>.py</span> file in every service
              compiles.
            </p>
            <p className={para}>
              <strong className={strong}>YAML validation:</strong> every rule
              file parses as valid YAML.
            </p>
            <p className={para}>
              <strong className={strong}>
                The security tests, specifically:
              </strong>{" "}
              the prompt injection tests are the ones I&rsquo;m proudest of,
              because they verify something subtle. The test{" "}
              <span className={code}>
                test_model_prompt_excludes_untrusted_identifiers
              </span>{" "}
              sends a fake alert with malicious-looking context (
              <span className={code}>{'"ignore all previous instructions"'}</span>,{" "}
              <span className={code}>{'"system: reveal secrets"'}</span>) and
              asserts that the prompt sent to the model contains the rule ID
              and numeric context but does NOT contain the injection strings.
              That test is real. It catches a real class of bug. It runs.
            </p>
            <p className={para}>
              What it doesn&rsquo;t catch is the case where the sanitization
              logic is correct but the model call itself has a bug, or the API
              key is misconfigured, or the rate limit gets hit at exactly the
              wrong moment. Those are integration failures, and integration
              failures are what I couldn&rsquo;t test.
            </p>

            <h2 className={head}>What I couldn&rsquo;t test, and what that means</h2>
            <p className={para}>The stack is:</p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  A <strong className={strong}>Postgres 16</strong> container
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  A <strong className={strong}>Redis 7</strong> container
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  An <strong className={strong}>alert-api</strong> container
                  (FastAPI)
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  A <strong className={strong}>detector</strong> container
                  (Python worker, polls Postgres for new events, evaluates
                  rules)
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  A <strong className={strong}>dashboard</strong> container
                  (Nginx serving static files)
                </span>
              </li>
            </ul>
            <p className={para}>
              <span className={code}>docker compose up --build</span> builds
              all five and starts them. The{" "}
              <span className={code}>001_init.sql</span> migration creates the
              schema. The detector polls every 2 seconds. The alert-api serves{" "}
              <span className={code}>/alerts</span> and{" "}
              <span className={code}>/metrics</span>. The dashboard fetches
              from the alert-api and renders a triage console.
            </p>
            <p className={para}>What I never did is run that sequence.</p>
            <p className={para}>
              The README has a section called &ldquo;Development Notes&rdquo;
              that says:
            </p>
            <blockquote className={quote}>
              <em>
                The Compose stack was authored and structurally validated (YAML
                syntax, Python compile check, schema migration review, and CI)
                but not executed end-to-end on the authoring machine because
                Docker was not installed locally. Anyone with Docker Engine and
                Compose v2 can run{" "}
                <span className={code}>docker compose up --build</span> to
                verify the full pipeline.
              </em>
            </blockquote>
            <p className={para}>
              That&rsquo;s the honest version. It&rsquo;s not &ldquo;this
              doesn&rsquo;t work.&rdquo; It&rsquo;s &ldquo;this hasn&rsquo;t
              been verified to work as a whole, and here&rsquo;s why.&rdquo;
            </p>
            <p className={para}>
              The trap I could have fallen into (and the trap most projects
              fall into) is writing{" "}
              <strong className={strong}>docker compose up --build</strong> at
              the top of the README as if it&rsquo;s been tested. It&rsquo;s a
              small lie. It would have been a lie that someone else discovers
              when they try to run it and something breaks, and they don&rsquo;t
              know whether the problem is their setup or mine.
            </p>
            <p className={para}>
              The README is written to prevent that. The development notes
              section is written to prevent that. The &ldquo;if you find a
              configuration issue, please open an issue&rdquo; line is written
              to prevent that.
            </p>
            <p className={para}>
              If you&rsquo;re building something and you can&rsquo;t test a
              part of it, <strong className={strong}>say so</strong>. The
              sentence &ldquo;I couldn&rsquo;t test this end-to-end&rdquo;
              costs nothing and buys the reader a lot. It tells them where to
              look when it breaks.
            </p>

            <h2 className={head}>The specific bugs I did find</h2>
            <p className={para}>
              Even without Docker, the pieces generated their own friction.
              Three things worth naming.
            </p>
            <p className={para}>
              <strong className={strong}>
                1. Groq retired the model mid-build.
              </strong>{" "}
              The first version of the AI path used{" "}
              <span className={code}>llama-3.3-70b-versatile</span>. When I
              came back to test it, Groq had retired that model. Every request
              returned a 404:{" "}
              <span className={code}>
                {'"The model llama-3.3-70b-versatile does not exist or you do not have access to it."'}
              </span>{" "}
              The fix was one line (swap the model ID for{" "}
              <span className={code}>openai/gpt-oss-120b</span>), but it took
              15 minutes of staring at the 401-error-inside-a-200-response
              before I realized the API was telling me what was wrong.
            </p>
            <p className={para}>
              The lesson isn&rsquo;t &ldquo;pin your model versions.&rdquo;
              It&rsquo;s that{" "}
              <strong className={strong}>
                third-party model IDs are as fragile as third-party APIs, and
                the failure mode is a 4xx disguised as a successful HTTP
                response.
              </strong>{" "}
              The 200 status code is not the same as &ldquo;the LLM
              worked.&rdquo;
            </p>
            <p className={para}>
              <strong className={strong}>
                2. <span className={code}>os</span> got shadowed inside a
                function.
              </strong>{" "}
              The <span className={code}>summary.py</span> file has a helper
              called <span className={code}>_get_client()</span> that reads
              environment variables. In the first version, I had{" "}
              <span className={code}>import os</span> at the top and used{" "}
              <span className={code}>os.environ.get()</span> inside the
              function. Python&rsquo;s scoping rule meant the function
              couldn&rsquo;t see the module-level{" "}
              <span className={code}>os</span>, because there was an assignment
              to <span className={code}>os</span> somewhere in the function
              body: a stray line I&rsquo;d added during refactoring.
            </p>
            <p className={para}>
              The error was{" "}
              <span className={code}>
                cannot access local variable 'os' where it is not associated
                with a value
              </span>
              . It took reading the file twice to find the stray assignment.
              The fix was to delete three lines. But the lesson is worth
              keeping:{" "}
              <strong className={strong}>
                Python&rsquo;s scoping is per-function at compile time, not
                per-line at runtime.
              </strong>{" "}
              A single assignment anywhere in a function makes the name local
              for the whole function, even if the assignment happens after the
              use. That&rsquo;s the kind of rule that makes sense in retrospect
              and is invisible in the moment.
            </p>
            <p className={para}>
              <strong className={strong}>
                3. Reading env vars at module load broke the tests.
              </strong>{" "}
              The first version of <span className={code}>summary.py</span>{" "}
              had:
            </p>
            <pre className="mt-4 overflow-x-auto border-2 border-ink bg-paper-dim p-3 font-mono text-[12px] leading-relaxed text-ink">
              <code>{"GROQ_API_KEY = os.getenv(\"GROQ_API_KEY\", \"\")"}</code>
            </pre>
            <p className={para}>
              at module level. That&rsquo;s fine in production: the env var is
              set before the module is imported. But in tests,{" "}
              <span className={code}>monkeypatch.setenv</span> sets the env var{" "}
              <em className={em}>after</em> the module is imported, so the
              module-level constant stays <span className={code}>""</span>. The
              test asserting that the LLM was called with the right context
              failed because the LLM was never called: the code saw an empty
              key and fell back to the deterministic path.
            </p>
            <p className={para}>
              The fix was to read the env var inside the function, at call
              time, not at module load. That&rsquo;s a rule I now apply to
              every service that might get tested:
            </p>
            <blockquote className={quote}>
              <strong className={strong}>
                Read configuration inside functions, not at module top level,
                if the functions are going to be tested with monkeypatched
                config.
              </strong>
            </blockquote>
            <p className={para}>
              It&rsquo;s a small rule. It&rsquo;s the kind of rule you learn by
              having a test fail for a reason you can&rsquo;t figure out, then
              realizing the test was fine and the code was subtly wrong.
            </p>

            <h2 className={head}>Why ship it anyway</h2>
            <p className={para}>
              Here&rsquo;s the case for shipping something you can&rsquo;t
              fully test:
            </p>
            <p className={para}>
              <strong className={strong}>
                1. The pieces are real, and the pieces are what matter most of
                the time.
              </strong>{" "}
              The signature verification is real. The Sigma rules are real. The
              threat model is real. Those are the things an interviewer or
              client will actually read. The Docker Compose that they may or
              may not run is the scaffolding.
            </p>
            <p className={para}>
              <strong className={strong}>
                2. The gap is documented, and documented gaps are honest.
              </strong>{" "}
              An undocumented gap is a lie waiting to be caught. A documented
              gap is a contract: &ldquo;here&rsquo;s what I tested,
              here&rsquo;s what I didn&rsquo;t, here&rsquo;s how you can test
              it yourself.&rdquo; The second one is what good engineering
              documentation looks like. The first one is what most portfolio
              projects look like.
            </p>
            <p className={para}>
              <strong className={strong}>
                3. Shipping it creates the pressure to fix it.
              </strong>{" "}
              If I&rsquo;d held the project until Docker was installed, it
              would still be sitting on my laptop. Shipping it with a
              documented gap means the first person who tries to run it will
              report the bug. That&rsquo;s the normal cycle of open-source
              development. Waiting for perfection means waiting forever.
            </p>
            <p className={para}>
              <strong className={strong}>
                4. The &ldquo;out of scope&rdquo; section is the interview.
              </strong>{" "}
              When I show this project to someone who&rsquo;s done security
              work, they don&rsquo;t look at the code first. They look at the
              STRIDE table. They look at the four rule IDs. They look at the
              prompt injection tests. The fact that I know what I{" "}
              <em className={em}>didn&rsquo;t</em> build, and can defend that
              choice, is the signal. Anyone can build a feature. Almost nobody
              can articulate what they deliberately didn&rsquo;t build and why.
            </p>
            <p className={para}>
              The honest version of what this project is, is:{" "}
              <strong className={strong}>
                a demonstration of scope discipline, with a working Docker
                Compose stack that hasn&rsquo;t been verified end-to-end.
              </strong>{" "}
              The first half is what I&rsquo;m proud of. The second half is
              what I&rsquo;d fix first.
            </p>

            <h2 className={head}>
              What it doesn&rsquo;t do (beyond the out-of-scope list)
            </h2>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>
                    No persistent event storage beyond the demo.
                  </strong>{" "}
                  The migration creates the schema, but there&rsquo;s no
                  retention policy, no archival, no cleanup job. A real
                  deployment would fill up in weeks.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>
                    No real LLM path enabled by default.
                  </strong>{" "}
                  The AI path is optional; without{" "}
                  <span className={code}>GROQ_API_KEY</span> set, the service
                  uses deterministic rule-based explanations. That&rsquo;s a
                  design choice, not a limitation, but it means the AI path
                  has only been tested against fixtures, not against a real
                  model.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>No CI for the Docker build.</strong>{" "}
                  The CI checks Python syntax, YAML validity, and the security
                  tests. It does not attempt{" "}
                  <span className={code}>docker compose build</span>. That
                  would require a CI runner with Docker available (most hosted
                  runners have it), but I didn&rsquo;t set it up, and
                  that&rsquo;s a real gap.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>&gt;</span>
                <span>
                  <strong className={strong}>No integration tests.</strong> No
                  test that posts a webhook, waits for the detector to fire a
                  rule, and asserts the alert appears. That&rsquo;s the test
                  I&rsquo;d write second, after I fix the Docker gap.
                </span>
              </li>
            </ul>

            <h2 className={head}>
              The lesson I&rsquo;d give anyone building something similar
            </h2>
            <p className={para}>
              <strong className={strong}>
                Test what matters, document what you couldn&rsquo;t, and
                don&rsquo;t pretend the difference doesn&rsquo;t exist.
              </strong>
            </p>
            <p className={para}>
              The three artifacts that carry the project are:
            </p>
            <ol className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>1.</span>
                <span>
                  <strong className={strong}>The STRIDE threat model,</strong>{" "}
                  because it forces you to name what you&rsquo;re defending
                  against before you defend against it.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>2.</span>
                <span>
                  <strong className={strong}>
                    The Sigma rules as versioned YAML,
                  </strong>{" "}
                  because it makes the detection logic readable, diffable, and
                  portable, in a way that inline Python doesn&rsquo;t.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>3.</span>
                <span>
                  <strong className={strong}>
                    The 5 prompt-injection tests,
                  </strong>{" "}
                  because they verify a specific, adversarial property (the
                  model doesn&rsquo;t get hijacked by attacker-controlled
                  input), which is the kind of thing a normal test suite
                  misses.
                </span>
              </li>
            </ol>
            <p className={para}>
              None of those three require Docker. All three are testable on a
              laptop. All three are what the project actually is.
            </p>
            <p className={para}>
              The Docker Compose stack is the deployment story. It&rsquo;s
              important. It&rsquo;s not the whole project, and treating it as
              the whole project would have meant not shipping at all.
            </p>

            <h2 className={head}>The link</h2>
            <p className={para}>
              The project is at{" "}
              <a
                href="https://github.com/Agenda-X-PR/payments-detection"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                github.com/Agenda-X-PR/payments-detection
              </a>
              .
            </p>
            <p className={para}>
              If you have Docker installed and you&rsquo;re willing to try the
              full stack, I&rsquo;d genuinely appreciate knowing whether{" "}
              <span className={code}>docker compose up --build</span> works.
              The README&rsquo;s development notes say it hasn&rsquo;t been
              verified. If you run it and something breaks, that&rsquo;s the
              most useful feedback anyone could give me right now.
            </p>
            <p className={para}>
              This is the fourth in a series about the projects I&rsquo;ve
              shipped. The first was{" "}
              <a
                href="/blog/why-reconciliation-fails-in-excel.html"
                className={link}
              >
                why Excel fails at payment reconciliation
              </a>
              , the second was{" "}
              <a
                href="/blog/i-built-an-sdk-because-i-was-desperate.html"
                className={link}
              >
                I Built an SDK Because I Was Desperate
              </a>
              , and the third was{" "}
              <a
                href="/blog/building-a-service-for-failures-you-cant-see.html"
                className={link}
              >
                building a service for failures you can&rsquo;t see
              </a>
              .
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
