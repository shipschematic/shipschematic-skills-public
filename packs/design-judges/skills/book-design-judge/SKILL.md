---
name: book-design-judge
description: Judge a print book cover or interior page — 7×9.25 in, two-ink, Playfair Display + Inter. Use when designing, reviewing, or shipping book covers, pages, type, figures, or print files. Ten gated sections per artifact; one failed gate blocks ship.
license: MIT
metadata:
  version: "2.0"
---

# Book Design Judge

Gate every artifact. One failed gate = no ship.

## Spec

| Item | Value |
|---|---|
| Trim | 7 × 9.25 in (178 × 235 mm), ratio 1:1.32 |
| Spine | 15 mm (≈240 pp, 60# cream offset) |
| Bleed | 3 mm, all sides |
| Palette | cream `#FFFDF3`, ink `#2A1A10`, ink-2 `#6B5648`, oxblood `#6F1D1B` |
| Type | Playfair Display (display + text), Inter (micro only) |
| Body | 10–12 pt, line height 1.4–1.6, measure 45–75 chars |
| Hairlines | ≥ 0.25 mm |
| Minimum type | ≥ 7 pt micro-caps, ≥ 8 pt SVG labels, ≥ 9 pt body-adjacent |

## Cover — 10 sections

### 1. Format & object
- [ ] Trim is 178 × 235 mm — not A4, letter, or square.
- [ ] One art box holds back, spine, and front.
- [ ] Bleed is 3 mm on all four sides.
- [ ] Spine width = page count × paper bulk; stated in slug.
- [ ] Crop marks sit outside bleed; length and offset correct.
- [ ] Slug line: filename, trim, spine, bleed, version, date.
- [ ] Barcode clear zone 50 × 30 mm reserved on back.
- [ ] No text within 10 mm of trim, except intentional bleed art.
- [ ] `@page` matches sheet; `margin: 0`.
- [ ] PDF is one page.

### 2. Front typography
- [ ] Title fit measured, not clipped: every line < live measure; remove `overflow: hidden` to prove.
- [ ] Title is dominant — largest type, no rival.
- [ ] Author name present and legible.
- [ ] Byline position, size, case match house style.
- [ ] Ampersand and italic accents match title weight — no 400 beside 900.
- [ ] Smallest type ≥ 7 pt.
- [ ] Every hairline ≥ 0.25 mm.
- [ ] Subtitle adds information; it does not repeat the eyebrow.
- [ ] Letterspaced caps only on micro-type, never body.
- [ ] Title block uses ≤ 3 type sizes.

### 3. Composition & grid
- [ ] Grid citation is accurate — layout follows that structure.
- [ ] Focal point is singular and lands first.
- [ ] No unresolved void; whitespace is deliberate.
- [ ] Ranged elements share a baseline or measure edge.
- [ ] No element floats without a structural anchor.
- [ ] Lower band present when the grid calls for it.
- [ ] Margins match the interior text block.
- [ ] Title, author, imprint relationship reads in one glance.

### 4. Color & palette
- [ ] Only cream, ink, ink-2, oxblood. No fourth color.
- [ ] No gradients, glows, shadows, blurs.
- [ ] Cream documented as stock simulation, not printed ink.
- [ ] Body text contrast ≥ 4.5:1 against paper.
- [ ] Oxblood ≤ 10% of cover area.
- [ ] No screen-only effects: vignette, `mix-blend-mode`, `backdrop-filter`.
- [ ] Background grid aligns to trim, not bleed.

### 5. Marks, imprint & genre
- [ ] Imprint mark and wordmark form one locked unit.
- [ ] ≤ 2 marks on cover.
- [ ] Every mark carries meaning for the thesis.
- [ ] Genre signal reads correctly.
- [ ] Shelf test: sits credibly beside three comparable titles.
- [ ] No mascot or clip art that does not serve the brief.
- [ ] Category label on back matches BISAC/genre.

### 6. Spine & back
- [ ] Spine width matches page count × bulk — verify arithmetic.
- [ ] Spine text ≥ 3.2 mm clear of each fold.
- [ ] Spine text orientation, size, content match spec.
- [ ] Spine type legible at shelf width.
- [ ] Back hook ≤ 1 sentence, reads at 100%.
- [ ] Blurb is real copy.
- [ ] Bullets ≤ 5 items, each ≤ 2 lines.
- [ ] Bio ≤ 50 words.
- [ ] Barcode zone 50 × 30 mm, quiet zone ≥ 6 mm, ISBN + price inside.
- [ ] Back footer repeats imprint mark.

### 7. Print readiness
- [ ] `@page` rule present and correct.
- [ ] Every hairline ≥ 0.25 mm.
- [ ] Colors convert cleanly to CMYK; output intent documented.
- [ ] No spot color left unmarked.
- [ ] Fonts embedded, or fallback stacks declared and tested.
- [ ] Nothing clipped by `overflow: hidden` — verify by removing it.
- [ ] Crop marks, slug, bleed box all present.
- [ ] Prints at 100% with no horizontal scroll and no second page.
- [ ] No `position: fixed`, `backdrop-filter`, `mix-blend-mode`.

### 8. Thumbnail proof
- [ ] Thumbnail is a real scaled clone, not a viewport query.
- [ ] Tested at print ratio 1.32 and ebook ratio 1.60.
- [ ] Title still dominant at 112 px wide.
- [ ] Author legible at 112 px, or deliberately omitted and documented.
- [ ] Key visual reads as silhouette at 112 px.
- [ ] Nothing in the 10 mm safe area vanishes at thumbnail.
- [ ] Amazon/Kobo 1.6 letterbox policy accounted for.
- [ ] Retailer variants declared and built.

### 9. Interior consistency & integrity
- [ ] Type families match interior: Playfair Display + Inter.
- [ ] Colors match interior tokens exactly.
- [ ] Cover is compatible with running head and folio style.
- [ ] No lorem ipsum, TODO, or template copy.
- [ ] ISBN and price are real.
- [ ] Title and author match title page.
- [ ] Cover TOC matches interior chapter titles.
- [ ] Blurb claims are supported by the interior.
- [ ] No production metadata on the cover face.

### 10. Cover score
- [ ] Zero failures across sections 1–9. One unchecked item = no ship. Fix, rerun, repeat.

## Page — 10 sections

### 1. Page geometry & furniture
- [ ] Page size matches trim 178 × 235 mm.
- [ ] `@page` matches trim; `margin: 0` — layout owns margins.
- [ ] Text block identical on every text page: outer, inner, top, bottom.
- [ ] Running head present, correctly placed verso/recto, matches format.
- [ ] Folio present, correct position, font, size, color.
- [ ] Nothing closer than 10 mm to any trim edge.
- [ ] No horizontal overflow; no `min-width` on scalable graphics.
- [ ] Single readable column.

### 2. Typography
- [ ] Families match spec: Playfair Display + Inter.
- [ ] Body 10–12 pt; line height 1.4–1.6.
- [ ] Measure 45–75 chars — ideal 65–70.
- [ ] Heading hierarchy unambiguous and consistent: size, weight, spacing.
- [ ] Smallest type ≥ 7 pt / ≥ 8 pt SVG / ≥ 9 pt body-adjacent.
- [ ] Cap letter-spacing ≥ 0.15 em; never on lower-case body.
- [ ] No widows, no orphans.
- [ ] Hyphenation on for justified text; ≤ 2 consecutive hyphenated lines.
- [ ] Curly quotes; em dash for breaks; en dash for ranges; no double spaces.
- [ ] Italics for emphasis or foreign terms only — never a second body face.

### 3. Color & palette
- [ ] Only cream, ink, ink-2, oxblood.
- [ ] No gradients, glows, shadows, blurs — two inks only.
- [ ] Body contrast ≥ 4.5:1 against paper.
- [ ] Oxblood ≤ 10% of page area.

### 4. Figures, tables, diagrams
- [ ] SVG has `viewBox` and `width: 100%; height: auto`.
- [ ] No `min-width` on any scalable element.
- [ ] Every SVG label ≥ 8 pt at final size.
- [ ] Every SVG color is a palette color.
- [ ] SVG has `role="img"`, `<title>`, `<desc>`.
- [ ] Numbered caption in house caption style.
- [ ] Figure adds what body does not repeat.
- [ ] Figure is vector, not raster.
- [ ] Figure style matches every other figure.
- [ ] Figure sits in the text block with identical top and bottom margin.

### 5. Content integrity
- [ ] No placeholder text: lorem, TODO, "test bullet", "sample sentence".
- [ ] No duplication across diagram, caption, body.
- [ ] Headings match the TOC exactly.
- [ ] Internal links resolve.
- [ ] Figure, page, and section cross-references correct.

### 6. Print readiness
- [ ] `@page` present and correct.
- [ ] Every hairline ≥ 0.25 mm.
- [ ] Rules convert cleanly to CMYK; no unmarked spot color.
- [ ] Fonts embedded, or fallback stacks declared and tested.
- [ ] No `position: fixed`, `backdrop-filter`, `mix-blend-mode`, or screen effects.
- [ ] Nothing clipped by `overflow: hidden`.
- [ ] Prints at 100% with no horizontal scroll and no second page.

### 7. Accessibility
- [ ] Heading order sequential: h1 → h2 → h3, no skips.
- [ ] Every SVG has `role="img"` + `<title>` + `<desc>`.
- [ ] Color never the only signal.
- [ ] Body contrast ≥ 4.5:1; large type ≥ 3:1.
- [ ] DOM reading order matches visual order.
- [ ] Links have discernible text.

### 8. Book consistency
- [ ] Running head format matches every page.
- [ ] Folio style matches every page.
- [ ] Body measure, leading, first-line treatment match.
- [ ] Figure caption style matches.
- [ ] Heading styles match the style sheet.
- [ ] Opening paragraph treatment matches — drop cap, lead-in, or none.

### 9. Editorial quality
- [ ] Copy is concise; no sentence repeats its diagram.
- [ ] Each section advances the argument, or gets cut.
- [ ] No placeholder narrative.
- [ ] Every lead claim is supported in the body.

### 10. Page score
- [ ] Zero failures across sections 1–9. One unchecked item = no ship. Fix, rerun, repeat.

## Brand & tokens

- CSS uses `var()` and theme tokens. No literal hex in CSS.
- SVG diagrams use `{{ figure.* }}` placeholders, never baked literals.
- Theme SSOT: `shapes/book/themes/harvest/theme.yml` (override) or `design/themes/harvest/theme.yml`.
- Generated view: `shapes/book/Template/themes/harvest/theme.yml` — do not edit.
- Tokens: `--bg` paper, `--ink` display, `--ink-2` body, `--accent` oxblood, `--muted` labels, `--rule` gold, `--font-serif` Playfair, `--font-sans` Inter, `--font-mono` JetBrains Mono.
- Washes: `--cover-rule`, `--cover-rule-soft`, `--cover-vignette`, `--cover-grid` — composed by `theme.py`.
- Gold `#BB9457` carries rules, ticks, markers — never text.
- Cream `#FFFDF3` is stock simulation, never printed ink.

## Locked decisions

- Cover: no mascot, no contents card, no grid background. Top band, hero, schematic, footer.
- Schematic replaces TOC: three-layer stack, progress bars, chapter titles as links.
- Page: running head via `@page` margin boxes; centered italic oxblood folio; 24/16/22 mm text block.
- Body is `--ink-2`; headings are `--ink`.
- Captions: "Figure X.X", bold label in oxblood.
- `@page` handles flow; cover uses named `@page cover` with `margin: 0`.
