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
    slug: "reconcile",
    file: "reconcile.md",
    date: "November 3, 2026",
    title: "The Reconciliation Tool I Almost Didn't Finish",
    teaser:
      "Twelve hours across five nights: a Python CLI matching processor exports against bank statements, born of a ₦0.02 discrepancy at 11pm. Floats lie. Decimal does not.",
    href: "/blog/reconcile",
  },
]
