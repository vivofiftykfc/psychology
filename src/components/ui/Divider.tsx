interface DividerProps {
  ornament?: boolean;
  className?: string;
}

export default function Divider({ ornament = false, className = "" }: DividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-divider" />
      {ornament && <span className="text-accent-dim text-xs">◆</span>}
      <div className="h-px flex-1 bg-divider" />
    </div>
  );
}
