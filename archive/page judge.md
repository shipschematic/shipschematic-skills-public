## Page-judging methodology (run every page against this)

Ten sections. Each item is a **gate** — one failure means the page does not ship. Use the cover critique's adapted criteria; interior pages replace "shelf appeal" with "spread appeal" and "thumbnail test" with "reduced-size proof (50–60 % zoom)."

**Book spec this was written against:** A5 screen edition — 148 × 210 mm page, digital only: the HTML and the PDF are read on screen and never sent to a press. Cream / ink / ink-2 / oxblood palette, Playfair Display + Inter. Where a print-object gate (CMYK conversion, spot colors, press output) appears below it is marked *(N/A — print object)*; every typography, palette, composition, content-integrity, accessibility, and consistency gate remains fully in force at **screen render and PDF render**.

### 1. Page geometry & furniture (8 gates)
- [ ] Page size matches the book spec (A5 / 148 × 210 mm here).
- [ ] `@page` rule matches the trim and sets `margin: 0` (margins are handled by the layout, not the print driver).
- [ ] Text block is identical on every text page: outer, inner (gutter), top, bottom margins.
- [ ] Running head is present, correctly placed (verso/recto rule decided per book), and matches the book's running-head format.
- [ ] Folio is present, in the correct position, in the correct font/size/color.
- [ ] No content sits closer than the 10 mm safe margin to any trim edge.
- [ ] No horizontal overflow — no element forces width beyond the text block, no `min-width` on scalable graphics.
- [ ] The page has a single, readable column (no accidental secondary column).

### 2. Typography (10 gates)
- [ ] Type families match the book spec exactly (here: Playfair Display + Inter).
- [ ] Body size between 10 and 12 pt; line height between 1.4 and 1.6.
- [ ] Body measure between 45 and 75 characters per line (ideal 65–70).
- [ ] Heading hierarchy is unambiguous (H1 > H2 > H3) and consistent in size, weight, and spacing.
- [ ] Smallest type on the page is ≥ 7 pt (micro-caps) / ≥ 8 pt (SVG labels) / ≥ 9 pt (body-adjacent).
- [ ] Letter-spacing on caps is 0.15 em or wider; never on lower-case body.
- [ ] No widows (a single word on the last line of a paragraph) and no orphans (a single line at the top of a new page).
- [ ] Hyphenation is on for justified text; no more than two consecutive hyphenated lines.
- [ ] Punctuation: curly quotes, em dashes for breaks, en dashes for ranges, no double spaces.
- [ ] Italics are used for emphasis/foreign terms only — not as a second body face.

### 3. Color & palette (4 gates)
- [ ] Only colors from the book's token palette appear (cream, ink, ink-2, oxblood).
- [ ] No gradients, glows, shadows, or blurs (two-ink system).
- [ ] Body text contrast ≥ 4.5:1 against paper.
- [ ] The accent color (oxblood) appears on ≤ 10 % of the page area.

### 4. Figures, tables, diagrams (10 gates)
- [ ] SVG uses `viewBox` and `width: 100%; height: auto` — it scales to the column and never forces overflow.
- [ ] No `min-width` on any scalable element.
- [ ] All text inside the SVG renders at ≥ 8 pt at final size (calculate from `viewBox` width ÷ render width × font-size ÷ 0.3528).
- [ ] All colors inside the SVG are palette colors.
- [ ] SVG has `role="img"`, `<title>`, and `<desc>`.
- [ ] Figure has a numbered caption in the book's caption style.
- [ ] Figure adds information the body does not repeat verbatim.
- [ ] Figure is vector, not raster (no embedded PNGs).
- [ ] Figure style (stroke weight, type, dot size, legend style) is consistent with every other figure in the book.
- [ ] Figure sits inside the text block with the same top/bottom margin on every page.

### 5. Content integrity (5 gates)
- [ ] No placeholder text (lorem ipsum, TODO, "test bullet," "sample sentence").
- [ ] No duplicated content between diagram, caption, and body.
- [ ] Headings match the table of contents exactly.
- [ ] Internal links resolve (relative paths valid in the build).
- [ ] Cross-references (figure numbers, page numbers, section numbers) are correct.

### 6. Render readiness (7 gates)
- [ ] `@page` rule present and correct.
- [ ] All hairlines ≥ 0.25 mm.
- [ ] *(N/A — print object)* All rules and rules-adjacent elements convert cleanly to CMYK (no spot color left unmarked).
- [ ] Fonts embedded in the PDF, or fallback stacks declared and tested.
- [ ] No `position: fixed`, `backdrop-filter`, `mix-blend-mode`, or other screen-only effects.
- [ ] No element is clipped by `overflow: hidden` (verify by temporarily removing it during proof).
- [ ] The page renders at 100 % without horizontal scroll and without an unintended second page.

### 7. Accessibility (6 gates)
- [ ] Heading order is sequential (`h1` → `h2` → `h3`, never skipping).
- [ ] Every SVG has `role="img"` + `<title>` + `<desc>`.
- [ ] Color is never the only signal (the "focal stage" is labeled in text, not just tinted).
- [ ] Body contrast ≥ 4.5:1; large type ≥ 3:1.
- [ ] Reading order in the DOM matches visual order.
- [ ] Links have discernible text (no "click here").

### 8. Consistency with the book (6 gates)
- [ ] Running head format matches every other page.
- [ ] Folio style matches every other page.
- [ ] Body measure, leading, and first-line treatment match.
- [ ] Figure caption style matches.
- [ ] Heading styles match the book's style sheet.
- [ ] Opening paragraph treatment matches (drop cap / lead-in / none — same across the book).

### 9. Editorial quality (4 gates)
- [ ] Copy is concise; no sentence repeats a fact already in the diagram.
- [ ] Each section advances the chapter's argument (or is cut).
- [ ] No "placeholder narrative" ("this section exists purely to add paragraphs").
- [ ] Every claim in the lead is supported in the body.

### 10. Scoring (one gate, pass/fail)
- [ ] **Zero failures across sections 1–9.** Any single unchecked item = the page does not ship. Fix, re-run, repeat until every box is checked.

**How to run it:** open the page in the browser and in the exported A5 PDF, and zoom to 50 % to check legibility of the smallest type. Then check the PDF for clipping, font substitution, and hairline drop-out. Only a page that passes sections 1–9 at both screen *and* PDF render is "all pass."

Historical note (from the 178 × 235 mm reference comps, which are kept here as design references, not specimens — the shipped book is the A5 screen edition declared above): to apply the judge to the reference `funnel-stack-notes.html` and `index.html`, the blocking fixes were the same as they were for `how-settlement-works.html`: remove the `min-width` on the SVG, drop `#8A4E24` and `#EFE3D2`, raise the SVG micro-type to ≥ 16 units, add running head + folio + `@page`, split `funnel-stack-notes` across two pages (it can't carry five sections plus a diagram on one), and replace every lorem ipsum line in `index.html` with real copy.