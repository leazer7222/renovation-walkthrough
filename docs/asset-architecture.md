# Asset Architecture

## Overview

The visualization library now supports a three-layer asset architecture that aligns with the updated product flow:

1. **Comparison Assets**: Neutral room environments for A/B product decisions
2. **Style-Reference Assets**: Room × style inspiration images for guidance
3. **Final-Renders Assets**: Post-selection styled outputs for reveal

## Why This Architecture?

### Product Flow Alignment

The original assumption was that room + style assets were the core structure from the beginning. However, the correct product flow is:

1. **Product Decisions First**: Users make choices in a neutral, controlled environment
2. **Style Applied Later**: Style is inferred through choices, not selected upfront
3. **Final Styling**: Style is applied to selected products for the final reveal

### Benefits

- **Controlled Comparisons**: Neutral base room eliminates style bias during product selection
- **Clear Decision Flow**: Users focus on products first, style emerges naturally
- **Flexible Styling**: Same products can be styled in multiple ways
- **Scalable Assets**: Separate concerns allow for efficient asset management

## Layer Details

### Comparison Assets (`comparison/`)

**Purpose**: Support A/B product comparisons in a neutral environment

**Structure**:
```
comparison/
  {room}/
    base/                    # Neutral room background
    {category}/              # flooring, countertops, etc.
      {option}/              # specific material/finish
        tiers/               # budget/balanced/premium
```

**Key Features**:
- Neutral room context (no style applied)
- Category-based organization
- Price tier variants for each option
- Used for initial product selection decisions

### Style-Reference Assets (`style-reference/`)

**Purpose**: Provide style inspiration and guidance

**Structure**:
```
style-reference/
  {room}/
    {style}/
      base/                  # Primary style images
      refs/                  # Reference/inspiration images
      thumbnails/            # Preview thumbnails
```

**Key Features**:
- Room × style matrix (existing structure preserved)
- Inspiration and reference images
- Used for style guidance during flow
- Supports style inference algorithms

### Final-Renders Assets (`final-renders/`)

**Purpose**: Display styled results after product selection

**Structure**:
```
final-renders/
  {room}/
    # Styled output images
    # Post-selection visualizations
    # Final reveal assets
```

**Key Features**:
- Styled combinations of selected products
- Final presentation images
- Used for project completion and sharing

## Asset Flow

1. **Comparison Phase**: User sees neutral room with product options
2. **Style Phase**: System uses style-reference assets for guidance
3. **Final Phase**: Selected products are styled using final-renders

## Technical Notes

- All paths use slug-based naming for consistency
- Empty directories include `.gitkeep` for version control
- Manifests track asset locations and metadata
- Structure supports automated asset processing

## Future Extensions

- Expand comparison assets to additional rooms
- Add more categories and options as needed
- Integrate with 3D rendering pipelines
- Support dynamic style application