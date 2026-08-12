"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import {
  Playfair_Display,
  // TODO: verificar qual fonte é melhor
  // Dancing_Script
} from "next/font/google";
import { TITLE } from "../_data/constants";
import { PuzzleLetter } from "../types";
import { AnimatedDecoration } from "./animated-decoration";

const LETTERS: PuzzleLetter[] = ["M", "E", "L"];

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

type TitleProps = {
  collectedLetters: PuzzleLetter[];
};

export function Title({ collectedLetters }: TitleProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <AnimatedDecoration animation="breathe">
        <h1
          className={`${playfair.className} text-7xl font-bold tracking-widest text-amber-900 select-none md:text-9xl`}
        >
          {TITLE}
          {LETTERS.map((letter) => {
            const collected = collectedLetters.includes(letter);

            return (
              <motion.span
                key={letter}
                className={`relative inline-block ${
                  collected ? "text-amber-500" : "text-amber-300"
                }`}
                animate={collected ? { scale: [1, 1.12, 1] } : undefined}
                transition={
                  collected ? { duration: 0.5, ease: "easeInOut" } : undefined
                }
              >
                {letter}
                {collected && (
                  <Heart className="absolute -top-4 left-1/2 h-5 w-5 -translate-x-1/2 fill-rose-400 text-rose-400" />
                )}
              </motion.span>
            );
          })}
        </h1>
      </AnimatedDecoration>

      <p className="max-w-xs text-center text-sm text-amber-700 select-none md:text-base">
        As abelhinhas guardam letras secretas. Junte a palavra certa para o mel
        cair!
      </p>
    </div>
  );
}
