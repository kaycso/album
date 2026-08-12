export type Animation = "float" | "pulse" | "sway" | "breathe" | "none";

export type Position = {
  x: number;
  y: number;
};

export type PuzzleLetter = "M" | "E" | "L";

export type BeeData = {
  id: string;
  position: Position;
  rotate: number;
  delay: number;
  letter?: PuzzleLetter;
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

  hideOnMobile?: boolean;
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

  collectedLetters: PuzzleLetter[];

  wrongBeeId: string | null;

  wrongNonce: number;
};

export type PuzzleAction =
  | {
      type: "SELECT_BEE";
      payload: {
        beeId: string;
        letter: PuzzleLetter | null;
      };
    }
  | {
      type: "START_FLYING";
    }
  | {
      type: "START_POURING";
    }
  | {
      type: "FINISH_POUR";
    }
  | {
      type: "FINISH_RETURN";
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
