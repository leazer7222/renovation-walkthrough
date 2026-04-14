export type Phase =
  | "start"
  | "style-discovery"
  | "style-results"
  | "onboarding"
  | "layout"
  | "transition-to-storage"
  | "storage"
  | "transition-to-appliance"
  | "appliance"
  | "transition-to-lighting"
  | "lighting"
  | "transition-to-addons"
  | "addons"
  | "transition-to-flooring"
  | "flooring"
  | "transition-to-countertop"
  | "countertop"
  | "transition-to-cabinet"
  | "cabinet"
  | "shower-type"
  | "transition-to-shower-tile-style"
  | "shower-tile-style"
  | "transition-to-vanity-style"
  | "vanity-style"
  | "transition-to-wall-treatment"
  | "wall-treatment"
  | "transition-to-vanity-finish"
  | "vanity-finish"
  | "transition-to-mirror-style"
  | "mirror-style"
  | "transition-to-flooring-material"
  | "flooring-material"
  | "transition-to-seating-config"
  | "seating-config"
  | "transition-to-rug"
  | "rug"
  | "final";

/** Ordered list of user-visible phases for kitchen flow (used for progress bar tracking) */
export const KITCHEN_PHASE_ORDER: Phase[] = [
  "style-discovery", "style-results", "onboarding",
  "layout", "storage", "appliance", "lighting",
  "flooring", "countertop", "cabinet", "addons", "final",
];

/** Ordered list of user-visible phases for bathroom flow (used for progress bar tracking) */
export const BATHROOM_PHASE_ORDER: Phase[] = [
  "style-discovery", "style-results", "onboarding",
  "shower-type", "shower-tile-style", "vanity-style",
  "flooring", "wall-treatment", "vanity-finish", "mirror-style",
  "addons", "final",
];

/** Ordered list of user-visible phases for living room flow (used for progress bar tracking) */
export const LIVING_ROOM_PHASE_ORDER: Phase[] = [
  "style-discovery", "style-results", "onboarding",
  "layout", "flooring-material", "seating-config",
  "wall-treatment", "rug", "lighting", "final",
];

export interface Option {
  id: string;
  label: string;
}

export interface RoundConfig {
  phase: "layout" | "storage" | "appliance" | "lighting" | "flooring" | "countertop" | "cabinet" | "shower-type" | "shower-tile-style" | "vanity-style" | "wall-treatment" | "vanity-finish" | "mirror-style" | "addons" | "flooring-material" | "seating-config" | "rug";
  label: string;
  options: Option[];
}

export interface RoundState {
  currentWinner: Option | null;
  challengerQueue: Option[];
  currentMatch: { a: Option; b: Option } | null;
  history: { phase: Phase; winner: Option; loser: Option }[];
}

export interface OnboardingState {
  room: string;
  budget: string;
  styles: string[];
  priority: string;
}

export interface GameState {
  phase: Phase;
  onboarding: OnboardingState;
  selection: {
    layout: string | null;
    storage: string | null;
    appliance: string | null;
    lighting: string | null;
    addons: Record<string, boolean>;
    flooring: string | null;
    countertop: string | null;
    cabinet: string | null;
    // Bathroom Specific
    showerType: string | null;
    showerTileStyle: string | null;
    vanityStyle: string | null;
    wallTreatment: string | null;
    vanityFinish: string | null;
    mirrorStyle: string | null;
    // Living Room Specific
    flooringMaterial: string | null;
    seatingConfig: string | null;
    rug: string | null;
    discoveryResults?: any[];
  };
  roundState: RoundState;
  complete: boolean;
}
