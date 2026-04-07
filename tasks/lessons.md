## CI/CD & Netlify Configuration (April 2, 2026)

### Root netlify.toml is Required for GitHub Auto-Deploy
- **Lesson**: Deploying via the Netlify CLI does not set up GitHub auto-deploys — those require a `netlify.toml` at the repo root.
- **Evidence**: The site was manually deployed via CLI; subsequent GitHub pushes triggered no new builds.
- **Impact**: Adding `netlify.toml` at the root with `base`, `command`, and `publish` fields enables true CI/CD on every push.
- **Prevention**: Always add `netlify.toml` to the repo root during initial Netlify setup.

### Publish Path is Relative to Base, Not Repo Root
- **Lesson**: When `base` is set in `netlify.toml`, the `publish` path is resolved relative to `base` — not the repo root.
- **Evidence**: Setting `base = "webapp"` and `publish = "webapp/dist"` caused Netlify to look for `webapp/webapp/dist`, which doesn't exist.
- **Impact**: Build failed with "Deploy directory does not exist" error. Fix was to set `publish = "dist"`.
- **Prevention**: When using `base`, always write `publish` as a path relative to that base directory.

## Visual Style Picker (April 2, 2026)

### Exact-Count Multi-Select UX
- **Lesson**: "Select up to N" is ambiguous; "pick exactly N" creates a clear goal and a satisfying completion state.
- **Evidence**: Capping at 3 and showing a live counter + dynamic button label ("Select 2 more") gave the step a clear finish line.
- **Impact**: Users know exactly when they're done and what action to take next.

### Dimming Non-Selectable Options
- **Lesson**: Hiding options when a limit is reached is jarring; dimming them is softer and still communicates the constraint.
- **Evidence**: 40% opacity on unselected cards once 3 are chosen made the UI self-explanatory without removing choices.
- **Impact**: No need for a tooltip or error message — the visual state speaks for itself.

### Asset Serving: Public Folder Duplication
- **Lesson**: Any new asset folder added to `visualization-library` must also be copied to `webapp/public/` to be served by Vite.
- **Evidence**: Style images were untracked and not in public until explicitly copied; the component rendered broken images otherwise.
- **Impact**: Both locations must be kept in sync and both committed to git.

## Productized Copy & UX (April 2, 2026)

### Strategic Tone Shift
- **Lesson**: Terminology like "Game" can undermine the perceived value of a professional tool.
- **Evidence**: Changing "Kitchen Decision Game" to "A Smarter Way to Plan Your Renovation" immediately shifted the app from a toy to a utility.
- **Impact**: Higher user trust and clearer project-based intent.

### Data Model Decoupling (Label vs. Value)
- **Lesson**: Tying logic (state keys) to UI labels (strings) makes the app brittle and hard to translate or clear for analytics.
- **Evidence**: Initial onboarding used labels as values; adding a dedicated `value` field allowed for "Budget-Friendly" (UI) to be mapped to "low" (Logic) safely.
- **Impact**: Stable identifiers for style matching, analytics, and filtering logic without breaking the UI.

### Navigation Persistence
- **Lesson**: Users expect to refine early choices without losing progress.
- **Evidence**: Implementing the "Back" button required ensuring the centralized state was correctly updated and read back into the multi-select styles.
- **Impact**: Reduced user anxiety and improved friction-less onboarding.

## User Flow & Contextual Feedback (April 2, 2026)


### Transition Screens as Context Drivers
- **Lesson**: Sudden shifts between categories can be disorienting.
- **Evidence**: Moving directly from Flooring to Countertop without a "pause" felt abrupt.
- **Impact**: Dedicated transition screens that confirm the previous selection and set the stage for the next one (e.g., "Now let's choose a countertop that works with your floor") improve the cognitive flow.
- **Prevention**: Insert "breather" screens in long multi-step decision processes.

### Persistent Status Visibility
- **Lesson**: Users forget their previous choices in deep decision trees.
- **Evidence**: During the Cabinet round, users often wanted to see their selected Flour/Countertop for coordination.
- **Impact**: A persistent "Current Selections" bar with thumbnails reduces memory load and increases confidence in the current choice.
- **Prevention**: Always show chosen state during subsequent selection steps.

### Onboarding for Personalization
- **Lesson**: Personalizing the experience early increases user investment.
- **Evidence**: Asking for room, budget, and style before the game starts makes the "Final Reveal" feel more earned.
- **Impact**: Capturing intent in state allows for future style inference and more relevant contractor matching.

## UI/UX & Asset Lessons (April 2, 2026)


### Aspect Ratio & Focal Points
- **Lesson**: Standard wide aspect ratios (16:9) can crop critical floor details in renovation scenes.
- **Evidence**: Initial 16:9 260px fixed height cut off flooring in front of the island.
- **Impact**: Fixing to 3:2 or 4:3 with `object-position: bottom` ensures critical details are visible.
- **Prevention**: Use aspect-ratio-based layouts and focal point settings from the start.

### Asset Normalization & Typo Fixing
- **Lesson**: Source assets often have inconsistent naming patterns (e.g., underscores vs. dots).
- **Evidence**: `flooring_light-oak_01.png` vs `dark-walnut_marble_shaker.01.png` and `lilght-oak`.
- **Impact**: Asset resolver should use a strict normalization script that renames files based on their folder hierarchy to ensure 100% consistency.
- **Prevention**: Aggressively normalize all leaf filenames during initial asset setup or copying.

### Serving External Assets
- **Lesson**: Standard Vite dev servers cannot easily serve files outside the project root without symlinking or copying.
- **Evidence**: Symlinking required admin rights, which failed in the restricted environment.
- **Impact**: Copying the directory to `webapp/public/` proved to be the most reliable workaround.
- **Prevention**: Anticipate environment-specific permission issues; plan for either copying or custom server configuration.

### Premium Aesthetics
- **Lesson**: Professional renovation apps require "Rich Aesthetics" to build trust.
- **Evidence**: Adding Glassmorphism and better HSL-based styling significantly improved the feel.
- **Impact**: High completion rates depend on visual quality and confidence.
- **Prevention**: Implement a cohesive design system (typography, colors, shadows) early.

## Project Structure Lessons

### Three-Layer Asset Architecture
- **Lesson**: Separate concerns between comparison, reference, and final assets.
- **Evidence**: Decision flow requires neutral comparisons first, then style application.
- **Impact**: Cleaner separation allows for better user flow and modular asset updates.

### Excel Sheet Naming & Case Sensitivity
- **Lesson**: Always verify exact sheet names and data cases in source Excel files.
- **Evidence**: Sheet name was "Styles" (plural), while floor filter was "Residential".
- **Impact**: Initial extraction failed due to case mismatch and pluralization.
- **Prevention**: Print unique values from filter columns before applying code.

### Idempotent Setup Scripts
- **Lesson**: Automation scripts should be safe to run multiple times without data loss.
- **Evidence**: Used `exist_ok=True` and relative paths throughout Python scripts.
- **Impact**: Easy to rebuild entire structure from Excel source without fear of breaking progress.
- **Prevention**: Design all file system operations to be idempotent.

## Design Foundation & AI Prompting (April 7, 2026)

### AI Prompting: Structural Anchoring is Critical
- **Lesson**: Generic descriptors like "integrated appliances" or "modern design" lead to AI hallucinations (e.g., turning double ovens into refrigerators).
- **Evidence**: Initial prompts resulted in refrigerators replacing wall ovens on the left cabinetry.
- **Impact**: Explicit spatial anchoring (e.g., "explicitly preserving the built-in double wall ovens on the left tall cabinet") and removing conflicting terms like "massive gas range" fixed the output.
- **Prevention**: Use directional cues (left/right/center) and "explicitly preserving" language in AI prompts to maintain architectural integrity.

### Asset Library Consistency vs. Game Engine Routing
- **Lesson**: Non-match phases (like Add-ons) require different routing logic to avoid crashing the tournament controller.
- **Impact**: Updated `useGameEngine` to check for round availability before initializing a match; if no round is found, the phase is handled as a direct state transition.
- **Prevention**: Always decouple the "Match Engine" from "State Routing" to allow for hybrid flows (Comparisons + Checklists).

### Syncing Folder-Structured Assets for Vite
- **Lesson**: New asset categories (like `design-elements`) added to the root library MUST be recursively copied to `webapp/public` for the dev server and production builds.
- **Impact**: Missing images during the "Layout" phase were due to files existing at the root but not in the public folder.
- **Prevention**: Establish a `copy-design-elements` script or manual verification step whenever adding new top-level categories.