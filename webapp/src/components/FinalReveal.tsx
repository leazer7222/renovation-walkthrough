import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";
import {
  getTraitsForSelections,
  countTraits,
  getDominantTraits,
  generateDesignSummary,
  generateDesignHeadline,
  formatDisplayLabel,
  flooringInsight,
  countertopInsight,
  cabinetInsight,
  generatePromptDescription
} from "@/lib/designTraits";

export function FinalReveal({
  selection,
  styles,
  onRestart,
}: {
  selection: any;
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
  const headline = generateDesignHeadline(dominantTraits);
  const summary = generateDesignSummary(dominantTraits);
  const styledDisplay = styles.map(formatDisplayLabel).join(", ");
  
  const yourStylePrompt = generatePromptDescription(styles, selection);

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
          <p style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--foreground)" }}>{headline}</p>
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

        <div className="insight-section prompt-section" style={{ padding: "1.5rem", backgroundColor: "var(--primary-light)", borderRadius: "8px", marginTop: "2rem" }}>
          <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--primary)", opacity: 0.9, marginBottom: "0.5rem" }}>
            Ready to Visualize?
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--foreground)", opacity: 0.8, marginBottom: "1rem" }}>
            Copy and paste this generated prompt into Midjourney or DALL-E to visualize your dream kitchen.
          </p>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontStyle: "italic", fontWeight: 400, userSelect: "all", cursor: "pointer", background: "rgba(0,0,0,0.05)", padding: "1rem", borderRadius: "4px" }} onClick={(e) => {
               navigator.clipboard.writeText(e.currentTarget.innerText);
               alert("Prompt Copied!");
          }}>
            {yourStylePrompt}
          </p>
        </div>
      </div>

      <div className="reveal-summary">
        <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "1rem", marginTop: "1rem" }}>
          Your Complete Selections
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem" }}>
          {["layout", "storage", "appliance", "lighting", "flooring", "countertop", "cabinet"].map(phase => {
            const id = (selection as any)[phase];
            if (!id) return null;
            const thumbUrl = resolveImage(phase as any, selection, id);
            return (
              <div key={phase} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <img src={thumbUrl} alt={phase} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)" }} />
                <div>
                  <div style={{ fontSize: "0.65rem", textTransform: "uppercase", opacity: 0.7 }}>{phase.replace("-", " ")}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.2 }}>{getLabel(phase, id)}</div>
                </div>
              </div>
            );
          })}
        </div>
        {Object.keys(selection.addons || {}).filter(k => selection.addons[k]).length > 0 && (
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem" }}>Add-Ons</div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {Object.keys(selection.addons || {}).filter(k => selection.addons[k]).map(k => (
                 <span key={k} style={{ fontSize: "0.85rem", padding: "0.3rem 0.6rem", background: "var(--primary-light)", borderRadius: "4px" }}>
                   {formatDisplayLabel(k)}
                 </span>
              ))}
            </div>
          </div>
        )}
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


