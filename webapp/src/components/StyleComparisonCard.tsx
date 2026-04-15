import React from "react";
import { StyleOption } from "@/config/styleDiscoveryConfig";
import { useLanguage } from "@/i18n/LanguageContext";

interface StyleComparisonCardProps {
  style: StyleOption;
  onSelect: () => void;
}

export function StyleComparisonCard({ style, onSelect }: StyleComparisonCardProps) {
  const { t } = useLanguage();

  return (
    <div className="discovery-card" onClick={onSelect}>
      <div className="discovery-image-wrap">
        <img src={style.image} alt={style.name} />
      </div>
      <div className="discovery-content">
        <div className="discovery-header">
          <h2 className="discovery-name">{style.name}</h2>
          <p className="discovery-tagline">{style.tagline}</p>
        </div>
        <ul className="discovery-description">
          {style.description.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <button className="btn-large discovery-btn">{t.selectThisStyle}</button>
      </div>
    </div>
  );
}
