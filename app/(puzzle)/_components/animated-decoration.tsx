"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export type Animation = "float" | "pulse" | "sway" | "breathe" | "none";

type Props = {
  children: ReactNode;
  animation?: Animation;
  className?: string;
  delay?: number;
};

const animations = {
  none: {},

  float: {
    y: [0, -8, 0, 8, 0],
  },

  pulse: {
    scale: [1, 1.05, 1],
  },

  sway: {
    rotate: [-4, 4, -4],
  },

  breathe: {
    scale: [1, 1.02, 1],
  },
};

const durations = {
  none: 0,
  float: 6,
  pulse: 3,
  sway: 5,
  breathe: 5,
};

export function AnimatedDecoration({
  children,
  animation = "none",
  className,
  delay,
}: Props) {
  return (
    <motion.div
      className={className}
      animate={animations[animation]}
      transition={{
        duration: durations[animation],
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
