import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";
import {
  getTraitsForSelections,
  countTraits,
  getDominantTraits,
  generateDesignSummary,
  formatDisplayLabel,
  flooringInsight,
  countertopInsight,
  cabinetInsight
} from "@/lib/designTraits";

export function FinalReveal({
  selection,
  styles,
  onRestart,
}: {
  selection: { flooring: string | null; countertop: string | null; cabinet: string | null };
  styles: string[];
  onRestart: () => void;
}) {
  const finalImageUrl = resolveImage(
    "cabinet",
    selection,
    selection.cabinet || ""
  );

  const getLabel = (phase: string, id: string | null) => {
    if (!id) return "Not selected";
    const round = roundOrder.find(r => r.phase === phase);
    return round?.options.find(o => o.id === id)?.label || id;
  };

  const traits = getTraitsForSelections(selection);
  const traitCounts = countTraits(traits);
  const dominantTraits = getDominantTraits(traitCounts);
  const summary = generateDesignSummary(dominantTraits);
  const styledDisplay = styles.map(formatDisplayLabel).join(", ");

  return (
    <main className="screen final-reveal">
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p className="selection-label">Project Complete</p>
        <h1 className="transition-title">Your Kitchen Reveal</h1>
      </header>

      <img src={finalImageUrl} alt="Final Kitchen Design" className="hero-image" style={{ marginBottom: "2rem" }} />

      <div className="design-insight" style={{ marginBottom: "3rem" }}>
        {styles.length > 0 && (
          <div className="insight-section" style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.5rem" }}>
              Inspired by your selections
            </h3>
            <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{styledDisplay}</p>
          </div>
        )}

        <div className="insight-section" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.5rem" }}>
            How your final design reflects that direction
          </h3>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.5 }}>{summary}</p>
        </div>

        <div className="insight-section" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.5rem" }}>
            Why it works
          </h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", lineHeight: 1.6, fontSize: "1rem" }}>
            {selection.flooring && flooringInsight[selection.flooring] && (
               <li style={{ marginBottom: "0.25rem" }}>{flooringInsight[selection.flooring]}</li>
            )}
            {selection.countertop && countertopInsight[selection.countertop] && (
               <li style={{ marginBottom: "0.25rem" }}>{countertopInsight[selection.countertop]}</li>
            )}
            {selection.cabinet && cabinetInsight[selection.cabinet] && (
               <li style={{ marginBottom: "0.25rem" }}>{cabinetInsight[selection.cabinet]}</li>
            )}
          </ul>
        </div>
      </div>

      <div className="reveal-summary">
        <div className="reveal-item">
          <span className="reveal-label">Flooring</span>
          <span className="reveal-value">{getLabel("flooring", selection.flooring)}</span>
        </div>
        <div className="reveal-item">
          <span className="reveal-label">Countertop</span>
          <span className="reveal-value">{getLabel("countertop", selection.countertop)}</span>
        </div>
        <div className="reveal-item">
          <span className="reveal-label">Cabinet</span>
          <span className="reveal-value">{getLabel("cabinet", selection.cabinet)}</span>
        </div>
      </div>

      <div className="action-row">
        <button className="btn-large" onClick={onRestart}>
          Restart Game
        </button>
        <button className="btn-large btn-secondary" onClick={() => alert("Design Saved! (Placeholder)")}>
          Save Design
        </button>
      </div>
    </main>
  );
}


