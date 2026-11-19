## Cover-judging methodology (run every cover against this)

Mirror of the page judge. Ten sections, same gate logic — any unchecked box means the cover does not ship. Interior pages swap "shelf appeal" for "spread appeal" and "thumbnail test" for "reduced-size proof"; the screen-edition cover keeps the reduced-size proof (section 8's note) and the object-completeness gates that survive the screen-edition declaration below.

**Book spec this was written against:** A5 screen edition — 148 × 210 mm page (ratio 1:1.418), digital only: the HTML and both PDFs are read on screen and never sent to a press. Cream / ink / ink-2 / oxblood palette, Playfair Display + Inter.

**Screen edition:** every print-object gate is **N/A by declaration** — trim-vs-trade-book, bleed, spine width, crop marks, slug line, barcode clear zone, spread/back-cover completeness, CMYK conversion and output intent, and retailer letterbox variants. Where such a gate appears below it is marked *(N/A — print object)*. All typography, composition, palette, content-integrity, accessibility, and consistency gates remain fully in force, enforced at **screen render and PDF render**.

### 1. Format & object completeness (10 gates)
- [ ] Page size matches the book spec (A5 / 148 × 210 mm) — not A4, letter, or square.
- [ ] *(N/A — print object)* Spread contains back + spine + front in one art box; the screen edition ships a front-only sheet by declaration.
- [ ] *(N/A — print object)* Bleed is 3 mm on all four sides.
- [ ] *(N/A — print object)* Spine width is computed from page count × paper bulk and stated in the slug.
- [ ] *(N/A — print object)* Crop marks present, outside the bleed, correct length and offset.
- [ ] *(N/A — print object)* Slug line present: filename, trim, spine, bleed, version, date.
- [ ] *(N/A — print object)* Barcode clear zone (50 × 30 mm) reserved on the back.
- [ ] No text or mark sits within 10 mm of any trim edge, except intentional bleed art.
- [ ] `@page` matches the sheet size and sets `margin: 0`.
- [ ] PDF page count is 1 (the cover is a single page, not two).

### 2. Front-cover typography (10 gates)
- [ ] Title fit is **measured**, not clipped: every title line width < the live measure, and `overflow: hidden` removed during proof.
- [ ] Title is the dominant element — largest type on the cover, no competition.
- [ ] Author name is present and legible.
- [ ] Byline position, size, and case match the book's byline style.
- [ ] Ampersand / italic accent weight is visually matched to the title weight (no 400 next to 900).
- [ ] Smallest type on the cover is ≥ 7 pt.
- [ ] All hairlines are ≥ 0.25 mm.
- [ ] Subtitle adds information; it does not repeat the eyebrow.
- [ ] Letterspaced caps only on micro-type, never on body copy.
- [ ] No more than three type sizes in the title block (title / eyebrow / byline).

### 3. Composition & grid (8 gates)
- [ ] Any grid citation (Marber, Swiss, etc.) is accurate — the layout actually follows that grid's structure.
- [ ] Focal point is singular and where the eye lands first.
- [ ] No unresolved void in any zone; whitespace is deliberate (asymmetric, anchored, or filled by a structural element).
- [ ] All ranged elements share a baseline or measure edge.
- [ ] No element floats without a structural anchor.
- [ ] If the grid calls for a lower band (image, schematic, color block), the lower band is present.
- [ ] Margin proportions are consistent with the interior text block.
- [ ] Title / author / imprint relationship is unambiguous at a glance.

### 4. Color & palette (7 gates)
- [ ] Only book tokens appear: cream, ink, ink-2, oxblood. No fourth color.
- [ ] No gradients, glows, shadows, or blurs.
- [ ] Cream is documented as **stock simulation**, not printed ink.
- [ ] Body text contrast ≥ 4.5:1 against the paper.
- [ ] Accent color (oxblood) occupies ≤ 10 % of the cover area.
- [ ] No screen-only effects (vignette, `mix-blend-mode`, `backdrop-filter`).
- [ ] Background grid, if present, is aligned to **trim**, not bleed.

### 5. Marks, imprint & genre signal (7 gates)
- [ ] Imprint mark and wordmark form a single locked unit.
- [ ] No more than two marks on the cover (imprint + one secondary).
- [ ] Every mark carries meaning for the book's thesis.
- [ ] Genre signal reads correctly (systems/operations vs. literary vs. cookbook).
- [ ] Shelf-adjacency test: the cover sits credibly next to three named comparable titles.
- [ ] No mascot or clip art that doesn't serve the brief.
- [ ] *(N/A — print object)* Category label on the back matches BISAC / genre expectation.

### 6. Spine & back cover (10 gates)
*(N/A — print object. The screen edition has no spine, back cover, blurb, or barcode.)*

### 7. Render readiness (9 gates)
- [ ] `@page` rule present and correct.
- [ ] All hairlines ≥ 0.25 mm.
- [ ] *(N/A — print object)* All colors convert cleanly to CMYK; output intent documented.
- [ ] *(N/A — print object)* No spot color left unmarked.
- [ ] Fonts embedded in the PDF, or fallback stacks declared and tested.
- [ ] No element is clipped by `overflow: hidden` (verify by temporarily removing it).
- [ ] *(N/A — print object)* Crop marks, slug, and bleed box all present.
- [ ] Renders at 100 % with no horizontal scroll and no second page.
- [ ] No `position: fixed`, `backdrop-filter`, `mix-blend-mode`, or other screen-only effects.

### 8. Thumbnail / retail proof (8 gates)
*(N/A — retail object. The screen edition is delivered as a PDF for reading, not as retailer tiles; no 1.6 letterbox policy or retailer variants are declared. The reduced-size sanity check — does the title still dominate when the page is zoomed out — is exercised under section 10's proof run, not as a gate.)*

### 9. Consistency with interior & editorial integrity (9 gates)
- [ ] Type families match the interior (Playfair Display + Inter).
- [ ] Colors match the interior tokens exactly.
- [ ] Cover running head / folio style is compatible with the interior's.
- [ ] No lorem ipsum, TODO, or template copy anywhere on the cover.
- [ ] *(N/A — print object)* ISBN and price are real, not placeholder (the screen cover carries neither).
- [ ] Title and author on the cover match the title page.
- [ ] TOC on the cover (if present) matches the interior chapter titles.
- [ ] Blurb claims are supported by the interior.
- [ ] No production metadata ("A4 · 300 DPI · Print-ready") printed on the cover face.

### 10. Scoring (one gate, pass/fail)
- [ ] **Zero failures across sections 1–9.** Any single unchecked item = the cover does not ship. Fix, re-run, repeat until every box is checked.

**How to run it:** open the cover at 100 % in the browser and in the exported PDF (A5, 148 × 210 mm), and confirm the sheet fills exactly one page with flat paper color and no clipped element. Export the PDF and check font embedding and hairline survival. Then zoom the PDF to roughly a quarter size and confirm title + author + schematic still read. Only a cover that passes the applicable gates at **screen render and PDF render** is "all pass."