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
  // Layouts - Hard Defined for Generation
  "large-island-with-seating": "a Large Island With Seating configuration as the central anchor of the room, featuring a massive stone-topped island with integrated breakfast bar seating and three midcentury modern stools",
  "small-prep-island": "a Small Prep Island configuration, featuring a compact standalone butcher-block or stone island dedicated entirely to workspace and food preparation",
  "no-island": "a spacious Open-Concept layout without a central island, focusing on a continuous perimeter workflow and expansive floor space",
  "peninsula-layout": "a connected Peninsula Layout configuration, where the countertop extends into the room to create an integrated breakfast bar with seating on one side",
  
  // Storage - Explicit and Descriptive
  "closed-cabinetry": "Seamless floor-to-ceiling Closed Cabinetry, creating a monolithic and uncluttered wall of storage that hides all kitchen essentials",
  "open-shelving": "Airy Open Shelving made of natural wood or metal, displaying a curated collection of artisanal ceramics and glassware against a clean backsplash",
  "glass-display-cabinets": "Elegant Glass-Front Display Cabinets with integrated internal lighting, showcasing fine dishware and adding depth to the cabinetry run",
  "minimal-storage": "Ultra-Minimalist Storage with bare upper walls and sleek, handle-less lower drawers for a light and unencumbered aesthetic",
  
  // Appliances - Strict and Anchored
  "standard-stainless": "a suite of high-end Professional Stainless Steel appliances, including a built-in double wall oven unit anchored on the left tall cabinet and a flush-mount cooktop",
  "integrated-appliances": "Fully Integrated, panel-ready appliances that disappear into the cabinetry for a seamless look, while preserving the visible built-in double wall ovens on the left (not paneled)",
  "professional-statement-appliances": "Heavy-duty Professional Statement appliances, featuring a massive commercial-grade cooktop and industrial-scale double wall ovens built into the cabinetry on the left",
  
  // Lighting
  "minimal-recessed-only": "Clean and understated architectural Recessed Lighting, flush-mounted in the ceiling to provide even, ambient illumination without visual clutter",
  "pendant-lighting": "A series of three designer Pendant Lighting fixtures with glass or metal shades, hanging at perfect height over the island or peninsula as a secondary focal point",
  "statement-lighting": "A bold, sculptural Statement Lighting installation, acting as the primary artistic centerpiece of the kitchen with a unique geometric or organic form",
  
  // Materials (Flooring)
  "dark-walnut": "rich and deeply grained Dark Walnut wide-plank wood flooring",
  "large-format-tile": "expansive and continuous Large Format Stone Tile flooring with minimal grout lines",
  "light-oak": "warm, airy, and natural Light Oak hardwood flooring",
  "microcement": "seamless, industrial-chic Microcement flooring with a smooth, hand-troweled finish",

  // Materials (Countertops)
  "butcher-block": "thick, warm, and organic natural Butcher Block wood countertops",
  "dark-quartz": "bold, honed Dark Quartz countertops with a matte finish",
  "granite": "naturally textured and durable Granite stone countertops",
  "marble": "luxurious, elegantly veined white Marble countertops with polished finish",

  // Materials (Cabinets)
  "flat-panel-white": "crisp, modern Flat Panel White cabinetry with a smooth matte finish",
  "matte-black": "striking, deep Matte Black cabinetry for a sophisticated and bold look",
  "shaker": "classic and timeless Shaker-style cabinetry with refined recessed panel detailing",
  "warm-wood": "natural and textured Warm Wood cabinetry with visible grain and organic feel",

  // Addons
  "wine-fridge": "a built-in tinted-glass door Wine Fridge integrated seamlessly under the counter in the kitchen island",
  "under-cabinet-ambient-glow": "soft and warm glowing Under-Cabinet LED lighting to provide depth and architectural task illumination"
};

export type PromptOutput = {
  generation: string;
  renovation: string;
};

export function generatePrompts(
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
): PromptOutput {
  const format = (key: string | null | undefined, fallback: string) => {
    if (!key) return fallback;
    return promptModifiers[key] || formatDisplayLabel(key);
  };

  const selectedStyles = styles.map(formatDisplayLabel).join(", ");
  const layout = format(selection.layout, "Standard configuration");
  const storage = format(selection.storage, "Standard storage");
  const appliances = format(selection.appliance, "Modern appliances");
  const lighting = format(selection.lighting, "Ambient lighting");
  const flooring = format(selection.flooring, "Hardwood floors");
  const countertop = format(selection.countertop, "Stone countertops");
  const cabinet = format(selection.cabinet, "Custom cabinetry");

  const addonsList = Object.keys(selection.addons || {})
    .filter((k) => selection.addons![k])
    .map((k) => format(k, formatDisplayLabel(k)));
  const addonsStr = addonsList.length > 0 ? `, further enhanced by ${addonsList.join(" and ")}` : "";

  // 1. GENERATION PROMPT
  const generation = [
    `[SCENE FRAMING] High quality architectural photography of a stunning and expansive kitchen design.`,
    `[STYLE DIRECTION] The interior combines ${selectedStyles} aesthetics into a cohesive, high-end environment.`,
    `[LAYOUT] The space features ${layout}.`,
    `[MATERIALS] The foundation is built on ${flooring}, complemented by ${cabinet}. The workspace is defined by ${countertop}.`,
    `[DESIGN FEATURES] For storage, the kitchen utilizes ${storage}${addonsStr}.`,
    `[APPLIANCES] The kitchen is equipped with ${appliances}.`,
    `[LIGHTING] The atmosphere is defined by ${lighting}.`,
    `[STYLING & MOOD] Beautiful natural daylight streaming through windows, architectural digest style, clean and professional staging.`,
    `[RENDERING] 8k resolution, highly detailed, photorealistic, cinematic lighting, sharp focus.`
  ].join("\n\n");

  // 2. RENOVATION PROMPT
  const renovation = [
    `[CONTEXT] A photorealistic renovation and style transformation of the existing kitchen image.`,
    `[STRUCTURAL PRESERVATION] Strictly preserve the existing kitchen layout, structural walls, window placements, and overall room architecture. Maintain the exact camera angle and perspective of the original photo.`,
    `[FUNCTIONAL ANCHORS] Strictly preserve and keep visible the existing functional locations of the cooktop, sink, and built-in ovens. Do not remove or relocate these core functional elements.`,
    `[USER-SELECTED FEATURES] Strictly enforce the inclusion of the following selected features: ${storage}${addonsStr}. These must be clearly visible and prioritized in the new design.`,
    `[MATERIALS] Apply ${flooring} to the floor, update the cabinets with ${cabinet}, and install ${countertop} on all work surfaces. No material substitutions allowed.`,
    `[LAYOUT ADAPTATION] Do not force a change in the room structure; instead, adapt the ${layout} design intent to the existing kitchen geometry and surfaces.`,
    `[FEATURE INTEGRATION] Seamlessly integrate the selected lighting and storage features into the existing architecture. ${lighting} should be used to enhance the space.`,
    `[FEATURE EMPHASIS] Ensure that the ${addonsList.includes("wine-fridge") ? "wine fridge and " : ""}${selection.layout?.includes("seating") ? "island seating" : "new surfaces"} are clearly visible and act as focal points.`,
    `[LIGHTING] Use a combination of task lighting and ${lighting} to create depth, realism, and a high-end atmosphere.`,
    `[STYLE DIRECTION] Transform the aesthetic to match a combination of ${selectedStyles} design styles.`,
    `[DESIGN INTENT] Balance buildable realism with a high-end, aspirational architectural output.`,
    `[RENDERING] Photorealistic, natural daylight, architectural digest style, 8k quality, highly detailed, professional finish.`
  ].join("\n\n");

  return { generation, renovation };
}

// Keep the old one for compatibility while we transition or just update it to use the new logic
export function generatePromptDescription(styles: string[], selection: any): string {
  return generatePrompts(styles, selection).generation;
}
