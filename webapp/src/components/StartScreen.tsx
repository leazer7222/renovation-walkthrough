import React from "react";
import { landingConfig } from "@/config/landingConfig";

interface StartScreenProps {
  onStartDiscovery: () => void;
  onSkipToOnboarding: () => void;
}

export function StartScreen({ onStartDiscovery, onSkipToOnboarding }: StartScreenProps) {
  return (
    <main className="screen center start-screen">
      <div className="branding-wrap">
        <span className="brand-name">Reform-A.i</span>
        <span className="brand-tagline">Renovation Made Easy</span>
      </div>
      
      <h1 className="landing-title">{landingConfig.headline}</h1>
      <p className="landing-subtitle">{landingConfig.subheadline}</p>

      <div className="choice-container">
        <div className="choice-card discovery" onClick={onStartDiscovery}>
          <div className="choice-icon">🏆</div>
          <div className="choice-content">
            <h3>Discover Your Style</h3>
            <p>Play the Style Bracket game to find your perfect design match.</p>
          </div>
          <button className="btn-large">Start Bracket</button>
        </div>

        <div className="choice-card direct" onClick={onSkipToOnboarding}>
          <div className="choice-icon">🏗️</div>
          <div className="choice-content">
            <h3>Start Your Renovation</h3>
            <p>Skip the game and go straight to building your space.</p>
          </div>
          <button className="btn-large btn-secondary">Build My Space</button>
        </div>
      </div>

      <p className="microcopy">{landingConfig.microcopy}</p>
    </main>
  );
}
