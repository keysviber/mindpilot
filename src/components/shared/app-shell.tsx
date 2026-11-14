"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BrainCircuit,
  Compass,
  Headphones,
  LayoutGrid,
  Sparkles,
  Users,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
const navigation = [
  { href: "/", label: "My learning", icon: Compass },
  { href: "/ai", label: "Study studio", icon: Sparkles },
  { href: "/focus", label: "Focus room", icon: Headphones },
  { href: "/community", label: "Community", icon: Users },
  { href: "/dashboard", label: "My workspace", icon: LayoutGrid },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  return (
    <div className="pilot-app">
      <aside className="pilot-sidebar">
        <Link href="/" className="pilot-brand">
          <span className="brand-symbol">
            <BrainCircuit size={25} />
          </span>
          mindpilot<span className="brand-dot">.</span>
        </Link>
        <div className="sidebar-label">YOUR LEARNING UNIVERSE</div>
        <nav aria-label="Main navigation">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`pilot-nav ${pathname === href ? "selected" : ""}`}
            >
              <Icon size={21} />
              <span>{label}</span>
              {pathname === href && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <BookOpen size={24} />
          <strong>
            Small steps.
            <br />
            Big possibilities.
          </strong>
          <p>A little learning today goes a long way.</p>
          <Link href="/ai">
            Make something great <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="sidebar-bottom">
          <span className="status-dot" /> A good day to grow.
          <span>© {new Date().getFullYear()} MindPilot</span>
        </div>
      </aside>
      <div className="pilot-main">
        <header className="pilot-topbar">
          <div className="topbar-location">
            <BookOpen size={17} />
            <span>Your study space</span>
            <span>/</span>
            <strong>
              {navigation.find((n) => n.href === pathname)?.label || "Learn"}
            </strong>
          </div>
          <div className="topbar-actions">
            <span className="topbar-message">
              <span className="status-dot" /> One step closer, every day
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="profile-avatar" aria-label="Account menu">
                  {user?.email?.slice(0, 1).toUpperCase() || "M"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My workspace</Link>
                </DropdownMenuItem>
                {user ? (
                  <DropdownMenuItem
                    onClick={async () => {
                      await auth.signOut();
                      sessionStorage.removeItem("isGuest");
                      window.location.assign("/");
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign in / create account</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="pilot-content">{children}</main>
      </div>
      <nav className="pilot-mobile-nav" aria-label="Mobile navigation">
        {navigation.slice(0, 4).map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={pathname === href ? "selected" : ""}
          >
            <Icon size={21} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
