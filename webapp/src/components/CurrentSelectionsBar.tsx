import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";
import { bathroomRoundOrder } from "@/config/bathroomConfig";
import { livingRoomRoundOrder } from "@/config/livingRoomConfig";
import { useLanguage } from "@/i18n/LanguageContext";

export function CurrentSelectionsBar({
  phase,
  selection,
  room,
}: {
  phase: string;
  selection: any;
  room: string;
}) {
  const { t } = useLanguage();
  const isBathroom = room === "bathroom";
  const isLivingRoom = room === "living-room";
  const sourceOrder = isLivingRoom ? livingRoomRoundOrder : (isBathroom ? bathroomRoundOrder : roundOrder);

  const categories = sourceOrder.map((r) => {
    const selectionKey = r.phase.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const selectedId = selection[selectionKey] || selection[r.phase];
    const selectedOption = r.options.find((o) => o.id === selectedId);

    let thumb = "/placeholder.png";
    if (selectedId) {
      thumb = resolveImage(r.phase as any, selection, selectedId, room);
    }

    const optLabels = t.phaseOptionLabels[r.phase] ?? {};
    const translatedOptionLabel = selectedOption
      ? (optLabels[selectedOption.id] ?? selectedOption.label)
      : t.choosingNow;

    return {
      phase: r.phase,
      label: t.phaseLabels[r.phase] ?? r.label,
      value: translatedOptionLabel,
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
              {c.active && !c.selected ? t.choosingNow : c.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
