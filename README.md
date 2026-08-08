# THE FLOOR

**A concept Model United Nations experience where every section behaves like a resolution being drafted in public.**

[Open the public site](https://pizzadude123.github.io/the-floor-mun/)

## What it is

THE FLOOR is an original editorial/procedural website concept. It includes:

- a semantic narrative from mandate to vote;
- illustrative committee dossiers and schedule modules;
- a keyboard-operable procedural resolution;
- a local-only delegate preparation checklist;
- purpose-built desktop, mobile, and reduced-motion compositions;
- original inline SVG and CSS graphic assets.

It is **not** a live event listing or registration portal. No UN affiliation is implied. Conference dates, city, venue, organizer, fees, and live registration remain intentionally unclaimed.

## Development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run verify
npm audit --audit-level=high
npx -y @google/design.md lint DESIGN.md
```

The Playwright suite checks truth labels, landmarks, serious/critical Axe findings, console errors, horizontal overflow, mobile navigation, dialog focus return, procedural state, local persistence, reduced motion, 320 px reflow, and representative screenshots.

## Design and provenance

- [`VISION.md`](VISION.md) — governing concept and art direction
- [`CONTENT.md`](CONTENT.md) — copy and claim contract
- [`DESIGN.md`](DESIGN.md) — design tokens and component states
- [`ACCEPTANCE.md`](ACCEPTANCE.md) — release criteria
- [`LICENSES.md`](LICENSES.md) — dependency and asset provenance

Source is published for review; no license grant is implied beyond the licenses of the documented third-party dependencies.
