export interface Post {
  slug: string
  file: string
  date: string
  title: string
  teaser: string
  href: string
}

/**
 * Publishing a post: add a Post object to the array. The blog page
 * renders them newest first as retro windows; the ghost rows walk down
 * the pile automatically as posts land.
 */
export const posts: Post[] = [
  {
    slug: "payments-detection",
    file: "payments-detection.md",
    date: "November 4, 2026",
    title: "I Built a Payments Detection Platform and Never Ran It",
    teaser:
      "Six tests, four rules, five containers, zero end-to-end runs. STRIDE, Sigma-inspired YAML and prompt-injection defenses, all tested piece by piece, with the Docker gap documented in the README instead of hidden.",
    href: "/blog/i-built-a-payments-detection-platform-and-never-ran-it.html",
  },
  {
    slug: "webhook-relay",
    file: "webhook-relay.md",
    date: "November 4, 2026",
    title: "Building a Service for Failures You Can't See",
    teaser:
      "Built entirely around failures that don't announce themselves: store first, dedupe on (provider, event_id), verify HMAC signatures in constant time. 28 tests, zero users, and two weeks of red CI for a one-line fix.",
    href: "/blog/building-a-service-for-failures-you-cant-see.html",
  },
  {
    slug: "alatpay-sdk",
    file: "alatpay-sdk.md",
    date: "November 3, 2026",
    title: "I Built an SDK Because I Was Desperate",
    teaser:
      "5 days to build, 0 naira earned. A Java SDK for ALATPay built out of hunger and a slightly greedy idea: wrong auth headers, tests that lied, and what the work was actually worth.",
    href: "/blog/i-built-an-sdk-because-i-was-desperate.html",
  },
  {
    slug: "reconcile",
    file: "reconcile.md",
    date: "November 3, 2026",
    title: "The Reconciliation Tool I Almost Didn't Finish",
    teaser:
      "Twelve hours across five nights: a Python CLI matching processor exports against bank statements, born of a ₦0.02 discrepancy at 11pm. Floats lie. Decimal does not.",
    href: "/blog/why-reconciliation-fails-in-excel.html",
  },
]
