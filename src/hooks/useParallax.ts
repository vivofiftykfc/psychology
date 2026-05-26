import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useParallax(
  speed: number = 0.3,
  range: [number, number] = [0, 1]
): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, range, [0, window.innerHeight * speed]);
}
