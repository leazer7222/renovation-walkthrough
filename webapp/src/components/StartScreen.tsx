import { landingConfig } from "@/config/landingConfig";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="screen center">
      <h1 className="transition-title">{landingConfig.headline}</h1>
      <p className="transition-subtext">{landingConfig.subheadline}</p>
      <button className="btn-large" onClick={onStart}>{landingConfig.ctaButton}</button>
      <p className="microcopy">{landingConfig.microcopy}</p>
    </main>
  );
}

