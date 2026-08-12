"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart } from "lucide-react";

import { TITLE, TITLE_HIGHLIGHT } from "../_data/constants";
import { PuzzleStage } from "../types";
import { playfair } from "./title";

type AlbumPlaceholderProps = {
  stage: PuzzleStage;
};

export function AlbumPlaceholder({ stage }: AlbumPlaceholderProps) {
  const opening = stage === "albumOpening" || stage === "completed";

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-[#FFF8E8] px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <motion.div
        style={{ perspective: 800 }}
        animate={
          opening
            ? { rotateY: [0, 35, 0], scale: [1, 1.12, 1] }
            : { scale: 0.85, opacity: 0.6 }
        }
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <BookOpen className="h-36 w-36 text-amber-500 sm:h-48 sm:w-48" />
      </motion.div>

      <h1
        className={`${playfair.className} text-5xl font-bold tracking-widest text-amber-900 select-none sm:text-7xl`}
      >
        {TITLE}
        <span className="text-amber-500">{TITLE_HIGHLIGHT}</span>
      </h1>

      <p className="max-w-xs text-amber-700">
        Nosso álbum de fotos está quase pronto...
      </p>

      <div className="flex items-center gap-2 text-rose-500">
        <Heart className="h-5 w-5 fill-rose-400 text-rose-400" />
        <span className="text-sm">Feito com muito amor</span>
        <Heart className="h-5 w-5 fill-rose-400 text-rose-400" />
      </div>
    </motion.div>
  );
}
