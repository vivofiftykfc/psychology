import { HTMLMotionProps, motion } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export default function Card({ hover = true, className = "", children, ...props }: CardProps) {
  return (
    <motion.div
      className={`rounded-sm border border-divider bg-surface p-6 ${
        hover ? "cursor-pointer" : ""
      } ${className}`}
      whileHover={
        hover
          ? {
              backgroundColor: "#292421",
              borderColor: "#8b7355",
              y: -2,
              boxShadow: "0 4px 24px rgba(200,169,110,0.08)",
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
