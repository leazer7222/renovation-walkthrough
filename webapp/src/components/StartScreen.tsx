import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface StartScreenProps {
  onStartDiscovery: () => void;
  onSkipToOnboarding: () => void;
}

export function StartScreen({ onStartDiscovery, onSkipToOnboarding }: StartScreenProps) {
  const { t } = useLanguage();

  return (
    <main className="screen center start-screen">
      <div className="branding-wrap">
        <span className="brand-name">Reform-A.i</span>
        <span className="brand-tagline">{t.brandTagline}</span>
      </div>

      <h1 className="landing-title">{t.landingHeadline}</h1>
      <p className="landing-subtitle">{t.landingSubheadline}</p>

      <div className="choice-container">
        <div className="choice-card discovery" onClick={onStartDiscovery}>
          <div className="choice-icon">🏆</div>
          <div className="choice-content">
            <h3>{t.discoverYourStyle}</h3>
            <p>{t.discoverYourStyleDesc}</p>
          </div>
          <button className="btn-large">{t.startBracket}</button>
        </div>

        <div className="choice-card direct" onClick={onSkipToOnboarding}>
          <div className="choice-icon">🏗️</div>
          <div className="choice-content">
            <h3>{t.startYourRenovation}</h3>
            <p>{t.startYourRenovationDesc}</p>
          </div>
          <button className="btn-large btn-secondary">{t.buildMySpace}</button>
        </div>
      </div>

      <p className="microcopy">{t.landingMicrocopy}</p>
    </main>
  );
}
