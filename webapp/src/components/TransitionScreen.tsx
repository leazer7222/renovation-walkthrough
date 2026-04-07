import React from "react";
import { resolveImage } from "@/lib/assetResolver";

export function TransitionScreen({
  type,
  selection,
  onContinue,
}: {
  type: string;
  selection: any;
  onContinue: () => void;
}) {
  let resolveType = type;
  let resolveOption = selection[type] || "";

  if (type === "addons") {
    resolveType = "layout";
    resolveOption = selection.layout || "";
  }

  const imageUrl = resolveImage(
    resolveType as any,
    selection,
    resolveOption
  );

  const title = "Great choice!";
  
  let subtext = "Now let's continue building your design.";
  if (type === "layout") subtext = "Now let's choose a storage style.";
  if (type === "storage") subtext = "Next up: appliances.";
  if (type === "appliance") subtext = "Let's illuminate your space with some lighting choices.";
  if (type === "lighting") subtext = "Time to consider any premium add-ons.";
  if (type === "addons") subtext = "Now for the fun part: let's pick your materials! Starting with flooring.";
  if (type === "flooring") subtext = "Now let's choose a countertop that works with your floor.";
  if (type === "countertop") subtext = "Now let's find the cabinet style to complete your kitchen.";

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
