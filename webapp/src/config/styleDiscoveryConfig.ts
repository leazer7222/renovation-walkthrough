export interface StyleOption {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  image: string;
}

const ASSET_PATH = "/visualization-library/comparison/kitchen/prototype/Styles";

export const interiorStyles: StyleOption[] = [
  {
    id: "scandinavian",
    name: "Scandinavian",
    tagline: "Warm Minimalism",
    description: [
      "Bright, minimal spaces with soft warmth.",
      "Light woods, white walls, and airy layouts.",
      "Warmer and more livable than Minimalist.",
      "Feels cozy, calm, and effortlessly functional."
    ],
    image: `${ASSET_PATH}/Scandinavian.png`
  },
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "Pure Simplicity",
    description: [
      "Stripped down to only what’s essential.",
      "Flat surfaces, neutral tones, and no excess.",
      "More extreme and reduced than Scandinavian.",
      "Feels quiet, controlled, and intentional."
    ],
    image: `${ASSET_PATH}/Minimalist.png`
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Bold Precision",
    description: [
      "Sharp, structured, and design-forward.",
      "Clean lines, high contrast, and strong geometry.",
      "More defined and dramatic than Contemporary.",
      "Feels sleek, sophisticated, and architectural."
    ],
    image: `${ASSET_PATH}/Modern.png`
  },
  {
    id: "contemporary",
    name: "Contemporary",
    tagline: "Soft Modern",
    description: [
      "Clean design that evolves with current trends.",
      "Neutral palettes with subtle curves and texture.",
      "Less rigid and more flexible than Modern.",
      "Feels polished, comfortable, and current."
    ],
    image: `${ASSET_PATH}/Contemporary.png`
  },
  {
    id: "japandi",
    name: "Japandi",
    tagline: "Balanced Harmony",
    description: [
      "Minimal design with warmth and texture.",
      "Muted tones, wood, and handcrafted elements.",
      "Softer and more inviting than Minimalist.",
      "Feels calm, intentional, and balanced."
    ],
    image: `${ASSET_PATH}/Japandi.png`
  },
  {
    id: "japanese",
    name: "Japanese",
    tagline: "Zen Minimal",
    description: [
      "Highly minimal with focus on space and balance.",
      "Low furniture, natural materials, open layouts.",
      "More traditional and spiritual than Japandi.",
      "Feels peaceful, grounded, and meditative."
    ],
    image: `${ASSET_PATH}/Japanese.png`
  },
  {
    id: "industrial",
    name: "Industrial",
    tagline: "Raw Urban",
    description: [
      "Edgy and unfinished with a warehouse feel.",
      "Metal, brick, concrete, and dark tones.",
      "Rougher and more rugged than Modern styles.",
      "Feels bold, utilitarian, and strong."
    ],
    image: `${ASSET_PATH}/Industrial.png`
  },
  {
    id: "rustic",
    name: "Rustic",
    tagline: "Natural Rough",
    description: [
      "Organic and rugged with heavy textures.",
      "Reclaimed wood, stone, and earthy tones.",
      "Warmer and more natural than Industrial.",
      "Feels grounded, cozy, and authentic."
    ],
    image: `${ASSET_PATH}/Rustic.png`
  },
  {
    id: "farmhouse",
    name: "Farmhouse",
    tagline: "Modern Cozy",
    description: [
      "Clean rustic with a welcoming touch.",
      "White tones, wood accents, and simple forms.",
      "Brighter and softer than Rustic.",
      "Feels warm, familiar, and inviting."
    ],
    image: `${ASSET_PATH}/Farmhouse.png`
  },
  {
    id: "french-country",
    name: "French Country",
    tagline: "Rustic Elegance",
    description: [
      "Old-world charm with decorative detail.",
      "Soft colors, curves, and antique finishes.",
      "More refined and ornate than Farmhouse.",
      "Feels romantic, cozy, and elevated."
    ],
    image: `${ASSET_PATH}/French Country.png`
  },
  {
    id: "coastal",
    name: "Coastal",
    tagline: "Breezy Light",
    description: [
      "Airy and relaxed with beach-inspired tones.",
      "Soft blues, whites, and natural textures.",
      "More casual and open than Scandinavian.",
      "Feels fresh, light, and easygoing."
    ],
    image: `${ASSET_PATH}/Coastal.png`
  },
  {
    id: "midcentury-modern",
    name: "Midcentury Modern",
    tagline: "Retro Clean",
    description: [
      "Vintage-inspired with simple, functional forms.",
      "Warm woods, bold accents, geometric shapes.",
      "More playful and expressive than Modern.",
      "Feels stylish, nostalgic, and energetic."
    ],
    image: `${ASSET_PATH}/Midcentury-Modern.png`
  },
  {
    id: "bohemian",
    name: "Bohemian",
    tagline: "Creative Chaos",
    description: [
      "Layered, colorful, and free-spirited.",
      "Patterns, textiles, and collected decor.",
      "The opposite of Minimalist design.",
      "Feels expressive, relaxed, and personal."
    ],
    image: `${ASSET_PATH}/Bohemian.png`
  },
  {
    id: "vintage",
    name: "Vintage",
    tagline: "Soft Nostalgia",
    description: [
      "Curated spaces inspired by past eras.",
      "Muted colors, antiques, and delicate details.",
      "More refined and selective than Bohemian.",
      "Feels charming, timeless, and personal."
    ],
    image: `${ASSET_PATH}/Vintage.png`
  },
  {
    id: "neoclassic",
    name: "Neoclassic",
    tagline: "Timeless Formal",
    description: [
      "Elegant and symmetrical with subtle luxury.",
      "Molding, balance, and soft neutral palettes.",
      "More structured than most traditional styles.",
      "Feels formal, polished, and enduring."
    ],
    image: `${ASSET_PATH}/Neoclassic.png`
  },
  {
    id: "biophilic",
    name: "Biophilic",
    tagline: "Nature Living",
    description: [
      "Design centered around nature and greenery.",
      "Plants, sunlight, and organic materials.",
      "More about connection than strict style rules.",
      "Feels fresh, calming, and alive."
    ],
    image: `${ASSET_PATH}/Biophilic.png`
  }
];

export const initialPairings: [string, string][] = [
  ["minimalist", "bohemian"],
  ["scandinavian", "industrial"],
  ["modern", "rustic"],
  ["japanese", "farmhouse"],
  ["japandi", "midcentury-modern"],
  ["contemporary", "french-country"],
  ["biophilic", "neoclassic"],
  ["coastal", "vintage"]
];
