#!/usr/bin/env python3
"""
create_prototype_structure.py

Create the prototype folder structure for clickable kitchen walkthrough.
"""

import json
import csv
from pathlib import Path

def create_prototype_structure():
    """Create all prototype directories and files"""

    # Base paths
    project_root = Path(__file__).parent.parent
    prototype_root = project_root / "visualization-library" / "comparison" / "kitchen" / "prototype"
    manifest_dir = project_root / "visualization-library" / "manifest"
    config_dir = project_root / "config"
    docs_dir = project_root / "docs"

    # Ensure base directories exist
    prototype_root.mkdir(parents=True, exist_ok=True)
    manifest_dir.mkdir(parents=True, exist_ok=True)
    config_dir.mkdir(parents=True, exist_ok=True)
    docs_dir.mkdir(parents=True, exist_ok=True)

    # Define options
    flooring_options = ["light-oak", "dark-walnut", "large-format-tile", "microcement"]
    countertop_options = ["dark-quartz", "marble", "granite", "butcher-block"]
    cabinet_options = ["warm-wood", "matte-black", "shaker", "flat-panel-white"]

    # Track created folders
    created_folders = []
    leaf_folders = []

    # Create flooring folders
    flooring_dir = prototype_root / "flooring"
    flooring_dir.mkdir(exist_ok=True)
    for flooring in flooring_options:
        folder = flooring_dir / flooring
        folder.mkdir(exist_ok=True)
        (folder / ".gitkeep").touch()
        created_folders.append(str(folder.relative_to(project_root)))
        leaf_folders.append(str(folder.relative_to(project_root)))

    # Create countertops folders (nested under flooring)
    countertops_dir = prototype_root / "countertops"
    countertops_dir.mkdir(exist_ok=True)
    for flooring in flooring_options:
        flooring_ct_dir = countertops_dir / flooring
        flooring_ct_dir.mkdir(exist_ok=True)
        for countertop in countertop_options:
            folder = flooring_ct_dir / countertop
            folder.mkdir(exist_ok=True)
            (folder / ".gitkeep").touch()
            created_folders.append(str(folder.relative_to(project_root)))
            leaf_folders.append(str(folder.relative_to(project_root)))

    # Create cabinets folders (nested under flooring/countertop)
    cabinets_dir = prototype_root / "cabinets"
    cabinets_dir.mkdir(exist_ok=True)
    for flooring in flooring_options:
        flooring_cab_dir = cabinets_dir / flooring
        flooring_cab_dir.mkdir(exist_ok=True)
        for countertop in countertop_options:
            countertop_cab_dir = flooring_cab_dir / countertop
            countertop_cab_dir.mkdir(exist_ok=True)
            for cabinet in cabinet_options:
                folder = countertop_cab_dir / cabinet
                folder.mkdir(exist_ok=True)
                (folder / ".gitkeep").touch()
                created_folders.append(str(folder.relative_to(project_root)))
                leaf_folders.append(str(folder.relative_to(project_root)))

    # Create manifest CSV
    manifest_path = manifest_dir / "prototype_asset_manifest.csv"
    with open(manifest_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["stage", "flooring", "countertop", "cabinet", "file_name", "file_path", "status", "notes"])

    # Create config JSON
    config_path = config_dir / "prototype_matrix.json"
    config_data = {
        "flooring_options": flooring_options,
        "countertop_options": countertop_options,
        "cabinet_options": cabinet_options,
        "total_combinations": len(flooring_options) * len(countertop_options) * len(cabinet_options)
    }
    with open(config_path, 'w') as f:
        json.dump(config_data, f, indent=2)

    # Create documentation
    docs_path = docs_dir / "prototype-matrix.md"
    docs_content = """# Prototype Matrix

## Overview

This is a prototype-only structure for testing clickable kitchen walkthrough flows.

## Purpose

- Support manual placement of images for user testing
- Enable clickable navigation through flooring -> countertops -> cabinets
- Validate user experience before building production architecture

## Structure

- Flooring: 4 options (light-oak, dark-walnut, large-format-tile, microcement)
- Countertops: 4 options per flooring (dark-quartz, marble, granite, butcher-block)
- Cabinets: 4 options per flooring/countertop combination (warm-wood, matte-black, shaker, flat-panel-white)

Total combinations: 64 leaf folders

## Important Notes

- This is NOT the final production architecture
- Images will be manually placed in the folders
- Used only for prototype testing and validation
- Will be replaced by dynamic asset generation in production

## File Locations

- Structure: visualization-library/comparison/kitchen/prototype/
- Manifest: visualization-library/manifest/prototype_asset_manifest.csv
- Config: config/prototype_matrix.json
"""
    with open(docs_path, 'w') as f:
        f.write(docs_content)

    # Summary
    print("✅ Prototype structure created successfully!")
    print(f"📁 Total folders created: {len(created_folders)}")
    print(f"🍃 Total leaf folders: {len(leaf_folders)}")
    print(f"📄 Files created: manifest CSV, config JSON, documentation")
    print(f"🔢 Total combinations: {config_data['total_combinations']}")

if __name__ == "__main__":
    create_prototype_structure()