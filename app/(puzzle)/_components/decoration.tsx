"use client";

import Image from "next/image";
import { DecorationData } from "../types";
import { AnimatedDecoration } from "./animated-decoration";

export function Decoration({
  src,
  alt,
  size,
  position,
  rotate = 0,
  animation = "none",
  delay,
}: DecorationData) {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        ...position,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <AnimatedDecoration animation={animation} delay={delay}>
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          draggable={false}
        />
      </AnimatedDecoration>
    </div>
  );
}
