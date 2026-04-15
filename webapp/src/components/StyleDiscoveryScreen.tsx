import React from "react";
import { useStyleDiscoveryEngine } from "@/hooks/useStyleDiscoveryEngine";
import { StyleComparisonCard } from "./StyleComparisonCard";
import { StyleOption } from "@/config/styleDiscoveryConfig";
import { useLanguage } from "@/i18n/LanguageContext";

interface StyleDiscoveryScreenProps {
  onComplete: (results: StyleOption[]) => void;
}

export function StyleDiscoveryScreen({ onComplete }: StyleDiscoveryScreenProps) {
  const { t } = useLanguage();
  const { currentMatch, selectWinner, progress } = useStyleDiscoveryEngine(onComplete);

  if (!currentMatch) return null;

  const roundNameMap: Record<string, string> = {
    "round-of-16": t.roundOf16,
    "quarterfinals": t.quarterfinals,
    "semifinals": t.semifinals,
    "finals": t.theFinalRound,
  };

  return (
    <main className="screen style-discovery-screen">
      <header className="discovery-header-main">
        <div className="discovery-progress-info">
          <span className="step-indicator">{t.step1StyleDiscovery}</span>
          <h1 className="question-title">{roundNameMap[progress.round]}</h1>
          <p className="question-subtitle">
            {t.matchXofY(progress.matchIndex, progress.totalMatchesInRound)}
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
