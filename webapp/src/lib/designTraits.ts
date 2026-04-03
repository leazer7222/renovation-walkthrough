export type Trait =
  | "clean"
  | "warm"
  | "bold"
  | "soft"
  | "natural"
  | "refined";

export const flooringTraits: Record<string, Trait[]> = {
  "dark-walnut": ["warm", "refined"],
  "large-format-tile": ["clean", "refined"],
  "light-oak": ["warm", "soft"],
  "microcement": ["clean", "bold"],
};

export const countertopTraits: Record<string, Trait[]> = {
  "butcher-block": ["warm", "natural"],
  "dark-quartz": ["clean", "bold"],
  "granite": ["natural", "refined"],
  "marble": ["refined", "soft"],
};

export const cabinetTraits: Record<string, Trait[]> = {
  "flat-panel-white": ["clean", "soft"],
  "matte-black": ["bold", "clean"],
  "shaker": ["refined", "warm"],
  "warm-wood": ["warm", "natural"],
};

export const flooringInsight: Record<string, string> = {
  "dark-walnut": "Dark Walnut flooring grounds the space and adds richness.",
  "large-format-tile": "Large-format tile creates a clean, polished foundation.",
  "light-oak": "Light Oak flooring keeps the space feeling warm and airy.",
  "microcement": "Microcement gives the space a sleek, minimal edge.",
};

export const countertopInsight: Record<string, string> = {
  "butcher-block": "Butcher Block adds warmth and organic texture.",
  "dark-quartz": "Dark Quartz brings a sleek, modern edge and strong contrast.",
  "granite": "Granite introduces natural texture with an elevated feel.",
  "marble": "Marble adds a refined, timeless softness.",
};

export const cabinetInsight: Record<string, string> = {
  "flat-panel-white": "Flat Panel White cabinets keep the design crisp and light.",
  "matte-black": "Matte Black cabinetry adds bold contrast and a modern finish.",
  "shaker": "Shaker cabinets bring a classic look with approachable warmth.",
  "warm-wood": "Warm Wood cabinetry adds natural warmth and texture.",
};

export function getTraitsForSelections(selections: { flooring: string | null; countertop: string | null; cabinet: string | null }): Trait[] {
  const traits: Trait[] = [];
  if (selections.flooring && flooringTraits[selections.flooring]) traits.push(...flooringTraits[selections.flooring]);
  if (selections.countertop && countertopTraits[selections.countertop]) traits.push(...countertopTraits[selections.countertop]);
  if (selections.cabinet && cabinetTraits[selections.cabinet]) traits.push(...cabinetTraits[selections.cabinet]);
  return traits;
}

export function countTraits(traits: Trait[]): Record<Trait, number> {
  const counts = {} as Record<Trait, number>;
  for (const t of traits) {
    counts[t] = (counts[t] || 0) + 1;
  }
  return counts;
}

export function getDominantTraits(counts: Record<Trait, number>): Trait[] {
  return (Object.entries(counts) as [Trait, number][])
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);
}

export function generateDesignSummary(dominantTraits: Trait[]): string {
  const t1 = dominantTraits[0];
  const t2 = dominantTraits[1];

  if (!t2) return "This design stays true to your selected direction with a strong, focused materials palette.";

  const pair = [t1, t2].sort().join("-");

  const summaries: Record<string, string> = {
    "clean-warm": "This design combines a clean, modern foundation with warm natural materials, creating a space that feels both refined and inviting.",
    "bold-clean": "This design leans into a sleek, modern direction with sharper lines and a more defined visual edge.",
    "natural-warm": "This design brings together warm tones and natural materials, creating a space that feels relaxed, organic, and inviting.",
    "refined-soft": "This design feels light and polished, with refined finishes that create a soft, timeless look.",
    "refined-warm": "This design balances elevated finishes with natural warmth, creating a space that feels both polished and comfortable.",
    "bold-refined": "This design combines darker, more dramatic elements with refined finishes, resulting in a space that feels both bold and elevated.",
    "clean-refined": "This design stays minimal and structured, with refined materials that give it a clean, elevated feel.",
    "soft-warm": "This design feels light, warm, and welcoming, with softer tones that create a relaxed and livable space.",
    "bold-warm": "This design balances stronger visual contrast with warm materials, creating a space that feels both dynamic and inviting.",
    "natural-refined": "This design blends natural textures with refined finishes, creating a balanced space that feels both grounded and elevated."
  };

  const exactMatch = summaries[pair];
  if (exactMatch) return exactMatch;

  return "This design brings together a thoughtful mix of materials, creating a space that feels balanced, polished, and inviting.";
}

export function generateDesignHeadline(dominantTraits: Trait[]): string {
  const t1 = dominantTraits[0];
  const t2 = dominantTraits[1];

  if (!t2) return "A thoughtfully designed space";

  const pair = [t1, t2].sort().join("-");

  const headlines: Record<string, string> = {
    "clean-warm": "A modern design with natural warmth",
    "bold-clean": "A sleek, high-contrast modern design",
    "natural-warm": "A warm, natural living space",
    "refined-soft": "A soft and refined design",
    "refined-warm": "An elevated space with warmth",
    "bold-refined": "A bold, high-end aesthetic",
    "clean-refined": "A minimal and elevated design",
    "soft-warm": "A light and welcoming space",
    "bold-warm": "A bold design with warmth",
    "natural-refined": "A balanced, natural and refined space"
  };

  return headlines[pair] || "A balanced and thoughtfully designed space";
}

export function formatDisplayLabel(slug: string | null): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
