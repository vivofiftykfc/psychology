import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TextStaggerProps {
  text: string;
  className?: string;
  el?: "h1" | "h2" | "p" | "span";
}

export default function TextStagger({
  text,
  className = "",
  el: Tag = "p",
}: TextStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} ref={ref as any}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </Tag>
  );
}
