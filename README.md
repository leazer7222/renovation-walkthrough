# RenovationWalkthrough

A mockup scaffold for ReformAI's guided renovation experience.

## Product Overview

ReformAI helps users who feel overwhelmed by renovation decisions by guiding them through simple visual choices. The experience uses A/B comparisons where users make quick visual decisions, with winners advancing until a clear preference emerges.

**Core Interaction**: "Which do you prefer?" - Option A vs Option B

## Project Purpose

This scaffold establishes the foundational structure for:
- Asset organization system (room × style matrix)
- Mock decision flow framework
- Future prototype development support

## Key Principles

- **Visual-only comparisons**: All decisions based on imagery
- **Single variable changes**: Only one element differs per comparison
- **Room context**: Comparisons shown in correct spatial context
- **No domain knowledge required**: Intuitive visual choices
- **Style inference**: Preferences emerge through choices (not explicit selection)

## Structure Overview

```
RenovationWalkthrough/
├── planning/                 # Project planning documents
├── docs/                     # Documentation
├── scripts/                  # Automation scripts
├── config/                   # Configuration files
├── visualization-library/    # Asset organization system
│   ├── manifest/            # Metadata and manifests
│   └── {room}/{style}/      # Room × style matrix
└── mock/                     # Sample data and flows
```

## Room × Style Matrix

The visualization library organizes assets by room and style combinations:

- **Rooms**: 11 residential spaces (kitchen, bathroom, living room, etc.)
- **Styles**: 18 design styles (modern, farmhouse, coastal, etc.)
- **Structure**: Each room/style combination contains `base/`, `refs/`, and `thumbnails/` subdirectories

## Development Phases

1. **Scaffold** (Current): Clean structure and mock data
2. **Mock Flow**: Interactive decision flow prototype
3. **UI Prototype**: Visual interface implementation
4. **Full Product**: Complete guided experience

## Getting Started

1. Review `planning/initial-plan.md` for development roadmap
2. Examine `config/` files for data structure definitions
3. Check `mock/` directory for sample interaction patterns
4. Run `scripts/setup_visualization_library_from_excel.py` to rebuild from Excel sources

## Data Sources

- Primary: `Excel Inputs/ReformAI_Visualization_Styles_Rooms.xlsx`
- Styles extracted from "Styles" sheet
- Residential rooms filtered from "Rooms" sheet (Type = "Residential")

## Notes

- This is a scaffold only - no production functionality implemented
- Asset directories contain `.gitkeep` files as placeholders
- All visual assets are referenced but not included
- Future development should maintain clean separation of concerns