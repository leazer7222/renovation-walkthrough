import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";
import { bathroomRoundOrder } from "@/config/bathroomConfig";
import { livingRoomRoundOrder } from "@/config/livingRoomConfig";

export function CurrentSelectionsBar({
  phase,
  selection,
  room,
}: {
  phase: string;
  selection: any;
  room: string;
}) {
  const isBathroom = room === "bathroom";
  const isLivingRoom = room === "living-room";
  const sourceOrder = isLivingRoom ? livingRoomRoundOrder : (isBathroom ? bathroomRoundOrder : roundOrder);
  const categories = sourceOrder.map((r) => {
    const selectionKey = r.phase.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const selectedId = selection[selectionKey] || selection[r.phase];
    const selectedOption = r.options.find((o) => o.id === selectedId);
    
    let thumb = "/placeholder.png";
    if (selectedId) {
      thumb = resolveImage(
        r.phase as any,
        selection,
        selectedId,
        room
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
