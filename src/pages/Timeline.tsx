import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageTransition from "../components/motion/PageTransition";
import ScrollReveal from "../components/motion/ScrollReveal";
import Badge from "../components/ui/Badge";
import { timelineEvents } from "../data/timeline";

const categoryLabels: Record<string, string> = {
  philosophy: "哲学",
  founding: "奠基",
  theory: "理论",
  experiment: "实验",
  therapy: "治疗",
  technology: "技术",
};

export default function Timeline() {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? timelineEvents.filter((e) => e.category === filter)
    : timelineEvents;

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <header className="mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-accent-dim uppercase">
            CHRONOLOGY
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight lg:text-7xl">
            心理学时间轴
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            从公元前400年到公元2013年，关键的思想、实验和事件塑造了我们对人类心灵的理解。
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["", ...Object.keys(categoryLabels)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat || null)}
                className={`rounded-sm border px-3 py-1.5 text-xs transition-colors ${
                  filter === cat || (!filter && !cat)
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-divider text-text-muted hover:border-accent-dim hover:text-text-secondary"
                }`}
              >
                {cat ? categoryLabels[cat] : "全部"}
              </button>
            ))}
          </div>
        </header>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-divider lg:left-[119px]" />

          <div className="space-y-0">
            {filtered.map((event, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.02}>
                <div className="group relative flex items-start gap-6 pb-10 lg:gap-16">
                  <div className="relative z-10 hidden w-[100px] shrink-0 text-right lg:block">
                    <span className="font-mono text-sm text-accent-dim">
                      {event.year < 0 ? `前${Math.abs(event.year)}` : event.year}
                    </span>
                  </div>

                  <div className="relative z-10 mt-0.5 h-2 w-2 shrink-0 rounded-full bg-divider group-hover:bg-accent lg:hidden" />

                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs text-accent-dim lg:hidden">
                      {event.year < 0 ? `前${Math.abs(event.year)}` : event.year}
                    </span>
                    <h3 className="font-display text-lg group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {event.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <Badge>{categoryLabels[event.category]}</Badge>
                      {event.chapterSlug && (
                        <Link
                          to={`/chapter/${event.chapterSlug}`}
                          className="inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-accent"
                        >
                          相关章节 <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
