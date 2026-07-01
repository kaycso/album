"use client";

import Image from "next/image";
import { BeeData } from "../types";
import { AnimatedDecoration } from "./animated-decoration";

type BeeProps = BeeData & {
  onClick?: (id: string) => void;
};

export function Bee({ id, position, rotate, delay, onClick }: BeeProps) {
  return (
    <button
      type="button"
      className="absolute cursor-pointer border-none bg-transparent p-0"
      style={{
        top: position.y,
        left: position.x,
        transform: `rotate(${rotate}deg)`,
      }}
      onClick={() => onClick?.(id)}
    >
      <AnimatedDecoration animation="float" delay={delay}>
        <Image
          src="/illustrations/bee-svgrepo-com.svg"
          alt="Abelha"
          width={70}
          height={70}
          priority
          draggable={false}
        />
      </AnimatedDecoration>
    </button>
  );
}
