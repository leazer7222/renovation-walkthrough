import { FinalReveal } from "@/components/FinalReveal";
import { GameScreen } from "@/components/GameScreen";
import { StartScreen } from "@/components/StartScreen";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { TransitionScreen } from "@/components/TransitionScreen";
import { PreRevealScreen } from "@/components/PreRevealScreen";
import { AddonScreen } from "@/components/AddonScreen";
import { StyleDiscoveryScreen } from "@/components/StyleDiscoveryScreen";
import { StyleDiscoveryResults } from "@/components/StyleDiscoveryResults";
import { Header } from "@/components/Header";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useGameEngine } from "@/hooks/useGameEngine";
import { useLanguage } from "@/i18n/LanguageContext";
import { KITCHEN_PHASE_ORDER, BATHROOM_PHASE_ORDER, LIVING_ROOM_PHASE_ORDER } from "@/lib/types";

function AppScreen() {
  const { t } = useLanguage();
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
  if (state.phase === "transition-to-storage" && state.onboarding.room === "kitchen") {
    return <TransitionScreen type="layout" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-appliance" && state.onboarding.room === "kitchen") {
    return <TransitionScreen type="storage" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-lighting" && state.onboarding.room === "kitchen") {
    return <TransitionScreen type="appliance" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-addons") {
    const lastPhase = state.onboarding.room === "bathroom" ? "mirror-style" : "lighting";
    return <TransitionScreen type={lastPhase} selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-flooring" && state.onboarding.room !== "living-room") {
    const lastPhase = state.onboarding.room === "bathroom" ? "vanity-style" : "addons";
    return <TransitionScreen type={lastPhase} selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-countertop" && state.onboarding.room === "kitchen") {
    return <TransitionScreen type="flooring" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-cabinet" && state.onboarding.room === "kitchen") {
    return <TransitionScreen type="countertop" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  // --- BATHROOM TRANSITIONS ---
  if (state.phase === "transition-to-shower-tile-style") {
    return <TransitionScreen type="shower-type" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }
  if (state.phase === "transition-to-vanity-style") {
    return <TransitionScreen type="shower-tile-style" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-wall-treatment" && state.onboarding.room === "bathroom") {
    return <TransitionScreen type="flooring" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-vanity-finish") {
    return <TransitionScreen type="wall-treatment" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-mirror-style" && state.onboarding.room === "bathroom") {
    return <TransitionScreen type="vanity-finish" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  // --- LIVING ROOM TRANSITIONS ---
  if (state.phase === "transition-to-flooring-material") {
    return <TransitionScreen type="layout" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-seating-config") {
    return <TransitionScreen type="flooring-material" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-wall-treatment" && state.onboarding.room === "living-room") {
    return <TransitionScreen type="seating-config" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-rug") {
    return <TransitionScreen type="wall-treatment" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-lighting" && state.onboarding.room === "living-room") {
    return <TransitionScreen type="rug" selection={state.selection} room={state.onboarding.room} onContinue={continueToNextRound} />;
  }

  if (state.phase === "transition-to-final") {
    return (
      <PreRevealScreen
        room={state.onboarding.room}
        styles={state.onboarding.styles}
        discoveryResults={state.selection.discoveryResults}
        onComplete={(finalStyles) => {
          updateFinalStyles(finalStyles);
          continueToNextRound();
        }}
      />
    );
  }

  if (state.phase === "final" || state.complete) {
    return <FinalReveal room={state.onboarding.room} selection={state.selection} styles={state.onboarding.styles} onRestart={restart} />;
  }

  if (!currentRound || !state.roundState.currentMatch) {
    return <div className="screen center">{t.preparingGame}</div>;
  }

  const currentPhasesArray = state.onboarding.room === "bathroom"
    ? BATHROOM_PHASE_ORDER
    : state.onboarding.room === "living-room"
      ? LIVING_ROOM_PHASE_ORDER
      : KITCHEN_PHASE_ORDER;

  const progress = {
    phaseIndex: currentPhasesArray.indexOf(state.phase) + 1,
    totalPhases: currentPhasesArray.length,
    remainingMatches: state.roundState.challengerQueue.length + 1,
  };

  return (
    <GameScreen
      phase={state.phase}
      currentRound={currentRound}
      match={state.roundState.currentMatch}
      selection={state.selection}
      room={state.onboarding.room}
      onSelect={selectOption}
      progress={progress}
    />
  );
}

export function App() {
  return (
    <>
      <Header />
      <LanguageToggle />
      <div style={{ paddingTop: "100px" }}>
        <AppScreen />
      </div>
    </>
  );
}
