import { RoundConfig, Option } from "@/lib/types";
import { ProgressBar } from "@/components/ProgressBar";
import { ComparisonCard } from "@/components/ComparisonCard";
import { CurrentSelectionsBar } from "@/components/CurrentSelectionsBar";
import { resolveImage } from "@/lib/assetResolver";
import { useLanguage } from "@/i18n/LanguageContext";

export function GameScreen({
  phase,
  currentRound,
  match,
  selection,
  room,
  onSelect,
  progress,
}: {
  phase: string;
  currentRound: RoundConfig;
  match: { a: Option; b: Option };
  selection: any;
  room: string;
  onSelect: (option: Option) => void;
  progress: { phaseIndex: number; totalPhases: number; remainingMatches: number };
}) {
  const { t } = useLanguage();
  const left = resolveImage(phase, selection, match.a.id, room);
  const right = resolveImage(phase, selection, match.b.id, room);

  const phaseLabel = t.phaseLabels[phase] ?? currentRound.label;
  const optLabels = t.phaseOptionLabels[phase] ?? {};
  const translatedA = { ...match.a, label: optLabels[match.a.id] ?? match.a.label };
  const translatedB = { ...match.b, label: optLabels[match.b.id] ?? match.b.label };

  return (
    <main className="screen">
      <CurrentSelectionsBar phase={phase} selection={selection} room={room} />
      <ProgressBar
        current={progress.phaseIndex}
        total={progress.totalPhases}
        subProgress={progress.remainingMatches}
        phaseLabel={phaseLabel}
      />
      <section className="compare-row">
        <ComparisonCard option={translatedA} imageUrl={left} onSelect={() => onSelect(match.a)} />
        <ComparisonCard option={translatedB} imageUrl={right} onSelect={() => onSelect(match.b)} />
      </section>
    </main>
  );
}

