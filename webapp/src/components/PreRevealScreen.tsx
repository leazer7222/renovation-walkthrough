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

  // Path 1 logic: Discovery results exist
  const hasDiscovery = discoveryResults && discoveryResults.length > 0;
  const [path1Choice, setPath1Choice] = useState<"pure" | "mix" | null>(hasDiscovery ? "mix" : null);

  // Path 2 logic: Manual selection refinement
  const resolvedOnboardingStyles = styles.map(id => interiorStyles.find(s => s.id === id)).filter(Boolean) as StyleOption[];
  const [path2Selections, setPath2Selections] = useState<string[]>(styles);

  const handleTogglePath2 = (id: string) => {
    setPath2Selections(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(s => s !== id);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, id];
      }
    });
  };

  const handleReveal = () => {
    if (hasDiscovery) {
      if (path1Choice === "pure") {
        onComplete([discoveryResults[0].id]);
      } else {
        onComplete(discoveryResults.slice(0, 3).map(s => s.id));
      }
    } else {
      onComplete(path2Selections);
    }
  };

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
        <p className="transition-subtext" style={{ maxWidth: "500px", margin: "0.5rem auto 0" }}>
          {hasDiscovery 
            ? "Your design identity is clear. How should we apply it to your space?"
            : "Refine the styles we'll use to bring your vision to life."}
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "800px" }}>
        {hasDiscovery ? (
          /* Path 1: Discovery Results */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div 
              className={`option-card ${path1Choice === "pure" ? "selected" : ""}`}
              onClick={() => setPath1Choice("pure")}
              style={{ padding: "1.5rem", cursor: "pointer", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--card)" }}
            >
              <div className="style-card-image-wrap" style={{ aspectRatio: "16/10", marginBottom: "1rem", borderRadius: "8px" }}>
                <img src={discoveryResults[0].image} alt={discoveryResults[0].name} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>Pure {discoveryResults[0].name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Focus exclusively on your top match for a cohesive, signature look.</p>
            </div>

            <div 
              className={`option-card ${path1Choice === "mix" ? "selected" : ""}`}
              onClick={() => setPath1Choice("mix")}
              style={{ padding: "1.5rem", cursor: "pointer", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--card)" }}
            >
              <div style={{ display: "flex", gap: "2px", aspectRatio: "16/10", marginBottom: "1rem", borderRadius: "8px", overflow: "hidden" }}>
                {discoveryResults.slice(0, 3).map((s, idx) => (
                  <img key={s.id} src={s.image} alt={s.name} style={{ width: "33.33%", height: "100%", objectFit: "cover" }} />
                ))}
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>The {discoveryResults[0].name} Blend</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>A curated mix of {discoveryResults[0].name}, {discoveryResults[1].name}, and {discoveryResults[2].name}.</p>
            </div>
          </div>
        ) : (
          /* Path 2: Onboarding Styles refinement */
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            {resolvedOnboardingStyles.map(style => {
              const isSelected = path2Selections.includes(style.id);
              return (
                <div 
                  key={style.id}
                  className={`style-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleTogglePath2(style.id)}
                  style={{ flex: 1, maxWidth: "240px", cursor: "pointer" }}
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
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button className="btn-large" onClick={handleReveal}>
          {t.preRevealCta}
        </button>
      </div>
    </main>
  );
}
