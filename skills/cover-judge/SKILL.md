---
name: cover-judge
description: Judge an A5 screen-edition book cover — 148 × 210 mm, two-ink, Playfair Display + Inter, HTML and PDF only. Use when designing, reviewing, or shipping a cover. Ten gated sections; one failed gate blocks ship.
license: MIT
metadata:
  version: "2.0"
---

# Cover Judge

Gate every cover. One failed gate = no ship.

**Spec:** A5 screen edition — 148 × 210 mm (1:1.418), digital only. Cream `#FFFDF3`, ink `#2A1A10`, ink-2 `#6B5648`, oxblood `#6F1D1B`. Playfair Display + Inter.

Print-object gates are N/A by declaration: trim-vs-trade-book, bleed, spine, crop marks, slug, barcode, spread completeness, CMYK, output intent, retailer letterbox. Every type, composition, palette, integrity, accessibility, and consistency gate still applies at screen render and PDF render.

## 1. Format & object
- [ ] Page is A5 148 × 210 mm — not A4, letter, or square.
- [ ] *(N/A — print)* Spread holds back, spine, front in one art box.
- [ ] *(N/A — print)* Bleed 3 mm all sides.
- [ ] *(N/A — print)* Spine width computed and stated in slug.
- [ ] *(N/A — print)* Crop marks correct.
- [ ] *(N/A — print)* Slug line present.
- [ ] *(N/A — print)* Barcode clear zone reserved.
- [ ] No text or mark within 10 mm of trim, except intentional bleed art.
- [ ] `@page` matches sheet; `margin: 0`.
- [ ] PDF is one page.

## 2. Front typography
- [ ] Title fit measured, not clipped: every line < live measure; remove `overflow: hidden` to prove.
- [ ] Title dominant — largest type, no rival.
- [ ] Author present and legible.
- [ ] Byline position, size, case match house style.
- [ ] Ampersand and italic accents match title weight — no 400 beside 900.
- [ ] Smallest type ≥ 7 pt.
- [ ] Every hairline ≥ 0.25 mm.
- [ ] Subtitle adds information; it does not repeat the eyebrow.
- [ ] Letterspaced caps only on micro-type, never body.
- [ ] Title block uses ≤ 3 type sizes.

## 3. Composition & grid
- [ ] Grid citation is accurate — layout follows that structure.
- [ ] Focal point is singular and lands first.
- [ ] No unresolved void; whitespace deliberate, asymmetric, anchored, or structural.
- [ ] Ranged elements share a baseline or measure edge.
- [ ] No element floats without an anchor.
- [ ] Lower band present when the grid calls for one.
- [ ] Margins match the interior text block.
- [ ] Title, author, imprint relationship reads in one glance.

## 4. Color & palette
- [ ] Only cream, ink, ink-2, oxblood. No fourth color.
- [ ] No gradients, glows, shadows, blurs.
- [ ] Cream documented as stock simulation, not printed ink.
- [ ] Body contrast ≥ 4.5:1 against paper.
- [ ] Oxblood ≤ 10% of cover area.
- [ ] No screen-only effects: vignette, `mix-blend-mode`, `backdrop-filter`.
- [ ] Background grid aligns to trim, not bleed.

## 5. Marks & genre
- [ ] Imprint mark and wordmark form one locked unit.
- [ ] ≤ 2 marks on cover: imprint plus one secondary.
- [ ] Every mark carries meaning for the thesis.
- [ ] Genre signal reads correctly: systems, literary, or cookbook.
- [ ] Shelf test: sits credibly beside three named comparables.
- [ ] No mascot or clip art that does not serve the brief.
- [ ] *(N/A — print)* Back category label matches BISAC/genre.

## 6. Spine & back
N/A — screen edition has no spine, back cover, blurb, or barcode.

## 7. Render readiness
- [ ] `@page` present and correct.
- [ ] Every hairline ≥ 0.25 mm.
- [ ] *(N/A — print)* Colors convert cleanly to CMYK; intent documented.
- [ ] *(N/A — print)* No spot color unmarked.
- [ ] Fonts embedded, or fallback stacks declared and tested.
- [ ] Nothing clipped by `overflow: hidden` — verify by removing it.
- [ ] *(N/A — print)* Crop marks, slug, bleed box present.
- [ ] Renders at 100% with no horizontal scroll and no second page.
- [ ] No `position: fixed`, `backdrop-filter`, `mix-blend-mode`, or screen effects.

## 8. Reduced-size proof
N/A as a gate. The screen edition ships as a reading PDF, not retailer tiles. Run the reduced-size check inside section 10: zoom out; title, author, and schematic must still read.

## 9. Interior consistency & integrity
- [ ] Type families match interior: Playfair Display + Inter.
- [ ] Colors match interior tokens exactly.
- [ ] Cover running head and folio style compatible with interior.
- [ ] No lorem ipsum, TODO, or template copy.
- [ ] *(N/A — print)* ISBN and price real.
- [ ] Title and author match the title page.
- [ ] Cover TOC matches interior chapter titles.
- [ ] Blurb claims supported by the interior.
- [ ] No production metadata on the cover face.

## 10. Score
- [ ] Zero failures across sections 1–9. One unchecked item = no ship. Fix, rerun, repeat.

## Run

1. Open the cover at 100% in browser and in the exported A5 PDF.
2. Confirm one page, flat paper, no clipped element.
3. Check font embedding and hairline survival in the PDF.
4. Zoom to quarter size; confirm title, author, schematic still read.
5. Pass only when every applicable gate holds at screen and PDF render.
