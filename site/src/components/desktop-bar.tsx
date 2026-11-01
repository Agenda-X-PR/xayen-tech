import { Link, NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useClock } from "@/hooks/use-clock"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

const NAV = [
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Find me" },
]

const linkBase = cn(
  "flex items-center border-ink px-3 font-mono text-[11px] uppercase tracking-widest outline-none",
  "transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper",
  "text-[10px] px-2 sm:text-[12px] sm:px-4 lg:px-5 text-ink"
)

/**
 * The desktop menubar: sticky top strip, the system logo on the left
 * with a classic menu, plain navigation in the middle, live clock right.
 */
export function DesktopBar() {
  const clock = useClock()
  return (
    <div className="sticky top-0 z-50 border-b-2 border-ink bg-paper-dim">
      <div className="flex min-h-11 items-stretch">
        <Menubar className="border-0 bg-transparent">
          <MenubarMenu>
            <MenubarTrigger aria-label="xayen menu" className="px-3">
              <span aria-hidden="true" className="dither-strip size-5 shrink-0 border-2 border-ink" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>xayen · Ekundayo Oyinkansola</MenubarLabel>
              <MenubarItem asChild>
                <Link to="/">Home</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/projects">Projects</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/blog">Blog</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <Link to="/contact">Find me</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <a
                  href="/assets/Ekundayo-Oyinkansola-Resume-2026.docx"
                  download
                  aria-label="Résumé .docx: Word document download"
                >
                  Résumé .docx ↓
                </a>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <NavLink
          to="/"
          end
          data-slot="home-link"
          className={({ isActive }) =>
            cn(
              linkBase,
              "px-4 text-[13px] tracking-[0.18em]",
              isActive && "bg-ink text-paper"
            )
          }
        >
          xayen
        </NavLink>

        <nav aria-label="Primary" className="flex min-w-0 flex-1 items-stretch overflow-x-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? cn(linkBase, "bg-ink text-paper") : linkBase
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 px-3 sm:px-4">
          <span
            className="hidden h-2 w-2 shrink-0 rounded-full bg-accent sm:block"
            aria-hidden="true"
          />
          <time className="font-mono text-[11px] tracking-[0.14em] text-ink">{clock}</time>
        </div>
      </div>
    </div>
  )
}
