import React from "react";
import { resolveImage } from "@/lib/assetResolver";

export function TransitionScreen({
  type,
  selection,
  room,
  onContinue,
}: {
  type: string;
  selection: any;
  room: string;
  onContinue: () => void;
}) {
  let resolveType = type;
  const selectionKey = type.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  let resolveOption = selection[selectionKey] || selection[type] || "";

  if (type === "addons") {
    resolveType = "layout";
    resolveOption = selection.layout || "";
  }

  const imageUrl = resolveImage(
    resolveType as any,
    selection,
    resolveOption,
    room
  );

  const title = "Great choice!";
  
  let subtext = "Now let's continue building your design.";
  // Kitchen transitions
  if (room === "kitchen") {
    if (type === "layout") subtext = "Now let's choose a storage style.";
    if (type === "storage") subtext = "Next up: appliances.";
    if (type === "appliance") subtext = "Let's illuminate your space with some lighting choices.";
    if (type === "lighting") subtext = "Time to consider any premium add-ons.";
    if (type === "addons") subtext = "Now for the fun part: let's pick your materials! Starting with flooring.";
    if (type === "flooring") subtext = "Now let's choose a countertop that works with your floor.";
    if (type === "countertop") subtext = "Now let's find the cabinet style to complete your kitchen.";
  }
  
  // Bathroom transitions
  if (room === "bathroom") {
    if (type === "shower-type") subtext = "Next, let's design the shower tile.";
    if (type === "shower-tile-style") subtext = "Now let's select a vanity style.";
    if (type === "vanity-style") subtext = "Now let's ground the space with some flooring.";
    if (type === "flooring") subtext = "Now let's choose your wall treatment.";
    if (type === "wall-treatment") subtext = "Let's define the finish for your vanity.";
    if (type === "vanity-finish") subtext = "Almost there! Let's pick a mirror style.";
    if (type === "mirror-style") subtext = "Time to consider any premium bathroom add-ons.";
  }

  // Living Room transitions
  if (room === "living-room") {
    if (type === "layout") subtext = "Great layout! Now let's decide on the flooring material.";
    if (type === "flooring-material") subtext = "Excellent floor. Next: let's configure your seating.";
    if (type === "seating-config") subtext = "Comfort is key. Now let's pick a wall treatment for your living space.";
    if (type === "wall-treatment") subtext = "Looking sharp! Let's find a rug to ground the room.";
    if (type === "rug") subtext = "Last step! Let's illuminate your living room with a lighting choice.";
  }

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
