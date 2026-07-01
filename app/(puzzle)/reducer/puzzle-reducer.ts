import { PuzzleAction, PuzzleState } from "../types";

export const initialPuzzleState: PuzzleState = {
  stage: "idle",
  selectedBeeId: null,
};

export function puzzleReducer(
  state: PuzzleState,
  action: PuzzleAction,
): PuzzleState {
  switch (action.type) {
    case "SELECT_BEE":
      return {
        ...state,
        stage: "beeSelected",
        selectedBeeId: action.payload.beeId,
      };

    case "START_FLYING":
      return {
        ...state,
        stage: "beeFlying",
      };

    case "START_POURING":
      return {
        ...state,
        stage: "pouringHoney",
      };

    case "CELEBRATE":
      return {
        ...state,
        stage: "celebration",
      };

    case "SHOW_ALBUM":
      return {
        ...state,
        stage: "albumAppearing",
      };

    case "OPEN_ALBUM":
      return {
        ...state,
        stage: "albumOpening",
      };

    case "COMPLETE":
      return {
        ...state,
        stage: "completed",
      };

    case "RESET":
      return initialPuzzleState;

    default:
      return state;
  }
}
