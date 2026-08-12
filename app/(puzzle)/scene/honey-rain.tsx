"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const DROP_COUNT = 28;
const HEART_COUNT = 12;

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

type FallItem = {
  left: number;
  delay: number;
  duration: number;
  size: number;
};

function createItems(
  count: number,
  sizeMin: number,
  sizeMax: number,
): FallItem[] {
  return Array.from({ length: count }, () => ({
    left: random(0, 100),
    delay: random(0, 0.6),
    duration: random(1.4, 2.4),
    size: random(sizeMin, sizeMax),
  }));
}

export function HoneyRain() {
  const drops = useMemo(() => createItems(DROP_COUNT, 10, 20), []);
  const hearts = useMemo(() => createItems(HEART_COUNT, 18, 30), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {drops.map((drop, index) => (
        <motion.div
          key={`drop-${index}`}
          className="absolute top-0 rotate-45 rounded-full bg-amber-400"
          style={{
            left: `${drop.left}%`,
            width: drop.size,
            height: drop.size,
          }}
          initial={{ y: "-5vh", opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            ease: "linear",
          }}
        />
      ))}

      {hearts.map((heart, index) => (
        <motion.div
          key={`heart-${index}`}
          className="absolute top-0"
          style={{ left: `${heart.left}%` }}
          initial={{ y: "-5vh", opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeIn",
          }}
        >
          <Heart
            className="fill-rose-400 text-rose-400"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}
