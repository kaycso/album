import { Animation } from "./_components/animated-decoration";

export type Position = {
  x: number;
  y: number;
};

export type BeeData = {
  id: string;
  position: Position;
  rotate: number;
  delay: number;
  isCorrect: boolean;
};

export type DecorationData = {
  id: string;

  src: string;

  alt: string;

  size: number;

  position: Partial<{
    top: string;
    right: string;
    bottom: string;
    left: string;
  }>;

  rotate?: number;

  animation?: Animation;

  delay?: number;
};

export type HoneyPotData = {
  position: Position;
};
