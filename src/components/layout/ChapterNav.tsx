import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { Chapter } from "../../types/content";
import { chapters } from "../../data/chapters";
import { useActiveSection } from "../../hooks/useActiveSection";

interface Props {
  currentChapter: Chapter;
}

export default function ChapterNav({ currentChapter }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const activeSection = useActiveSection(currentChapter.sections.map((s) => s.id));
  const idx = chapters.findIndex((c) => c.slug === currentChapter.slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    if (mq.matches) setCollapsed(true);
  }, []);

  return (
    <aside
      className={`sticky top-20 hidden h-[calc(100vh-5rem)] shrink-0 flex-col border-r border-divider transition-all duration-300 lg:flex ${
        collapsed ? "w-12" : "w-56"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-10 items-center justify-center border-b border-divider text-text-muted transition-colors hover:text-accent"
      >
        {collapsed ? <List size={16} /> : <ChevronLeft size={16} />}
      </button>

      {!collapsed && (
        <>
          <div className="border-b border-divider p-4">
            <p className="font-display text-xs tracking-widest text-accent-dim uppercase">
              第{currentChapter.number}章
            </p>
            <p className="mt-1 font-display text-sm text-text-primary">
              {currentChapter.title}
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            {currentChapter.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block rounded-sm px-3 py-2 text-xs transition-colors ${
                  activeSection === section.id
                    ? "border-l-2 border-accent bg-surface text-accent"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="border-t border-divider p-3 space-y-1">
            {prev && (
              <Link
                to={`/chapter/${prev.slug}`}
                className="flex items-center gap-1 rounded-sm px-3 py-2 text-xs text-text-muted transition-colors hover:text-accent"
              >
                <ChevronLeft size={14} />
                第{prev.number}章 · {prev.title}
              </Link>
            )}
            {next && (
              <Link
                to={`/chapter/${next.slug}`}
                className="flex items-center gap-1 rounded-sm px-3 py-2 text-xs text-text-muted transition-colors hover:text-accent"
              >
                <ChevronRight size={14} />
                第{next.number}章 · {next.title}
              </Link>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
