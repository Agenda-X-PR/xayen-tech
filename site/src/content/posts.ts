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
