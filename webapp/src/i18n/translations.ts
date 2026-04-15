export type Translations = {
  // Brand
  brandTagline: string;

  // Start Screen
  landingHeadline: string;
  landingSubheadline: string;
  landingMicrocopy: string;
  discoverYourStyle: string;
  discoverYourStyleDesc: string;
  startBracket: string;
  startYourRenovation: string;
  startYourRenovationDesc: string;
  buildMySpace: string;

  // Onboarding - nav
  back: string;
  continue: string;
  selectNMore: (n: number) => string;
  xOfYSelected: (x: number, y: number) => string;
  takesLessThan2Min: string;
  stepOf: (current: number, total: number, label: string) => string;

  // Onboarding - Room step
  roomStepLabel: string;
  roomTitle: string;
  roomSubtitle: string;
  kitchen: string;
  kitchenDesc: string;
  bathroom: string;
  bathroomDesc: string;
  livingRoom: string;
  livingRoomDesc: string;

  // Onboarding - Budget step
  budgetStepLabel: string;
  budgetTitle: string;
  budgetSubtitle: string;
  budgetLow: string;
  budgetLowDesc: string;
  budgetMedium: string;
  budgetMediumDesc: string;
  budgetHigh: string;
  budgetHighDesc: string;

  // Onboarding - Styles step
  stylesStepLabel: string;
  stylesTitle: string;
  stylesSubtitle: string;

  // Onboarding - Priority step
  priorityStepLabel: string;
  priorityTitle: string;
  prioritySubtitle: string;
  priorityCost: string;
  priorityCostDesc: string;
  priorityAesthetics: string;
  priorityAestheticsDesc: string;
  priorityDurability: string;
  priorityDurabilityDesc: string;
  priorityResale: string;
  priorityResaleDesc: string;

  // Style Discovery
  step1StyleDiscovery: string;
  roundOf16: string;
  quarterfinals: string;
  semifinals: string;
  theFinalRound: string;
  matchXofY: (x: number, y: number) => string;
  selectThisStyle: string;

  // Style Results
  yourDesignIdentity: string;
  bestMatchSubtitle: string;
  winner: string;
  runnerUp: string;
  semiFinalist: string;
  useTheseStylesForMyProject: string;

  // Transition Screen
  selectionSaved: string;
  greatChoice: string;
  nowLetsContinue: string;
  continueBtn: string;
  kitchen_layout_next: string;
  kitchen_storage_next: string;
  kitchen_appliance_next: string;
  kitchen_lighting_next: string;
  kitchen_addons_next: string;
  kitchen_flooring_next: string;
  kitchen_countertop_next: string;
  bathroom_showerType_next: string;
  bathroom_showerTileStyle_next: string;
  bathroom_vanityStyle_next: string;
  bathroom_flooring_next: string;
  bathroom_wallTreatment_next: string;
  bathroom_vanityFinish_next: string;
  bathroom_mirrorStyle_next: string;
  livingRoom_layout_next: string;
  livingRoom_flooringMaterial_next: string;
  livingRoom_seatingConfig_next: string;
  livingRoom_wallTreatment_next: string;
  livingRoom_rug_next: string;

  // Progress Bar
  stepXofY: (x: number, y: number, label: string) => string;
  choicesRemaining: (n: number) => string;

  // Comparison Card
  select: string;

  // Selections Bar
  choosingNow: string;

  // Addon Screen
  addonsStepLabel: string;
  addonsTitle: string;
  addonsSubtitle: string;
  viewFinalReveal: string;

  // Final Reveal
  projectComplete: string;
  kitchenReveal: string;
  bathroomReveal: string;
  livingRoomReveal: string;
  inspiredByYourSelections: string;
  howYourDesignReflects: string;
  whyItWorks: string;
  yourCompleteSelections: string;
  addOns: string;
  defaultKitchenPrompt: string;
  defaultBathroomPrompt: string;
  defaultLivingRoomPrompt: string;
  transformationPrompt: string;
  promptCopied: (room: string) => string;
  transformationPromptCopied: string;
  restartGame: string;
  saveDesign: string;
  designSaved: string;

  // Phase labels (used in ProgressBar and CurrentSelectionsBar)
  phaseLabels: Record<string, string>;

  // Option labels per phase (used in ComparisonCard, CurrentSelectionsBar, FinalReveal)
  phaseOptionLabels: Record<string, Record<string, string>>;

  // Style descriptions (OnboardingScreen styles step)
  styleDescriptions: Record<string, string>;

  // Addon labels and descriptions
  addonLabels: Record<string, string>;
  addonDescriptions: Record<string, string>;

  // AI Visualization
  generateAiImage: string;
  generatingImage: string;
  aiGeneratedResult: string;
  downloadImage: string;
  generateAiError: string;
  retryGeneration: string;

  // Misc
  notSelected: string;
  preparingGame: string;
};

export const en: Translations = {
  brandTagline: "Renovation Made Easy",

  landingHeadline: "A Smarter Way to Plan Your Renovation",
  landingSubheadline:
    "Skip the endless scrolling. Make quick decisions and uncover your style through simple, guided comparisons.",
  landingMicrocopy: "Takes less than 2 minutes",
  discoverYourStyle: "Discover Your Style",
  discoverYourStyleDesc:
    "Play the Style Bracket game to find your perfect design match.",
  startBracket: "Start Bracket",
  startYourRenovation: "Start Your Renovation",
  startYourRenovationDesc:
    "Skip the game and go straight to building your space.",
  buildMySpace: "Build My Space",

  back: "Back",
  continue: "Continue",
  selectNMore: (n) => `Select ${n} more`,
  xOfYSelected: (x, y) => `${x} / ${y} selected`,
  takesLessThan2Min: "Takes less than 2 minutes",
  stepOf: (current, total, label) => `Step ${current} of ${total} — ${label}`,

  roomStepLabel: "Getting Started",
  roomTitle: "What space are you working on?",
  roomSubtitle: "We'll tailor your options based on the room you're designing.",
  kitchen: "Kitchen",
  kitchenDesc: "Cabinets, countertops, flooring",
  bathroom: "Bathroom",
  bathroomDesc: "Tile, vanities, fixtures",
  livingRoom: "Living Room",
  livingRoomDesc: "Flooring, finishes, layout",

  budgetStepLabel: "Budget",
  budgetTitle: "What's your budget range?",
  budgetSubtitle: "This helps us show options that match your price point.",
  budgetLow: "Budget-Friendly",
  budgetLowDesc: "Cost-conscious options",
  budgetMedium: "Mid-Range",
  budgetMediumDesc: "Balanced quality and cost",
  budgetHigh: "Premium",
  budgetHighDesc: "High-end materials and finishes",

  stylesStepLabel: "Style",
  stylesTitle: "Pick 3 styles that inspire you.",
  stylesSubtitle:
    "Your selections will shape the look and feel of your renovation.",

  priorityStepLabel: "Priorities",
  priorityTitle: "What's your top priority?",
  prioritySubtitle:
    "We'll prioritize options based on what matters most to you.",
  priorityCost: "Cost",
  priorityCostDesc: "Stay within budget",
  priorityAesthetics: "Aesthetics",
  priorityAestheticsDesc: "Look and design",
  priorityDurability: "Durability",
  priorityDurabilityDesc: "Long-lasting materials",
  priorityResale: "Resale Value",
  priorityResaleDesc: "Maximize home value",

  step1StyleDiscovery: "Step 1: Style Discovery",
  roundOf16: "Round of 16",
  quarterfinals: "Quarterfinals",
  semifinals: "Semifinals",
  theFinalRound: "The Final Round",
  matchXofY: (x, y) =>
    `Match ${x} of ${y} — Pick your favorite style to advance it.`,
  selectThisStyle: "Select This Style",

  yourDesignIdentity: "Your Design Identity",
  bestMatchSubtitle: "These are the styles that best match your preferences.",
  winner: "Winner",
  runnerUp: "Runner Up",
  semiFinalist: "Semi-Finalist",
  useTheseStylesForMyProject: "Use These Styles for My Project",

  selectionSaved: "Selection Saved",
  greatChoice: "Great choice!",
  nowLetsContinue: "Now let's continue building your design.",
  continueBtn: "Continue",
  kitchen_layout_next: "Now let's choose a storage style.",
  kitchen_storage_next: "Next up: appliances.",
  kitchen_appliance_next:
    "Let's illuminate your space with some lighting choices.",
  kitchen_lighting_next: "Time to consider any premium add-ons.",
  kitchen_addons_next:
    "Now for the fun part: let's pick your materials! Starting with flooring.",
  kitchen_flooring_next:
    "Now let's choose a countertop that works with your floor.",
  kitchen_countertop_next:
    "Now let's find the cabinet style to complete your kitchen.",
  bathroom_showerType_next: "Next, let's design the shower tile.",
  bathroom_showerTileStyle_next: "Now let's select a vanity style.",
  bathroom_vanityStyle_next:
    "Now let's ground the space with some flooring.",
  bathroom_flooring_next: "Now let's choose your wall treatment.",
  bathroom_wallTreatment_next: "Let's define the finish for your vanity.",
  bathroom_vanityFinish_next: "Almost there! Let's pick a mirror style.",
  bathroom_mirrorStyle_next:
    "Time to consider any premium bathroom add-ons.",
  livingRoom_layout_next:
    "Great layout! Now let's decide on the flooring material.",
  livingRoom_flooringMaterial_next:
    "Excellent floor. Next: let's configure your seating.",
  livingRoom_seatingConfig_next:
    "Comfort is key. Now let's pick a wall treatment for your living space.",
  livingRoom_wallTreatment_next:
    "Looking sharp! Let's find a rug to ground the room.",
  livingRoom_rug_next:
    "Last step! Let's illuminate your living room with a lighting choice.",

  stepXofY: (x, y, label) =>
    `Step ${x} of ${y}: Choose your ${label.toLowerCase()}`,
  choicesRemaining: (n) => `${n} choices remaining`,

  select: "Select",

  choosingNow: "Choosing now",

  addonsStepLabel: "Design Foundation — Add-ons",
  addonsTitle: "Select any desired Add-ons",
  addonsSubtitle:
    "Toggle the features you'd love to include in your design.",
  viewFinalReveal: "View Final Reveal",

  projectComplete: "Project Complete",
  kitchenReveal: "Your Kitchen Reveal",
  bathroomReveal: "Your Bathroom Reveal",
  livingRoomReveal: "Your Living Room Reveal",
  inspiredByYourSelections: "Inspired by your selections",
  howYourDesignReflects: "How your final design reflects that direction",
  whyItWorks: "Why it works",
  yourCompleteSelections: "Your Complete Selections",
  addOns: "Add-Ons",
  defaultKitchenPrompt: "1. Default Kitchen Prompt",
  defaultBathroomPrompt: "1. Default Bathroom Prompt",
  defaultLivingRoomPrompt: "1. Default Living Room Prompt",
  transformationPrompt: "2. Transformation Prompt",
  promptCopied: (room) => `Default ${room} Prompt Copied!`,
  transformationPromptCopied: "Transformation Prompt Copied!",
  restartGame: "Restart Game",
  saveDesign: "Save Design",
  designSaved: "Design Saved! (Placeholder)",

  preparingGame: "Preparing game...",

  phaseLabels: {
    "layout": "Layout",
    "storage": "Storage Style",
    "appliance": "Appliance Style",
    "lighting": "Lighting Style",
    "flooring": "Flooring",
    "countertop": "Countertop",
    "cabinet": "Cabinet",
    "shower-type": "Shower Type",
    "shower-tile-style": "Shower Tile Style",
    "vanity-style": "Vanity Style",
    "wall-treatment": "Wall Treatment",
    "vanity-finish": "Vanity Finish",
    "mirror-style": "Mirror Style",
    "flooring-material": "Flooring Material",
    "seating-config": "Seating Configuration",
    "rug": "Rug Style",
  },

  phaseOptionLabels: {
    "layout": {
      "large-island-with-seating": "Large Island with Seating",
      "small-prep-island": "Small Prep Island",
      "no-island": "No Island",
      "tv-centered": "TV Centered",
      "conversation": "Conversation",
      "open-minimal": "Open Minimal",
      "cozy-dense": "Cozy Dense",
    },
    "storage": {
      "closed-cabinetry": "Closed Cabinetry",
      "open-shelving": "Open Shelving",
      "glass-display-cabinets": "Glass Display Cabinets",
      "minimal-storage": "Minimal Storage",
    },
    "appliance": {
      "standard-stainless": "Standard Stainless",
      "integrated-appliances": "Integrated Appliances",
      "professional-statement-appliances": "Professional Statement Appliances",
    },
    "lighting": {
      "minimal-recessed-only": "Minimal Recessed Only",
      "pendant-lighting": "Pendant Lighting",
      "statement-lighting": "Statement Lighting",
      "statement": "Statement Fixture",
      "subtle": "Subtle Layered",
    },
    "flooring": {
      "dark-walnut": "Dark Walnut",
      "large-format-tile": "Large Format Tile",
      "light-oak": "Light Oak",
      "microcement": "Microcement",
      "light-neutral-tile": "Light Neutral Tile",
      "patterned-tile": "Patterned Tile",
      "dark-stone-tile": "Dark Stone Tile",
    },
    "countertop": {
      "marble": "Marble",
      "granite": "Granite",
      "butcher-block": "Butcher Block",
      "dark-quartz": "Dark Quartz",
    },
    "cabinet": {
      "flat-panel-white": "Flat Panel White",
      "shaker": "Shaker",
      "matte-black": "Matte Black",
      "warm-wood": "Warm Wood",
    },
    "shower-type": {
      "tub-shower-combo": "Tub Shower Combo",
      "standalone-tub": "Standalone Tub",
      "walk-in-glass-shower": "Walk-in Glass Shower",
      "walk-in-half-wall-shower": "Walk-in Half Wall",
    },
    "shower-tile-style": {
      "accent-band": "Accent Band",
      "feature-back-wall": "Feature Back Wall",
      "full-pattern-textured-tile": "Full Pattern Textured Tile",
      "uniform-tile": "Uniform Tile",
    },
    "vanity-style": {
      "built-in-vanity": "Built-in Vanity",
      "double-vanity": "Double Vanity",
      "vanity-tower": "Vanity Tower",
    },
    "wall-treatment": {
      "painted-wall": "Painted Wall",
      "half-wall-paneling": "Half Wall Paneling",
      "full-tile-feature-wall": "Full Tile Feature Wall",
      "clean": "Clean Walls",
      "feature": "Feature Wall",
      "accent": "Accent Wall",
    },
    "vanity-finish": {
      "white-vanity": "White Vanity",
      "light-wood-vanity": "Light Wood Vanity",
      "dark-or-black-vanity": "Dark or Black Vanity",
    },
    "mirror-style": {
      "framed-mirror": "Framed Mirror",
      "frameless-mirror": "Frameless Mirror",
      "led-backlit-mirror": "LED Backlit Mirror",
    },
    "flooring-material": {
      "wood": "Natural Wood",
      "tile": "Designer Tile",
      "stone": "Natural Stone",
      "concrete": "Polished Concrete",
    },
    "seating-config": {
      "sectional": "Sectional Sofa",
      "sofa-chairs": "Sofa & Chairs",
      "minimal-sofa": "Minimal Sofa",
      "lounge-layered": "Lounge Layered",
    },
    "rug": {
      "subtle": "Subtle Neutral",
      "statement": "Statement Pattern",
    },
  },

  styleDescriptions: {
    "biophilic": "Nature-inspired elements",
    "bohemian": "Eclectic and free-spirited",
    "coastal": "Breezy, light, and airy",
    "contemporary": "Current, curated, and refined",
    "farmhouse": "Warm, rustic, and welcoming",
    "french-country": "Elegant and pastoral charm",
    "industrial": "Raw materials and edge",
    "japandi": "Japanese-Scandi minimalism",
    "japanese": "Serene, ordered, and natural",
    "midcentury-modern": "Retro lines and warmth",
    "minimalist": "Less is more",
    "modern": "Clean lines and bold contrast",
    "neoclassic": "Timeless elegance reimagined",
    "rustic": "Earthy, natural, and textured",
    "vintage": "Nostalgic and characterful",
  },

  addonLabels: {
    "wine-fridge": "Wine Fridge",
    "under-cabinet-ambient-glow": "Under Cabinet Ambient Glow",
    "toilet-upgrade": "Toilet Upgrade",
    "mirror-upgrade": "Mirror Upgrade",
    "shower-experience": "Shower Experience",
    "comfort-upgrade": "Comfort Upgrade",
    "storage-functionality": "Storage Functionality",
  },

  addonDescriptions: {
    "wine-fridge": "Dedicated climate-controlled wine storage",
    "under-cabinet-ambient-glow": "Soft, integrated lighting beneath upper cabinets",
    "toilet-upgrade": "Standard, modern skirted, or smart toilet bidet",
    "mirror-upgrade": "Standard, backlit, or smart backlit mirror",
    "shower-experience": "Rainfall or handheld shower head combo",
    "comfort-upgrade": "Heated floors and towel warmer",
    "storage-functionality": "Shower niche with built-in shelving",
  },

  generateAiImage: "Generate AI Image",
  generatingImage: "Generating your design…",
  aiGeneratedResult: "AI Generated Design",
  downloadImage: "Download Image",
  generateAiError: "Generation failed. Please try again.",
  retryGeneration: "Retry",

  notSelected: "Not selected",
};

export const es: Translations = {
  brandTagline: "Renovación Simplificada",

  landingHeadline: "Una Forma Más Inteligente de Planear Tu Renovación",
  landingSubheadline:
    "Olvídate del scroll interminable. Toma decisiones rápidas y descubre tu estilo mediante comparaciones simples y guiadas.",
  landingMicrocopy: "Toma menos de 2 minutos",
  discoverYourStyle: "Descubre Tu Estilo",
  discoverYourStyleDesc:
    "Juega el torneo de estilos para encontrar tu diseño perfecto.",
  startBracket: "Iniciar Torneo",
  startYourRenovation: "Comienza Tu Renovación",
  startYourRenovationDesc:
    "Omite el juego y ve directo a diseñar tu espacio.",
  buildMySpace: "Diseñar Mi Espacio",

  back: "Atrás",
  continue: "Continuar",
  selectNMore: (n) => `Selecciona ${n} más`,
  xOfYSelected: (x, y) => `${x} / ${y} seleccionados`,
  takesLessThan2Min: "Toma menos de 2 minutos",
  stepOf: (current, total, label) =>
    `Paso ${current} de ${total} — ${label}`,

  roomStepLabel: "Comenzando",
  roomTitle: "¿En qué espacio vas a trabajar?",
  roomSubtitle:
    "Personalizaremos las opciones según la habitación que estés diseñando.",
  kitchen: "Cocina",
  kitchenDesc: "Gabinetes, encimeras, pisos",
  bathroom: "Baño",
  bathroomDesc: "Azulejos, vanidades, accesorios",
  livingRoom: "Sala de Estar",
  livingRoomDesc: "Pisos, acabados, diseño",

  budgetStepLabel: "Presupuesto",
  budgetTitle: "¿Cuál es tu rango de presupuesto?",
  budgetSubtitle: "Esto nos ayuda a mostrarte opciones que se ajusten a tu precio.",
  budgetLow: "Económico",
  budgetLowDesc: "Opciones con buen precio",
  budgetMedium: "Rango Medio",
  budgetMediumDesc: "Balance entre calidad y costo",
  budgetHigh: "Premium",
  budgetHighDesc: "Materiales y acabados de alta gama",

  stylesStepLabel: "Estilo",
  stylesTitle: "Elige 3 estilos que te inspiren.",
  stylesSubtitle:
    "Tus selecciones definirán el aspecto y la sensación de tu renovación.",

  priorityStepLabel: "Prioridades",
  priorityTitle: "¿Cuál es tu prioridad principal?",
  prioritySubtitle:
    "Priorizaremos las opciones según lo que más te importe.",
  priorityCost: "Costo",
  priorityCostDesc: "Mantenerse dentro del presupuesto",
  priorityAesthetics: "Estética",
  priorityAestheticsDesc: "Apariencia y diseño",
  priorityDurability: "Durabilidad",
  priorityDurabilityDesc: "Materiales de larga duración",
  priorityResale: "Valor de Reventa",
  priorityResaleDesc: "Maximizar el valor del hogar",

  step1StyleDiscovery: "Paso 1: Descubrimiento de Estilo",
  roundOf16: "Ronda de 16",
  quarterfinals: "Cuartos de Final",
  semifinals: "Semifinales",
  theFinalRound: "La Ronda Final",
  matchXofY: (x, y) =>
    `Duelo ${x} de ${y} — Elige tu estilo favorito para avanzarlo.`,
  selectThisStyle: "Seleccionar Este Estilo",

  yourDesignIdentity: "Tu Identidad de Diseño",
  bestMatchSubtitle:
    "Estos son los estilos que mejor se adaptan a tus preferencias.",
  winner: "Ganador",
  runnerUp: "Subcampeón",
  semiFinalist: "Semifinalista",
  useTheseStylesForMyProject: "Usar Estos Estilos para Mi Proyecto",

  selectionSaved: "Selección Guardada",
  greatChoice: "¡Excelente elección!",
  nowLetsContinue: "Ahora sigamos construyendo tu diseño.",
  continueBtn: "Continuar",
  kitchen_layout_next: "Ahora elijamos un estilo de almacenamiento.",
  kitchen_storage_next: "Siguiente: electrodomésticos.",
  kitchen_appliance_next:
    "Iluminemos tu espacio con algunas opciones de iluminación.",
  kitchen_lighting_next: "Es hora de considerar complementos premium.",
  kitchen_addons_next:
    "¡Ahora lo divertido: elijamos los materiales! Empezando con el piso.",
  kitchen_flooring_next:
    "Ahora elijamos una encimera que combine con tu piso.",
  kitchen_countertop_next:
    "Busquemos el estilo de gabinete para completar tu cocina.",
  bathroom_showerType_next: "Siguiente, diseñemos el azulejo de la ducha.",
  bathroom_showerTileStyle_next: "Ahora elijamos un estilo de vanidad.",
  bathroom_vanityStyle_next: "Ahora definamos el espacio con el piso.",
  bathroom_flooring_next: "Ahora elijamos el tratamiento de pared.",
  bathroom_wallTreatment_next: "Definamos el acabado de tu vanidad.",
  bathroom_vanityFinish_next: "¡Casi listo! Elijamos un estilo de espejo.",
  bathroom_mirrorStyle_next:
    "Es hora de considerar complementos premium para el baño.",
  livingRoom_layout_next:
    "¡Excelente diseño! Ahora decidamos el material del piso.",
  livingRoom_flooringMaterial_next:
    "Excelente piso. Siguiente: configuremos tu asiento.",
  livingRoom_seatingConfig_next:
    "La comodidad es clave. Elijamos un tratamiento de pared para tu sala.",
  livingRoom_wallTreatment_next:
    "¡Se ve genial! Busquemos una alfombra para anclar la habitación.",
  livingRoom_rug_next:
    "¡Último paso! Iluminemos tu sala con una opción de iluminación.",

  stepXofY: (x, y, label) =>
    `Paso ${x} de ${y}: Elige tu ${label.toLowerCase()}`,
  choicesRemaining: (n) => `${n} opciones restantes`,

  select: "Seleccionar",

  choosingNow: "Eligiendo ahora",

  addonsStepLabel: "Base del Diseño — Complementos",
  addonsTitle: "Selecciona los complementos deseados",
  addonsSubtitle:
    "Activa las funciones que te gustaría incluir en tu diseño.",
  viewFinalReveal: "Ver Resultado Final",

  projectComplete: "Proyecto Completado",
  kitchenReveal: "El Resultado de Tu Cocina",
  bathroomReveal: "El Resultado de Tu Baño",
  livingRoomReveal: "El Resultado de Tu Sala",
  inspiredByYourSelections: "Inspirado por tus selecciones",
  howYourDesignReflects: "Cómo tu diseño final refleja esa dirección",
  whyItWorks: "Por qué funciona",
  yourCompleteSelections: "Tus Selecciones Completas",
  addOns: "Complementos",
  defaultKitchenPrompt: "1. Prompt de Cocina Predeterminado",
  defaultBathroomPrompt: "1. Prompt de Baño Predeterminado",
  defaultLivingRoomPrompt: "1. Prompt de Sala Predeterminado",
  transformationPrompt: "2. Prompt de Transformación",
  promptCopied: (room) => `¡Prompt de ${room} Copiado!`,
  transformationPromptCopied: "¡Prompt de Transformación Copiado!",
  restartGame: "Reiniciar Juego",
  saveDesign: "Guardar Diseño",
  designSaved: "¡Diseño Guardado! (Placeholder)",

  preparingGame: "Preparando el juego...",

  phaseLabels: {
    "layout": "Diseño",
    "storage": "Estilo de Almacenamiento",
    "appliance": "Estilo de Electrodomésticos",
    "lighting": "Estilo de Iluminación",
    "flooring": "Piso",
    "countertop": "Encimera",
    "cabinet": "Gabinete",
    "shower-type": "Tipo de Ducha",
    "shower-tile-style": "Estilo de Azulejo de Ducha",
    "vanity-style": "Estilo de Vanidad",
    "wall-treatment": "Tratamiento de Pared",
    "vanity-finish": "Acabado de Vanidad",
    "mirror-style": "Estilo de Espejo",
    "flooring-material": "Material de Piso",
    "seating-config": "Configuración de Asientos",
    "rug": "Estilo de Alfombra",
  },

  phaseOptionLabels: {
    "layout": {
      "large-island-with-seating": "Isla Grande con Asientos",
      "small-prep-island": "Isla Pequeña de Preparación",
      "no-island": "Sin Isla",
      "tv-centered": "Centrado en TV",
      "conversation": "Conversacional",
      "open-minimal": "Abierto Minimalista",
      "cozy-dense": "Acogedor y Denso",
    },
    "storage": {
      "closed-cabinetry": "Gabinetes Cerrados",
      "open-shelving": "Estantes Abiertos",
      "glass-display-cabinets": "Gabinetes con Vidrio",
      "minimal-storage": "Almacenamiento Mínimo",
    },
    "appliance": {
      "standard-stainless": "Acero Inoxidable Estándar",
      "integrated-appliances": "Electrodomésticos Integrados",
      "professional-statement-appliances": "Electrodomésticos Profesionales",
    },
    "lighting": {
      "minimal-recessed-only": "Solo Empotrado Mínimo",
      "pendant-lighting": "Iluminación Colgante",
      "statement-lighting": "Iluminación Destacada",
      "statement": "Lámpara Destacada",
      "subtle": "Iluminación en Capas",
    },
    "flooring": {
      "dark-walnut": "Nogal Oscuro",
      "large-format-tile": "Azulejo de Gran Formato",
      "light-oak": "Roble Claro",
      "microcement": "Microcemento",
      "light-neutral-tile": "Azulejo Neutro Claro",
      "patterned-tile": "Azulejo con Patrón",
      "dark-stone-tile": "Azulejo de Piedra Oscuro",
    },
    "countertop": {
      "marble": "Mármol",
      "granite": "Granito",
      "butcher-block": "Tablero de Carnicero",
      "dark-quartz": "Cuarzo Oscuro",
    },
    "cabinet": {
      "flat-panel-white": "Panel Plano Blanco",
      "shaker": "Shaker",
      "matte-black": "Negro Mate",
      "warm-wood": "Madera Cálida",
    },
    "shower-type": {
      "tub-shower-combo": "Combo Bañera y Ducha",
      "standalone-tub": "Bañera Independiente",
      "walk-in-glass-shower": "Ducha Walk-in de Vidrio",
      "walk-in-half-wall-shower": "Ducha Walk-in con Media Pared",
    },
    "shower-tile-style": {
      "accent-band": "Banda de Acento",
      "feature-back-wall": "Pared Trasera Decorativa",
      "full-pattern-textured-tile": "Azulejo Texturizado Completo",
      "uniform-tile": "Azulejo Uniforme",
    },
    "vanity-style": {
      "built-in-vanity": "Vanidad Empotrada",
      "double-vanity": "Vanidad Doble",
      "vanity-tower": "Torre de Vanidad",
    },
    "wall-treatment": {
      "painted-wall": "Pared Pintada",
      "half-wall-paneling": "Panelado de Media Pared",
      "full-tile-feature-wall": "Pared Decorativa de Azulejo Completo",
      "clean": "Paredes Limpias",
      "feature": "Pared Decorativa",
      "accent": "Pared de Acento",
    },
    "vanity-finish": {
      "white-vanity": "Vanidad Blanca",
      "light-wood-vanity": "Vanidad de Madera Clara",
      "dark-or-black-vanity": "Vanidad Oscura o Negra",
    },
    "mirror-style": {
      "framed-mirror": "Espejo con Marco",
      "frameless-mirror": "Espejo sin Marco",
      "led-backlit-mirror": "Espejo con Luz LED",
    },
    "flooring-material": {
      "wood": "Madera Natural",
      "tile": "Azulejo de Diseñador",
      "stone": "Piedra Natural",
      "concrete": "Concreto Pulido",
    },
    "seating-config": {
      "sectional": "Sofá Seccional",
      "sofa-chairs": "Sofá y Sillas",
      "minimal-sofa": "Sofá Minimalista",
      "lounge-layered": "Lounge en Capas",
    },
    "rug": {
      "subtle": "Neutro Sutil",
      "statement": "Patrón Destacado",
    },
  },

  styleDescriptions: {
    "biophilic": "Elementos inspirados en la naturaleza",
    "bohemian": "Ecléctico y de espíritu libre",
    "coastal": "Fresco, luminoso y aireado",
    "contemporary": "Actual, refinado y curado",
    "farmhouse": "Cálido, rústico y acogedor",
    "french-country": "Encanto elegante y campestre",
    "industrial": "Materiales crudos y vanguardia",
    "japandi": "Minimalismo japonés-escandinavo",
    "japanese": "Sereno, ordenado y natural",
    "midcentury-modern": "Líneas retro y calidez",
    "minimalist": "Menos es más",
    "modern": "Líneas limpias y contraste audaz",
    "neoclassic": "Elegancia atemporal reimaginada",
    "rustic": "Terroso, natural y texturizado",
    "vintage": "Nostálgico y con carácter",
  },

  addonLabels: {
    "wine-fridge": "Vinoteca",
    "under-cabinet-ambient-glow": "Iluminación Ambiental Bajo Gabinete",
    "toilet-upgrade": "Mejora de Inodoro",
    "mirror-upgrade": "Mejora de Espejo",
    "shower-experience": "Experiencia de Ducha",
    "comfort-upgrade": "Mejora de Confort",
    "storage-functionality": "Funcionalidad de Almacenamiento",
  },

  addonDescriptions: {
    "wine-fridge": "Almacenamiento de vino con clima controlado",
    "under-cabinet-ambient-glow": "Iluminación suave e integrada debajo de los gabinetes superiores",
    "toilet-upgrade": "Inodoro estándar, moderno con faldón o bidet inteligente",
    "mirror-upgrade": "Espejo estándar, retroiluminado o retroiluminado inteligente",
    "shower-experience": "Combinación de ducha lluvia o de mano",
    "comfort-upgrade": "Pisos calefaccionados y calentador de toallas",
    "storage-functionality": "Nicho de ducha con estantes integrados",
  },

  generateAiImage: "Generar Imagen con IA",
  generatingImage: "Generando tu diseño…",
  aiGeneratedResult: "Diseño Generado con IA",
  downloadImage: "Descargar Imagen",
  generateAiError: "Error al generar. Intenta de nuevo.",
  retryGeneration: "Reintentar",

  notSelected: "No seleccionado",
};
