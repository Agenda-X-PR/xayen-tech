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
export const posts: Post[] = []
