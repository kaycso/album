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

export type PuzzleStage =
  | "idle"
  | "beeSelected"
  | "beeFlying"
  | "pouringHoney"
  | "celebration"
  | "albumAppearing"
  | "albumOpening"
  | "completed";

export type PuzzleState = {
  stage: PuzzleStage;

  selectedBeeId: string | null;
};

export type PuzzleAction =
  | {
      type: "SELECT_BEE";
      payload: {
        beeId: string;
      };
    }
  | {
      type: "START_FLYING";
    }
  | {
      type: "START_POURING";
    }
  | {
      type: "CELEBRATE";
    }
  | {
      type: "SHOW_ALBUM";
    }
  | {
      type: "OPEN_ALBUM";
    }
  | {
      type: "COMPLETE";
    }
  | {
      type: "RESET";
    };
