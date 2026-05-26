import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ChapterConnection } from "../../types/content";

interface Props {
  connections: ChapterConnection[];
}

export default function Connections({ connections }: Props) {
  return (
    <div>
      <h3 className="font-display text-xl tracking-tight">章节关联</h3>
      <p className="mt-2 text-sm text-text-muted">
        以下章节与本章内容有深层关联，点击探索理论之间的对话。
      </p>
      <div className="mt-6 space-y-3">
        {connections.map((conn) => (
          <Link
            key={conn.chapterSlug}
            to={`/chapter/${conn.chapterSlug}`}
            className="group flex items-start gap-4 rounded-sm border border-divider bg-surface p-4 transition-all hover:border-accent-dim hover:bg-elevated"
          >
            <ArrowRight
              size={18}
              className="mt-0.5 shrink-0 text-text-muted transition-colors group-hover:text-accent"
            />
            <div>
              <p className="font-display text-sm text-text-primary transition-colors group-hover:text-accent">
                {conn.chapterTitle}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {conn.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
