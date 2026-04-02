import { FinalReveal } from "@/components/FinalReveal";
import { GameScreen } from "@/components/GameScreen";
import { StartScreen } from "@/components/StartScreen";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { TransitionScreen } from "@/components/TransitionScreen";
import { useGameEngine } from "@/hooks/useGameEngine";

export function App() {
  const { 
    state, 
    startGame, 
    completeOnboarding, 
    continueToNextRound, 
    selectOption, 
    restart, 
    currentRound 
  } = useGameEngine();

  if (state.phase === "start") {
    return <StartScreen onStart={startGame} />;
  }

  if (state.phase === "onboarding") {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  if (state.phase === "transition-to-countertop") {
    return (
      <TransitionScreen 
        type="flooring" 
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
  }

  if (state.phase === "transition-to-cabinet") {
    return (
      <TransitionScreen 
        type="countertop" 
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
  }

  if (state.phase === "final" || state.complete) {
    return <FinalReveal selection={state.selection} onRestart={restart} />;
  }

  if (!currentRound || !state.roundState.currentMatch) {
    return <div className="screen center">Preparing game...</div>;
  }

  const progress = {
    phaseIndex: ["flooring", "countertop", "cabinet"].indexOf(state.phase) + 1,
    totalPhases: 3,
    remainingMatches: state.roundState.challengerQueue.length + 1,
  };

  return (
    <GameScreen
      phase={state.phase as any}
      currentRound={currentRound}
      match={state.roundState.currentMatch}
      selection={state.selection}
      onSelect={selectOption}
      progress={progress}
    />
  );
}

