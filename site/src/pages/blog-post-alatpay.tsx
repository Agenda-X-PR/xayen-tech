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

export default function BlogPostAlatpayPage() {
  useEffect(() => {
    document.title = "I Built an SDK Because I Was Desperate · Xayen"
  }, [])

  return (
    <div className="border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeader
          kicker="03 · Field notes"
          title="I Built an SDK Because I Was Desperate"
        />

        <Window file="alatpay-sdk.md" note="5 days to build · 0 naira earned · MIT">
          <article>
            <p className={para}>
              This is not a story about a great idea I had in the shower.
              It&rsquo;s a story about being hungry, tired, and slightly
              greedy, and deciding that the fastest path out of that was to
              build something for a bank.
            </p>
            <p className={para}>
              I&rsquo;m writing it down because most &ldquo;how I built
              X&rdquo; posts skip the embarrassing part. They start with
              &ldquo;I noticed a gap in the market&rdquo; and end with
              &ldquo;and then it was a huge success.&rdquo; That&rsquo;s not
              what happened here. What happened is: I was desperate, I built
              an SDK, it mostly broke, I fixed it, and then I wrote about it
              because that&rsquo;s how I process things.
            </p>
            <p className={para}>Here&rsquo;s the honest version.</p>

            <h2 className={head}>The foolish idea</h2>
            <p className={para}>
              I&rsquo;d been looking at ALATPay&rsquo;s developer
              documentation for a different reason: I wanted to integrate
              their payment gateway into something I was building. The docs
              were fine. The JavaScript SDK was fine. But there was no Java
              SDK.
            </p>
            <p className={para}>
              My first thought was the wrong one, and I want to be specific
              about why it was wrong.
            </p>
            <p className={para}>
              I thought:{" "}
              <strong className={strong}>
                &ldquo;If I build the Java SDK, maybe they&rsquo;ll pay
                me.&rdquo;
              </strong>
            </p>
            <p className={para}>
              Not &ldquo;maybe they&rsquo;ll hire me.&rdquo; Not &ldquo;maybe
              it&rsquo;ll be a good portfolio piece.&rdquo; I genuinely
              thought a bank would notice a random developer&rsquo;s
              unrequested open-source project and decide to compensate them
              for it. That is not how banks work. I knew that at the time, in
              the abstract. I chose not to know it in the specific, because I
              was hungry and tired and looking for something to be true that
              wasn&rsquo;t.
            </p>
            <p className={para}>
              The SDK took five days to build. The compensation has, so far,
              been zero naira. The portfolio piece has, so far, been worth
              more than I expected.
            </p>
            <p className={para}>
              If you&rsquo;re reading this because you&rsquo;re thinking about
              building something for a company hoping they&rsquo;ll pay you
              for it: <strong className={strong}>don&rsquo;t do that.</strong>{" "}
              Build it because you need it, or because it&rsquo;s a portfolio
              piece, or because you want to learn the API. But don&rsquo;t
              build it for the money. The money is not coming.
            </p>

            <h2 className={head}>What &ldquo;everything broke&rdquo; actually means</h2>
            <p className={para}>
              I want to describe this carefully because &ldquo;everything
              broke&rdquo; is what I told a friend at the time, and
              it&rsquo;s accurate but not useful.
            </p>
            <p className={para}>
              What actually happened is:{" "}
              <strong className={strong}>
                everything broke at a specific moment, and then one thing at a
                time after that.
              </strong>
            </p>
            <p className={para}>
              The first version didn&rsquo;t work at all. The authentication
              was wrong. ALATPay uses three headers:{" "}
              <span className={code}>Authorization</span>,{" "}
              <span className={code}>Business-Id</span>, and{" "}
              <span className={code}>Ocp-Apim-Subscription-Key</span>, and I
              was sending two of them. The third one,{" "}
              <span className={code}>Ocp-Apim-Subscription-Key</span>, is an
              Azure API Management convention that I hadn&rsquo;t encountered
              before. I sent it under the wrong name, or not at all, depending
              on the hour of the night.
            </p>
            <p className={para}>
              I got 401s for a full day. Every 401 response told me the same
              thing, &ldquo;invalid subscription key&rdquo;, and every time I
              read it, I thought &ldquo;that can&rsquo;t be right, I put the
              key in.&rdquo; I read it as a bug in their system, not a bug in
              my code. It was a bug in my code.
            </p>
            <p className={para}>
              The second version authenticated correctly but couldn&rsquo;t
              parse the response. The list of transactions in ALATPay&rsquo;s
              response has more fields than I&rsquo;d modelled. My Jackson
              classes were missing <span className={code}>feeAmount</span> and{" "}
              <span className={code}>settlementId</span> and a dozen other
              things. Jackson doesn&rsquo;t crash when it sees unknown fields
              by default, it ignores them, but it does crash when it sees a
              field it <em className={em}>thinks</em> it knows, with a type
              that doesn&rsquo;t match. Which was happening, because I&rsquo;d
              guessed at the types.
            </p>
            <p className={para}>The third version worked. Then the tests failed.</p>
            <p className={para}>
              This is the part that took longest, and it&rsquo;s the part I
              want to talk about because it&rsquo;s not in any tutorial.
            </p>

            <h2 className={head}>The test problem nobody warns you about</h2>
            <p className={para}>
              When you&rsquo;re building an SDK, you can&rsquo;t test it
              against the real API. Not comfortably. Every test call costs you
              a real request against a real merchant account, and if
              you&rsquo;re testing in production you&rsquo;re going to trip
              rate limits and log a lot of nonsense in someone&rsquo;s audit
              trail.
            </p>
            <p className={para}>
              So you use a fake server. In Java, that&rsquo;s usually{" "}
              <span className={code}>MockWebServer</span>. It spins up a local
              HTTP server that you can tell to respond with whatever you want.
            </p>
            <p className={para}>
              The problem I hit is that{" "}
              <strong className={strong}>
                MockWebServer is a different server from ALATPay.
              </strong>{" "}
              It doesn&rsquo;t authenticate, it doesn&rsquo;t rate-limit, it
              doesn&rsquo;t have a schema. You tell it what to respond, and it
              responds. That&rsquo;s the whole point. But it means that a test
              that passes against MockWebServer can still fail against
              ALATPay, because the test is verifying my{" "}
              <em className={em}>assumptions</em> about ALATPay, not ALATPay.
            </p>
            <p className={para}>
              The first test I wrote checked that my SDK could fetch a list of
              transactions. It passed. Then I ran the same code against the
              real API and got a 404. My test had been testing whether Jackson
              could parse a JSON string I&rsquo;d written, not whether my SDK
              could talk to a real server. Which is a real thing to test, but
              it&rsquo;s not the thing I thought I was testing.
            </p>
            <p className={para}>
              The fix was to be honest about what the tests verify. The README
              now says:{" "}
              <em className={em}>
                All tests use MockWebServer: no real API credentials required
                to run them.
              </em>{" "}
              Which is true. It&rsquo;s not the same as &ldquo;the SDK works
              against ALATPay&rdquo; and I learned not to imply that it was.
            </p>

            <h2 className={head}>
              The five days between &ldquo;shipped&rdquo; and &ldquo;actually
              shipped&rdquo;
            </h2>
            <p className={para}>The commit history tells this part better than I can.</p>
            <p className={para}>
              My initial commit was on October 11th. Then, five days later, on
              October 16th, the last commit message is:{" "}
              <em className={em}>URL-encode user input in query and path
              segments.</em>
            </p>
            <p className={para}>
              That&rsquo;s the whole story of the intermediate five days. I
              shipped. I told myself it was done. Then I kept finding things.
            </p>
            <p className={para}>
              The URL-encoding thing is a good example because it&rsquo;s the
              kind of bug that doesn&rsquo;t show up in testing. If you pass a
              transaction ID with a space in it (or a slash, or an
              ampersand), the URL is malformed and the server returns
              nonsense. My tests used IDs that were safe. Real transaction IDs
              are not always safe. Five days later I noticed and fixed it.
            </p>
            <p className={para}>
              There&rsquo;s a version of this story where I say
              &ldquo;I shipped the SDK in one weekend, here&rsquo;s the
              link.&rdquo; That version is true in the sense that the repo
              existed after the weekend. It&rsquo;s not true in the sense that
              the SDK was finished, because the SDK wasn&rsquo;t finished. It
              was <em className={em}>started</em>, and it kept being started
              for five more days.
            </p>
            <p className={para}>
              I think the &ldquo;shipped in a weekend&rdquo; framing is a lie
              that hurts the people who read it. It makes them feel bad about
              the fact that their project is still breaking after a week.
              Their project is supposed to be still breaking after a week.
              Yours was too.
            </p>

            <h2 className={head}>What the SDK actually doesn&rsquo;t do</h2>
            <p className={para}>
              The README is honest about this, and I want to be honest about
              it here too:
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>Bank transfer is stubbed.</strong>{" "}
                  The endpoint for generating virtual accounts isn&rsquo;t in
                  the public API documentation, so my{" "}
                  <span className={code}>BankTransferService</span> throws{" "}
                  <span className={code}>UnsupportedOperationException</span>{" "}
                  and tells you to check the docs. It&rsquo;s a placeholder.
                  It doesn&rsquo;t work.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    USSD and static wallets are &ldquo;planned.&rdquo;
                  </strong>{" "}
                  Planned means not built. I have notes on what they&rsquo;d
                  look like. I haven&rsquo;t written them.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    The SDK isn&rsquo;t on Maven Central.
                  </strong>{" "}
                  You can&rsquo;t add it as a dependency yet. You have to clone
                  it and build it locally. That&rsquo;s a real friction point,
                  and I haven&rsquo;t paid the cost of getting a publishing
                  account set up.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>You need your own credentials.</strong>{" "}
                  The SDK doesn&rsquo;t come with test keys, and it
                  doesn&rsquo;t have a demo mode. To run it against anything,
                  you need a merchant account with ALATPay, three credentials
                  from their dashboard, and the patience to get them. Without
                  those, the SDK is a very well-documented way to throw{" "}
                  <span className={code}>AlatPayAuthException</span>.
                </span>
              </li>
            </ul>
            <p className={para}>
              That last point is the one that limits the SDK most in practice,
              and it&rsquo;s the one I&rsquo;d change first if I were doing it
              again. A version of this with a sandbox credential flow (or with
              a mock mode that returns fixture data without touching the
              network) would be more useful than the version I shipped.
            </p>
            <p className={para}>
              I didn&rsquo;t build that because I didn&rsquo;t know how to.
              That&rsquo;s the honest reason. Not &ldquo;I chose not to
              because of scope.&rdquo; I didn&rsquo;t know how.
            </p>

            <h2 className={head}>What it was actually worth</h2>
            <p className={para}>
              The SDK has, at this point, been read by fewer than a hundred
              people. It has, as far as I know, zero users. Nobody has opened
              a pull request. Nobody has sent me an issue.
            </p>
            <p className={para}>
              By the metrics that matter to a venture capitalist, it&rsquo;s a
              failure.
            </p>
            <p className={para}>
              By the metrics that matter to me, it&rsquo;s not, because of
              three things that happened after I built it:
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    I learned what an SDK actually is.
                  </strong>{" "}
                  Not &ldquo;a wrapper around an API&rdquo; in the abstract,
                  but the specific mechanics: a client object, a config
                  object, typed exceptions, a shared HTTP layer, tests that
                  mock the server. I can read any other SDK now and understand
                  what it&rsquo;s doing, because I built one.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    I learned how banks think about security.
                  </strong>{" "}
                  The three-header scheme on ALATPay isn&rsquo;t decorative.
                  It&rsquo;s a specific model of what can go wrong and
                  who&rsquo;s responsible for what. Building a client for it
                  meant I had to understand it, and understanding it taught me
                  more about payments infrastructure than reading a blog post
                  would have.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    I got a piece of code I can point at.
                  </strong>{" "}
                  When I talk to people about what I do now, when I say I
                  build SDKs, I have a URL. That URL is a thing I made, and it
                  exists, and it has tests, and it has a license, and somebody
                  can clone it and run it. That&rsquo;s worth more than the
                  compensation I was imagining when I started.
                </span>
              </li>
            </ul>
            <p className={para}>
              The compensation did not arrive. The thing I actually got was
              better.
            </p>

            <h2 className={head}>If you&rsquo;re going to build one anyway</h2>
            <p className={para}>
              Build it for yourself, or for the portfolio, or because you want
              to learn the API. Not because you&rsquo;re hoping a company will
              notice.
            </p>
            <p className={para}>
              Here are the four things I&rsquo;d tell anyone building their
              first SDK:
            </p>
            <ul className="mt-2">
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    Get the auth headers right on day one.
                  </strong>{" "}
                  Before you build anything else, build a single request that
                  authenticates correctly. If the API has three headers, test
                  all three before you write the client. The 401 loop I spent
                  a day in is the most avoidable part of this entire story.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    Model the response types conservatively.
                  </strong>{" "}
                  Use <span className={code}>@JsonIgnoreProperties(ignoreUnknown = true)</span>{" "}
                  on every response class. Don&rsquo;t guess at field types.
                  Test against a real response before you decide a field is a{" "}
                  <span className={code}>long</span> instead of a{" "}
                  <span className={code}>String</span>.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    Be honest about what your tests test.
                  </strong>{" "}
                  MockWebServer is for verifying your own logic, not the
                  remote server. Say that in the README.
                </span>
              </li>
              <li className={li}>
                <span aria-hidden="true" className={marker}>
                  &gt;
                </span>
                <span>
                  <strong className={strong}>
                    Ship it before it&rsquo;s done, and then keep shipping it.
                  </strong>{" "}
                  The five-day gap between my first commit and my last is the
                  realistic version. Nobody builds a working SDK in a weekend.
                  If you tell yourself you have to, you&rsquo;ll never start.
                </span>
              </li>
            </ul>

            <h2 className={head}>The link</h2>
            <p className={para}>
              The SDK is at{" "}
              <a
                href="https://github.com/Agenda-X-PR/alatpay-java-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                github.com/Agenda-X-PR/alatpay-java-sdk
              </a>
              . It&rsquo;s MIT licensed. It works for transaction listing,
              single transaction lookup, and settlements. It doesn&rsquo;t
              work for bank transfers yet, because ALATPay hasn&rsquo;t
              published the endpoint, and I&rsquo;m not going to pretend I can
              guess at it.
            </p>
            <p className={para}>
              If you&rsquo;re a Java developer integrating ALATPay, use it. If
              it saves you the 401 loop I spent a day in, it&rsquo;s done its
              job.
            </p>
            <p className={para}>
              If you&rsquo;re a developer thinking about building something
              for a company hoping they&rsquo;ll pay you: read the first
              section of this post again, and then don&rsquo;t do that.
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
