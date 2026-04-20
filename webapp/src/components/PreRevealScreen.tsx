import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export function PreRevealScreen({ room, onContinue }: { room: string; onContinue: () => void }) {
  const { t } = useLanguage();
  const roomName = room === "living-room" ? t.livingRoom : room === "bathroom" ? t.bathroom : t.kitchen;

  return (
    <main className="screen center transition-screen" style={{ gap: "2rem" }}>
      <img
        src="/logo.png"
        alt="ReformAI"
        style={{ width: "clamp(160px, 30vw, 260px)", height: "auto", objectFit: "contain" }}
      />

      <div style={{ textAlign: "center" }}>
        <h1 className="transition-title">
          ReformAI {t.preRevealBuilding} {roomName}
        </h1>
        <p className="transition-subtext" style={{ maxWidth: "420px", margin: "0.75rem auto 0" }}>
          {t.preRevealSubtext}
        </p>
      </div>

      <button className="btn-large" onClick={onContinue} style={{ marginTop: "0.5rem" }}>
        {t.preRevealCta}
      </button>
    </main>
  );
}
