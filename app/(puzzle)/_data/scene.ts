import { BeeData, DecorationData, HoneyPotData } from "../types";

export const bees: BeeData[] = [
  {
    id: "bee-1",
    position: {
      x: 72,
      y: 12,
    },
    rotate: 270,
    delay: 0.5,
    isCorrect: true,
  },
  {
    id: "bee-2",
    position: {
      x: 20,
      y: 58,
    },
    rotate: 270,
    delay: 1.2,
    isCorrect: false,
  },
  {
    id: "bee-3",
    position: {
      x: 62,
      y: 75,
    },
    rotate: 270,
    delay: 0.7,
    isCorrect: false,
  },
];

export const honeyPot: HoneyPotData = {
  position: {
    x: 5,
    y: 82,
  },
};

export const decorations: DecorationData[] = [
  {
    id: "heart-top-left",
    src: "/illustrations/heart-exclamation-svgrepo-com.svg",
    alt: "",
    size: 70,
    position: {
      top: "5%",
      left: "8%",
    },
    rotate: -15,
    animation: "pulse",
    delay: 0.3,
  },

  {
    id: "heart-bottom-right",
    src: "/illustrations/heart-exclamation-svgrepo-com.svg",
    alt: "",
    size: 60,
    position: {
      bottom: "15%",
      right: "12%",
    },
    rotate: 18,
    animation: "pulse",
    delay: 1.1,
  },

  {
    id: "flower-top-right",
    src: "/illustrations/flowers-flower-svgrepo-com.svg",
    alt: "",
    size: 80,
    position: {
      top: "18%",
      right: "18%",
    },
    animation: "sway",
    delay: 0.6,
  },

  {
    id: "flower-bottom-left",
    src: "/illustrations/flowers-flower-svgrepo-com.svg",
    alt: "",
    size: 90,
    position: {
      bottom: "8%",
      left: "15%",
    },
    animation: "sway",
    delay: 1.8,
  },
];
