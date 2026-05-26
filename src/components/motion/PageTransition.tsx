import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.3, scale: 0.995 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
