## Carousel-judging methodology (run every carousel against this)

Mirror of the page judge and cover judge. Ten sections, same gate logic — any unchecked box means the carousel does not ship. Where a gate is platform-specific, it is marked *(platform-specific)* and the rule still applies to that platform's variant. Universal gates apply across LinkedIn document carousels, Instagram feed carousels, and X/Twitter image threads.

**Use spec this was written against:** Multi-platform carousel — LinkedIn document carousel (PDF upload, 1080×1350 or 1080×1080), Instagram feed carousel (1080×1350 portrait, native swipe), and X/Twitter image thread (1600×1600 square, swipeable). B2B / SaaS / service niche, founder / consultant / agency seller. Goal: capture attention **and** convert to a sale, demo, or qualified DM — both weighted equally. Two-ink brand system on screen; no print object.

**Screen edition:** every print-object gate (CMYK conversion, bleed, crop marks, ISBN, spine) is **N/A by declaration** — carousels ship as rasterized PNG/JPEG or PDF upload read on a phone. Every typography, composition, palette, content-integrity, accessibility, hook, swipe-through, and conversion gate remains fully in force at **mobile render at 100 % and at feed thumbnail size**.

### 1. Slide architecture & format (9 gates)
- [ ] Slide count is in the **5–8 sweet spot** (the algorithmic completion band). Going to 9+ only ships if the narrative genuinely requires the length; 11+ slides never ships without a written justification on the brief.
- [ ] Minimum 2 slides (single image is a post, not a carousel); maximum 20 (Instagram hard ceiling) — never hit the ceiling by default.
- [ ] Aspect ratio matches the target platform: 1080×1350 (4:5 portrait) for Instagram and LinkedIn; 1080×1080 (1:1 square) or 1600×1600 for X. The whole carousel uses **one ratio end-to-end**, no mixed orientations.
- [ ] First-slide aspect is identical to every subsequent slide — mixed ratios trigger platform auto-crop and clip the design.
- [ ] Slide order is final before export — Instagram allows reordering after posting, but LinkedIn and X do not; assume no post-publish reorder.
- [ ] File naming follows a stable convention: `brand-topic-YYYYMMDD-slideNN.png` — never `Untitled-1.png`, `final-final-v3.jpg`, or asset dumps.
- [ ] Export resolution is ≥ 1080 px on the short edge at 72 DPI minimum; no upscaling artifacts visible at 2× zoom.
- [ ] File size per slide ≤ 1 MB (Instagram) and ≤ 5 MB per image on X; total carousel ≤ 30 MB so the upload does not compress the type into mud.
- [ ] No slide is a duplicate of another with one word changed — if the only delta is text, it ships as a text overlay on a reused background, not a fresh asset.

### 2. Hook slide — first 3 seconds (10 gates)
- [ ] Hook headline is **≤ 8 words** and reads on a phone at arm's length without zooming.
- [ ] Hook is a **pattern interrupt** — contrarian claim, specific number, named enemy, or a question the reader has been avoiding. "Here are 5 tips" does not interrupt; "Why your demo-no-show rate is secretly 38 %" does.
- [ ] Hook slide promises a **specific outcome**, not a topic. "Onboarding" fails; "Cut onboarding-to-activation from 11 days to 3" passes.
- [ ] Promise on slide 1 is **delivered by the last slide** — if you cannot trace a straight line from hook to payoff, the hook is a lie.
- [ ] Hook slide carries a **visual element** (a number, a chart fragment, a face, an arrow) — not type-only on a flat color.
- [ ] Hook slide does **not** reveal the answer — curiosity gap is preserved; the reader must swipe to get the payoff.
- [ ] No emoji stack on the hook — one emoji max, and only if it earns its place as a semantic marker.
- [ ] Hook slide is legible at **feed thumbnail size** (≈ 240 px wide on a phone) — title still dominates, subtitle still readable.
- [ ] Hook slide does not lead with the brand logo, the author's headshot, or "Part 3 of an ongoing series" — these kill scroll-stop.
- [ ] Hook slide passes the **3-second read test**: a stranger can say back the promise after 3 seconds of viewing.

### 3. Slide content & copy (9 gates)
- [ ] **One idea per slide** — a second idea on the same slide is a separate slide. If you cannot state the idea in one sentence, the slide is doing two jobs.
- [ ] Body copy per slide is **≤ 30 words**. Anything longer is a blog post, not a carousel slide.
- [ ] Every slide has a **headline + body** hierarchy: headline 1.5–2× the body size, body 1.4–1.6 line height.
- [ ] No sentence on slide N repeats a sentence on slide N−1 — repetition is reserved for the recap slide.
- [ ] Numbers are specific: "47 %" beats "most"; "$ 12,400 saved" beats "thousands saved." Vague numbers fail the gate.
- [ ] Each slide advances the carousel's argument — if removing the slide leaves the argument intact, the slide is cut.
- [ ] No lorem ipsum, no `[placeholder]`, no "TBD" copy, no "lorem" in the filename, no Figma frame titles still visible.
- [ ] No corporate hedging language ("in today's fast-paced world", "at the end of the day", "leverage synergies") — every hedge is a failed gate.
- [ ] The carousel reads aloud in **≤ 90 seconds** end-to-end at normal speaking pace; longer means it is a deck, not a feed carousel.

### 4. Visual & design system (9 gates)
- [ ] **Two-ink palette** enforced (e.g., cream + ink + one accent), no third decorative color, no gradient, no glow, no drop shadow, no blur.
- [ ] Accent color occupies **≤ 10 %** of any single slide — used for emphasis only, not as a background wash.
- [ ] Body text contrast ≥ 4.5:1 against its background at final render size (check with a contrast checker, not your eye).
- [ ] One type family for headlines, one for body — maximum two families total. Same family across every slide.
- [ ] Body type is **≥ 24 pt** at export (≥ 32 pt for headlines). If a viewer has to zoom to read, the gate fails.
- [ ] Letter-spacing on caps is ≥ 0.1 em; never on lowercase body copy.
- [ ] Slide grid is consistent: margins, gutters, and content frame are identical slide-to-slide. No element floats without a structural anchor.
- [ ] Image quality is sufficient at 2× zoom — no JPEG artifacts around type, no rasterized screenshots of text used as body copy.
- [ ] One illustration or photograph style across the carousel — mixing flat icon, 3D render, and stock photo on the same carousel fails the gate.

### 5. Story flow & swipe-through (8 gates)
- [ ] The carousel follows a **named structure**: problem → stakes → 3–5 value moves → recap → CTA, OR myth-bust pattern, OR before-after arc. The structure is stated in the brief.
- [ ] Slide N+1 pays off the curiosity set up on slide N — every transition has a reason to swipe, not just "next."
- [ ] A **slide counter** ("3/8") is present in the same corner on every slide from slide 2 onward — readers use it as a progress signal.
- [ ] A **swipe cue** (arrow, partial peek of slide N+1, or "swipe →") appears on slides 1 through N−1; absent only on the final slide.
- [ ] The recap slide (second-to-last) summarizes the value moves in **5 lines or fewer** — earns the save.
- [ ] No slide is a "transition slide" with no information (e.g., "Okay, but first…" with no content) — transition slides kill completion rate.
- [ ] The carousel passes the **drop-off audit**: name the slide where a mobile reader is most likely to abandon. If you cannot, you have not stress-tested it; if you can, that slide gets the strongest visual or copy.
- [ ] Estimated swipe-through rate target is ≥ 50 % completion to the last slide (industry benchmark for a healthy B2B carousel); the design supports this, not works against it.

### 6. CTA & conversion (8 gates)
- [ ] The **final slide** carries exactly one CTA — not "comment + share + DM + book a call." Multiple CTAs split attention and convert lower.
- [ ] The CTA verb is **specific and singular**: "Comment SHIP", "DM me ONBOARDING", "Book a 15-minute call at [link]" — not "engage", "let's chat", or "thoughts?".
- [ ] The CTA matches the carousel's stage in the funnel: top-of-funnel carousels ask for a save or comment; mid-funnel asks for a DM keyword; bottom-of-funnel asks for a booking. Mismatched CTAs fail the gate.
- [ ] If the CTA is a keyword-trigger DM, the keyword is **≤ 1 word, all caps, memorable** ("PIPELINE", not "pipeline2024q4").
- [ ] If the CTA is a link, the link is **in the caption and in the profile bio** — never only on the slide, because slide text is not clickable.
- [ ] The CTA promises the **next step's value**, not the action itself: "DM me ONBOARDING and I'll send the 11-day checklist" beats "DM me ONBOARDING."
- [ ] The author / brand block on the final slide carries: name, role, one-line positioning, and one handle — no full contact card, no QR code on a feed carousel (it never gets scanned).
- [ ] The CTA passes the **friction test**: a viewer can complete the action in **≤ 2 taps** from the final slide.

### 7. Caption, alt text & accessibility (7 gates)
- [ ] Every slide carries **alt text** describing what the slide communicates (the idea, not "image of text"). LinkedIn, Instagram, and X all support per-image alt text natively.
- [ ] The post caption leads with a **hook line** in the first 2 lines (before the "See more" truncation), not a brand intro or a hashtag stack.
- [ ] Caption repeats the carousel's core promise and ends with the same CTA verb as the final slide — caption and slide CTA never diverge.
- [ ] Color is **never the only signal**: a chart's focal bar is labeled in text, a step number is a numeral not just a tinted dot.
- [ ] Body contrast ≥ 4.5:1 verified against the actual rendered PNG, not the design file — colors shift after compression.
- [ ] No text rendered as an image alone when the same content could be in the caption — image-of-text fails WCAG and halves screen-reader access.
- [ ] Hashtags (if used) sit at the end of the caption, **≤ 5 hashtags**, all relevant to the slide content; no hashtag stuffing for reach.

### 8. Anti-patterns blacklist (8 gates)
- [ ] **No text-wall slides** — any slide with more than 60 words or 6 lines fails.
- [ ] **No 11+ slide carousels** without a written narrative justification; 15+ never ships.
- [ ] **No "swipe for the answer"** tease that delivers the answer on slide 2 — the answer earns at least slide 4 or the carousel is too thin to ship.
- [ ] **No stock-photo cliché** as the hook visual (handshake, lightbulb, staircase, growth-arrow, diverse-team-laughing-at-laptop) — these signal "skip" to a B2B buyer.
- [ ] **No glow / drop shadow / gradient / blur / mix-blend-mode** — screen-only effects that compress badly and signal amateur design.
- [ ] **No logo-only final slide** — a final slide with just a logo and no CTA is a wasted slide; cut it or add the CTA.
- [ ] **No "Part N of ongoing series"** label on slide 1 — it kills scroll-stop for first-time viewers and rewards only existing followers.
- [ ] **No mismatched brand assets** — fonts, colors, and logo lockup match the brand kit exactly; one-off fonts "because it looked nice" fail the gate.

### 9. Platform fit & consistency (6 gates)
- [ ] Multi-platform adaptation: if the same carousel ships to LinkedIn **and** Instagram **and** X, the export ratio matches each platform's native ratio (no letterboxed Instagram post on LinkedIn, no square X thread pasted as a 4:5 IG carousel).
- [ ] LinkedIn document carousel (PDF upload) preserves selectable text where possible — no rasterizing type into JPEG inside the PDF if the platform supports vector text.
- [ ] X image thread ships as one tweet with multiple images, not as a reply thread of one-image tweets — the latter halves engagement.
- [ ] Brand consistency: same palette, same type families, same logo lockup, same slide counter style across every carousel the brand ships, not just this one.
- [ ] Posting cadence is compatible with the carousel's expected shelf life — B2B carousels earn re-serves 24–48 hours post-publish; do not bury one carousel under another inside that window.
- [ ] The carousel is **reusable as a template**: stripping the specific copy leaves a structure the team can re-skin for the next topic without redesign.

### 10. Scoring (one gate, pass/fail)
- [ ] **Zero failures across sections 1–9.** Any single unchecked item = the carousel does not ship. Fix, re-export, re-run, repeat until every box is checked.

**How to run it:** export the carousel as PNGs (or the platform-native format) and open it on a phone at 100 % in the target platform's preview. Read every slide at feed thumbnail size — if the hook slide does not stop the scroll at thumbnail, redesign the hook. Then view the full carousel at 100 % and confirm: every slide legible, every transition has a swipe reason, the CTA is singular and specific, the alt text is written, the slide count is 5–8 (or justified). Then post the carousel to a draft and have a second reviewer read it on **their** phone cold, with no context — if they cannot state the promise after slide 1 and the CTA after the final slide, the carousel fails and goes back to design. Only a carousel that passes sections 1–9 at **mobile render, feed thumbnail, and cold-review** is "all pass."

---
*AI生成*
