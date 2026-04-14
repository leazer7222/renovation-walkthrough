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
  "warm-wood": ["warm", "natural"],
};

export const livingRoomFlooringTraits: Record<string, Trait[]> = {
  "wood": ["warm", "natural"],
  "tile": ["clean", "refined"],
  "stone": ["natural", "refined"],
  "concrete": ["bold", "clean"],
};

export const seatingTraits: Record<string, Trait[]> = {
  "sectional": ["soft", "warm"],
  "sofa-chairs": ["refined", "clean"],
};

export const wallTraits: Record<string, Trait[]> = {
  "clean": ["clean", "soft"],
  "feature": ["bold", "refined"],
  "accent": ["soft", "refined"],
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
  "warm-wood": "Warm Wood cabinetry adds natural warmth and texture.",
};

export const livingRoomFlooringInsight: Record<string, string> = {
  "wood": "Natural wood flooring brings an organic warmth and timeless feel to the space.",
  "tile": "Designer tile adds a clean, refined aesthetic that is both durable and elegant.",
  "stone": "Natural stone surfaces provide a sophisticated, grounded foundation with unique texture.",
  "concrete": "Polished concrete flooring lends a bold, modern edge with a sleek industrial finish.",
};

export const seatingInsight: Record<string, string> = {
  "sectional": "The sectional seating configuration encourages relaxation and maximizes comfort.",
  "sofa-chairs": "The sofa and chair arrangement creates a formal yet inviting conversation area.",
};

export const livingRoomWallInsight: Record<string, string> = {
  "clean": "Clean, unadorned walls allow the furniture and natural light to take center stage.",
  "feature": "A bold feature wall adds architectural depth and serves as a curated focal point.",
  "accent": "A soft accent wall introduces a subtle layer of color and visual interest without overwhelming the space.",
};

export function getTraitsForSelections(selections: any, room: string = "kitchen"): Trait[] {
  const traits: Trait[] = [];
  
  if (room === "living-room") {
    if (selections.flooringMaterial && livingRoomFlooringTraits[selections.flooringMaterial]) traits.push(...livingRoomFlooringTraits[selections.flooringMaterial]);
    if (selections.seatingConfig && seatingTraits[selections.seatingConfig]) traits.push(...seatingTraits[selections.seatingConfig]);
    if (selections.wallTreatment && wallTraits[selections.wallTreatment]) traits.push(...wallTraits[selections.wallTreatment]);
  } else {
    if (selections.flooring && flooringTraits[selections.flooring]) traits.push(...flooringTraits[selections.flooring]);
    if (selections.countertop && countertopTraits[selections.countertop]) traits.push(...countertopTraits[selections.countertop]);
    if (selections.cabinet && cabinetTraits[selections.cabinet]) traits.push(...cabinetTraits[selections.cabinet]);
  }
  
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

export function formatDisplayLabel(slug: string | null | undefined): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const promptModifiers: Record<string, string> = {
  // Layouts
  "large-island-with-seating": "Large island with seating, featuring a central kitchen island with integrated bar seating and midcentury modern stools",
  "small-prep-island": "Small prep island, featuring a compact central island dedicated to workspace and food preparation",
  "no-island": "Open layout without a central island, focusing on a continuous perimeter workflow",
  "peninsula-layout": "Peninsula layout, featuring a connected breakfast bar with integrated seating",
  
  // Storage
  "closed-cabinetry": "Closed cabinetry providing a seamless and uncluttered appearance",
  "open-shelving": "Open shelving integrated into the cabinetry, displaying curated dishware",
  "glass-display-cabinets": "Glass-door display cabinets with integrated lighting to showcase kitchen items",
  "minimal-storage": "Minimalist storage with bare upper walls and sleek lower cabinetry",
  
  // Appliances
  "standard-stainless": "Professional-grade stainless steel appliances with a premium, modern appearance",
  "integrated-appliances": "Fully integrated panel-ready appliances that blend into the cabinetry",
  "professional-statement-appliances": "Professional-grade appliances with a premium, modern appearance and high-end finish",
  
  // Lighting
  "minimal-recessed-only": "Architectural recessed lighting providing clean and understated illumination",
  "pendant-lighting": "Designer pendant lighting fixtures positioned over the primary workspace",
  "statement-lighting": "A sculptural statement lighting fixture acting as a central focal point",
  
  // Materials (Flooring)
  "dark-walnut": "dark walnut wood flooring",
  "large-format-tile": "large-format tile flooring",
  "light-oak": "light oak wood flooring",
  "microcement": "seamless microcement flooring",

  // Materials (Countertops)
  "butcher-block": "butcher block wood countertops",
  "dark-quartz": "dark quartz surfaces with a clean, modern finish",
  "granite": "naturally textured granite countertops",
  "marble": "white marble countertops with elegant veining",

  // Materials (Cabinets)
  "flat-panel-white": "flat panel white cabinetry",
  "matte-black": "matte black cabinetry",
  "shaker": "shaker-style cabinetry",
  "warm-wood": "warm wood cabinetry with visible natural grain",

  // Bathroom Specific
  "tub-shower-combo": "standard tub-shower combination layout",
  "standalone-tub": "luxurious standalone soaking tub acting as a central focal point",
  "walk-in-glass-shower": "spacious walk-in glass-enclosed shower",
  "walk-in-half-wall-shower": "walk-in shower with a modern half-wall partition",
  
  "accent-band": "decorative accent tile band running through the shower space",
  "feature-back-wall": "bold feature back wall in the shower with specialized tile textures",
  "full-pattern-textured-tile": "full-patterned and highly textured tile work covering all shower walls",
  "uniform-tile": "clean and uniform tile work for a seamless, minimalist look",
  
  "built-in-vanity": "custom built-in vanity unit",
  "double-vanity": "spacious double vanity with dual sinks",
  "vanity-tower": "vanity unit with integrated vertical storage tower",
  
  "light-neutral-tile": "light neutral tile flooring",
  "patterned-tile": "intricate patterned tile flooring",
  "dark-stone-tile": "dark stone tile flooring",
  
  "painted-wall": "clean painted walls in a complementing neutral tone",
  "half-wall-paneling": "classic half-wall wainscoting or paneling",
  "full-tile-feature-wall": "dramatic full-tile feature wall spanning the room",
  
  "white-vanity": "crisp white vanity finish",
  "light-wood-vanity": "warm light wood vanity finish",
  "dark-or-black-vanity": "dramatic dark or matte black vanity finish",
  
  "framed-mirror": "elegantly framed mirror",
  "frameless-mirror": "sleek frameless mirror",
  "led-backlit-mirror": "modern LED-backlit mirror providing a soft halo glow",

  // Bathroom Addons
  "toilet-upgrade": "modern skirted toilet unit",
  "mirror-upgrade": "integrated smart backlit mirror",
  "shower-experience": "premium multi-function rainfall shower system",
  "comfort-upgrade": "heated flooring system and integrated towel warmer",
  "storage-functionality": "integrated shower niche with dedicated storage",

  // Living Room Specific
  "tv-centered": "layout centered around a large media wall or television focal point",
  "conversation": "interactive layout focused on a central conversation area with seating facing each other",
  "open-minimal": "open-concept layout with minimal boundaries and a focus on spaciousness",
  "cozy-dense": "intimate layout with layered seating and a cozy, filled atmosphere",
  "tile-stone": "large-format tile or stone slab flooring",
  "wood": "natural hardwood flooring with refined grain",
  "sectional": "large L-shaped or U-shaped sectional sofa providing ample lounge seating",
  "sofa-chairs": "classic seating arrangement with a primary sofa complemented by individual accent chairs",
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
    // Bathroom
    showerType?: string | null;
    showerTileStyle?: string | null;
    vanityStyle?: string | null;
    wallTreatment?: string | null;
    vanityFinish?: string | null;
    mirrorStyle?: string | null;
    // Living Room
    flooringMaterial?: string | null;
    seatingConfig?: string | null;
    rug?: string | null;
  },
  room: string = "kitchen"
): PromptOutput {
  const getLabel = (key: string | null | undefined, fallback: string) => {
    if (!key) return fallback;
    return promptModifiers[key] || formatDisplayLabel(key);
  };

  const styleStr = styles.map(formatDisplayLabel).join(", ");
  const addonsList = Object.keys(selection.addons || {})
    .filter((k) => selection.addons![k])
    .map((k) => getLabel(k, formatDisplayLabel(k)));

  if (room === "bathroom") {
    const showerRaw = getLabel(selection.showerType, "standard shower");
    const showerTileRaw = getLabel(selection.showerTileStyle, "standard tile");
    const vanityRaw = getLabel(selection.vanityStyle, "standard vanity");
    const flooringRaw = getLabel(selection.flooring, "tile flooring");
    const wallRaw = getLabel(selection.wallTreatment, "painted walls");
    const vanityFinishRaw = getLabel(selection.vanityFinish, "matching finish");
    const mirrorRaw = getLabel(selection.mirrorStyle, "unframed mirror");

    const generation = [
      `High quality architectural photography of a bathroom designed in a cohesive ${styleStr} aesthetic.`,
      `---`,
      `Layout & Shower:`,
      `${showerRaw} featuring ${showerTileRaw}.`,
      `---`,
      `Materials:`,
      `* Flooring: ${flooringRaw}`,
      `* Vanity Finish: ${vanityFinishRaw}`,
      `* Wall Treatment: ${wallRaw}`,
      `Ensure strict adherence to the specified material palette. Do not introduce additional materials or substitute finishes.`,
      `---`,
      `Furniture & Fixtures:`,
      `* Vanity: ${vanityRaw}`,
      `* Mirror: ${mirrorRaw}`,
      addonsList.length > 0 ? addonsList.map(a => `* ${a}`).join("\n") : "",
      `---`,
      `Hardware & Detail:`,
      `* Upgrade all faucets, shower heads, and cabinet hardware to a premium finish consistent with the ${styleStr} style.`,
      `* Ensure a clean, modern appearance with a high-end architectural finish.`,
      `---`,
      `Lighting:`,
      `Soft layered lighting with a focus on the ${mirrorRaw} area, creating a serene and spa-like atmosphere.`,
      `---`,
      `Styling & Mood:`,
      `Clean, tranquil, and grounded. The space should feel like a high-end spa, with balanced textures and minimal clutter.`,
      `---`,
      `Rendering:`,
      `Photorealistic, natural daylight, architectural digest style, highly detailed, 8k resolution.`,
      `---`,
      `Control Rules:`,
      `* Do not introduce new materials, finishes, or design elements that are not specified`,
      `* Do not exaggerate scale or use terms such as "massive", "expansive", or "commercial-grade"`,
      `* Keep all elements consistent with the provided selections`
    ].filter(Boolean).join("\n\n");

    const renovation = [
      `[CONTEXT] A photorealistic renovation and style transformation of the existing bathroom image.`,
      `[STRUCTURAL PRESERVATION] Strictly preserve the existing bathroom footprint, window placements, and overall room architecture. Maintain the exact camera angle and perspective.`,
      `[FUNCTIONAL ANCHORS] Strictly preserve and keep visible the primary shower/tub placement, the toilet position, and the vanity location. Do not relocate these core fixtures.`,
      `[USER-SELECTED FEATURES]`,
      `Strictly include:`,
      `* ${showerRaw}`,
      `* ${vanityRaw}`,
      `* ${showerTileRaw}`,
      addonsList.map(a => `* ${a}`).join("\n"),
      `[MATERIALS]`,
      `* Flooring: ${flooringRaw}`,
      `* Vanity Finish: ${vanityFinishRaw}`,
      `* Wall Treatment: ${wallRaw}`,
      `No substitutions allowed.`,
      `[STYLE DIRECTION]`,
      `Apply ${styleStr} aesthetics.`,
      `[DESIGN INTENT]`,
      `Balance realism with a high-end aspirational result. Transform the existing bathroom into a modern, spa-like sanctuary.`,
      `[RENDERING]`,
      `Photorealistic, natural daylight, architectural digest style, highly detailed, 8k.`
    ].filter(Boolean).join("\n\n");

    return { generation, renovation };
  }

  if (room === "living-room") {
    const layoutRaw = getLabel(selection.layout, "open living layout");
    const flooringRaw = getLabel(selection.flooringMaterial, "hardwood flooring");
    const seatingRaw = getLabel(selection.seatingConfig, "comfortable seating arrangement");
    const wallRaw = getLabel(selection.wallTreatment, "clean finished walls");
    const rugRaw = getLabel(selection.rug, "textured area rug");
    const lightingRaw = getLabel(selection.lighting, "ambient layered lighting");

    const generation = [
      `High quality architectural photography of a living room designed in a cohesive ${styleStr} aesthetic.`,
      `---`,
      `Layout & Seating:`,
      `${layoutRaw} featuring a ${seatingRaw}.`,
      `---`,
      `Materials & Surfaces:`,
      `* Flooring: ${flooringRaw}`,
      `* Wall Treatment: ${wallRaw}`,
      `* Area Rug: ${rugRaw}`,
      `Ensure strict adherence to the specified material palette. Do not introduce additional materials or substitute finishes.`,
      `---`,
      `Atmosphere & Detail:`,
      `* Lighting: ${lightingRaw}`,
      `---`,
      `Styling & Mood:`,
      `The space should feel inviting, balanced, and sophisticated. Use textures consistent with ${styleStr} to create a professional, lived-in appearance.`,
      `---`,
      `Rendering:`,
      `Photorealistic, natural daylight, architectural digest style, highly detailed, 8k resolution.`,
      `---`,
      `Control Rules:`,
      `* Do not introduce new materials, finishes, or design elements that are not specified`,
      `* Do not exaggerate scale or use terms such as "massive", "expansive", or "commercial-grade"`,
      `* Keep all elements consistent with the provided selections`
    ].filter(Boolean).join("\n\n");

    const renovation = [
      `[CONTEXT] A photorealistic renovation and style transformation of the existing living room image.`,
      `[STRUCTURAL PRESERVATION] Strictly preserve the existing living room footprint, structural walls, window placements, and overall room architecture. Maintain the exact camera angle and perspective.`,
      `[FUNCTIONAL ANCHORS] Strictly preserve and keep visible the primary window locations and any existing architectural fireplace or structural features.`,
      `[USER-SELECTED FEATURES]`,
      `Strictly include:`,
      `* ${layoutRaw}`,
      `* ${seatingRaw}`,
      `* ${rugRaw}`,
      `[MATERIALS]`,
      `* Flooring: ${flooringRaw}`,
      `* Wall Treatment: ${wallRaw}`,
      `No substitutions allowed.`,
      `[LIGHTING]`,
      `${lightingRaw} acting as the primary light source.`,
      `[STYLE DIRECTION]`,
      `Apply ${styleStr} aesthetics.`,
      `[DESIGN INTENT]`,
      `Balance realism with a high-end aspirational result. Transform the existing space into a refined, designer living room.`,
      `[RENDERING]`,
      `Photorealistic, natural daylight, architectural digest style, highly detailed, 8k.`
    ].filter(Boolean).join("\n\n");

    return { generation, renovation };
  }

  // DEFAULT KITCHEN LOGIC
  const layoutRaw = getLabel(selection.layout, "Standard layout");
  const storageRaw = getLabel(selection.storage, "standard storage");
  const applianceRaw = getLabel(selection.appliance, "professional-grade appliances");
  const lightingRaw = getLabel(selection.lighting, "ambient lighting");
  const flooringRaw = getLabel(selection.flooring, "hardwood flooring");
  const countertopRaw = getLabel(selection.countertop, "stone surfaces");
  const cabinetRaw = getLabel(selection.cabinet, "custom cabinetry");

  const generation = [
    `High quality architectural photography of a kitchen designed in a cohesive ${styleStr} aesthetic.`,
    `---`,
    `Layout:`,
    `${layoutRaw}.`,
    `---`,
    `Materials:`,
    `* Flooring: ${flooringRaw}`,
    `* Cabinetry: ${cabinetRaw}`,
    `* Countertops: ${countertopRaw}`,
    `Ensure strict adherence to the specified material palette. Do not introduce additional materials or substitute finishes.`,
    `---`,
    `Design Features:`,
    addonsList.length > 0 ? addonsList.map(a => `* ${a}`).join("\n") : `* ${storageRaw}`,
    selection.storage ? `* ${storageRaw}` : "",
    `---`,
    `Appliances (Strictly Enforced):`,
    `Upgrade all appliances to a professional-grade standard with a premium, modern appearance.`,
    `* Cooktop:\nA sleek, built-in gas or induction cooktop with a clean, minimal design and high-end finish.`,
    `* Ovens:\nBuilt-in double wall ovens with a modern stainless steel or integrated finish and clean, contemporary controls.`,
    `* Additional Appliances:\nAll visible appliances should reflect a high-end, professional aesthetic with clean lines and modern finishes.`,
    `Ensure all appliances appear upgraded, visually distinct, and consistent with a premium kitchen. Do not retain basic or outdated appliance designs.`,
    `---`,
    `Lighting:`,
    `${lightingRaw}, supported by soft ambient and under-cabinet lighting.`,
    `---`,
    `Styling & Mood:`,
    `Clean, modern, and grounded, with strong contrast between materials and natural warmth from wood tones. The space should feel refined, balanced, and inviting with minimal clutter.`,
    `---`,
    `Rendering:`,
    `Photorealistic, natural daylight, architectural digest style, highly detailed, 8k resolution.`,
    `---`,
    `Control Rules:`,
    `* Do not introduce new materials, finishes, or design elements that are not specified`,
    `* Do not exaggerate scale or use terms such as "massive", "expansive", or "commercial-grade"`,
    `* Keep all elements consistent with the provided selections`
  ].filter(Boolean).join("\n\n");

  const renovation = [
    `[CONTEXT] A photorealistic renovation and style transformation of the existing kitchen image.`,
    `[STRUCTURAL PRESERVATION] Strictly preserve the existing kitchen layout, structural walls, window placements, and overall room architecture. Maintain the exact camera angle and perspective.`,
    `[FUNCTIONAL ANCHORS] Strictly preserve and keep visible the cooktop, sink, and built-in ovens. Do not remove or relocate these elements.`,
    `[USER-SELECTED FEATURES]`,
    `Strictly include:`,
    addonsList.map(a => `* ${a}`).join("\n"),
    selection.storage ? `* ${storageRaw}` : "",
    `[SEATING]`,
    `Ensure the design includes integrated seating within the main kitchen workspace, with clearly visible stools proportionate to the available space.`,
    `[MATERIALS]`,
    `* Flooring: ${flooringRaw}`,
    `* Cabinetry: ${cabinetRaw}`,
    `* Countertops: ${countertopRaw}`,
    `No substitutions allowed.`,
    `[LAYOUT ADAPTATION]`,
    `Adapt the "${formatDisplayLabel(selection.layout)}" design intent to the existing kitchen geometry. Ensure the ${selection.layout?.includes("island") ? "island" : "workspace"} fits proportionally within the space and uses the specified materials.`,
    `[FEATURE INTEGRATION]`,
    `Integrate all features naturally into the existing structure without forcing unrealistic layouts.`,
    `[FEATURE EMPHASIS]`,
    `Ensure the following are visually prominent:`,
    selection.layout?.includes("seating") ? `* Island seating` : "",
    selection.storage === "open-shelving" ? `* Open shelving` : "",
    selection.lighting === "statement-lighting" ? `* Statement lighting` : "",
    selection.addons?.["wine-fridge"] ? `* Wine fridge` : "",
    `Do not minimize or hide these elements.`,
    `[APPLIANCES]`,
    `Upgrade all appliances to a professional-grade appearance while maintaining their positions.`,
    `[LIGHTING]`,
    `${lightingRaw} acting as the focal point, supported by ambient and under-cabinet lighting.`,
    `[STYLE DIRECTION]`,
    `Apply ${styleStr} aesthetics.`,
    `[DESIGN INTENT]`,
    `Balance realism with a high-end aspirational result.`,
    `[RENDERING]`,
    `Photorealistic, natural daylight, architectural digest style, highly detailed, 8k.`
  ].filter(Boolean).join("\n\n");

  return { generation, renovation };
}


// Keep the old one for compatibility while we transition or just update it to use the new logic
export function generatePromptDescription(styles: string[], selection: any): string {
  return generatePrompts(styles, selection).generation;
}
