import React from "react";
import { StyleOption } from "@/config/styleDiscoveryConfig";

interface StyleDiscoveryResultsProps {
  results: StyleOption[];
  onContinue: (topStyles: string[]) => void;
}

export function StyleDiscoveryResults({ results, onContinue }: StyleDiscoveryResultsProps) {
  // results is [Winner, RunnerUp, Semi1, Semi2]
  const top4 = results;

  return (
    <main className="screen results-screen">
      <header className="center" style={{ marginBottom: "3rem" }}>
        <h1 className="question-title">Your Design Identity</h1>
        <p className="question-subtitle">These are the styles that best match your preferences.</p>
      </header>

      <div className="results-grid">
        {top4.map((style, index) => {
          const rankLabel = index === 0 ? "Winner" : index === 1 ? "Runner Up" : "Semi-Finalist";
          const isTop3 = index < 3;
          
          return (
            <div key={style.id} className={`result-card ${index === 0 ? "winner" : ""}`}>
              <div className="result-rank-badge">{rankLabel}</div>
              <div className="result-image-wrap">
                <img src={style.image} alt={style.name} />
              </div>
              <div className="result-info">
                <h3>{style.name}</h3>
                <p className="result-tagline">{style.tagline}</p>
                <ul className="result-details">
                  {style.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="center" style={{ marginTop: "4rem" }}>
        <button 
          className="btn-large" 
          onClick={() => onContinue(results.slice(0, 3).map(s => s.id))}
        >
          Use These Styles for My Project
        </button>
      </div>
    </main>
  );
}
