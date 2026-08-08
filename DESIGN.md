---
version: alpha
name: The Floor
description: An editorial procedural identity where a Model United Nations site behaves like a resolution being drafted in public.
colors:
  primary: "#12110E"
  secondary: "#B93620"
  tertiary: "#2446E8"
  ink: "#12110E"
  paper: "#F2EBDD"
  paperBright: "#FFF9EE"
  vermilion: "#B93620"
  vermilionLight: "#FF8068"
  cobalt: "#2446E8"
  highlighter: "#D5F15A"
  ash: "#6E695F"
  rule: "#B9B0A1"
typography:
  display-xl:
    fontFamily: Archivo Variable
    fontSize: 6rem
    fontWeight: 750
    lineHeight: 0.86
    letterSpacing: "-0.065em"
  heading-lg:
    fontFamily: Archivo Variable
    fontSize: 3.5rem
    fontWeight: 680
    lineHeight: 0.94
    letterSpacing: "-0.045em"
  body-lg:
    fontFamily: Newsreader Variable
    fontSize: 1.375rem
    fontWeight: 420
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Newsreader Variable
    fontSize: 1.0625rem
    fontWeight: 420
    lineHeight: 1.55
  label:
    fontFamily: ui-monospace
    fontSize: 0.75rem
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  none: 0px
  hairline: 2px
  control: 4px
spacing:
  hairline: 1px
  xs: 6px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 56px
  section: 120px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paperBright}"
    rounded: "{rounded.control}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paperBright}"
    rounded: "{rounded.control}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: 16px
  annotation:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paperBright}"
    rounded: "{rounded.hairline}"
    padding: 6px
  annotation-on-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.vermilionLight}"
    rounded: "{rounded.hairline}"
    padding: 6px
  progress-complete:
    backgroundColor: "{colors.highlighter}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: 6px
  metadata:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ash}"
    rounded: "{rounded.none}"
    padding: 6px
  rule-surface:
    backgroundColor: "{colors.rule}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 6px
---

## Overview

THE FLOOR is not decorated with diplomatic symbols. Its identity comes from diplomacy’s working material: clauses, amendments, margins, signatures, objections, and the pressure to make language precise enough for disagreement to share.

## Colors

- **Ink** is the default authority and reading color.
- **Paper** provides warmth without nostalgic parchment cosplay.
- **Vermilion** belongs only to amendment, objection, correction, and urgent procedural state.
- **Cobalt** marks committed action and current procedural focus; it is not a generic “UN blue” wash.
- **Highlighter** appears sparingly where a negotiable phrase or completed preparation step needs emphasis.
- Critical meaning is never color-only.

## Typography

Archivo Variable sets speeches, section openings, and procedural imperatives with compressed force. Newsreader Variable carries the longer diplomatic argument and keeps the site humane. Mono labels act like docket metadata; they never carry an essential qualification at tiny size.

Display sizes use fluid `clamp()` implementations below these normative desktop maxima. Essential body copy never drops below 16 CSS px.

## Layout

A twelve-column editorial grid is crossed by one persistent document margin. Sections do not repeat a card grid. Instead they use distinct forms: opening resolution, annotated essay, dossier stack, procedural rail, working desk, and timetable.

Desktop sections may use asymmetry and sticky artifacts. Below 800px, all content becomes a deliberate single reading column, sticky behavior releases, and line numbers move into the section header.

## Elevation & Depth

Depth comes from stacked paper edges, ink overlays, and occlusion—not blurred shadows or glass. Shadows are used only when a sheet physically lifts during direct interaction.

## Shapes

Corners are nearly square. Circular geometry is reserved for the original conference seal, vote marks, and status indicators. Pills are prohibited unless the content is truly a compact status.

## Components

- Primary actions are solid ink and invert to cobalt on hover/focus.
- Dossier sheets expose a stable title, topic, pressure pair, and explicit illustrative label.
- The resolution panel has authoritative semantic text beneath visual annotations.
- The checklist uses native checkboxes with an oversized custom boundary and visible focus.
- The briefing uses a native dialog with an explicit close action and meaningful initial focus.

## Do's and Don'ts

**Do:** derive every visual rule from document-making, make revision visible, vary section composition, preserve semantic reading order, and make mobile feel edited rather than squeezed.

**Don’t:** use a globe hero, glass cards, generic particles, fake live counters, prestige metrics, UN emblems, constant marquee motion, perpetual RAF work, smooth-scroll hijacking, or identical fade-ups.
