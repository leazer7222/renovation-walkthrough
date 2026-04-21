# Lessons Learned & Recurring Issues

## Layout & Header Clearance
- **Issue**: Content (titles, progress bars) overlapping with the fixed header/logo.
- **Cause**: Reducing `paddingTop` or `marginTop` to achieve a "no-scroll" layout without accounting for the header's fixed height.
- **Solution**: Use the global CSS variable `--header-height` (set to `80px`) and ensure all main containers respect this offset. 
- **Implementation**: `App.tsx` now uses `paddingTop: "var(--header-height)"`.

## No-Scroll UX Design
- **Goal**: Minimize vertical scrolling on standard viewports (1080p).
- **Strategy**: 
    - Use `16:9` aspect ratios for images in cards instead of `3:2` or `4:3`.
    - Reduce margins/paddings between headers and content rows systematically.
    - Avoid large font sizes (keep headers around `1.75rem` for sub-screens).
- **Warning**: Never reduce top padding below the header height to reclaim space.

## AI Visualization Governance
- **Limit**: Strictly enforce the 200 visualization call limit.
- **Tracking**: Logic is centralized in `visualizationApi.ts` using `localStorage`.
- **UI Feedback**: Provide a clear warning in `FinalReveal.tsx` when the limit is hit.

## Admin Features
- **Debug Tool**: Always include an "Admin Mode" toggle in reveal/complex screens to show the underlying AI prompt or data model for verification.
