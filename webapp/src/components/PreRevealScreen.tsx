import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { StyleOption, interiorStyles } from "@/config/styleDiscoveryConfig";

interface StyleClarificationProps {
  room: string;
  styles: string[];
  discoveryResults?: StyleOption[];
  onComplete: (finalStyles: string[]) => void;
}

export function PreRevealScreen({
  room,
  styles,
  discoveryResults,
  onComplete,
}: StyleClarificationProps) {
  const { t } = useLanguage();
  const roomName = room === "living-room" ? t.livingRoom : room === "bathroom" ? t.bathroom : t.kitchen;

  // Path 1 logic: Discovery results exist (Bracket Game)
  const hasDiscovery = discoveryResults && discoveryResults.length > 0;
  
  // Initialize with top 3 if discovery, or onboarding styles if not
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    hasDiscovery 
      ? discoveryResults.slice(0, 3).map(s => s.id) 
      : styles
  );

  const handleToggleStyle = (id: string) => {
    setSelectedStyles(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(s => s !== id);
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, id];
      }
    });
  };

  const handleReveal = () => {
    onComplete(selectedStyles);
  };

  // Resolve objects for display
  const displayStyles = hasDiscovery 
    ? discoveryResults 
    : styles.map(id => interiorStyles.find(s => s.id === id)).filter(Boolean) as StyleOption[];

  return (
    <main className="screen center transition-screen" style={{ gap: "1.5rem", padding: "2rem" }}>
      <img
        src="/logo.png"
        alt="ReformAI"
        style={{ width: "120px", height: "auto", objectFit: "contain" }}
      />

      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <h1 className="transition-title" style={{ fontSize: "2rem" }}>
          ReformAI {t.preRevealBuilding} {roomName}
        </h1>
        <p className="transition-subtext" style={{ maxWidth: "600px", margin: "0.5rem auto 0" }}>
          {hasDiscovery 
            ? "Your bracket results are in. Select 1 to 4 of your top styles to define the final design."
            : "Refine the styles we'll use to bring your vision to life (pick 1-3)."}
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "1000px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {displayStyles.map(style => {
            const isSelected = selectedStyles.includes(style.id);
            return (
              <div 
                key={style.id}
                className={`style-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggleStyle(style.id)}
                style={{ flex: "1 1 200px", maxWidth: "240px", cursor: "pointer" }}
              >
                <div className="style-card-image-wrap">
                  <img src={style.image} alt={style.name} />
                  {isSelected && <div className="style-card-check">✓</div>}
                </div>
                <div className="style-card-label">{style.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button className="btn-large" onClick={handleReveal}>
          {t.preRevealCta}
        </button>
      </div>
    </main>
  );
}
