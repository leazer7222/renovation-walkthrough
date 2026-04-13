import { useState } from "react";
import { interiorStyles, StyleOption, initialPairings } from "@/config/styleDiscoveryConfig";

export type BracketPhase = "round-of-16" | "quarterfinals" | "semifinals" | "finals" | "results";

interface Match {
  a: StyleOption;
  b: StyleOption;
}

export interface BracketState {
  currentRound: BracketPhase;
  currentMatchIndex: number;
  matches: Match[];
  winners: StyleOption[];
  roundWinners: StyleOption[];
  history: { winner: StyleOption; loser: StyleOption; round: BracketPhase }[];
}

export const useStyleDiscoveryEngine = (onComplete: (results: StyleOption[]) => void) => {
  const [state, setState] = useState<BracketState>(() => {
    // Initialize Round of 16 from custom pairings
    const initialMatches: Match[] = initialPairings.map(([aId, bId]) => {
      const styleA = interiorStyles.find(s => s.id === aId)!;
      const styleB = interiorStyles.find(s => s.id === bId)!;
      return { a: styleA, b: styleB };
    });

    return {
      currentRound: "round-of-16",
      currentMatchIndex: 0,
      matches: initialMatches,
      winners: [],
      roundWinners: [],
      history: []
    };
  });

  const currentMatch = state.matches[state.currentMatchIndex];

  const selectWinner = (winner: StyleOption) => {
    const loser = currentMatch.a.id === winner.id ? currentMatch.b : currentMatch.a;
    const newHistory = [...state.history, { winner, loser, round: state.currentRound }];
    const newRoundWinners = [...state.roundWinners, winner];

    if (state.currentMatchIndex < state.matches.length - 1) {
      // Next match in current round
      setState(prev => ({
        ...prev,
        currentMatchIndex: prev.currentMatchIndex + 1,
        roundWinners: newRoundWinners,
        history: newHistory
      }));
    } else {
      // Round complete
      advanceRound(newRoundWinners, newHistory);
    }
  };

  const advanceRound = (roundWinners: StyleOption[], currentHistory: any[]) => {
    const nextRoundMap: Record<BracketPhase, BracketPhase | "results"> = {
      "round-of-16": "quarterfinals",
      "quarterfinals": "semifinals",
      "semifinals": "finals",
      "finals": "results",
      "results": "results"
    };

    const nextRound = nextRoundMap[state.currentRound];

    if (nextRound === "results") {
      // Game Over: Calculate Rankings
      const results = calculateRankings(currentHistory);
      onComplete(results);
      return;
    }

    // Prepare matches for next round
    const nextMatches: Match[] = [];
    for (let i = 0; i < roundWinners.length; i += 2) {
      nextMatches.push({ a: roundWinners[i], b: roundWinners[i+1] });
    }

    setState({
      currentRound: nextRound as BracketPhase,
      currentMatchIndex: 0,
      matches: nextMatches,
      winners: [],
      roundWinners: [],
      history: currentHistory
    });
  };

  const calculateRankings = (history: any[]): StyleOption[] => {
    // 1. Final Winner (Winner of "finals")
    const finalMatch = history.find(h => h.round === "finals");
    const winner = finalMatch.winner;
    const runnerUp = finalMatch.loser;

    // 2. Semi-finalists (excluding runner-up)
    const semiFinalMatches = history.filter(h => h.round === "semifinals");
    const semiFinalists = semiFinalMatches.map(h => h.loser);

    // We want to return [Winner, RunnerUp, Semi1, Semi2]
    return [winner, runnerUp, ...semiFinalists];
  };

  const progress = {
    round: state.currentRound,
    matchIndex: state.currentMatchIndex + 1,
    totalMatchesInRound: state.matches.length
  };

  return {
    currentMatch,
    selectWinner,
    progress,
    isComplete: state.currentRound === "results"
  };
};
