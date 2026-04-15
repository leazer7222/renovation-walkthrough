import React, { useState } from "react";
import { bathroomAddons } from "@/config/bathroomConfig";
import { useLanguage } from "@/i18n/LanguageContext";

const availableAddons = [
  {
    id: "wine-fridge",
    label: "Wine Fridge",
    description: "Dedicated climate-controlled wine storage",
    image: "/visualization-library/comparison/kitchen/prototype/design-elements/appliance-style/wine-fridge/wine-fridge.png"
  },
  {
    id: "under-cabinet-ambient-glow",
    label: "Under Cabinet Ambient Glow",
    description: "Soft, integrated lighting beneath upper cabinets",
    image: "/visualization-library/comparison/kitchen/prototype/design-elements/lighting-style/under-cabinet-ambient-glow/under-cabinet-ambient-glow.png"
  },
];

export function AddonScreen({
  room,
  onComplete,
}: {
  room: string;
  onComplete: (addons: Record<string, boolean>) => void;
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const addonsList = room === "bathroom" ? bathroomAddons : availableAddons;

  const toggleAddon = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="screen center onboarding-screen">
      <div className="onboarding-step">
        <header className="onboarding-header">
          <p className="step-indicator">{t.addonsStepLabel}</p>
          <h2 className="question-title">{t.addonsTitle}</h2>
          <p className="question-subtitle">{t.addonsSubtitle}</p>
        </header>

        <div className="styles-grid">
          {addonsList.map((addon) => {
            const isSelected = !!selected[addon.id];
            const label = t.addonLabels[addon.id] ?? addon.label;
            return (
              <div
                key={addon.id}
                className={`style-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className="style-card-image-wrap">
                  <img src={addon.image} alt={label} />
                  {isSelected && <div className="style-card-check">✓</div>}
                </div>
                <div className="style-card-label">{label}</div>
              </div>
            );
          })}
        </div>

        <div className="onboarding-nav" style={{ justifyContent: "flex-end", marginTop: "2rem" }}>
          <button className="btn-large" onClick={() => onComplete(selected)}>
            {t.viewFinalReveal}
          </button>
        </div>
      </div>
    </main>
  );
}
