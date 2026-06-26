import Image from "next/image";
import { AnimatedDecoration, type Animation } from "./animated-decoration";

type DecorationProps = {
  src: string;
  alt: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  animation?: Animation;
  delay?: number;
};

export function Decoration({
  src,
  alt,
  size,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  animation = "none",
  delay,
}: DecorationProps) {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        top,
        left,
        right,
        bottom,
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
