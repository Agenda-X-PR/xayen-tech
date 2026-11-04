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

const link =
  "underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"

export default function BlogPostRelayPage() {
  useEffect(() => {
    document.title = "Building a Service for Failures You Can't See · Xayen"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader
          kicker="03 · Field notes"
          title="Building a Service for Failures You Can&rsquo;t See"
        />

        <Window file="webhook-relay.md" note="28 tests · 0 users · MIT">
          <article>
            <p className={para}>
              ALATPay, my first SDK, was about getting a thing to work. The
              feedback loop was tight: call the API, get a 401 or a 200, fix
              the code, try again. Every failure announced itself.
            </p>
            <p className={para}>
              Webhook Relay was the opposite. It&rsquo;s a service built
              entirely around failures that don&rsquo;t announce themselves. A
              webhook that was sent and didn&rsquo;t arrive leaves no trace on
              either side. A webhook that arrived twice looks identical to one
              that arrived once. A webhook with a forged signature looks
              identical to a legitimate one if you don&rsquo;t verify.
            </p>
            <p className={para}>
              Building for invisible failures is a different kind of
              engineering than building for visible ones. This is what I
              learned doing it.
            </p>

            <h2 className={head}>
              The problem nobody thinks about until money goes missing
            </h2>
            <p className={para}>
              If you accept payments (via Paystack, ALATPay, Flutterwave,
              anything), you eventually have to handle webhooks. A webhook is
              a message the payment provider sends to your server saying
              &ldquo;someone paid.&rdquo; Your server receives it and marks
              the order as paid.
            </p>
            <p className={para}>
              The first version of this is trivial. You write an endpoint, you
              receive JSON, you do something with it. It works in testing and
              for the first week.
            </p>
            <p className={para}>Then the failure modes start.</p>
            <p className={para}>
              <strong className={strong}>
                The server was down when the webhook was sent.
              </strong>{" "}
              The provider tried, failed, retried three times, gave up. The
              customer paid. Your server never knew. The order sits
              unfulfilled.
            </p>
            <p className={para}>
              <strong className={strong}>
                The same webhook arrived twice.
              </strong>{" "}
              The provider didn&rsquo;t get your 200 response in time (network
              blip, or your server was slow), so it retried. Now you&rsquo;ve
              marked the order as paid twice, sent the customer two
              confirmation emails, and possibly refunded them once by
              accident.
            </p>
            <p className={para}>
              <strong className={strong}>Someone sent a fake webhook.</strong>{" "}
              There&rsquo;s a URL on your site that says &ldquo;hit this to
              mark an order as paid.&rdquo; It has no authentication. Anyone
              who knows the pattern can hit it for any order ID and get free
              stuff.
            </p>
            <p className={para}>
              <strong className={strong}>
                The webhook arrived, your server crashed processing it, and
                nothing happened.
              </strong>{" "}
              No error message, no retry, no record. The webhook is gone. The
              customer&rsquo;s money is somewhere in a bank&rsquo;s clearing
              system.
            </p>
            <p className={para}>
              None of these announce themselves. The customer&rsquo;s payment
              went through. From the customer&rsquo;s side, everything worked.
              From your side, it didn&rsquo;t, but you don&rsquo;t know that
              until they call you and ask why they didn&rsquo;t get their
              thing.
            </p>
            <p className={para}>
              Webhook Relay exists to make these failures visible and
              recoverable. Which means every design decision in it is about a
              failure mode that, without the design, would be silent.
            </p>

            <h2 className={head}>The three decisions that shaped everything</h2>
            <p className={para}>
              <strong className={strong}>
                Decision 1: store the webhook before doing anything with it.
              </strong>
            </p>
            <p className={para}>
              The naive version is: receive webhook, process webhook, return
              200. That&rsquo;s what most tutorials show. It&rsquo;s also the
              version that loses money.
            </p>
            <p className={para}>
              The version I built stores the webhook first, returns 200
              immediately, and processes it in the background. The
              &ldquo;processing&rdquo; could fail; the storage couldn&rsquo;t.
              So even if processing fails, the webhook isn&rsquo;t lost:
              it&rsquo;s sitting in the database, waiting for a retry.
            </p>
            <p className={para}>
              This added about 200 lines of code (the worker, the retry queue,
              the status state machine) and it&rsquo;s the whole reason the
              service exists. The naive version would have been a five-file
              FastAPI app. This version has twelve.
            </p>
            <p className={para}>
              The question I had to answer for myself was:{" "}
              <strong className={strong}>
                &ldquo;If I had to choose between losing a webhook and
                processing a webhook twice, which would I choose?&rdquo;
              </strong>{" "}
              Processing it twice is annoying but fixable (see Decision 2).
              Losing it is not fixable: the customer paid and the money is
              gone from your records. So the storage-first design is the only
              correct choice, and it&rsquo;s the one that costs more code.
            </p>
            <p className={para}>
              <strong className={strong}>
                Decision 2: idempotency by (provider, event_id).
              </strong>
            </p>
            <p className={para}>
              If the same webhook arrives twice, I don&rsquo;t want to process
              it twice. So the service stores{" "}
              <span className={code}>(provider, event_id)</span> as a unique
              pair. The second attempt to insert that pair throws an{" "}
              <span className={code}>IntegrityError</span>, the request
              returns 202 with <span className={code}>{'"status": "duplicate"'}</span>,
              and the original processing continues untouched.
            </p>
            <p className={para}>
              The subtle part: this only works if the provider&rsquo;s{" "}
              <span className={code}>event_id</span> is actually unique per
              event. Most providers document this. Some don&rsquo;t guarantee
              it. If a provider reuses event IDs (rare but it happens), this
              design will reject a legitimate webhook as a duplicate, and
              you&rsquo;ve lost data in the opposite direction.
            </p>
            <p className={para}>
              I chose to trust the provider&rsquo;s event_id because every
              alternative is worse. Hashing the raw body works until two
              different events have identical payloads (very unlikely but
              possible). Hashing{" "}
              <span className={code}>(event_id, amount, timestamp)</span>{" "}
              works until a legitimate retry arrives with a slightly different
              timestamp. In the end you have to trust{" "}
              <em className={em}>something</em> the provider sends, and
              event_id is the thing they&rsquo;ve built the retry system
              around.
            </p>
            <p className={para}>
              <strong className={strong}>
                Decision 3: verify the signature on every request, using
                constant-time comparison.
              </strong>
            </p>
            <p className={para}>
              Every webhook must be signed. The provider uses a shared secret
              to compute an HMAC of the request body, sends it as a header,
              and your server recomputes the same HMAC and compares. If they
              match, the webhook is real. If they don&rsquo;t, it&rsquo;s
              either a forgery or a body that was tampered with in transit.
            </p>
            <p className={para}>
              The naive comparison is{" "}
              <span className={code}>if expected == provided</span>. That&rsquo;s
              wrong, and the reason it&rsquo;s wrong is one of those things
              that sounds paranoid until you see it exploited.
            </p>
            <p className={para}>
              <span className={code}>==</span> on strings short-circuits: it
              stops comparing at the first character that doesn&rsquo;t match.
              So if the attacker sends a signature where the first 31
              characters are correct and the 32nd is wrong,{" "}
              <span className={code}>==</span> takes measurably longer to
              return <span className={code}>false</span> than if the attacker
              had sent 32 wrong characters. By timing enough requests, they
              can learn the correct signature one character at a time.
            </p>
            <p className={para}>
              The fix is <span className={code}>hmac.compare_digest()</span>,
              which always takes the same amount of time regardless of where
              the comparison fails. It&rsquo;s one function, and it&rsquo;s
              the difference between a secure signature check and a very slow
              brute-force.
            </p>
            <p className={para}>
              I learned this from a blog post years before I needed it. This
              was the first time I actually needed it. That&rsquo;s how it
              works: you learn a thing in the abstract, and then a year later
              you discover the specific moment it applies.
            </p>

            <h2 className={head}>
              The test that failed for a week and the reason it was worth it
            </h2>
            <p className={para}>
              The signature verification has a test suite. About half of the
              28 tests in the project are signature tests: valid signature,
              wrong secret, tampered body, empty signature, wrong-length
              signature, timing comparison.
            </p>
            <p className={para}>
              The timing comparison test is the one I&rsquo;m proudest of, and
              it&rsquo;s the one that took longest to get right. It&rsquo;s
              not a test that checks a specific value: it&rsquo;s a test that
              checks the <em className={em}>shape</em> of the comparison. It
              verifies that the function doesn&rsquo;t leak information
              through timing, and testing for timing leaks is a different kind
              of testing than asserting <span className={code}>equals</span>.
            </p>
            <p className={para}>
              The version I first wrote compared the function&rsquo;s execution
              time against a threshold. If the comparison took less than X
              milliseconds, the test passed. That test passed on my laptop and
              failed on CI, because CI ran slower and the baseline was
              different. I spent three days convinced that the timing-attack
              protection was broken when the test was just wrong.
            </p>
            <p className={para}>
              The fix was to stop trying to measure milliseconds and start
              testing the property that actually matters:{" "}
              <strong className={strong}>
                the function returns the same result for the same input
                regardless of how much of the input is correct.
              </strong>{" "}
              That&rsquo;s testable without timing. You compare a correct
              signature against a partial signature and verify both return{" "}
              <span className={code}>False</span>, then verify a correct
              signature returns <span className={code}>True</span>. That&rsquo;s
              not proof of constant-time behavior, but it&rsquo;s proof that
              the function behaves the way the constant-time comparison does.
              And it&rsquo;s stable across CI runners with different speeds.
            </p>
            <p className={para}>
              The lesson:{" "}
              <strong className={strong}>
                tests that measure time are tests that fail for the wrong
                reason.
              </strong>{" "}
              You want tests that measure the property the timing protects
              against. Timing is an implementation detail; security is the
              property.
            </p>

            <h2 className={head}>The CI failure that almost wasn&rsquo;t</h2>
            <p className={para}>
              Two weeks after the first deploy, CI started failing on Python
              3.10. Python 3.11 and 3.12 passed. 3.10 failed at the{" "}
              <span className={code}>pip install</span> step.
            </p>
            <p className={para}>The error was:</p>
            <pre className="mt-4 overflow-x-auto border-2 border-ink bg-paper-dim p-3 font-mono text-[12px] leading-relaxed text-ink">
              <code>
                {
                  "ERROR: Could not find a version that satisfies the requirement\npydantic-settings==2.16.0"
                }
              </code>
            </pre>
            <p className={para}>
              The reason: <span className={code}>pydantic-settings</span>{" "}
              version 2.16.0 requires Python 3.11 or higher. My{" "}
              <span className={code}>requirements.txt</span> pinned that exact
              version. On Python 3.10, <span className={code}>pip</span>{" "}
              couldn&rsquo;t find a matching version, so it errored out before
              the tests even ran.
            </p>
            <p className={para}>
              I&rsquo;d had a matrix of Python 3.10, 3.11, 3.12 because
              &ldquo;supporting multiple versions is good.&rdquo; I
              hadn&rsquo;t thought about whether the{" "}
              <em className={em}>dependencies</em> supported multiple
              versions. They didn&rsquo;t, not all of them, not at the
              versions I&rsquo;d pinned.
            </p>
            <p className={para}>I had two options:</p>
            <ol className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  1.
                </span>
                <span>
                  Pin <span className={code}>pydantic-settings</span> to
                  2.15.0, which supports Python 3.10, and keep the
                  three-version matrix.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  2.
                </span>
                <span>
                  Drop Python 3.10 from the matrix, keep{" "}
                  <span className={code}>pydantic-settings</span> at 2.16.0,
                  and test on 3.11 and 3.12 only.
                </span>
              </li>
            </ol>
            <p className={para}>
              I chose option 2. Python 3.10 was released in 2021 and reaches
              end-of-life in October 2026. By the time you&rsquo;re reading
              this, it may already be EOL. Pinning an outdated dependency to
              keep testing on an outdated interpreter is technically more code
              coverage but less useful coverage: it tests a configuration
              nobody should be running.
            </p>
            <p className={para}>
              The lesson:{" "}
              <strong className={strong}>
                testing many versions is only useful if all of them are
                versions someone should actually use.
              </strong>{" "}
              A red CI badge for a version of Python that no longer gets
              security patches is worse than a green badge with a smaller
              matrix.
            </p>
            <p className={para}>
              The commit that fixed this is a one-line change to{" "}
              <span className={code}>requirements.txt</span> or a one-line
              change to <span className={code}>.github/workflows/ci.yml</span>,
              depending on which option you choose. Two weeks of red CI for a
              one-line fix, because I hadn&rsquo;t read the error closely
              enough: it said exactly what was wrong, and I spent a day not
              reading it.
            </p>

            <h2 className={head}>
              The bug I found because I couldn&rsquo;t see it working
            </h2>
            <p className={para}>
              Before deploying, I ran the tests locally and they all passed. I
              ran <span className={code}>uvicorn main:app --reload</span> and
              hit <span className={code}>/health</span>. It returned{" "}
              <span className={code}>{'{"status": "ok"}'}</span>. I deployed
              to Render, the deploy succeeded, and I stopped paying attention.
            </p>
            <p className={para}>
              Three days later, I hit <span className={code}>/health</span>{" "}
              again and it was down. Render&rsquo;s free tier had put the
              instance to sleep after 15 minutes of inactivity, and the first
              request after sleep took 30 seconds to wake it up. The 30-second
              wait had timed out in my browser, so the page looked broken.
            </p>
            <p className={para}>
              There was no bug. The service was working exactly as designed:
              it just wasn&rsquo;t designed for the free tier&rsquo;s sleep
              behavior. Adding a <span className={code}>wake up</span>{" "}
              endpoint, or scheduling a keepalive request every 10 minutes, or
              moving to a paid tier without sleeping, would each have solved a
              different version of the problem.
            </p>
            <p className={para}>
              I did none of those. I accepted that the first request after
              inactivity takes 30 seconds, and I wrote it into the README so a
              visitor doesn&rsquo;t think the service is broken. Then I moved
              on.
            </p>
            <p className={para}>
              The lesson isn&rsquo;t &ldquo;always keep your service
              warm.&rdquo; The lesson is:{" "}
              <strong className={strong}>
                &ldquo;the service is working&rdquo; and &ldquo;the service
                appears to be working&rdquo; are different things, and the gap
                between them is what &ldquo;production&rdquo; means.
              </strong>{" "}
              Every deploy that succeeds is a starting point, not a finish
              line. What happens the next time you look at it is the actual
              test.
            </p>

            <h2 className={head}>What it doesn&rsquo;t do</h2>
            <p className={para}>
              The README lists the limitations, and I&rsquo;ll list the most
              important ones here:
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    It stores every webhook as raw JSON.
                  </strong>{" "}
                  A high-volume merchant with 10,000 webhooks a day would fill
                  up the SQLite database in a week. Postgres would handle it;
                  I used SQLite because it was simpler. That&rsquo;s a real
                  limitation, and it&rsquo;s the first thing I&rsquo;d change
                  if this were going to handle real traffic.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    The retry logic has no circuit breaker.
                  </strong>{" "}
                  If a downstream processing endpoint is down, the worker will
                  retry every event, fail every retry, and exhaust its
                  attempts in a cascade. A circuit breaker would detect the
                  downstream failure and pause retries until it recovers. I
                  didn&rsquo;t build one. The retry logic retries faster than
                  the downstream recovers, which is the opposite of what a
                  good retry system should do.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    The HMAC secret is a single string per provider.
                  </strong>{" "}
                  Real systems need key rotation: the ability to accept old
                  and new signatures during a transition window. My service
                  accepts one secret. When the merchant rotates their key,
                  every in-flight webhook fails. The fix is obvious (accept a
                  list of valid keys, try each) but not built.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>There&rsquo;s no admin UI.</strong>{" "}
                  Events are inspected by querying the SQLite database
                  directly, or by hitting{" "}
                  <span className={code}>/webhooks/events</span>. For a demo,
                  that&rsquo;s fine. For a real service, it&rsquo;s not.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>No rate limiting.</strong> A
                  malicious actor can flood the endpoint with fake webhooks
                  and exhaust the retry queue. HMAC signatures protect against
                  forgery, but not against volume.
                </span>
              </li>
            </ul>
            <p className={para}>
              Each of those is a v2 feature that I could add. None of them
              makes the current version broken: the current version does what
              its README says it does. But each of them is a real difference
              between &ldquo;this works in a demo&rdquo; and &ldquo;you can
              point a payment provider at this.&rdquo;
            </p>

            <h2 className={head}>What it was worth</h2>
            <p className={para}>
              Webhook Relay is, so far, the most &ldquo;real&rdquo; service
              I&rsquo;ve built. It&rsquo;s the one that looks the most like
              something a company would actually use, because the problem it
              solves (losing money to invisible webhook failures) is a problem
              that companies actually have.
            </p>
            <p className={para}>
              It has zero users. I&rsquo;ve never had a merchant deploy it.
              Nobody has opened an issue.
            </p>
            <p className={para}>
              The reason I think it&rsquo;s worth the effort anyway isn&rsquo;t
              the users. It&rsquo;s the fact that it&rsquo;s the first time I
              built something where the failure mode was the point of the
              software, not a side effect of it. Every design decision in the
              service was made in response to something that would otherwise
              be silent. That&rsquo;s a different mode of thinking than
              building something that does a visible thing, and it&rsquo;s the
              mode I want to be good at.
            </p>
            <p className={para}>
              The other thing it was worth: it&rsquo;s the project that taught
              me that &ldquo;reliability&rdquo; is not an adjective. It&rsquo;s
              a set of specific design decisions (store first, retry with
              backoff, deduplicate, verify signatures with constant-time
              comparison), each of which exists because someone, somewhere,
              lost money that didn&rsquo;t announce itself. Building the
              service is how I learned what those decisions are for.
            </p>

            <h2 className={head}>If you&rsquo;re building one</h2>
            <p className={para}>
              Four things I&rsquo;d tell anyone building their first webhook
              receiver:
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  1.
                </span>
                <span>
                  <strong className={strong}>
                    Store the webhook before doing anything with it.
                  </strong>{" "}
                  The processing can fail. The storage shouldn&rsquo;t. Once
                  the raw webhook is in a durable store, you can retry
                  processing as many times as you want without losing the
                  original message.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  2.
                </span>
                <span>
                  <strong className={strong}>
                    Return 200 immediately, then process in a worker.
                  </strong>{" "}
                  The provider doesn&rsquo;t care whether your processing
                  succeeded: they care whether you{" "}
                  <em className={em}>received</em> the webhook. Returning 200
                  tells them &ldquo;I got it, stop retrying.&rdquo; Processing
                  can take as long as it needs.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  3.
                </span>
                <span>
                  <strong className={strong}>
                    Use constant-time comparison for signature verification.
                  </strong>{" "}
                  <span className={code}>hmac.compare_digest()</span>, not{" "}
                  <span className={code}>==</span>. The difference is
                  invisible in testing and material in security.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  4.
                </span>
                <span>
                  <strong className={strong}>
                    Test the property, not the implementation.
                  </strong>{" "}
                  Tests that measure milliseconds fail on slow CI. Tests that
                  check &ldquo;the function returns the correct boolean for
                  every input shape&rdquo; work anywhere. Test what the code
                  guarantees, not what it happens to do on your laptop.
                </span>
              </li>
            </ul>

            <h2 className={head}>The link</h2>
            <p className={para}>
              Webhook Relay is at{" "}
              <a
                href="https://github.com/Agenda-X-PR/webhook-relay"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                github.com/Agenda-X-PR/webhook-relay
              </a>
              , with a live demo at{" "}
              <a
                href="https://webhook-relay-xxvu.onrender.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                webhook-relay-xxvu.onrender.com/docs
              </a>
              . MIT licensed, 28 tests, CI on Python 3.11 to 3.13.
            </p>
            <p className={para}>
              If you&rsquo;re building a payment integration, the README is
              the actual guide. The article is the story of how the guide came
              to exist. Read whichever one is more useful to you.
            </p>
            <p className={para}>
              This is the third piece in a series about the projects I&rsquo;ve
              shipped. The first was{" "}
              <a
                href="/blog/why-reconciliation-fails-in-excel.html"
                className={link}
              >
                why Excel fails at payment reconciliation
              </a>
              . The second was{" "}
              <a
                href="/blog/i-built-an-sdk-because-i-was-desperate.html"
                className={link}
              >
                I Built an SDK Because I Was Desperate
              </a>
              . The fourth is about the payments detection platform:{" "}
              <a
                href="/blog/i-built-a-payments-detection-platform-and-never-ran-it.html"
                className={link}
              >
                I Built a Payments Detection Platform and Never Ran It
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
