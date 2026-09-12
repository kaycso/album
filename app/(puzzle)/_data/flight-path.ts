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

export type FlightPathOptions = {
  entryAngle?: number;
  direction?: 1 | -1;
  centerOffsetScale?: number;
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
  options: FlightPathOptions = {},
): Waypoint[] {
  const direction = options.direction ?? 1;
  const entryAngle = options.entryAngle ?? Math.PI;
  const centerOffsetScale = options.centerOffsetScale ?? 0;

  const dx = endX - startX;
  const dy = endY - startY;
  const pathLen = Math.hypot(dx, dy) || 1;
  const radius = Math.min(
    Math.max(FLIGHT_LOOP_RADIUS, pathLen / 5),
    FLIGHT_LOOP_RADIUS_MAX,
  );
  const nx = -dy / pathLen;
  const ny = dx / pathLen;
  const cx = (startX + endX) / 2 + nx * (centerOffsetScale * radius);
  const cy = (startY + endY) / 2 + ny * (centerOffsetScale * radius);

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
      theta = entryAngle * u;
    } else if (t <= b) {
      const u = (t - a) / (b - a);
      centerX = cx;
      centerY = cy;
      r = radius;
      theta = entryAngle + TWO_PI * FLIGHT_LOOPS * u;
    } else {
      const u = (t - b) / (1 - b);
      centerX = cx + (endX - cx) * u;
      centerY = cy + (endY - cy) * u;
      r = radius * smoothstep(1 - u);
      theta = entryAngle + TWO_PI * FLIGHT_LOOPS + Math.PI * u;
    }

    return {
      x: centerX + r * Math.cos(theta),
      y: centerY + direction * r * Math.sin(theta),
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
  const pathLen = Math.hypot(dx, dy) || 1;
  const nx = -dy / pathLen;
  const ny = dx / pathLen;
  const bow = Math.min(Math.max(RETURN_BOW, pathLen / 7), RETURN_BOW_MAX);

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

export function pathHeadings(points: Waypoint[]): number[] {
  const headings: number[] = [];

  for (let index = 0; index < points.length - 1; index++) {
    const next = points[index + 1];
    headings.push(
      (Math.atan2(next.y - points[index].y, next.x - points[index].x) * 180) /
        Math.PI,
    );
  }

  headings.push(headings[headings.length - 1]);

  return headings;
}

export function buildRotationKeyframes(
  points: Waypoint[],
  baseRotate: number,
): number[] {
  return pathHeadings(points).map((heading) => heading + 90 - baseRotate);
}

export function unwrapAngles(values: number[], seed: number): number[] {
  const out: number[] = [];
  let previous = seed;

  for (const value of values) {
    const normalized = ((value % 360) + 360) % 360;
    let delta = (((normalized - previous) % 360) + 360) % 360;

    if (delta > 180) delta -= 360;

    previous += delta;
    out.push(previous);
  }

  return out;
}
