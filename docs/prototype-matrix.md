# Prototype Matrix

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
