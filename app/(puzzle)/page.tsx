import { Background } from "./_components/background";
import { Bee } from "./_components/bee";
import { HoneyPot } from "./_components/honey-pot";
import { Title } from "./_components/title";
import { bees, honeyPot } from "./_data/scene";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#FFF8E8]">
      <Background />

      <Title />

      {bees.map((bee) => (
        <Bee key={bee.id} {...bee} />
      ))}

      <HoneyPot {...honeyPot} />
    </main>
  );
}
