import { Background } from "./_components/background";
import { Bee } from "./_components/bee";
import { HoneyPot } from "./_components/honey-pot";
import { Title } from "./_components/title";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#FFF8E8]">
      <Background />

      <Title />

      <Bee top="12%" left="72%" delay={0.5} />
      <Bee top="58%" left="20%" delay={1.2} />
      <Bee top="75%" left="62%" delay={0.7} />

      <HoneyPot />
    </main>
  );
}
