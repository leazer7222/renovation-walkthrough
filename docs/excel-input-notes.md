# Excel Input Notes

## Primary Data Source

**File**: `Excel Inputs/ReformAI_Visualization_Styles_Rooms.xlsx`

This Excel workbook contains the authoritative source data for styles and rooms used in the visualization system.

## Sheet Structure

### Styles Sheet
- **Columns**: `#`, `Style-English`, `Style-Spanish`, `Image`
- **Content**: 18 unique style names in English
- **Usage**: Extract `Style-English` column for style definitions
- **Notes**: Contains some duplicate variants (e.g., "Midcentury Modern" vs "Mid Century Modern")

### Rooms Sheet
- **Columns**: `#`, `Type`, `Rooms-English`, `Rooms-Spanish`
- **Content**: 65 total room entries across 8 categories
- **Usage**: Filter by `Type = "Residential"` to get 11 relevant rooms
- **Notes**: Only residential rooms are used for this renovation product

## Data Processing Rules

### Style Extraction
1. Read `Style-English` column from "Styles" sheet
2. Remove duplicates and null values
3. Normalize to lowercase with hyphens for slugs
4. Preserve original names for display

### Room Extraction
1. Read "Rooms" sheet
2. Filter rows where `Type = "Residential"`
3. Extract `Rooms-English` values
4. Remove duplicates and null values
5. Normalize to lowercase with hyphens for slugs

## Normalization Examples

| Original | Slug |
|----------|------|
| Living Room | living-room |
| Midcentury Modern | midcentury-modern |
| Walk-in Closet | walk-in-closet |
| Home Office | home-office |

## Second Excel File

**File**: `Excel Inputs/Updated_ProjectTables_English_Spanish.xlsx`

**Status**: Not used in current scaffold

**Purpose**: Contains future roadmap data for expanded product features
- Project setup tables
- Budget and timeline configurations
- Advanced room specifications
- Contractor matching data

**When to use**: During Phase 4 (Full Product Development)

## Maintenance Guidelines

### When Excel Files Update
1. Run `scripts/setup_visualization_library_from_excel.py`
2. Review extraction report for warnings
3. Update manifests if needed
4. Test mock data compatibility
5. Commit changes with clear descriptions

### Data Quality Checks
- Verify residential filter is working
- Check for new duplicate style names
- Ensure slug normalization is consistent
- Validate room counts match expectations

## Known Issues

- Style sheet has duplicate names with slight variations
- Spanish translations available but not used
- Image column in styles sheet is empty (placeholder)
- Some rooms may have inconsistent naming

## Future Enhancements

- Automated duplicate detection and merging
- Validation of new style/room additions
- Integration with asset management system
- Real-time sync with design tools