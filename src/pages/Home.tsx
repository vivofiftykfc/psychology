import { Link } from "react-router-dom";
import { ArrowRight, Clock, GitGraph, BookMarked } from "lucide-react";
import PageTransition from "../components/motion/PageTransition";
import ScrollReveal from "../components/motion/ScrollReveal";
import TextStagger from "../components/motion/TextStagger";
import DustParticles from "../components/motion/DustParticles";
import { chapters } from "../data/chapters";

export default function Home() {
  return (
    <PageTransition>
      <DustParticles />

      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent-dim uppercase">
            PSYCHOLOGY · 沉思录
          </p>
        </ScrollReveal>

        <div className="mt-8">
          <TextStagger
            text="现代心理学入门"
            el="h1"
            className="font-display text-6xl font-bold leading-tight tracking-tight lg:text-8xl"
          />
        </div>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
            从古希腊的哲学追问到当代的神经科学，从弗洛伊德的躺椅到卡尼曼的行为实验室——这是一场穿越人类自我理解史的思想旅程。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/chapter/prologue"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-base transition-all hover:bg-accent-glow hover:shadow-[0_0_24px_rgba(200,169,110,0.15)]"
            >
              开始阅读
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 rounded-sm border border-divider px-6 py-3 text-sm text-text-secondary transition-all hover:border-accent-dim hover:text-accent"
            >
              <Clock size={16} />
              时间轴
            </Link>
            <Link
              to="/theory-map"
              className="inline-flex items-center gap-2 rounded-sm border border-divider px-6 py-3 text-sm text-text-secondary transition-all hover:border-accent-dim hover:text-accent"
            >
              <GitGraph size={16} />
              理论图谱
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="mt-24 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {chapters.filter(c => c.number > 0).map((ch) => (
              <Link
                key={ch.slug}
                to={`/chapter/${ch.slug}`}
                className="group rounded-sm border border-divider bg-surface/50 p-4 text-left transition-all hover:border-accent-dim hover:bg-surface"
              >
                <p className="font-mono text-xs text-accent-dim">
                  第{ch.number}章
                </p>
                <p className="mt-1 font-display text-sm text-text-primary transition-colors group-hover:text-accent">
                  {ch.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted line-clamp-2">
                  {ch.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
