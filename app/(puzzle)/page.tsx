"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

import { scene } from "./_data/scene";
import { usePuzzle } from "./hooks/use-puzzle";
import { AlbumPlaceholder } from "./scene/album-placeholder";
import { Background } from "./scene/background";
import { Bee } from "./scene/bee";
import { FlightTrail } from "./scene/flight-trail";
import { HoneyPot } from "./scene/honey-pot";
import { HoneyRain } from "./scene/honey-rain";
import { Title } from "./scene/title";

const ALBUM_STAGES = ["albumAppearing", "albumOpening", "completed"] as const;

export default function Home() {
  const { state, dispatch } = usePuzzle();

  useEffect(() => {
    if (state.stage === "beeSelected") {
      const timer = setTimeout(() => dispatch({ type: "START_FLYING" }), 2400);
      return () => clearTimeout(timer);
    }

    if (state.stage === "beeFlying") {
      const timer = setTimeout(() => dispatch({ type: "START_POURING" }), 500);
      return () => clearTimeout(timer);
    }

    if (state.stage === "pouringHoney") {
      const timer = setTimeout(() => {
        if (state.collectedLetters.length >= 3) {
          dispatch({ type: "CELEBRATE" });
        } else {
          dispatch({ type: "FINISH_POUR" });
        }
      }, 700);
      return () => clearTimeout(timer);
    }

    if (state.stage === "celebration") {
      const timer = setTimeout(() => dispatch({ type: "SHOW_ALBUM" }), 2800);
      return () => clearTimeout(timer);
    }

    if (state.stage === "albumAppearing") {
      const timer = setTimeout(() => dispatch({ type: "OPEN_ALBUM" }), 1000);
      return () => clearTimeout(timer);
    }

    if (state.stage === "albumOpening") {
      const timer = setTimeout(() => dispatch({ type: "COMPLETE" }), 1200);
      return () => clearTimeout(timer);
    }

    if (state.stage === "idle" && state.selectedBeeId) {
      const timer = setTimeout(() => dispatch({ type: "FINISH_RETURN" }), 3200);
      return () => clearTimeout(timer);
    }
  }, [state.stage, state.selectedBeeId, state.collectedLetters, dispatch]);

  const interactive = state.stage === "idle";

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

  const selectedBee = scene.bees.find(
    (item) => item.id === state.selectedBeeId,
  );

  const albumStage = ALBUM_STAGES.includes(
    state.stage as (typeof ALBUM_STAGES)[number],
  );

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative h-screen overflow-hidden bg-[#FFF8E8]">
        <Background />

        {selectedBee && (
          <FlightTrail
            start={selectedBee.position}
            end={scene.honeyPot.position}
          />
        )}

        <Title collectedLetters={state.collectedLetters} />

        {scene.bees.map((bee) => (
          <Bee
            key={bee.id}
            {...bee}
            stage={state.stage}
            selectedBeeId={state.selectedBeeId}
            potPosition={scene.honeyPot.position}
            wrongTarget={state.wrongBeeId}
            wrongNonce={state.wrongNonce}
            collected={
              bee.letter ? state.collectedLetters.includes(bee.letter) : false
            }
            onClick={handleBeeClick}
          />
        ))}

        <HoneyPot
          {...scene.honeyPot}
          level={state.collectedLetters.length}
          tipped={state.stage === "celebration"}
        />

        {state.stage === "celebration" && <HoneyRain />}

        {albumStage && <AlbumPlaceholder stage={state.stage} />}
      </main>
    </MotionConfig>
  );
}
