# TODO - RenovationWalkthrough Project

## Phase 1: Scaffold ✅ COMPLETE
- [x] Create folder structure
- [x] Extract data from Excel
- [x] Build room × style matrix
- [x] Refactor to 3-layer asset architecture

## Phase 2: Mock Decision Flow ✅ COMPLETE
- [x] Create prototype matrix (84 folders, 64 combinations)
- [x] Populate prototype folders with PNG images
- [x] Build React webapp with TypeScript and Vite
- [x] Implement sequential challenger logic
- [x] Copy visualization-library to webapp/public for asset serving

## Phase 3: UI Prototype ✅ COMPLETE
- [x] Design premium comparison interface
- [x] Fix image cropping with 3:2 aspect ratio
- [x] Set focal point (object-position: bottom)
- [x] Handle filename patterns (underscores vs dots)
- [x] Aggressively normalize all filenames to `_01.png`
- [x] Correct source-level typos like `lilght-oak` in public assets

## Phase 3.5: User Flow & Payoff ✅ COMPLETE
- [x] Multi-step onboarding sequence (Room, Budget, Style, Priority)
- [x] Transition screens between game rounds
- [x] Persistent "Current Selections" bar (thumb + label)
- [x] Visual Hero image reveal at the end

## Phase 3.6: Professional Onboarding & Deployment ✅ COMPLETE
- [x] Productized landing screen copy (Headline, Subheadline, CTA)
- [x] Enhanced onboarding with subtitles and descriptors
- [x] Decoupled Data Model (label vs value)
- [x] "Back" navigation and selection persistence
- [x] Push to GitHub ([leazer7222/renovation-walkthrough](https://github.com/leazer7222/renovation-walkthrough))
- [x] Production deployment on Netlify ([reformai-renovationwalkthrough.netlify.app](https://reformai-renovationwalkthrough.netlify.app/))

## Phase 3.7: Visual Style Picker + CI/CD ✅ COMPLETE
- [x] Replace generic text options with 15 kitchen style image cards
- [x] 5-column × 3-row CSS grid layout
- [x] Enforce exactly 3 selections (dim + block extras, checkmark badge, live counter)
- [x] Copy style images to webapp/public for asset serving
- [x] Commit source images to visualization-library
- [x] Add root `netlify.toml` for GitHub → Netlify auto-deploy CI/CD
- [x] Fix publish path (`dist` relative to `base`, not `webapp/dist`)
- [x] All changes committed and pushed to master

## Phase 4: Design Foundation & NLP Prompting ✅ COMPLETE
- [x] Insert 5-step "Foundation" flow before Materials
- [x] Implement A/B matches for Layout, Storage, Appliances, Lighting
- [x] Create visual Add-ons checklist screen
- [x] Build logic-aware NLP prompt generator for AI visualization
- [x] Implement visual thumbnail moodboard at Final Reveal
- [x] Add click-to-copy functionality for AI prompts
- [x] Sync `design-elements` assets to public web folder

## Phase 5: High-Fidelity Prompting System ✅ COMPLETE
- [x] Refactor Generation prompt into deterministic 8-section structure
- [x] Refactor Renovation prompt into deterministic 14-section structure
- [x] Remove exaggerated adjectives (massive, commercial-grade, etc.)
- [x] Rename "New Build" to "Default Kitchen Prompt" in UI/Logic
- [x] Enforce structural anchors and preservation in Renovation mode

## Phase 6: Multi-Room Expansion ✅ COMPLETE
- [x] Extend prototype to additional rooms
- [x] Bathroom decision flow
- [x] Living room decision flow (Placeholder logic)

## Phase 8: Style Discovery & Branched Flow ✅ COMPLETE
- [x] "Sweet 16" single-elimination Style Discovery bracket game
- [x] Curated design matchups (Minimalist vs Bohemian, etc.)
- [x] Branched Entry Screen (Discovery vs Direct Renovation)
- [x] Data persistence from bracket results into project onboarding
- [x] Room-aware AI prompt generation (Kitchen vs Bathroom templates)
- [x] Fixed widespread filename white-space and casing bugs

## Phase 9: Results & Matching 📋 PLANNED
- [ ] Result persistence across sessions
- [ ] Contractor matching integration

## Session Result
- ✅ Style Discovery "Sweet 16" bracket game implemented and live
- ✅ Branched entry flow (Discovery path vs Build path) integrated
- ✅ Room-aware AI prompt generation perfected for kitchens AND bathrooms
- ✅ Complete visual summary and transformation prompts enabled for all project types
- ✅ All code committed and pushed to master
