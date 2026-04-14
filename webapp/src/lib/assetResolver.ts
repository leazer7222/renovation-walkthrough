const KITCHEN_ROOT = "/visualization-library/comparison/kitchen/prototype";
const BATHROOM_ROOT = "/visualization-library/comparison/bathroom/prototype";
const LIVING_ROOM_ROOT = "/visualization-library/comparison/living-room/prototype";

export function resolveFlooringImage(optionId: string) {
  return `${KITCHEN_ROOT}/flooring/${optionId}/${optionId}_01.png`;
}

export function resolveCountertopImage(flooring: string, optionId: string) {
  return `${KITCHEN_ROOT}/countertops/${flooring}/${optionId}/${flooring}_${optionId}_01.png`;
}

export function resolveCabinetImage(
  flooring: string,
  countertop: string,
  optionId: string
) {
  return `${KITCHEN_ROOT}/cabinets/${flooring}/${countertop}/${optionId}/${flooring}_${countertop}_${optionId}_01.png`;
}

export function resolveDesignElementImage(phase: string, optionId: string) {
  const folderPhase = phase === "layout" ? "layout" : `${phase}-style`;
  return `${KITCHEN_ROOT}/design-elements/${folderPhase}/${optionId}/${optionId}.png`;
}

interface SelectionForImage {
  flooring?: string | null;
  countertop?: string | null;
}

export function resolveImage(
  phase: string,
  selection: SelectionForImage,
  optionId: string,
  room?: string
) {
  // Room-specific overrides
  const normalizedRoom = room?.toLowerCase();

  if (normalizedRoom === "bathroom") {
    // Basic root for bathroom images. Flat structure.
    return `${BATHROOM_ROOT}/core/${phase}/${optionId}/${optionId}.png`;
  }

  if (normalizedRoom === "living-room") {
    // Living room follows phase/option/option.png
    return `${LIVING_ROOM_ROOT}/${phase}/${optionId}/${optionId}.png`;
  }

  // Kitchen / Default fallbacks
  if (phase === "layout" || phase === "storage" || phase === "appliance" || phase === "lighting") {
    return resolveDesignElementImage(phase, optionId);
  }
  if (phase === "flooring") return resolveFlooringImage(optionId);
  if (phase === "countertop" && selection.flooring) {
    return resolveCountertopImage(selection.flooring, optionId);
  }
  if (phase === "cabinet" && selection.flooring && selection.countertop) {
    return resolveCabinetImage(selection.flooring, selection.countertop, optionId);
  }

  return "/placeholder.png";
}
