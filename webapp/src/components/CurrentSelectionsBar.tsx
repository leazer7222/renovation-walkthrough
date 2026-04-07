import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";

export function CurrentSelectionsBar({
  phase,
  selection,
}: {
  phase: string;
  selection: any;
}) {
  const categories = roundOrder.map((r) => {
    const selectedId = selection[r.phase as keyof typeof selection];
    const selectedOption = r.options.find((o) => o.id === selectedId);
    
    let thumb = "/placeholder.png";
    if (selectedId) {
      thumb = resolveImage(
        r.phase as any,
        selection,
        selectedId
      );
    }

    return {
      phase: r.phase,
      label: r.label,
      value: selectedOption ? selectedOption.label : "Choosing now",
      thumb,
      active: r.phase === phase,
      selected: !!selectedId,
    };
  });

  return (
    <div className="selections-bar">
      {categories.map((c) => (
        <div key={c.phase} className={`selection-item ${c.active ? "active" : ""}`}>
          <img src={c.thumb} alt={c.label} className="selection-thumb" />
          <div className="selection-info">
            <span className="selection-label">{c.label}</span>
            <span className="selection-value">
              {c.active && !c.selected ? "Choosing now" : c.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
