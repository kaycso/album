"use client";

import { useReducer } from "react";
import { initialPuzzleState, puzzleReducer } from "../reducer/puzzle-reducer";

export function usePuzzle() {
  const [state, dispatch] = useReducer(puzzleReducer, initialPuzzleState);

  return {
    state,
    dispatch,
  };
}
