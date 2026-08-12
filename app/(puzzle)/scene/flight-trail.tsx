"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import {
  BEE_SIZE,
  FLIGHT_DURATION,
  FLIGHT_POINTS,
  HONEY_POT_SIZE,
  RETURN_DURATION,
} from "../_data/constants";
import { buildFlightPath, buildReturnPath } from "../_data/flight-path";
import { Position } from "../types";

const LAG_SEGMENTS = 1;
const VISIBLE_SEGMENTS = 3;

type FlightTrailProps = {
  beePosition: Position;
  potPosition: Position;
  returning: boolean;
};

export function FlightTrail({
  beePosition,
  potPosition,
  returning,
}: FlightTrailProps) {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;

  const start = returning ? potPosition : beePosition;
  const end = returning ? beePosition : potPosition;
  const startOffset = returning ? HONEY_POT_SIZE / 2 : BEE_SIZE / 2;
  const endOffset = returning ? BEE_SIZE / 2 : HONEY_POT_SIZE / 2;

  const startX = (start.x / 100) * width + startOffset;
  const startY = (start.y / 100) * height + startOffset;
  const endX = (end.x / 100) * width + endOffset;
  const endY = (end.y / 100) * height + endOffset;

  const points = useMemo(
    () =>
      returning
        ? buildReturnPath(startX, startY, endX, endY)
        : buildFlightPath(startX, startY, endX, endY),
    [returning, startX, startY, endX, endY],
  );

  const duration = returning ? RETURN_DURATION : FLIGHT_DURATION;
  const stepDuration = duration / (FLIGHT_POINTS - 1);

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {points.slice(0, -1).map((point, index) => (
        <motion.line
          key={index}
          x1={point.x}
          y1={point.y}
          x2={points[index + 1].x}
          y2={points[index + 1].y}
          stroke="rgba(245, 158, 11, 0.8)"
          strokeWidth={3}
          strokeDasharray="4 6"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: (index + LAG_SEGMENTS) * stepDuration,
            duration: stepDuration * VISIBLE_SEGMENTS,
            times: [0, 0.25, 0.6, 1],
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}
