import { RoundConfig } from "@/lib/types";

export const roundOrder: RoundConfig[] = [
  {
    phase: "flooring",
    label: "Flooring",
    options: [
      { id: "dark-walnut", label: "Dark Walnut" },
      { id: "large-format-tile", label: "Large Format Tile" },
      { id: "light-oak", label: "Light Oak" },
      { id: "microcement", label: "Microcement" },
    ],
  },
  {
    phase: "countertop",
    label: "Countertop",
    options: [
      { id: "marble", label: "Marble" },
      { id: "granite", label: "Granite" },
      { id: "butcher-block", label: "Butcher Block" },
      { id: "dark-quartz", label: "Dark Quartz" },
    ],
  },
  {
    phase: "cabinet",
    label: "Cabinet",
    options: [
      { id: "flat-panel-white", label: "Flat Panel White" },
      { id: "shaker", label: "Shaker" },
      { id: "matte-black", label: "Matte Black" },
      { id: "warm-wood", label: "Warm Wood" },
    ],
  },
];
