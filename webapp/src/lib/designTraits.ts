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

const promptModifiers: Record<string, string> = {
  // Layouts
  "large-island-with-seating": "Large Island With Seating configuration (featuring a large central kitchen island incorporating bar seating with midcentury modern stools in front)",
  "small-prep-island": "Small Prep Island configuration (featuring a compact central prep island focusing on workspace without seating)",
  "no-island": "spacious open layout configuration without a central island",
  "peninsula-layout": "connected peninsula layout configuration with bar seating",
  
  // Storage
  "closed-cabinetry": "seamless, floor-to-ceiling Closed Cabinetry keeping all items hidden",
  "open-shelving": "airy Open Shelving displaying curated decorative dishware",
  "glass-display-cabinets": "elegant Glass Display Cabinets",
  "minimal-storage": "Minimalist Storage with bare upper walls and sleek lower cabinets",
  
  // Appliances
  "standard-stainless": "Standard Stainless Steel appliances prominently featured, explicitly preserving the built-in double wall ovens on the left tall cabinet",
  "integrated-appliances": "fully flush, panel-ready Integrated Appliances, while explicitly preserving the visible built-in double wall ovens on the left tall cabinet (not paneled like a fridge)",
  "professional-statement-appliances": "heavy-duty, Professional Statement Appliances including a professional cooktop, explicitly preserving the built-in double wall ovens on the left tall cabinet",
  
  // Lighting
  "minimal-recessed-only": "Minimal Recessed Lighting embedded cleanly in the ceiling",
  "pendant-lighting": "stylish Pendant Lighting fixtures hanging prominently over the workspace",
  "statement-lighting": "a bold, sculptural Statement Lighting fixture acting as a dramatic centerpiece",
  
  // Materials (Flooring)
  "dark-walnut": "rich Dark Walnut wood flooring",
  "large-format-tile": "clean, continuous Large Format Tile flooring",
  "light-oak": "warm and airy Light Oak wood flooring",
  "microcement": "seamless, sleek industrial Microcement floors",

  // Materials (Countertops)
  "butcher-block": "warm natural Butcher Block wood countertops",
  "dark-quartz": "bold Dark Quartz countertops",
  "granite": "naturally textured Granite stone countertops",
  "marble": "elegant, softly veined Marble countertops",

  // Materials (Cabinets)
  "flat-panel-white": "crisp, modern Flat Panel White cabinetry",
  "matte-black": "striking Matte Black cabinetry",
  "shaker": "classic and approachable Shaker-style cabinetry",
  "warm-wood": "natural Warm Wood cabinetry",

  // Addons
  "wine-fridge": "a built-in glass-door Wine Fridge specifically integrated seamlessly under the counter into the kitchen island",
  "under-cabinet-ambient-glow": "soft, warm glowing Under Cabinet Ambient light"
};

export function generatePromptDescription(
  styles: string[],
  selection: {
    layout?: string | null;
    storage?: string | null;
    appliance?: string | null;
    lighting?: string | null;
    addons?: Record<string, boolean>;
    flooring?: string | null;
    countertop?: string | null;
    cabinet?: string | null;
  }
): string {
  const getMod = (key: string | null | undefined, fallback: string) => {
    if (!key) return fallback;
    return promptModifiers[key] || formatDisplayLabel(key);
  };

  const styleStr = styles.map(formatDisplayLabel).join(", ");
  
  const layout = getMod(selection.layout, "Standard configuration");
  const flooring = getMod(selection.flooring, "Hardwood floors");
  const countertop = getMod(selection.countertop, "Stone countertops");
  const cabinet = getMod(selection.cabinet, "Custom cabinetry");
  const storage = getMod(selection.storage, "Standard storage");
  const appliance = getMod(selection.appliance, "Modern appliances");
  const lighting = getMod(selection.lighting, "Ambient lighting");
  
  const addonsArr = Object.keys(selection.addons || {}).filter(k => selection.addons![k]).map(k => getMod(k, formatDisplayLabel(k)));
  const addonsStr = addonsArr.length > 0 ? `, featuring integrated ${addonsArr.join(" and ")}` : "";

  return `High quality architectural photography of a stunning kitchen design, combining ${styleStr} aesthetics. The space features a ${layout} with beautiful ${flooring} and ${cabinet}. The countertops are ${countertop}, complemented by ${storage}. The kitchen is equipped with ${appliance}, illuminated by ${lighting}${addonsStr}. Shot in 8k, highly detailed, photorealistic, beautiful daylight, architectural digest style.`;
}
