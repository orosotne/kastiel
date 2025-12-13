"use client";

import { memo, useMemo, useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const DIRECTIONS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
  none: { y: 0, x: 0 },
} as const;

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof DIRECTIONS;
  duration?: number;
  once?: boolean;
}

const FadeInOnScroll = memo(function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: FadeInOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const dir = DIRECTIONS[direction];

  const transition = useMemo(() => ({
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1],
  }), [duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: dir.y, x: dir.x }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : dir.y,
        x: isInView ? 0 : dir.x,
      }}
      transition={transition}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
});

export default FadeInOnScroll;



