import Image from "next/image";
import { AnimatedDecoration } from "./animated-decoration";

type BeeProps = {
  top: string;
  left: string;
  rotate?: number;
  delay?: number;
};

export function Bee({ top, left, rotate = 270, delay }: BeeProps) {
  return (
    <div
      className="absolute"
      style={{ top, left, transform: `rotate(${rotate}deg)` }}
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
    </div>
  );
}
