#!/usr/bin/env python3
"""
setup_visualization_library_from_excel.py

Rebuilds the visualization library structure from Excel input files.
This script is idempotent and can be run multiple times safely.

Usage:
    python scripts/setup_visualization_library_from_excel.py

Requirements:
    - pandas
    - openpyxl
    - Excel file: Excel Inputs/ReformAI_Visualization_Styles_Rooms.xlsx
"""

import os
import json
import pandas as pd
import shutil
from pathlib import Path

def normalize_slug(name):
    """Convert display name to URL-safe slug"""
    if not name:
        return ""
    return str(name).lower().replace(' ', '-').replace('_', '-').replace('/', '-')

def extract_styles_from_excel(excel_path):
    """Extract styles from Excel file"""
    df = pd.read_excel(excel_path, sheet_name='Styles')
    # Only keep the 15 unique styles (remove known variants)
    all_styles = list(df['Style-English'].dropna().unique())
    # List from user (order preserved)
    unique_styles = [
        'Modern',
        'Contemporary',
        'Minimalist',
        'Industrial',
        'Midcentury Modern',
        'Farmhouse',
        'Coastal',
        'Japandi',
        'Rustic',
        'Bohemian',
        'Biophilic',
        'French Country',
        'Japanese',
        'Neoclassic',
        'Vintage'
    ]
    # Filter to only those present in the Excel
    filtered = [s for s in unique_styles if s in all_styles]
    return filtered

def extract_residential_rooms_from_excel(excel_path):
    """Extract residential rooms from Excel file"""
    df = pd.read_excel(excel_path, sheet_name='Rooms')
    residential_df = df[df['Type'] == 'Residential']
    rooms = residential_df['Rooms-English'].dropna().unique()
    return sorted(list(rooms))

def create_room_style_matrix(base_path, rooms, styles):
    """Create the room × style directory matrix"""
    created_count = 0

    for room in rooms:
        room_slug = normalize_slug(room)
        room_path = os.path.join(base_path, room_slug)

        for style in styles:
            style_slug = normalize_slug(style)
            style_path = os.path.join(room_path, style_slug)

            # Create subdirectories
            subdirs = ['base', 'refs', 'thumbnails']
            for subdir in subdirs:
                subdir_path = os.path.join(style_path, subdir)
                os.makedirs(subdir_path, exist_ok=True)

                # Add .gitkeep if directory is empty
                gitkeep_path = os.path.join(subdir_path, '.gitkeep')
                if not os.path.exists(gitkeep_path):
                    with open(gitkeep_path, 'w') as f:
                        f.write('')

            created_count += 1

    return created_count

def update_manifests(base_path, rooms, styles, excel_path):
    """Update all manifest files"""

    # Update rooms.json
    rooms_data = []
    for room in rooms:
        rooms_data.append({
            "display_name": room,
            "slug": normalize_slug(room),
            "source_sheet": "Rooms"
        })

    with open(os.path.join(base_path, 'manifest', 'rooms.json'), 'w') as f:
        json.dump(rooms_data, f, indent=2)

    # Update styles.json
    styles_data = []
    for style in styles:
        styles_data.append({
            "display_name": style,
            "slug": normalize_slug(style),
            "source_sheet": "Styles"
        })

    with open(os.path.join(base_path, 'manifest', 'styles.json'), 'w') as f:
        json.dump(styles_data, f, indent=2)

    # Create basic asset_manifest.csv
    manifest_lines = ["room,room_slug,style,style_slug,asset_type,file_name,file_path,status,notes"]

    for room in rooms:
        room_slug = normalize_slug(room)
        for style in styles:
            style_slug = normalize_slug(style)
            base_path_rel = f"visualization-library/{room_slug}/{style_slug}/base/"
            line = f"{room},{room_slug},{style},{style_slug},base,,{base_path_rel},pending,Placeholder - base assets to be added"
            manifest_lines.append(line)

    with open(os.path.join(base_path, 'manifest', 'asset_manifest.csv'), 'w') as f:
        f.write('\n'.join(manifest_lines))

    # Update extraction_report.json
    report = {
        "workbook_path": excel_path,
        "sheets_inspected": ["Styles", "Rooms"],
        "chosen_sheets": ["Styles", "Rooms"],
        "residential_filter_applied": True,
        "counts": {
            "styles_extracted": len(styles),
            "residential_rooms_extracted": len(rooms),
            "total_rooms_in_sheet": len(pd.read_excel(excel_path, sheet_name='Rooms')),
            "total_styles_in_sheet": len(pd.read_excel(excel_path, sheet_name='Styles'))
        },
        "warnings": [
            "Duplicate style names may exist - check for variants",
            "Style and room names normalized to lowercase with hyphens",
            "Run this script after Excel updates to refresh structure"
        ],
        "extraction_timestamp": pd.Timestamp.now().isoformat(),
        "script_version": "1.0"
    }

    with open(os.path.join(base_path, 'manifest', 'extraction_report.json'), 'w') as f:
        json.dump(report, f, indent=2)

def main():
    """Main execution function"""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    excel_path = project_root / "Excel Inputs" / "ReformAI_Visualization_Styles_Rooms.xlsx"
    viz_lib_path = project_root / "visualization-library"

    print("🔄 Setting up visualization library from Excel...")

    # Verify Excel file exists
    if not excel_path.exists():
        print(f"❌ Excel file not found: {excel_path}")
        return 1

    # Extract data
    print("📊 Extracting data from Excel...")
    styles = extract_styles_from_excel(excel_path)
    rooms = extract_residential_rooms_from_excel(excel_path)

    print(f"✅ Extracted {len(styles)} styles: {', '.join(styles[:5])}{'...' if len(styles) > 5 else ''}")
    print(f"✅ Extracted {len(rooms)} residential rooms: {', '.join(rooms[:5])}{'...' if len(rooms) > 5 else ''}")

    # Create directory structure
    print("📁 Creating room × style matrix...")
    created_count = create_room_style_matrix(viz_lib_path, rooms, styles)
    print(f"✅ Created {created_count} style directories across {len(rooms)} rooms")

    # Update manifests
    print("📋 Updating manifests...")
    update_manifests(viz_lib_path, rooms, styles, str(excel_path))
    print("✅ Manifests updated")

    print("🎉 Setup complete!")
    print(f"   Styles: {len(styles)}")
    print(f"   Rooms: {len(rooms)}")
    print(f"   Total combinations: {len(styles) * len(rooms)}")

    return 0

if __name__ == "__main__":
    exit(main())