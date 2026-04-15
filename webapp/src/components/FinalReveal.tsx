import React, { useState } from "react";
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
  generatePrompts
} from "@/lib/designTraits";
import { useLanguage } from "@/i18n/LanguageContext";
import { generateVisualization } from "@/services/visualizationApi";

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

  const { generation, renovation } = generatePrompts(styles, selection, room);

  const roomRevealTitle = isLivingRoom ? t.livingRoomReveal : (isBathroom ? t.bathroomReveal : t.kitchenReveal);
  const roomName = isLivingRoom ? t.livingRoom : (isBathroom ? t.bathroom : t.kitchen);
  const defaultPromptLabel = isLivingRoom ? t.defaultLivingRoomPrompt : (isBathroom ? t.defaultBathroomPrompt : t.defaultKitchenPrompt);

  // Map room slug → roomType string expected by the visualization API
  const apiRoomType = isLivingRoom ? "living room" : room;
  const primaryStyle = styles[0] ?? "modern";

  async function handleGenerateAiImage() {
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

      <img src={finalImageUrl} alt={`Final ${room} Design`} className="hero-image" style={{ marginBottom: "2rem" }} />

      <div className="design-insight" style={{ marginBottom: "3rem" }}>
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

        <div className="prompts-container" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginTop: "2rem" }}>
          {/* First prompt — hidden from users, kept for future use */}
          <div style={{ display: "none" }}>
            <div className="insight-section prompt-section" style={{ padding: "1.5rem", backgroundColor: "var(--primary-light)", borderRadius: "8px" }}>
              <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--primary)", opacity: 0.9, marginBottom: "0.5rem" }}>
                {defaultPromptLabel}
              </h3>
              <div
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  fontWeight: 400,
                  userSelect: "all",
                  cursor: "pointer",
                  background: "rgba(0,0,0,0.05)",
                  padding: "1rem",
                  borderRadius: "4px",
                  whiteSpace: "pre-wrap",
                  maxHeight: "300px",
                  overflowY: "auto"
                }}
                onClick={(e) => {
                  navigator.clipboard.writeText((e.currentTarget as HTMLElement).innerText);
                  alert(t.promptCopied(roomName));
                }}
              >
                {generation}
              </div>
            </div>
          </div>

          {/* AI Generation card — uses the transformation prompt + final image */}
          <div className="insight-section prompt-section ai-generation-card" style={{ padding: "1.5rem", border: "1px solid var(--primary)", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--primary)", opacity: 0.9, marginBottom: 0 }}>
              {t.transformationPrompt}
            </h3>

            {/* Prompt text — still copyable */}
            <div
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontStyle: "italic",
                fontWeight: 400,
                userSelect: "all",
                cursor: "pointer",
                background: "rgba(0,0,0,0.05)",
                padding: "1rem",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
                maxHeight: "200px",
                overflowY: "auto",
              }}
              onClick={(e) => {
                navigator.clipboard.writeText((e.currentTarget as HTMLElement).innerText);
                alert(t.transformationPromptCopied);
              }}
            >
              {renovation}
            </div>

            {/* Generation area */}
            {!aiImageUrl && !isGenerating && (
              <button
                className="btn-large"
                onClick={handleGenerateAiImage}
                style={{ alignSelf: "flex-start" }}
              >
                {t.generateAiImage}
              </button>
            )}

            {isGenerating && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--muted-foreground)", fontSize: "0.95rem" }}>
                <span className="ai-spinner" />
                {t.generatingImage}
              </div>
            )}

            {generateError && !isGenerating && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ color: "var(--destructive, #e53e3e)", fontSize: "0.9rem", margin: 0 }}>{generateError}</p>
                <button className="btn-large" onClick={handleGenerateAiImage} style={{ alignSelf: "flex-start" }}>
                  {t.retryGeneration}
                </button>
              </div>
            )}

            {aiImageUrl && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--primary)", opacity: 0.9, margin: 0 }}>
                  {t.aiGeneratedResult}
                </p>
                <img
                  src={aiImageUrl}
                  alt={t.aiGeneratedResult}
                  style={{ width: "100%", borderRadius: "8px", objectFit: "cover", border: "2px solid var(--primary)" }}
                />
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button className="btn-large btn-secondary" onClick={handleDownloadAiImage}>
                    {t.downloadImage}
                  </button>
                  <button className="btn-large" onClick={handleGenerateAiImage}>
                    {t.retryGeneration}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="reveal-summary">
        <h3 style={{ textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", color: "var(--foreground)", opacity: 0.7, marginBottom: "1rem", marginTop: "1rem" }}>
          {t.yourCompleteSelections}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem" }}>
          {(isLivingRoom
            ? ["layout", "flooring-material", "seating-config", "wall-treatment", "rug", "lighting"]
            : isBathroom
              ? ["shower-type", "shower-tile-style", "vanity-style", "flooring", "wall-treatment", "vanity-finish", "mirror-style"]
              : ["layout", "storage", "appliance", "lighting", "flooring", "countertop", "cabinet"]).map(phase => {
            const id = (selection as any)[phase.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] || (selection as any)[phase];
            if (!id) return null;
            const thumbUrl = resolveImage(phase as any, selection, id, room);
            return (
              <div key={phase} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <img src={thumbUrl} alt={phase} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)" }} />
                <div>
                  <div style={{ fontSize: "0.65rem", textTransform: "uppercase", opacity: 0.7 }}>{t.phaseLabels[phase] ?? phase.replace("-", " ")}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.2 }}>{getLabel(phase, id)}</div>
                </div>
              </div>
            );
          })}
        </div>
        {Object.keys(selection.addons || {}).filter(k => selection.addons[k]).length > 0 && (
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem" }}>{t.addOns}</div>
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
          {t.restartGame}
        </button>
        <button className="btn-large btn-secondary" onClick={() => alert(t.designSaved)}>
          {t.saveDesign}
        </button>
      </div>
    </main>
  );
}
