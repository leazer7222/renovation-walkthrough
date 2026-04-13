import React from "react";
import { useStyleDiscoveryEngine } from "@/hooks/useStyleDiscoveryEngine";
import { StyleComparisonCard } from "./StyleComparisonCard";
import { StyleOption } from "@/config/styleDiscoveryConfig";

interface StyleDiscoveryScreenProps {
  onComplete: (results: StyleOption[]) => void;
}

export function StyleDiscoveryScreen({ onComplete }: StyleDiscoveryScreenProps) {
  const { currentMatch, selectWinner, progress } = useStyleDiscoveryEngine(onComplete);

  if (!currentMatch) return null;

  const roundNameMap: Record<string, string> = {
    "round-of-16": "Round of 16",
    "quarterfinals": "Quarterfinals",
    "semifinals": "Semifinals",
    "finals": "The Final Round"
  };

  return (
    <main className="screen style-discovery-screen">
      <header className="discovery-header-main">
        <div className="discovery-progress-info">
          <span className="step-indicator">Step 1: Style Discovery</span>
          <h1 className="question-title">{roundNameMap[progress.round]}</h1>
          <p className="question-subtitle">
            Match {progress.matchIndex} of {progress.totalMatchesInRound} — Pick your favorite style to advance it.
          </p>
        </div>
      </header>

      <div className="discovery-bracket-row">
        <StyleComparisonCard 
          style={currentMatch.a} 
          onSelect={() => selectWinner(currentMatch.a)} 
        />
        <div className="discovery-vs">VS</div>
        <StyleComparisonCard 
          style={currentMatch.b} 
          onSelect={() => selectWinner(currentMatch.b)} 
        />
      </div>
    </main>
  );
}
