import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Clock, BookMarked, GitGraph } from "lucide-react";
import ProgressBar from "./ProgressBar";
import ChapterNav from "./ChapterNav";
import { chapters } from "../../data/chapters";

const navLinks = [
  { to: "/", label: "序章", icon: BookOpen },
  { to: "/timeline", label: "时间轴", icon: Clock },
  { to: "/theory-map", label: "理论图谱", icon: GitGraph },
  { to: "/glossary", label: "术语表", icon: BookMarked },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const isChapter = location.pathname.startsWith("/chapter/");
  const currentChapter = isChapter
    ? chapters.find((c) => `/chapter/${c.slug}` === location.pathname)
    : undefined;

  return (
    <div className="min-h-screen bg-base">
      <ProgressBar />

      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-divider bg-base/90 backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="font-display text-xl tracking-wider text-accent transition-colors hover:text-accent-glow"
          >
            沉思录
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm transition-colors ${
                  location.pathname === link.to
                    ? "text-accent"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="rounded-sm p-2 text-text-secondary hover:text-accent md:hidden"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-base md:hidden">
          <nav className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 rounded-sm px-4 py-3 text-lg transition-colors ${
                  location.pathname === link.to
                    ? "text-accent bg-surface"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            <div className="my-4 border-t border-divider" />
            {chapters.map((ch) => (
              <Link
                key={ch.slug}
                to={`/chapter/${ch.slug}`}
                onClick={() => setMobileNavOpen(false)}
                className={`rounded-sm px-4 py-2 text-sm transition-colors ${
                  location.pathname === `/chapter/${ch.slug}`
                    ? "text-accent bg-surface"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                第{ch.number}章 · {ch.title}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <div className="flex pt-16">
        {isChapter && currentChapter && <ChapterNav currentChapter={currentChapter} />}
        <main className="flex-1">{children}</main>
      </div>

      <footer className="border-t border-divider px-6 py-12 text-center">
        <p className="font-display text-2xl text-accent-dim">沉思录</p>
        <p className="mt-2 text-sm text-text-muted">
          现代心理学入门 · 探索人类心灵的科学之旅
        </p>
      </footer>
    </div>
  );
}
