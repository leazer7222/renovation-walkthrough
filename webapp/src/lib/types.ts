export type Phase =
  | "start"
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
  | "final";

export interface Option {
  id: string;
  label: string;
}

export interface RoundConfig {
  phase: "layout" | "storage" | "appliance" | "lighting" | "flooring" | "countertop" | "cabinet";
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
  };
  roundState: RoundState;
  complete: boolean;
}

