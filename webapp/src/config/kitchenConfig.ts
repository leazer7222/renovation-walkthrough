import { RoundConfig } from "@/lib/types";

export const roundOrder: RoundConfig[] = [
  {
    phase: "layout",
    label: "Layout",
    options: [
      { id: "large-island-with-seating", label: "Large Island with Seating" },
      { id: "small-prep-island", label: "Small Prep Island" },
      { id: "no-island", label: "No Island" },
    ],
  },
  {
    phase: "storage",
    label: "Storage Style",
    options: [
      { id: "closed-cabinetry", label: "Closed Cabinetry" },
      { id: "open-shelving", label: "Open Shelving" },
      { id: "glass-display-cabinets", label: "Glass Display Cabinets" },
      { id: "minimal-storage", label: "Minimal Storage" },
    ],
  },
  {
    phase: "appliance",
    label: "Appliance Style",
    options: [
      { id: "standard-stainless", label: "Standard Stainless" },
      { id: "integrated-appliances", label: "Integrated Appliances" },
      { id: "professional-statement-appliances", label: "Professional Statement Appliances" },
    ],
  },
  {
    phase: "lighting",
    label: "Lighting Style",
    options: [
      { id: "minimal-recessed-only", label: "Minimal Recessed Only" },
      { id: "pendant-lighting", label: "Pendant Lighting" },
      { id: "statement-lighting", label: "Statement Lighting" },
    ],
  },
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
