"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { BEE_SIZE } from "../_data/constants";
import { BeeData } from "../types";

type BeeProps = BeeData & {
  onClick?: (id: string) => void;
};

export function Bee({ id, position, rotate, delay, onClick }: BeeProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(id)}
      className="absolute cursor-pointer border-none bg-transparent p-0"
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
      whileTap={{
        scale: 0.95,
      }}
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
    </motion.button>
  );
}
