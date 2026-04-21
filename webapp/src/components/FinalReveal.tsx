import React, { useEffect, useState } from "react";
import { Download, RefreshCw, RotateCcw, Bookmark } from "lucide-react";
import { resolveImage } from "@/lib/assetResolver";
import { roundOrder } from "@/config/kitchenConfig";
import { bathroomRoundOrder } from "@/config/bathroomConfig";
import { livingRoomRoundOrder } from "@/config/livingRoomConfig";
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
  livingRoomFlooringInsight,
  seatingInsight,
  livingRoomWallInsight,
  generatePrompts,
} from "@/lib/designTraits";
import { useLanguage } from "@/i18n/LanguageContext";
import { generateVisualization, isVisualizationLimitReached } from "@/services/visualizationApi";

export function FinalReveal({
  room,
  selection,
  styles,
  onRestart,
}: {
  room: string;
  selection: any;
  styles: string[];
  onRestart: () => void;
}) {
  const { t } = useLanguage();
  const isBathroom = room === "bathroom";
  const isLivingRoom = room === "living-room";

  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(isVisualizationLimitReached());

  const finalImageUrl = isLivingRoom
    ? resolveImage("layout", selection, selection.layout || "", room)
    : isBathroom
      ? resolveImage("vanity-style", selection, selection.vanityStyle || "", room)
      : resolveImage("cabinet", selection, selection.cabinet || "", room);

  const getLabel = (phase: string, id: string | null) => {
    if (!id) return t.notSelected;
    const translated = t.phaseOptionLabels[phase]?.[id];
    if (translated) return translated;
    const sourceOrder = isLivingRoom ? livingRoomRoundOrder : (isBathroom ? bathroomRoundOrder : roundOrder);
    const round = sourceOrder.find(r => r.phase === phase);
    return round?.options.find(o => o.id === id)?.label || id;
  };

  const traits = getTraitsForSelections(selection, room);
  const traitCounts = countTraits(traits);
  const dominantTraits = getDominantTraits(traitCounts);
  const headline = generateDesignHeadline(dominantTraits);
  const summary = generateDesignSummary(dominantTraits);
  const styledDisplay = styles.map(formatDisplayLabel).join(", ");
  const { renovation } = generatePrompts(styles, selection, room);

  const roomRevealTitle = isLivingRoom ? t.livingRoomReveal : (isBathroom ? t.bathroomReveal : t.kitchenReveal);

  // Map room slug → roomType string expected by the visualization API
  const apiRoomType = isLivingRoom ? "living room" : room;
  const primaryStyle = styles[0] ?? "modern";

  useEffect(() => {
    handleGenerateAiImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleGenerateAiImage() {
    if (isVisualizationLimitReached()) {
      setLimitReached(true);
      return;
    }
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const result = await generateVisualization({
        roomType: apiRoomType,
        textPrompt: renovation,
        stylePreset: primaryStyle,
        roomImageUrl: finalImageUrl,
      });
      setAiImageUrl(result.imageDataUrl);
    } catch (err: any) {
      setGenerateError(err?.message ?? t.generateAiError);
      if (isVisualizationLimitReached()) setLimitReached(true);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDownloadAiImage() {
    if (!aiImageUrl) return;
    const a = document.createElement("a");
    a.href = aiImageUrl;
    a.download = `reform-ai-${room}-design.png`;
    a.click();
  }

  return (
    <main className="screen final-reveal">
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p className="selection-label">{t.projectComplete}</p>
        <h1 className="transition-title">{roomRevealTitle}</h1>
      </header>

      {/* AI-generated result — full width, natural aspect ratio */}
      <div style={{ marginBottom: "2rem", width: "100%", maxWidth: "936px", marginLeft: "auto", marginRight: "auto" }}>
        {aiImageUrl ? (
          <img src={aiImageUrl} alt={t.aiGeneratedResult} style={{ width: "100%", borderRadius: "12px", objectFit: "contain", display: "block" }} />
        ) : (
          <div style={{ aspectRatio: "16/9", borderRadius: "12px", background: "rgba(0,0,0,0.04)", border: "1px dashed rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.9rem" }}>
            {isGenerating && <><span className="ai-spinner" />{t.generatingImage}</>}
            {limitReached && <div style={{ color: "var(--brand-teal)", textAlign: "center", padding: "1rem", fontWeight: 600 }}>⚠️ Visualization limit reached (200/200). Please contact us for more.</div>}
            {generateError && !isGenerating && !limitReached && <span style={{ color: "var(--destructive, #e53e3e)", fontSize: "0.85rem", textAlign: "center", padding: "1rem" }}>{generateError}</span>}
          </div>
        )}
      </div>

      {/* Design insight — styles text, headline, summary, why it works */}
      <div className="design-insight" style={{ marginBottom: "2rem", width: "100%", maxWidth: "936px", marginLeft: "auto", marginRight: "auto" }}>
        {styles.length > 0 && (
          <div className="insight-section" style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.5rem" }}>
              {t.inspiredByYourSelections}
            </h3>
            <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{styledDisplay}</p>
          </div>
        )}

        <div className="insight-section" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.5rem" }}>
            {t.howYourDesignReflects}
          </h3>
          <p style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--foreground)" }}>{headline}</p>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.5 }}>{summary}</p>
        </div>

        <div className="insight-section" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.5rem" }}>
            {t.whyItWorks}
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
            {selection.flooringMaterial && livingRoomFlooringInsight[selection.flooringMaterial] && (
              <li style={{ marginBottom: "0.25rem" }}>{livingRoomFlooringInsight[selection.flooringMaterial]}</li>
            )}
            {selection.seatingConfig && seatingInsight[selection.seatingConfig] && (
              <li style={{ marginBottom: "0.25rem" }}>{seatingInsight[selection.seatingConfig]}</li>
            )}
            {selection.wallTreatment && isLivingRoom && livingRoomWallInsight[selection.wallTreatment] && (
              <li style={{ marginBottom: "0.25rem" }}>{livingRoomWallInsight[selection.wallTreatment]}</li>
            )}
          </ul>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Inspired by your selections — badges */}
        {styles.length > 0 && (
          <div>
            <h3 style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.75rem" }}>
              {t.inspiredByYourSelections}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {styles.map(s => (
                <span key={s} style={{ padding: "0.4rem 0.9rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, background: "var(--background)" }}>
                  {formatDisplayLabel(s)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Your complete selections */}
        <div>
          <h3 style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "0.75rem" }}>
            {t.yourCompleteSelections}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {(isLivingRoom
              ? ["layout", "flooring-material", "seating-config", "wall-treatment", "rug", "lighting"]
              : isBathroom
                ? ["shower-type", "shower-tile-style", "vanity-style", "flooring", "wall-treatment", "vanity-finish", "mirror-style"]
                : ["layout", "storage", "appliance", "lighting", "flooring", "countertop", "cabinet"]).map(phase => {
              const id = (selection as any)[phase.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] || (selection as any)[phase];
              if (!id) return null;
              return (
                <div key={phase} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", padding: "0.4rem 0.9rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "999px", background: "var(--background)" }}>
                  <span style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.55, lineHeight: 1 }}>{t.phaseLabels[phase] ?? phase.replace("-", " ")}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.2 }}>{getLabel(phase, id)}</span>
                </div>
              );
            })}
            {Object.keys(selection.addons || {}).filter(k => selection.addons[k]).map(k => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", padding: "0.4rem 0.9rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "999px", background: "var(--background)" }}>
                <span style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.55, lineHeight: 1 }}>{t.addOns}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.2 }}>{formatDisplayLabel(k)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centered buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1em" }}>
          {aiImageUrl && (
            <button className="btn-large btn-secondary" onClick={handleDownloadAiImage} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Download size={16} />{t.downloadImage}
            </button>
          )}
          {(generateError && !isGenerating && !limitReached) && (
            <button className="btn-large" onClick={handleGenerateAiImage} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <RefreshCw size={16} />{t.retryGeneration}
            </button>
          )}
          {aiImageUrl && !limitReached && (
            <button className="btn-large" onClick={handleGenerateAiImage} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <RefreshCw size={16} />{t.retryGeneration}
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <button className="btn-large" onClick={onRestart} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <RotateCcw size={16} />{t.restartGame}
          </button>
          <button className="btn-large btn-secondary" onClick={() => alert(t.designSaved)} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Bookmark size={16} />{t.saveDesign}
          </button>
        </div>
      </div>
    </main>
  );
}
