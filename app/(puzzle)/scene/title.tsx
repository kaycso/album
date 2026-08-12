import {
  Playfair_Display,
  // TODO: verificar qual fonte é melhor
  // Dancing_Script
} from "next/font/google";
import { TITLE, TITLE_HIGHLIGHT } from "../_data/constants";
import { AnimatedDecoration } from "./animated-decoration";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export function Title() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatedDecoration animation="breathe">
        <h1
          className={`${playfair.className} text-7xl font-bold tracking-widest text-amber-900 select-none md:text-9xl`}
        >
          {TITLE}
          <span className="text-amber-500">{TITLE_HIGHLIGHT}</span>
        </h1>
      </AnimatedDecoration>
    </div>
  );
}
