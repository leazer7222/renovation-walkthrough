export function RoundHeader({ phaseLabel, selection }: { phaseLabel: string; selection: string | null }) {
  return (
    <header className="round-header">
      <h1>{phaseLabel} Round</h1>
      <p>Current selection: <strong style={{ color: selection ? "var(--brand-teal)" : "var(--muted-foreground)" }}>{selection ?? "None"}</strong></p>
    </header>
  );
}
