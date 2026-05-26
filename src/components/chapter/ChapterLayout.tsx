import { Chapter } from "../../types/content";
import ScrollReveal from "../motion/ScrollReveal";
import TextStagger from "../motion/TextStagger";
import ContentRenderer from "./ContentRenderer";
import Connections from "./Connections";
import Quiz from "../interactive/Quiz";
import Divider from "../ui/Divider";
import Quote from "../ui/Quote";
import PageTransition from "../motion/PageTransition";

interface Props {
  chapter: Chapter;
}

export default function ChapterLayout({ chapter }: Props) {
  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
        <header className="mb-16">
          <p className="font-mono text-xs tracking-[0.2em] text-accent-dim uppercase">
            第{chapter.number === 0 ? "〇" : String(chapter.number)}章
          </p>
          <TextStagger
            text={chapter.title}
            el="h1"
            className="mt-4 font-display text-5xl font-bold leading-tight tracking-tight lg:text-7xl"
          />
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            {chapter.subtitle}
          </p>

          {chapter.epigraph && (
            <Quote
              text={chapter.epigraph.text}
              author={chapter.epigraph.author}
              work={chapter.epigraph.work}
              className="mt-10"
            />
          )}
        </header>

        <ScrollReveal>
          <div className="mb-16 rounded-sm border border-divider bg-surface p-6">
            <p className="text-sm leading-relaxed text-text-secondary">
              {chapter.overview}
            </p>
          </div>
        </ScrollReveal>

        {chapter.sections.map((section, idx) => (
          <ScrollReveal key={section.id} delay={idx * 0.05}>
            <ContentRenderer section={section} />
          </ScrollReveal>
        ))}

        {chapter.connections.length > 0 && (
          <ScrollReveal>
            <Divider ornament className="my-16" />
            <Connections connections={chapter.connections} />
          </ScrollReveal>
        )}

        {chapter.quiz.length > 0 && (
          <ScrollReveal>
            <Divider ornament className="my-16" />
            <Quiz questions={chapter.quiz} chapterSlug={chapter.slug} />
          </ScrollReveal>
        )}
      </article>
    </PageTransition>
  );
}
