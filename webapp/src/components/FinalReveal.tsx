import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";

export function FinalReveal({
  selection,
  onRestart,
}: {
  selection: { flooring: string | null; countertop: string | null; cabinet: string | null };
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

  return (
    <main className="screen final-reveal">
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p className="selection-label">Project Complete</p>
        <h1 className="transition-title">Your Kitchen Reveal</h1>
      </header>

      <img src={finalImageUrl} alt="Final Kitchen Design" className="hero-image" />

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


