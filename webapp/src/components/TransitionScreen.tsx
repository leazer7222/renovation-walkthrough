import React from "react";
import { resolveImage } from "@/lib/assetResolver";

export function TransitionScreen({
  type,
  selection,
  onContinue,
}: {
  type: "flooring" | "countertop";
  selection: { flooring: string | null; countertop: string | null; cabinet: string | null };
  onContinue: () => void;
}) {
  const imageUrl = resolveImage(
    type as any, // We pass the phase we just finished
    selection,
    selection[type] || ""
  );

  const title = type === "flooring" 
    ? "Great choice!" 
    : "Your kitchen is coming together!";
  
  const subtext = type === "flooring"
    ? "Now let's choose a countertop that works with your floor."
    : "Now let's find the cabinet style to complete your kitchen.";

  return (
    <main className="screen center transition-screen">
      <h2 className="selection-label">Selection Saved</h2>
      <h1 className="transition-title">{title}</h1>
      <p className="transition-subtext">{subtext}</p>
      
      <img src={imageUrl} alt="Selected" className="transition-image" />
      
      <div>
        <button className="btn-large" onClick={onContinue}>
          Continue
        </button>
      </div>
    </main>
  );
}
