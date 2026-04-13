import { FinalReveal } from "@/components/FinalReveal";
import { GameScreen } from "@/components/GameScreen";
import { StartScreen } from "@/components/StartScreen";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { TransitionScreen } from "@/components/TransitionScreen";
import { AddonScreen } from "@/components/AddonScreen";
import { StyleDiscoveryScreen } from "@/components/StyleDiscoveryScreen";
import { StyleDiscoveryResults } from "@/components/StyleDiscoveryResults";
import { useGameEngine } from "@/hooks/useGameEngine";

export function App() {
  const { 
    state, 
    startGame, 
    skipDiscovery,
    setDiscoveryResults,
    completeStyleDiscovery,
    completeOnboarding, 
    completeAddons,
    continueToNextRound, 
    selectOption, 
    restart, 
    currentRound 
  } = useGameEngine();

  if (state.phase === "start") {
    return <StartScreen onStartDiscovery={startGame} onSkipToOnboarding={skipDiscovery} />;
  }

  if (state.phase === "onboarding") {
    return <OnboardingScreen onComplete={completeOnboarding} initialStyles={state.onboarding.styles} />;
  }

  if (state.phase === "style-discovery") {
    return <StyleDiscoveryScreen onComplete={setDiscoveryResults} />;
  }

  if (state.phase === "style-results") {
    const results = state.selection.discoveryResults || [];
    return <StyleDiscoveryResults results={results} onContinue={completeStyleDiscovery} />;
  }

  if (state.phase === "addons") {
    return <AddonScreen room={state.onboarding.room} onComplete={completeAddons} />;
  }

  // --- KITCHEN TRANSITIONS ---
  if (state.phase === "transition-to-storage") {
    return <TransitionScreen type="layout" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-appliance") {
    return <TransitionScreen type="storage" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-lighting") {
    return <TransitionScreen type="appliance" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-addons") {
    // Both Kitchen (after lighting) and Bathroom (after mirror-style) go to addons
    const lastPhase = state.onboarding.room === "bathroom" ? "mirror-style" : "lighting";
    return <TransitionScreen type={lastPhase} selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-flooring") {
    // Both Kitchen (after addons) and Bathroom (after vanity-style) go to flooring
    // Wait, type="addons" for kitchen means it shows layout image. For bathroom, type="vanity-style" shows vanity picture.
    const lastPhase = state.onboarding.room === "bathroom" ? "vanity-style" : "addons";
    return <TransitionScreen type={lastPhase} selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-countertop") {
    return <TransitionScreen type="flooring" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-cabinet") {
    return <TransitionScreen type="countertop" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  // --- BATHROOM TRANSITIONS ---
  if (state.phase === "transition-to-shower-tile-style") {
    return <TransitionScreen type="shower-type" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }
  if (state.phase === "transition-to-vanity-style") {
    return <TransitionScreen type="shower-tile-style" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-wall-treatment") {
    return <TransitionScreen type="flooring" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-vanity-finish") {
    return <TransitionScreen type="wall-treatment" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-mirror-style") {
    return <TransitionScreen type="vanity-finish" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "final" || state.complete) {
    return <FinalReveal room={state.onboarding.room} selection={state.selection} styles={state.onboarding.styles} onRestart={restart} />;
  }

  if (!currentRound || !state.roundState.currentMatch) {
    return <div className="screen center">Preparing game...</div>;
  }

  const currentPhasesArray = state.onboarding.room === "bathroom" 
    ? ["style-discovery", "style-results", "onboarding", "shower-type", "shower-tile-style", "vanity-style", "flooring", "wall-treatment", "vanity-finish", "mirror-style", "addons", "final"]
    : ["style-discovery", "style-results", "onboarding", "layout", "storage", "appliance", "lighting", "flooring", "countertop", "cabinet", "addons", "final"];

  const progress = {
    phaseIndex: currentPhasesArray.indexOf(state.phase) + 1,
    totalPhases: currentPhasesArray.length,
    remainingMatches: state.roundState.challengerQueue.length + 1,
  };

  return (
    <GameScreen
      phase={state.phase as any}
      currentRound={currentRound}
      match={state.roundState.currentMatch}
      selection={state.selection}
      room={state.onboarding.room}
      onSelect={selectOption}
      progress={progress}
    />
  );
}

