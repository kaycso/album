"use client";

import { Background } from "./scene/background";
import { Bee } from "./scene/bee";
import { HoneyPot } from "./scene/honey-pot";
import { Title } from "./scene/title";
import { scene } from "./_data/scene";
import { usePuzzle } from "./hooks/use-puzzle";

export default function Home() {
  const { state, dispatch } = usePuzzle();

  const interactive = state.stage === "idle" || state.stage === "beeSelected";

  const handleBeeClick = (beeId: string) => {
    if (!interactive) return;

    const bee = scene.bees.find((item) => item.id === beeId);

    dispatch({
      type: "SELECT_BEE",
      payload: {
        beeId,
        letter: bee?.letter ?? null,
      },
    });
  };

  return (
    <main className="relative h-screen overflow-hidden bg-[#FFF8E8]">
      <Background />

      <Title collectedLetters={state.collectedLetters} />

      {scene.bees.map((bee) => (
        <Bee
          key={bee.id}
          {...bee}
          disabled={!interactive}
          wrongTarget={state.wrongBeeId}
          wrongNonce={state.wrongNonce}
          collected={
            bee.letter ? state.collectedLetters.includes(bee.letter) : false
          }
          onClick={handleBeeClick}
        />
      ))}

      <HoneyPot {...scene.honeyPot} />
    </main>
  );
}
