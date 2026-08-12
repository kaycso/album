"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

import { BEE_SIZE } from "../_data/constants";
import { BeeData } from "../types";

type BeeProps = BeeData & {
  disabled?: boolean;
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
  disabled = false,
  wrongTarget,
  wrongNonce,
  collected,
  onClick,
}: BeeProps) {
  const [scope, animate] = useAnimate();

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
    <motion.button
      ref={scope}
      type="button"
      disabled={disabled}
      aria-label={letter ? `Abelha com a letra ${letter}` : "Abelha"}
      onClick={() => onClick?.(id)}
      className="absolute cursor-pointer border-none bg-transparent p-0 disabled:cursor-default"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
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
  );
}
