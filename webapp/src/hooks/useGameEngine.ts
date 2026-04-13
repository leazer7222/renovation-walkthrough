import { useMemo, useState } from "react";
import { GameState, OnboardingState, Option, Phase, RoundState } from "@/lib/types";
import { roundOrder } from "@/config/kitchenConfig";
import { bathroomRoundOrder } from "@/config/bathroomConfig";

const initialRoundState: RoundState = {
  currentWinner: null,
  challengerQueue: [],
  currentMatch: null,
  history: [],
};

const initialState: GameState = {
  phase: "start",
  onboarding: { room: "kitchen", budget: "", styles: [], priority: "" },
  selection: {
    layout: null,
    storage: null,
    appliance: null,
    lighting: null,
    addons: {},
    flooring: null,
    countertop: null,
    cabinet: null,
    showerType: null,
    vanityStyle: null,
    wallTreatment: null,
    vanityFinish: null,
    mirrorStyle: null,
  },
  roundState: initialRoundState,
  complete: false,
};

const toQueue = (options: Option[]): Option[] => options.map((o) => ({ ...o }));

const nextPhase = (phase: Phase, room: string): Phase => {
  if (room === "bathroom") {
    if (phase === "shower-type") return "transition-to-shower-tile-style";
    if (phase === "transition-to-shower-tile-style") return "shower-tile-style";
    if (phase === "shower-tile-style") return "transition-to-vanity-style";
    if (phase === "transition-to-vanity-style") return "vanity-style";
    if (phase === "vanity-style") return "transition-to-flooring";
    if (phase === "transition-to-flooring") return "flooring";
    if (phase === "flooring") return "transition-to-wall-treatment";
    if (phase === "transition-to-wall-treatment") return "wall-treatment";
    if (phase === "wall-treatment") return "transition-to-vanity-finish";
    if (phase === "transition-to-vanity-finish") return "vanity-finish";
    if (phase === "vanity-finish") return "transition-to-mirror-style";
    if (phase === "transition-to-mirror-style") return "mirror-style";
    if (phase === "mirror-style") return "transition-to-addons";
    if (phase === "transition-to-addons") return "addons";
    if (phase === "addons") return "final";
    return "final";
  }

  // Kitchen (default)
  if (phase === "layout") return "transition-to-storage";
  if (phase === "transition-to-storage") return "storage";
  if (phase === "storage") return "transition-to-appliance";
  if (phase === "transition-to-appliance") return "appliance";
  if (phase === "appliance") return "transition-to-lighting";
  if (phase === "transition-to-lighting") return "lighting";
  if (phase === "lighting") return "transition-to-addons";
  if (phase === "transition-to-addons") return "addons";
  if (phase === "addons") return "transition-to-flooring";
  if (phase === "transition-to-flooring") return "flooring";
  if (phase === "flooring") return "transition-to-countertop";
  if (phase === "transition-to-countertop") return "countertop";
  if (phase === "countertop") return "transition-to-cabinet";
  if (phase === "transition-to-cabinet") return "cabinet";
  if (phase === "cabinet") return "final";
  return "final";
};

const getRoundConfig = (phase: Phase, room: string) => {
  if (room === "bathroom") {
    return bathroomRoundOrder.find((r) => r.phase === phase) ?? null;
  }
  return roundOrder.find((r) => r.phase === phase) ?? null;
};

export const useGameEngine = () => {
  const [state, setState] = useState<GameState>(initialState);

  const currentRound = useMemo(() => getRoundConfig(state.phase, state.onboarding.room), [state.phase, state.onboarding.room]);

  const initRound = (phase: Phase, room: string) => {
    const config = getRoundConfig(phase, room);
    if (!config) return;

    const queue = toQueue(config.options);
    const [a, b, ...rest] = queue;

    setState((prev) => ({
      ...prev,
      phase,
      roundState: {
        currentWinner: null,
        challengerQueue: rest,
        currentMatch: a && b ? { a, b } : null,
        history: prev.roundState.history
      },
      complete: false
    }));
  };

  const startGame = () => {
    setState({
      ...initialState,
      phase: "onboarding",
    });
  };

  const completeOnboarding = (onboarding: OnboardingState) => {
    setState((prev) => ({
      ...prev,
      onboarding,
    }));
    initRound(onboarding.room === "bathroom" ? "shower-type" : "layout", onboarding.room);
  };

  const completeAddons = (addons: Record<string, boolean>) => {
    setState((prev) => ({
      ...prev,
      selection: {
        ...prev.selection,
        addons,
      },
    }));
    continueToNextRound();
  };

  const continueToNextRound = () => {
    const next = nextPhase(state.phase, state.onboarding.room);
    const config = getRoundConfig(next as any, state.onboarding.room);
    if (!config) {
      setState((prev) => ({ ...prev, phase: next as Phase }));
    } else {
      initRound(next as any, state.onboarding.room);
    }
  };

  const advanceMatch = (winner: Option, loser: Option) => {
    setState((prev) => {
      // Guard against double-clicks/stale closures
      if (
        !prev.roundState.currentMatch ||
        (prev.roundState.currentMatch.a.id !== loser.id && prev.roundState.currentMatch.b.id !== loser.id)
      ) {
        return prev;
      }

      const queue = [...prev.roundState.challengerQueue];
      const nextMatchOp = queue.shift();
      const updatedHistory = [...prev.roundState.history, { phase: prev.phase, winner, loser }];

      const updatedSelection = {
        ...prev.selection,
        ...(prev.phase === "layout" && { layout: winner.id }),
        ...(prev.phase === "storage" && { storage: winner.id }),
        ...(prev.phase === "appliance" && { appliance: winner.id }),
        ...(prev.phase === "lighting" && { lighting: winner.id }),
        ...(prev.phase === "flooring" && { flooring: winner.id }),
        ...(prev.phase === "countertop" && { countertop: winner.id }),
        ...(prev.phase === "cabinet" && { cabinet: winner.id }),
        ...(prev.phase === "shower-type" && { showerType: winner.id }),
        ...(prev.phase === "shower-tile-style" && { showerTileStyle: winner.id }),
        ...(prev.phase === "vanity-style" && { vanityStyle: winner.id }),
        ...(prev.phase === "wall-treatment" && { wallTreatment: winner.id }),
        ...(prev.phase === "vanity-finish" && { vanityFinish: winner.id }),
        ...(prev.phase === "mirror-style" && { mirrorStyle: winner.id }),
      };

      if (nextMatchOp) {
        return {
          ...prev,
          roundState: {
            ...prev.roundState,
            currentWinner: winner,
            challengerQueue: queue,
            currentMatch: { a: winner, b: nextMatchOp },
            history: updatedHistory,
          },
          selection: updatedSelection,
        };
      }

      // Phase complete -> Transition
      const nextPhaseId = nextPhase(prev.phase, prev.onboarding.room);

      if (nextPhaseId === "final") {
        return {
          ...prev,
          selection: updatedSelection,
          phase: "final",
          roundState: {
            ...prev.roundState,
            currentMatch: null,
            currentWinner: winner,
            challengerQueue: [],
            history: updatedHistory,
          },
          complete: true,
        };
      }

      // Move to transition phase
      return {
        ...prev,
        phase: nextPhaseId,
        selection: updatedSelection,
        complete: false,
        roundState: {
          ...prev.roundState,
          currentWinner: winner,
          challengerQueue: [],
          currentMatch: null,
          history: updatedHistory,
        },
      };
    });
  };

  const makeSelection = (option: Option) => {
    const match = state.roundState.currentMatch;
    if (!match) return;

    const loser = match.a.id === option.id ? match.b : match.a;
    advanceMatch(option, loser);
  };

  const restart = () => {
    setState(initialState);
  };

  return {
    state,
    startGame,
    completeOnboarding,
    completeAddons,
    continueToNextRound,
    selectOption: makeSelection,
    restart,
    currentRound,
  };
};

