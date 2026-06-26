import Image from "next/image";

type BeeProps = {
  top: string;
  left: string;
  rotate?: number;
};

export function Bee({ top, left, rotate = 270 }: BeeProps) {
  return (
    <div
      className="absolute"
      style={{ top, left, transform: `rotate(${rotate}deg)` }}
    >
      <Image
        src="/illustrations/bee-svgrepo-com.svg"
        alt="Abelha"
        width={70}
        height={70}
        priority
        draggable={false}
      />
    </div>
  );
}
