"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useMemo } from "react";

import {
  BEE_SIZE,
  FLIGHT_DURATION,
  HONEY_POT_SIZE,
  RETURN_DURATION,
} from "../_data/constants";
import {
  buildFlightPath,
  buildReturnPath,
  buildRotationKeyframes,
} from "../_data/flight-path";
import { BeeData, Position, PuzzleStage } from "../types";

type BeeProps = BeeData & {
  stage: PuzzleStage;
  selectedBeeId: string | null;
  potPosition: Position;
  wrongTarget: string | null;
  wrongNonce: number;
  collected: boolean;
  onClick?: (id: string) => void;
};

export function Bee({
  id,
  position,
  rotate,
  delay,
  letter,
  stage,
  selectedBeeId,
  potPosition,
  wrongTarget,
  wrongNonce,
  collected,
  onClick,
}: BeeProps) {
  const [scope, animate] = useAnimate();

  const isSelected = selectedBeeId === id;
  const disabled = stage !== "idle";

  const flying = isSelected && stage === "beeSelected";
  const atPot =
    isSelected &&
    (stage === "beeFlying" ||
      stage === "pouringHoney" ||
      stage === "celebration");
  const returning = isSelected && stage === "idle";

  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;
  const baseX = (position.x / 100) * width;
  const baseY = (position.y / 100) * height;
  const startCenterX = baseX + BEE_SIZE / 2;
  const startCenterY = baseY + BEE_SIZE / 2;
  const endCenterX = (potPosition.x / 100) * width + HONEY_POT_SIZE / 2;
  const endCenterY = (potPosition.y / 100) * height + HONEY_POT_SIZE / 2;

  const goPoints = useMemo(
    () => buildFlightPath(startCenterX, startCenterY, endCenterX, endCenterY),
    [startCenterX, startCenterY, endCenterX, endCenterY],
  );
  const returnPoints = useMemo(
    () => buildReturnPath(endCenterX, endCenterY, startCenterX, startCenterY),
    [endCenterX, endCenterY, startCenterX, startCenterY],
  );

  const goRotations = useMemo(
    () => [0, ...buildRotationKeyframes(goPoints, rotate)],
    [goPoints, rotate],
  );
  const endRotate = goRotations[goRotations.length - 1];

  const returnRotations = [endRotate, 0];

  const goX = goPoints.map((point) => point.x - baseX - BEE_SIZE / 2);
  const goY = goPoints.map((point) => point.y - baseY - BEE_SIZE / 2);
  const returnX = returnPoints.map((point) => point.x - baseX - BEE_SIZE / 2);
  const returnY = returnPoints.map((point) => point.y - baseY - BEE_SIZE / 2);
  const potDx = endCenterX - baseX - BEE_SIZE / 2;
  const potDy = endCenterY - baseY - BEE_SIZE / 2;

  useEffect(() => {
    if (wrongTarget === id && scope.current) {
      animate(
        scope.current,
        { x: [0, -12, 12, -8, 8, 0] },
        { duration: 0.45, ease: "easeInOut" },
      );
    }
  }, [animate, scope, id, wrongTarget, wrongNonce]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
      }}
      animate={{
        x: flying ? goX : atPot ? potDx : returning ? returnX : 0,
        y: flying ? goY : atPot ? potDy : returning ? returnY : 0,
        rotate: flying
          ? goRotations
          : atPot
            ? endRotate
            : returning
              ? returnRotations
              : 0,
      }}
      transition={
        flying
          ? { duration: FLIGHT_DURATION, ease: "linear" }
          : returning
            ? { duration: RETURN_DURATION, ease: "linear" }
            : { duration: 0.6, ease: "easeInOut" }
      }
    >
      <motion.button
        ref={scope}
        type="button"
        disabled={disabled}
        aria-label={letter ? `Abelha com a letra ${letter}` : "Abelha"}
        onClick={() => onClick?.(id)}
        className="cursor-pointer border-none bg-transparent p-0 disabled:cursor-default"
        animate={{
          y: [0, -8, 0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
      >
        <motion.div
          animate={{
            rotate: [rotate - 3, rotate + 3, rotate - 3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/illustrations/bee-svgrepo-com.svg"
            alt="Abelha"
            width={BEE_SIZE}
            height={BEE_SIZE}
            priority
            draggable={false}
            className="h-auto w-[clamp(44px,9vw,70px)]"
          />
        </motion.div>

        {letter && collected && (
          <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white shadow-md">
            {letter}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}
