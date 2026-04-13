import { RoundConfig } from "@/lib/types";

export const bathroomRoundOrder: RoundConfig[] = [
  {
    phase: "shower-type",
    label: "Shower Type",
    options: [
      { id: "tub-shower-combo", label: "Tub Shower Combo" },
      { id: "standalone-tub", label: "Standalone Tub" },
      { id: "walk-in-glass-shower", label: "Walk-in Glass Shower" },
      { id: "walk-in-half-wall-shower", label: "Walk-in Half Wall" },
    ],
  },
  {
    phase: "shower-tile-style",
    label: "Shower Tile Style",
    options: [
      { id: "accent-band", label: "Accent Band" },
      { id: "feature-back-wall", label: "Feature Back Wall" },
      { id: "full-pattern-textured-tile", label: "Full Pattern Textured Tile" },
      { id: "uniform-tile", label: "Uniform Tile" },
    ],
  },
  {
    phase: "vanity-style",
    label: "Vanity Style",
    options: [
      { id: "built-in-vanity", label: "Built-in Vanity" },
      { id: "double-vanity", label: "Double Vanity" },
      { id: "vanity-tower", label: "Vanity Tower" },
    ],
  },
  {
    phase: "flooring",
    label: "Flooring",
    options: [
      { id: "light-neutral-tile", label: "Light Neutral Tile" },
      { id: "patterned-tile", label: "Patterned Tile" },
      { id: "dark-stone-tile", label: "Dark Stone Tile" },
    ],
  },
  {
    phase: "wall-treatment",
    label: "Wall Treatment",
    options: [
      { id: "painted-wall", label: "Painted Wall" },
      { id: "half-wall-paneling", label: "Half Wall Paneling" },
      { id: "full-tile-feature-wall", label: "Full Tile Feature Wall" },
    ],
  },
  {
    phase: "vanity-finish",
    label: "Vanity Finish",
    options: [
      { id: "white-vanity", label: "White Vanity" },
      { id: "light-wood-vanity", label: "Light Wood Vanity" },
      { id: "dark-or-black-vanity", label: "Dark or Black Vanity" },
    ],
  },
  {
    phase: "mirror-style",
    label: "Mirror Style",
    options: [
      { id: "framed-mirror", label: "Framed Mirror" },
      { id: "frameless-mirror", label: "Frameless Mirror" },
      { id: "led-backlit-mirror", label: "LED Backlit Mirror" },
    ],
  },
];

export const bathroomAddons = [
  {
    id: "toilet-upgrade",
    label: "Toilet Upgrade",
    description: "Standard, modern skirted, or smart toilet bidet",
    image: "/visualization-library/comparison/bathroom/prototype/addons/toilet-upgrade/modern-skirted-toilet/modern-skirted-toilet.png"
  },
  {
    id: "mirror-upgrade",
    label: "Mirror Upgrade",
    description: "Standard, backlit, or smart backlit mirror",
    image: "/visualization-library/comparison/bathroom/prototype/addons/mirror-upgrade/backlit-mirror/backlit-mirror.png"
  },
  {
    id: "shower-experience",
    label: "Shower Experience",
    description: "Rainfall or handheld shower head combo",
    image: "/visualization-library/comparison/bathroom/prototype/addons/shower-experience/rainfall-shower-head/rainfall-shower-head.png"
  },
  {
    id: "comfort-upgrade",
    label: "Comfort Upgrade",
    description: "Heated floors and towel warmer",
    image: "/visualization-library/comparison/bathroom/prototype/addons/comfort-upgrade/heated-floors/heated-floors.png"
  },
  {
    id: "storage-functionality",
    label: "Storage Functionality",
    description: "Shower niche with built-in shelving",
    image: "/visualization-library/comparison/bathroom/prototype/addons/storage-functionality/shower-niche/shower-niche.png"
  }
];
