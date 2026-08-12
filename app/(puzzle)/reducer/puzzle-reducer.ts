import { PuzzleAction, PuzzleState } from "../types";
import { correctSequence } from "../_data/scene";

export const initialPuzzleState: PuzzleState = {
  stage: "idle",
  selectedBeeId: null,
  collectedLetters: [],
  wrongBeeId: null,
  wrongNonce: 0,
};

export function puzzleReducer(
  state: PuzzleState,
  action: PuzzleAction,
): PuzzleState {
  switch (action.type) {
    case "SELECT_BEE": {
      const { beeId, letter } = action.payload;

      if (letter === null) {
        return {
          ...state,
          wrongBeeId: beeId,
          wrongNonce: state.wrongNonce + 1,
        };
      }

      if (state.collectedLetters.includes(letter)) {
        return {
          ...state,
          wrongBeeId: beeId,
          wrongNonce: state.wrongNonce + 1,
        };
      }

      const expectedLetter = correctSequence[state.collectedLetters.length];

      if (letter === expectedLetter) {
        return {
          ...state,
          stage: "beeSelected",
          selectedBeeId: beeId,
          collectedLetters: [...state.collectedLetters, letter],
        };
      }

      return {
        ...state,
        stage: "idle",
        selectedBeeId: null,
        collectedLetters: [],
        wrongBeeId: beeId,
        wrongNonce: state.wrongNonce + 1,
      };
    }

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

    case "FINISH_POUR":
      return {
        ...state,
        stage: "idle",
      };

    case "FINISH_RETURN":
      return {
        ...state,
        selectedBeeId: null,
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
