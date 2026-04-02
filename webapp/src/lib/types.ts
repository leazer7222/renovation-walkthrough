export type Phase =
  | "start"
  | "onboarding"
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
  phase: "flooring" | "countertop" | "cabinet";
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
    flooring: string | null;
    countertop: string | null;
    cabinet: string | null;
  };
  roundState: RoundState;
  complete: boolean;
}

