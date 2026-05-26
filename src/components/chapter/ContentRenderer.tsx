import { ChapterSection } from "../../types/content";
import Callout from "../ui/Callout";

interface Props {
  section: ChapterSection;
}

export default function ContentRenderer({ section }: Props) {
  return (
    <section id={section.id} className="mb-16 scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold tracking-tight lg:text-3xl">
        {section.title}
      </h2>

      <div className="mt-6 space-y-5">
        {section.content.map((paragraph, i) => (
          <p
            key={i}
            className="leading-[1.85] text-text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {section.callout && (
        <Callout type={section.callout.type} text={section.callout.text} />
      )}
    </section>
  );
}
