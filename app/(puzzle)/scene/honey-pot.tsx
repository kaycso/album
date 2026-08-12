import Image from "next/image";
import { AnimatedDecoration } from "./animated-decoration";
import { HONEY_POT_SIZE } from "../_data/constants";
import { HoneyPotData } from "../types";

type HoneyPotProps = HoneyPotData;

export function HoneyPot({ position }: HoneyPotProps) {
  return (
    <div
      className="absolute"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
    >
      <AnimatedDecoration animation="sway">
        <Image
          src="/illustrations/honey-pot-svgrepo-com.svg"
          alt="Pote de mel"
          width={HONEY_POT_SIZE}
          height={HONEY_POT_SIZE}
          priority
        />
      </AnimatedDecoration>
    </div>
  );
}
