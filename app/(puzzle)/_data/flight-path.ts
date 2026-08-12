import {
  FLIGHT_LOOPS,
  FLIGHT_LOOP_RADIUS,
  FLIGHT_LOOP_RADIUS_MAX,
  FLIGHT_POINTS,
  RETURN_BOW,
  RETURN_BOW_MAX,
} from "./constants";

export type Waypoint = {
  x: number;
  y: number;
};

const TWO_PI = Math.PI * 2;
const RAW_SAMPLES = 300;

function smoothstep(u: number): number {
  return u * u * (3 - 2 * u);
}

function resampleByArcLength(path: Waypoint[]): Waypoint[] {
  const cumulative = [0];

  for (let index = 1; index < path.length; index++) {
    cumulative.push(
      cumulative[index - 1] +
        Math.hypot(
          path[index].x - path[index - 1].x,
          path[index].y - path[index - 1].y,
        ),
    );
  }

  const total = cumulative[cumulative.length - 1] || 1;
  const out: Waypoint[] = [];
  let segment = 0;

  for (let index = 0; index < FLIGHT_POINTS; index++) {
    const target = (total * index) / (FLIGHT_POINTS - 1);

    while (segment < path.length - 2 && cumulative[segment + 1] < target) {
      segment++;
    }

    const segmentLen = cumulative[segment + 1] - cumulative[segment] || 1;
    const u = (target - cumulative[segment]) / segmentLen;

    out.push({
      x: path[segment].x + (path[segment + 1].x - path[segment].x) * u,
      y: path[segment].y + (path[segment + 1].y - path[segment].y) * u,
    });
  }

  return out;
}

export function buildFlightPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): Waypoint[] {
  const dx = endX - startX;
  const dy = endY - startY;
  const pathLen = Math.hypot(dx, dy);
  const radius = Math.min(
    Math.max(FLIGHT_LOOP_RADIUS, pathLen / 5),
    FLIGHT_LOOP_RADIUS_MAX,
  );
  const cx = (startX + endX) / 2;
  const cy = (startY + endY) / 2;

  const loopArc = TWO_PI * radius * FLIGHT_LOOPS;
  const rampArc = Math.PI * radius;
  const totalArc = pathLen + loopArc + rampArc * 2;
  const a = rampArc / totalArc;
  const b = 1 - a;

  const raw = Array.from({ length: RAW_SAMPLES }, (_, index) => {
    const t = index / (RAW_SAMPLES - 1);

    let centerX: number;
    let centerY: number;
    let r: number;
    let theta: number;

    if (t <= a) {
      const u = t / a;
      centerX = startX + (cx - startX) * u;
      centerY = startY + (cy - startY) * u;
      r = radius * smoothstep(u);
      theta = Math.PI * u;
    } else if (t <= b) {
      const u = (t - a) / (b - a);
      centerX = cx;
      centerY = cy;
      r = radius;
      theta = Math.PI + TWO_PI * FLIGHT_LOOPS * u;
    } else {
      const u = (t - b) / (1 - b);
      centerX = cx + (endX - cx) * u;
      centerY = cy + (endY - cy) * u;
      r = radius * smoothstep(1 - u);
      theta = Math.PI + TWO_PI * FLIGHT_LOOPS + Math.PI * u;
    }

    return {
      x: centerX + r * Math.cos(theta),
      y: centerY + r * Math.sin(theta),
    };
  });

  return resampleByArcLength(raw);
}

export function buildReturnPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): Waypoint[] {
  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bow = Math.min(Math.max(RETURN_BOW, len / 7), RETURN_BOW_MAX);

  const raw = Array.from({ length: RAW_SAMPLES }, (_, index) => {
    const t = index / (RAW_SAMPLES - 1);
    const bowAt = bow * Math.sin(t * Math.PI * 2);

    return {
      x: startX + dx * t + nx * bowAt,
      y: startY + dy * t + ny * bowAt,
    };
  });

  return resampleByArcLength(raw);
}

function unwrapAngles(values: number[]): number[] {
  const out: number[] = [values[0]];

  for (let index = 1; index < values.length; index++) {
    const delta = values[index] - values[index - 1];
    const wrapped = ((((delta + 180) % 360) + 360) % 360) - 180;

    out.push(out[index - 1] + wrapped);
  }

  return out;
}

export function buildRotationKeyframes(
  points: Waypoint[],
  baseRotate: number,
): number[] {
  const raw = points.map((point, index) => {
    const segment = Math.min(index, points.length - 2);
    const next = points[segment + 1];
    const heading =
      (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI;

    return heading + 90 - baseRotate;
  });

  return unwrapAngles(raw);
}
