import { useLanguage } from "@/i18n/LanguageContext";

export function ProgressBar({
  current,
  total,
  subProgress,
  phaseLabel
}: {
  current: number;
  total: number;
  subProgress?: number;
  phaseLabel?: string;
}) {
  const { t } = useLanguage();
  const percent = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-text">
        <span>{t.stepXofY(current, total, phaseLabel ?? "")}</span>
        {subProgress !== undefined && <span>{t.choicesRemaining(subProgress)}</span>}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
