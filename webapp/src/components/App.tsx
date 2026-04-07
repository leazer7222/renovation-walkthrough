import { FinalReveal } from "@/components/FinalReveal";
import { GameScreen } from "@/components/GameScreen";
import { StartScreen } from "@/components/StartScreen";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { TransitionScreen } from "@/components/TransitionScreen";
import { AddonScreen } from "@/components/AddonScreen";
import { useGameEngine } from "@/hooks/useGameEngine";

export function App() {
  const { 
    state, 
    startGame, 
    completeOnboarding, 
    completeAddons,
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

  if (state.phase === "addons") {
    return <AddonScreen onComplete={completeAddons} />;
  }

  if (state.phase === "transition-to-storage") {
    return (
      <TransitionScreen 
        type="layout" 
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
  }

  if (state.phase === "transition-to-appliance") {
    return (
      <TransitionScreen 
        type="storage" 
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
  }

  if (state.phase === "transition-to-lighting") {
    return (
      <TransitionScreen 
        type="appliance" 
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
  }

  if (state.phase === "transition-to-addons") {
    return (
      <TransitionScreen 
        type="lighting" 
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
  }

  if (state.phase === "transition-to-flooring") {
    return (
      <TransitionScreen 
        type="addons" // technically addons have no visuals here, just transition
        selection={state.selection} 
        onContinue={continueToNextRound} 
      />
    );
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
    return <FinalReveal selection={state.selection} styles={state.onboarding.styles} onRestart={restart} />;
  }

  if (!currentRound || !state.roundState.currentMatch) {
    return <div className="screen center">Preparing game...</div>;
  }

  const progress = {
    // Phases: layout, storage, appliance, lighting, flooring, countertop, cabinet (7 total A/B phases + addons)
    phaseIndex: ["layout", "storage", "appliance", "lighting", "flooring", "countertop", "cabinet"].indexOf(state.phase) + 1,
    totalPhases: 7,
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

