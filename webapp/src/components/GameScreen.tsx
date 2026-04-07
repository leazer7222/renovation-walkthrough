import { RoundConfig, Option } from "@/lib/types";
import { ProgressBar } from "@/components/ProgressBar";
import { ComparisonCard } from "@/components/ComparisonCard";
import { CurrentSelectionsBar } from "@/components/CurrentSelectionsBar";
import { resolveImage } from "@/lib/assetResolver";

export function GameScreen({
  phase,
  currentRound,
  match,
  selection,
  onSelect,
  progress,
}: {
  phase: string;
  currentRound: RoundConfig;
  match: { a: Option; b: Option };
  selection: any;
  onSelect: (option: Option) => void;
  progress: { phaseIndex: number; totalPhases: number; remainingMatches: number };
}) {
  const left = resolveImage(phase, selection, match.a.id);
  const right = resolveImage(phase, selection, match.b.id);

  return (
    <main className="screen">
      <CurrentSelectionsBar phase={phase} selection={selection} />
      <ProgressBar 
        current={progress.phaseIndex} 
        total={progress.totalPhases} 
        subProgress={progress.remainingMatches} 
        phaseLabel={currentRound.label}
      />
      <section className="compare-row">
        <ComparisonCard option={match.a} imageUrl={left} onSelect={() => onSelect(match.a)} />
        <ComparisonCard option={match.b} imageUrl={right} onSelect={() => onSelect(match.b)} />
      </section>
    </main>
  );
}

