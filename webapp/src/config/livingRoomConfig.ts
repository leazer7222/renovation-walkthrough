import { RoundConfig } from "@/lib/types";

export const livingRoomRoundOrder: RoundConfig[] = [
  {
    phase: "layout",
    label: "Layout",
    options: [
      { id: "tv-centered", label: "TV Centered" },
      { id: "conversation", label: "Conversation" },
      { id: "open-minimal", label: "Open Minimal" },
      { id: "cozy-dense", label: "Cozy Dense" },
    ],
  },
  {
    phase: "flooring-material",
    label: "Flooring Material",
    options: [
      { id: "wood", label: "Natural Wood" },
      { id: "tile", label: "Designer Tile" },
      { id: "stone", label: "Natural Stone" },
      { id: "concrete", label: "Polished Concrete" },
    ],
  },
  {
    phase: "seating-config",
    label: "Seating Configuration",
    options: [
      { id: "sectional", label: "Sectional Sofa" },
      { id: "sofa-chairs", label: "Sofa & Chairs" },
      { id: "minimal-sofa", label: "Minimal Sofa" },
      { id: "lounge-layered", label: "Lounge Layered" },
    ],
  },
  {
    phase: "wall-treatment",
    label: "Wall Treatment",
    options: [
      { id: "clean", label: "Clean Walls" },
      { id: "feature", label: "Feature Wall" },
      { id: "accent", label: "Accent Wall" },
    ],
  },
  {
    phase: "rug",
    label: "Rug Style",
    options: [
      { id: "subtle", label: "Subtle Neutral" },
      { id: "statement", label: "Statement Pattern" },
    ],
  },
  {
    phase: "lighting",
    label: "Lighting Style",
    options: [
      { id: "statement", label: "Statement Fixture" },
      { id: "subtle", label: "Subtle Layered" },
    ],
  },
];
