import Image from "next/image";

type DecorationProps = {
  src: string;
  alt: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
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
      <Image src={src} alt={alt} width={size} height={size} draggable={false} />
    </div>
  );
}
