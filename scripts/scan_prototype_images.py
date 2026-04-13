"""
Maintenance utility: Scans visualization-library/comparison/kitchen/prototype/ and prints
an inventory of which prototype slots have real images vs .gitkeep placeholders.
Run from: RenovationWalkthrough/ root
"""
from pathlib import Path

ROOT = Path(__file__).parent.parent / "visualization-library" / "comparison" / "kitchen" / "prototype"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def has_image(folder: Path) -> bool:
    return any(
        f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
        for f in folder.iterdir()
    )


def scan():
    missing = []

    # 1. FLOORING (leaf = flooring type)
    flooring_root = ROOT / "flooring"
    if flooring_root.exists():
        for flooring in flooring_root.iterdir():
            if flooring.is_dir() and not has_image(flooring):
                missing.append(flooring)

    # 2. COUNTERTOPS (leaf = countertop inside flooring)
    countertops_root = ROOT / "countertops"
    if countertops_root.exists():
        for flooring in countertops_root.iterdir():
            if flooring.is_dir():
                for countertop in flooring.iterdir():
                    if countertop.is_dir() and not has_image(countertop):
                        missing.append(countertop)

    # 3. CABINETS (leaf = cabinet type inside flooring/countertop)
    cabinets_root = ROOT / "cabinets"
    if cabinets_root.exists():
        for flooring in cabinets_root.iterdir():
            if flooring.is_dir():
                for countertop in flooring.iterdir():
                    if countertop.is_dir():
                        for cabinet in countertop.iterdir():
                            if cabinet.is_dir() and not has_image(cabinet):
                                missing.append(cabinet)

    print("\n=== FOLDERS MISSING IMAGES ===\n")
    if not missing:
        print("All folders contain at least one image.")
    else:
        for m in missing:
            print(m)

    print(f"\nTotal missing: {len(missing)}")


if __name__ == "__main__":
    scan()
