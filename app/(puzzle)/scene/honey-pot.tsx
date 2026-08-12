"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { HONEY_POT_SIZE } from "../_data/constants";
import { HoneyPotData } from "../types";
import { AnimatedDecoration } from "./animated-decoration";

const MAX_LEVEL = 3;

type HoneyPotProps = HoneyPotData & {
  level: number;
};

export function HoneyPot({ position, level }: HoneyPotProps) {
  return (
    <div
      className="absolute"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
    >
      <div className="relative">
        <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 gap-1.5">
          {Array.from({ length: MAX_LEVEL }, (_, index) => {
            const filled = index < level;

            return (
              <motion.span
                key={index}
                className={`h-4 w-4 rounded-full ${
                  filled
                    ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                    : "border-2 border-amber-300 bg-white/60"
                }`}
                animate={filled ? { scale: [0, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              />
            );
          })}
        </div>

        <AnimatePresence>
          <motion.div
            key={level}
            className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-full bg-amber-400"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 20, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          />
        </AnimatePresence>

        <AnimatedDecoration animation="sway">
          <Image
            src="/illustrations/honey-pot-svgrepo-com.svg"
            alt="Pote de mel"
            width={HONEY_POT_SIZE}
            height={HONEY_POT_SIZE}
            priority
          />
        </AnimatedDecoration>
      </div>
    </div>
  );
}
