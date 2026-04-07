const ROOT = "/visualization-library/comparison/kitchen/prototype";

export function resolveFlooringImage(optionId: string) {
  return `${ROOT}/flooring/${optionId}/${optionId}_01.png`;
}

export function resolveCountertopImage(flooring: string, optionId: string) {
  return `${ROOT}/countertops/${flooring}/${optionId}/${flooring}_${optionId}_01.png`;
}

export function resolveCabinetImage(
  flooring: string,
  countertop: string,
  optionId: string
) {
  return `${ROOT}/cabinets/${flooring}/${countertop}/${optionId}/${flooring}_${countertop}_${optionId}_01.png`;
}

export function resolveDesignElementImage(phase: string, optionId: string) {
  const folderPhase = phase === "layout" ? "layout" : `${phase}-style`;
  return `${ROOT}/design-elements/${folderPhase}/${optionId}/${optionId}.png`;
}

export function resolveImage(
  phase: string,
  selection: any,
  optionId: string
) {
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
