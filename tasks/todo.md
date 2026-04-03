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

## Phase 4: Multi-Room Expansion 📋 PLANNED
- [ ] Extend prototype to additional rooms
- [ ] Bathroom decision flow
- [ ] Living room decision flow

## Phase 5: Results & Matching 📋 PLANNED
- [ ] Result persistence across sessions
- [ ] Contractor matching integration

## Session Result
- ✅ Kitchen Prototype 100% Functional, Professional, and Live
- ✅ 15-style image picker with exact 3-pick enforcement
- ✅ CI/CD pipeline established — pushes to master auto-deploy to Netlify
- ✅ All code committed and clean on master
