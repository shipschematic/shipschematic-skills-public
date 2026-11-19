---
name: page-judge
description: Judge an A5 screen-edition book page — 148 × 210 mm, two-ink, Playfair Display + Inter, HTML and PDF only. Use when designing, reviewing, or shipping interior pages, type, figures, or accessibility. Ten gated sections; one failed gate blocks ship.
license: MIT
metadata:
  version: "2.0"
---

# Page Judge

Gate every page. One failed gate = no ship.

**Spec:** A5 screen edition — 148 × 210 mm, digital only. Cream `#FFFDF3`, ink `#2A1A10`, ink-2 `#6B5648`, oxblood `#6F1D1B`. Playfair Display + Inter.

Print-object gates are N/A by declaration: CMYK, spot colors, press output. Every typography, palette, composition, integrity, accessibility, and consistency gate applies at screen render and PDF render.

## 1. Geometry & furniture
- [ ] Page is A5 148 × 210 mm.
- [ ] `@page` matches trim; `margin: 0` — layout owns margins.
- [ ] Text block identical on every text page: outer, inner gutter, top, bottom.
- [ ] Running head present, correctly placed verso/recto, matches format.
- [ ] Folio present: position, font, size, color.
- [ ] Nothing closer than 10 mm to any trim edge.
- [ ] No horizontal overflow; no `min-width` on scalable graphics.
- [ ] Single readable column — no accidental second column.

## 2. Typography
- [ ] Families match spec: Playfair Display + Inter.
- [ ] Body 10–12 pt; line height 1.4–1.6.
- [ ] Measure 45–75 chars — ideal 65–70.
- [ ] Heading hierarchy unambiguous and consistent: size, weight, spacing.
- [ ] Smallest type ≥ 7 pt micro-caps, ≥ 8 pt SVG labels, ≥ 9 pt body-adjacent.
- [ ] Cap letter-spacing ≥ 0.15 em; never on lower-case body.
- [ ] No widows, no orphans.
- [ ] Hyphenation on for justified text; ≤ 2 consecutive hyphenated lines.
- [ ] Curly quotes; em dash for breaks; en dash for ranges; no double spaces.
- [ ] Italics for emphasis or foreign terms only — never a second body face.

## 3. Color & palette
- [ ] Only cream, ink, ink-2, oxblood.
- [ ] No gradients, glows, shadows, blurs — two inks only.
- [ ] Body contrast ≥ 4.5:1 against paper.
- [ ] Oxblood ≤ 10% of page area.

## 4. Figures, tables, diagrams
- [ ] SVG has `viewBox` and `width: 100%; height: auto`.
- [ ] No `min-width` on any scalable element.
- [ ] Every SVG label ≥ 8 pt at final size. Compute: `viewBox width ÷ render width × font-size ÷ 0.3528`.
- [ ] Every SVG color is a palette color.
- [ ] SVG has `role="img"`, `<title>`, `<desc>`.
- [ ] Numbered caption in house caption style.
- [ ] Figure adds what body does not repeat.
- [ ] Figure is vector, not raster — no embedded PNGs.
- [ ] Stroke, type, dot, and legend style match every other figure.
- [ ] Figure sits in the text block with identical top and bottom margin.

## 5. Content integrity
- [ ] No placeholder text: lorem, TODO, "test bullet", "sample sentence".
- [ ] No duplication across diagram, caption, body.
- [ ] Headings match the TOC exactly.
- [ ] Internal links resolve.
- [ ] Figure, page, and section cross-references correct.

## 6. Render readiness
- [ ] `@page` present and correct.
- [ ] Every hairline ≥ 0.25 mm.
- [ ] *(N/A — print)* Rules convert cleanly to CMYK; no spot color unmarked.
- [ ] Fonts embedded, or fallback stacks declared and tested.
- [ ] No `position: fixed`, `backdrop-filter`, `mix-blend-mode`, or screen effects.
- [ ] Nothing clipped by `overflow: hidden` — verify by removing it.
- [ ] Renders at 100% with no horizontal scroll and no second page.

## 7. Accessibility
- [ ] Heading order sequential: h1 → h2 → h3, no skips.
- [ ] Every SVG has `role="img"` + `<title>` + `<desc>`.
- [ ] Color never the only signal — label the focal stage in text.
- [ ] Body contrast ≥ 4.5:1; large type ≥ 3:1.
- [ ] DOM reading order matches visual order.
- [ ] Links have discernible text — no "click here".

## 8. Book consistency
- [ ] Running head format matches every page.
- [ ] Folio style matches every page.
- [ ] Body measure, leading, first-line treatment match.
- [ ] Figure caption style matches.
- [ ] Heading styles match the style sheet.
- [ ] Opening paragraph treatment matches — drop cap, lead-in, or none.

## 9. Editorial quality
- [ ] Copy concise; no sentence repeats a fact already in the diagram.
- [ ] Each section advances the argument, or gets cut.
- [ ] No placeholder narrative.
- [ ] Every lead claim supported in the body.

## 10. Score
- [ ] Zero failures across sections 1–9. One unchecked item = no ship. Fix, rerun, repeat.

## Run

1. Open the page in browser and in the exported A5 PDF.
2. Zoom to 50%; smallest type must stay legible.
3. Check PDF for clipping, font substitution, hairline drop-out.
4. Pass only when every applicable gate holds at screen and PDF render.
