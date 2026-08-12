"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

import { BEE_SIZE, HONEY_POT_SIZE } from "../_data/constants";
import { BeeData, Position, PuzzleStage } from "../types";

type BeeProps = BeeData & {
  stage: PuzzleStage;
  selectedBeeId: string | null;
  potPosition: Position;
  wrongTarget: string | null;
  wrongNonce: number;
  collected: boolean;
  onClick?: (id: string) => void;
};

export function Bee({
  id,
  position,
  rotate,
  delay,
  letter,
  stage,
  selectedBeeId,
  potPosition,
  wrongTarget,
  wrongNonce,
  collected,
  onClick,
}: BeeProps) {
  const [scope, animate] = useAnimate();

  const isSelected = selectedBeeId === id;
  const disabled = stage !== "idle";

  const flying = isSelected && stage === "beeSelected";
  const atPot =
    isSelected && (stage === "beeFlying" || stage === "pouringHoney");
  const returning = isSelected && stage === "idle";

  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;
  const sizeOffset = (HONEY_POT_SIZE - BEE_SIZE) / 2;
  const dx = ((potPosition.x - position.x) * width) / 100 + sizeOffset;
  const dy = ((potPosition.y - position.y) * height) / 100 + sizeOffset;

  useEffect(() => {
    if (wrongTarget === id && scope.current) {
      animate(
        scope.current,
        { x: [0, -12, 12, -8, 8, 0] },
        { duration: 0.45, ease: "easeInOut" },
      );
    }
  }, [animate, scope, id, wrongTarget, wrongNonce]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
      animate={{
        x: flying ? [0, dx] : atPot ? dx : returning ? [dx, 0] : 0,
        y: flying ? [0, dy - 30, dy] : atPot ? dy : returning ? [dy, 0] : 0,
      }}
      transition={
        flying
          ? { duration: 1.4, ease: "easeInOut" }
          : returning
            ? { duration: 2, ease: "easeInOut" }
            : { duration: 0.15 }
      }
    >
      <motion.button
        ref={scope}
        type="button"
        disabled={disabled}
        aria-label={letter ? `Abelha com a letra ${letter}` : "Abelha"}
        onClick={() => onClick?.(id)}
        className="cursor-pointer border-none bg-transparent p-0 disabled:cursor-default"
        animate={{
          y: [0, -8, 0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
      >
        <motion.div
          animate={{
            rotate: [rotate - 3, rotate + 3, rotate - 3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/illustrations/bee-svgrepo-com.svg"
            alt="Abelha"
            width={BEE_SIZE}
            height={BEE_SIZE}
            priority
            draggable={false}
          />
        </motion.div>

        {letter && collected && (
          <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white shadow-md">
            {letter}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}
