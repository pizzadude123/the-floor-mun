# THE FLOOR — Acceptance Contract

## Product truth

- Opening viewport states that this is a concept conference experience.
- Every committee and schedule module is labeled illustrative.
- No registration, affiliation, date, location, fee, sponsor, testimonial, metric, or outcome is fabricated.
- Primary CTA opens an actual briefing experience; it never implies registration.
- Briefing exposes the current event state as concept-only with no applications open, and separates delegate, faculty-advisor, and chair/dais responsibilities without inventing operations.

## Semantic and task path

- Exactly one `h1`; headings form a coherent outline.
- Skip link, header, nav, main, named sections, and footer are present.
- Main content and anchor destinations remain readable without JavaScript.
- Mobile navigation opens/closes through a native button with `aria-expanded` and Escape handling.
- Briefing opens as a native dialog, closes by button/Escape, and returns focus.
- Repeated briefing instances generate unique labeling IDs and return focus to the trigger that opened them.
- Checklist uses native inputs, announces progress, persists only locally, and can reset.

## Visual system

- Opening, Mandate, Motion Study, Committees, Procedure, Delegate Desk, Day, and Closing each use a distinct composition family.
- No interchangeable rounded-card grid, glass, blob, globe, particle field, stock image, or copied identity.
- Original seal, resolution marks, three procedural image plates, and deterministic drafting film are delivered as source-controlled SVG/HTML/CSS/WebM/MP4.
- At 1440px the page has an authored asymmetrical editorial grid.
- At 390px and 320px the page recomposes into one readable procedural column without horizontal scrolling.

## Motion

- Entrance preserves visible content when JavaScript or animation fails.
- GSAP owns its actors through one scoped lifecycle; CSS entrance fallbacks are disabled only while that engine is active.
- Resolution progress communicates current procedure and commits semantic state immediately.
- Hover effects have focus equivalents and no touch dependency.
- Reduced motion removes travel, stacking, drawn strokes, and video autoplay while preserving state feedback and the film poster.
- The muted inline film has a visible pause/play control, does not autoplay under reduced-motion or Save-Data, and is disclosed as procedural media rather than conference footage or Higgsfield output.
- No smooth-scroll hijack, unpausable autoplay media, continuous marquee, hidden RAF loop, or loader.

## Accessibility

- Keyboard-only journey reaches every control and shows visible focus.
- Color contrast lint has no blocking error; manual checks cover text, controls, focus, and annotations.
- 200% text zoom and 320 CSS px reflow preserve content and actions.
- Touch targets are at least 44×44 CSS px where controls permit.
- Content is not dependent on color, motion, hover, or absolute positioning.
- Automated accessibility scan has zero serious/critical issues; manual limitations are recorded.

## Performance and resilience

- Production JS gzip target ≤ 150 KB excluding font files; total initial font payload target ≤ 220 KB.
- No raster hero asset or third-party script.
- Video preloads metadata only; verified formats are a 398 KB VP9 WebM and 341 KB H.264 MP4 with a 28 KB WebP poster.
- Fonts use local packaged WOFF2 and `font-display: swap`.
- Build, unit tests, typecheck, lint, and browser tests pass.
- Browser console has zero uncaught errors on desktop and mobile flows.
- Missing localStorage and disabled motion APIs fail gracefully.

## Browser evidence

Capture and inspect:

- 1440×1000 opening, motion study, committees, and delegate desk
- 390×844 opening, motion-study heading/film/plates, menu open, procedure, and briefing
- 320×800 reflow
- reduced-motion opening and interactive states
- checklist untouched, partial, complete, and reset
- briefing open and closed
- keyboard focus path

## Deployment

A local build is not a live site. Public completion requires a browser-verified URL, correct CSS/JS MIME types, direct navigation, expected content, zero console errors, and a clean production artifact. If credentials are unavailable, report deployment as blocked rather than live.
