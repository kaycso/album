import { Background } from "./_components/background";
import { Bee } from "./_components/bee";
import { HoneyPot } from "./_components/honey-pot";
import { Title } from "./_components/title";
import { scene } from "./_data/scene";
import { usePuzzle } from "./hooks/use-puzzle";

export default function Home() {
  const { state, dispatch } = usePuzzle();

  const handleBeeClick = (beeId: string) => {
    dispatch({
      type: "SELECT_BEE",
      payload: {
        beeId,
      },
    });

    if (beeId === scene.correctBeeId) {
      console.log("Correta");
      return;
    }

    console.log("Errada");
  };

  return (
    <main className="relative h-screen overflow-hidden bg-[#FFF8E8]">
      <Background />

      <Title />

      {scene.bees.map((bee) => (
        <Bee key={bee.id} {...bee} onClick={handleBeeClick} />
      ))}

      <HoneyPot {...scene.honeyPot} />
    </main>
  );
}
