import { Option } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageContext";

export function ComparisonCard({
  option,
  imageUrl,
  onSelect
}: {
  option: Option;
  imageUrl: string;
  onSelect: () => void
}) {
  const { t } = useLanguage();

  return (
    <article className="comparison-card" onClick={onSelect}>
      <div className="image-wrap">
        <img
          src={imageUrl}
          alt={option.label}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.png";
          }}
        />
      </div>
      <div className="card-text">
        <h3>{option.label}</h3>
        <button onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}>
          {t.select}
        </button>
      </div>
    </article>
  );
}
