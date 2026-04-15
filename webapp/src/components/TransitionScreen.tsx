import React from "react";
import { resolveImage } from "@/lib/assetResolver";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/translations";

function getSubtext(t: Translations, type: string, room: string): string {
  if (room === "kitchen") {
    if (type === "layout") return t.kitchen_layout_next;
    if (type === "storage") return t.kitchen_storage_next;
    if (type === "appliance") return t.kitchen_appliance_next;
    if (type === "lighting") return t.kitchen_lighting_next;
    if (type === "addons") return t.kitchen_addons_next;
    if (type === "flooring") return t.kitchen_flooring_next;
    if (type === "countertop") return t.kitchen_countertop_next;
  }
  if (room === "bathroom") {
    if (type === "shower-type") return t.bathroom_showerType_next;
    if (type === "shower-tile-style") return t.bathroom_showerTileStyle_next;
    if (type === "vanity-style") return t.bathroom_vanityStyle_next;
    if (type === "flooring") return t.bathroom_flooring_next;
    if (type === "wall-treatment") return t.bathroom_wallTreatment_next;
    if (type === "vanity-finish") return t.bathroom_vanityFinish_next;
    if (type === "mirror-style") return t.bathroom_mirrorStyle_next;
  }
  if (room === "living-room") {
    if (type === "layout") return t.livingRoom_layout_next;
    if (type === "flooring-material") return t.livingRoom_flooringMaterial_next;
    if (type === "seating-config") return t.livingRoom_seatingConfig_next;
    if (type === "wall-treatment") return t.livingRoom_wallTreatment_next;
    if (type === "rug") return t.livingRoom_rug_next;
  }
  return t.nowLetsContinue;
}

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
  const { t } = useLanguage();

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

  const subtext = getSubtext(t, type, room);

  return (
    <main className="screen center transition-screen">
      <h2 className="selection-label">{t.selectionSaved}</h2>
      <h1 className="transition-title">{t.greatChoice}</h1>
      <p className="transition-subtext">{subtext}</p>

      <img src={imageUrl} alt="Selected" className="transition-image" />

      <div>
        <button className="btn-large" onClick={onContinue}>
          {t.continueBtn}
        </button>
      </div>
    </main>
  );
}
