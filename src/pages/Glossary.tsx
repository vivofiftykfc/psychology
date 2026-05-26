import { useState } from "react";
import { Search } from "lucide-react";
import PageTransition from "../components/motion/PageTransition";
import ScrollReveal from "../components/motion/ScrollReveal";
import { glossaryTerms } from "../data/glossary";

export default function Glossary() {
  const [query, setQuery] = useState("");

  const filtered = query
    ? glossaryTerms.filter(
        (t) =>
          t.term.toLowerCase().includes(query.toLowerCase()) ||
          t.termZh.includes(query) ||
          t.definition.includes(query)
      )
    : glossaryTerms;

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <header className="mb-12">
          <p className="font-mono text-xs tracking-[0.2em] text-accent-dim uppercase">
            GLOSSARY
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight lg:text-7xl">
            术语表
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            心理学的关键概念和术语，帮助你建立精确的理论词汇。
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-sm border border-divider bg-surface px-4 py-3">
            <Search size={16} className="text-text-muted shrink-0" />
            <input
              type="text"
              placeholder="搜索术语..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </div>
        </header>

        <div className="space-y-4">
          {filtered.map((term, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.03}>
              <div className="rounded-sm border border-divider bg-surface p-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-lg text-accent">{term.term}</h3>
                  <span className="text-sm text-text-muted">{term.termZh}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {term.definition}
                </p>
                {term.relatedTerms.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {term.relatedTerms.map((rt) => (
                      <span
                        key={rt}
                        className="cursor-pointer rounded-sm border border-divider px-2 py-0.5 text-xs text-text-muted transition-colors hover:border-accent-dim hover:text-accent"
                        onClick={() => setQuery(rt)}
                      >
                        {rt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-muted">未找到匹配的术语。</p>
        )}
      </div>
    </PageTransition>
  );
}
