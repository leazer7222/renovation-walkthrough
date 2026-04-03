import { landingConfig } from "@/config/landingConfig";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="screen center">
      <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Reform-A.i
        </span>
        <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", fontWeight: 400 }}>
          Renovation Made Easy
        </span>
      </div>
      <h1 className="transition-title">{landingConfig.headline}</h1>
      <p className="transition-subtext">{landingConfig.subheadline}</p>
      <button className="btn-large" onClick={onStart}>{landingConfig.ctaButton}</button>
      <p className="microcopy">{landingConfig.microcopy}</p>
    </main>
  );
}

