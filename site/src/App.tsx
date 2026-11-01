import { Suspense, lazy, useEffect, type ComponentType } from "react"
import { FileDown, Globe } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { DesktopBar } from "@/components/desktop-bar"
import { useClock } from "@/hooks/use-clock"

/* Route-level code splitting: every page travels in its own chunk,
   so the entry bundle only carries the shell (bar, footer, router). */
const HomePage = lazy(() => import("@/pages/home"))
const ProjectsPage = lazy(() => import("@/pages/projects"))
const BlogPage = lazy(() => import("@/pages/blog"))
const AboutPage = lazy(() => import("@/pages/about"))
const ContactPage = lazy(() => import("@/pages/contact"))

/** Retro loading state: a small window with a dithered progress bar. */
function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="w-full max-w-xs border-2 border-ink bg-paper shadow-brutal-sm" role="status">
        <div className="titlebar">
          <span className="win-dot" aria-hidden="true" />
          <span className="win-dot" aria-hidden="true" />
          <span className="titlebar-name">loading panel…</span>
        </div>
        <div className="p-4">
          <div className="dither-strip h-3 w-full border-2 border-ink" />
          <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-ink/60 uppercase">
            swapping disk…
          </p>
        </div>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function SiteFooter() {
  const clock = useClock()
  return (
    <footer className="border-t-2 border-ink bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-mono text-[13px] uppercase tracking-[0.2em]">Xayen</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/75">
            Ekundayo Oyinkansola · security &amp; full stack
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-start gap-x-4 gap-y-2">
          {[
            { label: "GitHub", href: "https://github.com/Agenda-X-PR", aria: undefined, icon: GithubIcon },
            { label: "LinkedIn", href: "https://linkedin.com/in/xayen", aria: undefined, icon: LinkedinIcon },
            { label: "Agenda X", href: "https://agendax.com.ng", aria: undefined, icon: Globe },
            {
              label: "Résumé .docx",
              href: "/assets/Ekundayo-Oyinkansola-Resume-2026.docx",
              aria: "Résumé .docx: Word document download",
              icon: FileDown,
            },
          ].map((item) => {
            const Icon = item.icon as ComponentType<{ className?: string }>
            const isResume = item.label.startsWith("Résumé")
            return (
              <a
                key={item.label}
                href={item.href}
                download={isResume || undefined}
                target={item.href.startsWith("/") ? undefined : "_blank"}
                rel={item.href.startsWith("/") ? undefined : "noopener noreferrer"}
                aria-label={isResume ? item.aria : undefined}
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper hover:no-underline"
              >
                <Icon aria-hidden="true" className="size-3.5" />
                {item.label}
              </a>
            )
          })}
        </nav>
        <div className="flex items-start justify-between gap-4 md:justify-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/75">
            © {new Date().getFullYear()} Ekundayo Oyinkansola
          </p>
          <time className="font-mono text-[11px] tracking-[0.14em]">{clock}</time>
        </div>
      </div>
      <div className="border-t-2 border-ink px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ink/75">
        end of disk · signal held
      </div>
    </footer>
  )
}

function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <DesktopBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
