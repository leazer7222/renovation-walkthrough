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

  let pair = `${t1}-${t2}`;
  if (!t2) return "This design stays true to your selected direction with a strong, focused materials palette.";

  // Sort them loosely so the order doesn't fail combinations
  if (t1 > t2) {
    pair = `${t2}-${t1}`;
  }

  // Suggest combinations based on the prompt
  // clean, warm, bold, soft, natural, refined
  const summaries: Record<string, string> = {
    "clean-warm": "Your final kitchen reflects that inspiration through a sleek modern foundation, balanced by warm wood tones that make the space feel more inviting.",
    "bold-clean": "This design reflects your inspiration through strong contrast and a sleek, modern edge.",
    "natural-warm": "This design combines warm natural elements, creating a space that feels both organic and inviting.",
    "refined-soft": "Your final kitchen reflects your inspiration through an airy foundation, balanced by refined finishes that feel polished and timeless.",
    "refined-warm": "This design combines elevated elements with natural materials, creating a space that feels both refined and livable.",
    "bold-refined": "The result is a space that feels dramatic and polished, perfect for a high-end, sophisticated aesthetic.",
    "clean-refined": "This design stays true to your selected direction with a minimal and elevated foundation.",
    "soft-warm": "The result is a space that feels light and welcoming, while still warm enough to feel lived-in.",
    "bold-warm": "This design carefully balances strong, dramatic contrast with welcoming tones to soften the overall look.",
    "natural-refined": "This design stays true to your direction, blending elevated finishes with natural texture for a balanced aesthetic."
  };

  const exactMatch = summaries[pair];
  if (exactMatch) return exactMatch;

  // Fallback for missing pairs
  return `This design stays true to your selected direction with a polished foundation and materials that add depth and character.`;
}

export function formatDisplayLabel(slug: string | null): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
