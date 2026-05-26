interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-sm border px-2 py-0.5 text-xs tracking-wider uppercase ${
        variant === "accent"
          ? "border-accent-dim text-accent"
          : "border-divider text-text-muted"
      }`}
    >
      {children}
    </span>
  );
}
