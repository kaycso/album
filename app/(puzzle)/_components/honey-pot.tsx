import Image from "next/image";

export function HoneyPot() {
  return (
    <div className="absolute bottom-[10%] left-[5%]">
      <Image
        src="/illustrations/honey-pot-svgrepo-com.svg"
        alt="Pote de mel"
        width={110}
        height={110}
        priority
      />
    </div>
  );
}
