interface QuoteProps {
  text: string;
  author?: string;
  work?: string;
  className?: string;
}

export default function Quote({ text, author, work, className = "" }: QuoteProps) {
  return (
    <blockquote className={`my-10 border-l-2 border-accent-dim pl-6 ${className}`}>
      <p className="font-display text-lg italic leading-relaxed text-text-secondary">
        {text}
      </p>
      {(author || work) && (
        <cite className="mt-3 block text-xs tracking-wide text-text-muted uppercase not-italic">
          {author && `— ${author}`}
          {work && `，《${work}》`}
        </cite>
      )}
    </blockquote>
  );
}
