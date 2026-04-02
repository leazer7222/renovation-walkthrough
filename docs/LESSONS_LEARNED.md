# Lessons Learned - RenovationWalkthrough Project

## Data Extraction Lessons

### Excel Sheet Naming Matters
- **Lesson**: Always verify exact sheet names in Excel files before coding
- **Evidence**: Initially tried "Style" but actual sheet was "Styles" (plural)
- **Impact**: Saved time by checking sheet names first with `pd.ExcelFile().sheet_names`
- **Prevention**: Always inspect Excel structure before writing extraction code

### Case Sensitivity in Filtering
- **Lesson**: Database filters are case-sensitive - check exact values
- **Evidence**: Room Type column used "Residential" not "RESIDENTIAL"
- **Impact**: Initially got 0 results, then found correct case
- **Prevention**: Print unique values from filter columns before applying filters

### Normalization Consistency
- **Lesson**: Establish slug normalization rules early and apply consistently
- **Evidence**: Used lowercase + hyphen replacement throughout
- **Impact**: Clean, predictable URLs and file paths
- **Prevention**: Create reusable normalization function from start

## Project Structure Lessons

### Room × Style Matrix Scale
- **Lesson**: 11 rooms × 18 styles = 198 combinations is manageable but requires automation
- **Evidence**: Manual creation would be error-prone; script automation essential
- **Impact**: Setup script enables easy rebuilding and maintenance
- **Prevention**: Always create idempotent setup scripts for complex structures

### Placeholder Strategy
- **Lesson**: Use `.gitkeep` files liberally in empty directories
- **Evidence**: All 198 × 3 = 594 subdirectories needed placeholders
- **Impact**: Clean git history without committing empty directories
- **Prevention**: Add `.gitkeep` creation to all directory creation scripts

## Documentation Lessons

### README First
- **Lesson**: Write README.md early to clarify project purpose
- **Evidence**: Clear product explanation helped maintain focus
- **Impact**: Prevented scope creep during scaffold creation
- **Prevention**: Always start with README for new projects

### CLAUDE.md Guidelines
- **Lesson**: AI development guidelines prevent architectural drift
- **Evidence**: "Simplicity first" principle kept scaffold clean
- **Impact**: Maintained focus on core requirements
- **Prevention**: Include CLAUDE.md in all AI-assisted projects

## Prototype Matrix Lessons (April 2, 2026)

- **Lesson**: Create validation scripts early for asset completeness
- **Evidence**: Built `scan_prototype_images.py` to verify all 84 folders have images
- **Impact**: Caught missing assets immediately; prevented broken user experience
- **Prevention**: Include asset validation in all prototype creation workflows

- **Lesson**: Separate game logic from UI components for maintainability
- **Evidence**: `useGameEngine` hook handles all state logic; components are pure presentation
- **Impact**: Easy to test logic independently; UI changes don't break game flow
- **Prevention**: Always extract complex state logic into custom hooks or services

- **Lesson**: Config-driven architecture enables rapid iteration
- **Evidence**: Kitchen options defined in `kitchenConfig.ts`; easy to add rooms or categories
- **Impact**: Added new rooms would require only config changes, not code rewrites
- **Prevention**: Design systems with configuration files from the start

- **Lesson**: Asset path resolution should be centralized and testable
- **Evidence**: `assetResolver.ts` handles all image path logic in one place
- **Impact**: Easy to update path patterns; consistent across all components
- **Prevention**: Create dedicated resolver utilities for any dynamic asset loading

- **Lesson**: Prototype in subdirectory to avoid main project conflicts
- **Evidence**: Webapp in `webapp/` folder with own package.json and build process
- **Impact**: No interference with main project scripts or dependencies
- **Prevention**: Use subdirectories for experimental features or prototypes

- **Lesson**: Sequential challenger model works well for decision games
- **Evidence**: A vs B → winner vs C pattern feels natural and reduces cognitive load
- **Impact**: Users complete flows quickly; clear progress indication
- **Prevention**: Consider this pattern for any multi-option decision interfaces

## Technical Lessons

### Python Environment Management
- **Lesson**: Install dependencies before running scripts
- **Evidence**: pandas/openpyxl needed for Excel processing
- **Impact**: Clear error messages when dependencies missing
- **Prevention**: Document all required packages in setup instructions

### Path Handling
- **Lesson**: Use pathlib for cross-platform path operations
- **Evidence**: Script used Path objects for reliable file operations
- **Impact**: No Windows/Unix path separator issues
- **Prevention**: Always use pathlib.Path instead of string concatenation

## Process Lessons

### Idempotent Operations
- **Lesson**: Make all setup operations safe to run multiple times
- **Evidence**: Setup script uses `exist_ok=True` and checks for existing files
- **Impact**: Can rerun without fear of breaking existing work
- **Prevention**: Design all automation scripts to be idempotent

### Validation Steps
- **Lesson**: Always validate outputs after automation
- **Evidence**: Manually checked directory counts and file contents
- **Impact**: Caught and fixed issues before delivery
- **Prevention**: Include validation steps in all automation scripts

## Communication Lessons

### Clear Success Criteria
- **Lesson**: Define specific, measurable completion criteria
- **Evidence**: "18 styles, 11 rooms, 198 directories" provided clear targets
- **Impact**: Easy to verify completion and report progress
- **Prevention**: Always include quantitative success metrics

### Assumption Documentation
- **Lesson**: Document assumptions made during development
- **Evidence**: Listed case sensitivity and normalization assumptions
- **Impact**: Future developers understand design decisions
- **Prevention**: Include assumption documentation in all project summaries

## Future Prevention

### Template Creation
- **Lesson**: Create reusable templates for common project structures
- **Evidence**: Could reuse this scaffold pattern for similar projects
- **Impact**: Faster setup for future visualization projects
- **Prevention**: Build template library from successful project patterns

### Error Handling
- **Lesson**: Add proper error handling to automation scripts
- **Evidence**: Script could fail silently on Excel read errors
- **Impact**: Better debugging experience for future users
- **Prevention**: Add try/catch blocks and meaningful error messages