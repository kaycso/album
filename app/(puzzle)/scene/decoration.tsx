"use client";

import Image from "next/image";
import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";

import { Animation, DecorationData } from "../types";

type DecorationAnimation = {
  animate: TargetAndTransition;
  transition: Transition;
};

const decorationAnimations = {
  none: {
    animate: {},
    transition: {},
  },

  float: {
    animate: {
      y: [0, -8, 0, 8, 0],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  pulse: {
    animate: {
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  sway: {
    animate: {
      rotate: [-4, 4, -4],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  breathe: {
    animate: {
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} satisfies Record<Animation, DecorationAnimation>;

export function Decoration({
  src,
  alt,
  size,
  position,
  rotate = 0,
  animation = "none",
  delay = 0,
  hideOnMobile = false,
}: DecorationData) {
  const currentAnimation = decorationAnimations[animation];

  return (
    <motion.div
      className={`pointer-events-none absolute select-none ${
        hideOnMobile ? "hidden sm:block" : ""
      }`}
      style={{
        ...position,
      }}
      animate={currentAnimation.animate}
      transition={{
        ...currentAnimation.transition,
        delay,
      }}
    >
      <motion.div
        style={{
          rotate,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
