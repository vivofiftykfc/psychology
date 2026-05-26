import { useScrollProgress } from "../../hooks/useScrollProgress";

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-[2px] bg-divider">
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #8b7355, #c8a96e, #e8d5a3)",
        }}
      />
    </div>
  );
}
