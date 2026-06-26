import Image from "next/image";
import { AnimatedDecoration } from "./animated-decoration";

export function HoneyPot() {
  return (
    <div className="absolute bottom-[10%] left-[5%]">
      <AnimatedDecoration animation="sway">
        <Image
          src="/illustrations/honey-pot-svgrepo-com.svg"
          alt="Pote de mel"
          width={110}
          height={110}
          priority
        />
      </AnimatedDecoration>
    </div>
  );
}
