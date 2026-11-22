---
name: thumbnail-judge
description: Judge a YouTube thumbnail — 1280 × 720, AHQ spine, mobile-first. Use when designing, reviewing, or shipping a thumbnail. Ten gated sections covering attention, hero, curiosity, text, and feed proof; one failed gate blocks ship.
license: MIT
metadata:
  version: "2.0"
---

# Thumbnail Judge

Gate every thumbnail. One failed gate = no ship.

**Spec:** YouTube custom thumbnail — 1280 × 720 minimum (1920 × 1080 preferred), 16:9, sRGB, JPG or PNG, ≤ 2 MB. Goal: stop the scroll and convert to click, while opening a curiosity gap the title and video must close. Two or three visual elements maximum. High-contrast system only.

Every gate applies at full size, at feed size ≈ 160–240 px wide, and under the 1-second / 120 px squint test.

## 1. Format & technical readiness
- [ ] Exactly 16:9 and ≥ 1280 × 720; no letterbox, no mixed ratio.
- [ ] ≤ 2 MB after export; no compression artifacts on faces or text at 2×.
- [ ] Nothing critical in the bottom-right duration stamp or bottom-left chapter zone.
- [ ] sRGB; no CMYK or print profile.
- [ ] Sharp at native size; no upscaling artifacts.
- [ ] Stable filename: `brand-topic-YYYYMMDD-thumb.png`. Never `final-v3.jpg`.
- [ ] One raster image, not a PDF or sequence.
- [ ] Reads on light and dark YouTube chrome.

## 2. Attention — AHQ "A"
- [ ] One proven attention device dominates: expressive face, contrast block, valued object, number, or unique photo.
- [ ] Face expression is strong and non-neutral — readable at 120 px; neutral fails.
- [ ] Face fills 30–60% of frame; eyes sit in the upper third.
- [ ] Subject separates from background by luminance, so it pops off white, dark-gray, or red chrome.
- [ ] Complementary or high-saturation pairs: yellow/black, orange/blue, yellow/purple, red/cyan. Low-contrast mono fails.
- [ ] Color never the only hierarchy signal; text or shape also separates the hero.
- [ ] 1-second test: a stranger names subject and emotion after one second.
- [ ] No stock cliché as sole hook: handshake, lightbulb, growth arrow — unless heavily reworked.
- [ ] Design stands out against the niche feed; audit top competitors in the same browse context.

## 3. Hero — AHQ "H"
- [ ] Exactly one primary hero, identifiable in < 1 second.
- [ ] Hero is the most remarkable element of the actual video.
- [ ] Hero dominates; secondary elements support, never match its weight.
- [ ] Metaphor matches the title predicate: "broken" shows fracture, not absence; "hidden" shows redaction, not display.
- [ ] Lighting separates: key plus rim, or spotlight. Flat even light fails.
- [ ] Background simplified or darkened; no clutter behind the hero.
- [ ] With no face, the object is large, high-contrast, and iconic.

## 4. Curiosity gap — AHQ "Q"
- [ ] Thumbnail plus title opens a clear gap — Question, Wow, Cliffhanger, or Knowledge — that demands the click.
- [ ] Thumbnail text shares zero words with the video title.
- [ ] Text ≤ 5 words; 3–4 is the elite band.
- [ ] Text is heavy display sans: Impact, Bebas, Anton, Montserrat ExtraBold. Thin and script fail.
- [ ] Text survives any background: outline, stroke, or solid chip.
- [ ] Visual alone sparks a specific question; text amplifies, never explains.
- [ ] Promise is honest; no bait the video cannot deliver.
- [ ] Cold-viewer test: an unfamiliar person asks a concrete question after seeing it.

## 5. Composition & 3-element limit
- [ ] Focal points ≤ 3: hero plus context or object plus text, or fewer. A fourth gets cut.
- [ ] Exactly one key idea; delete the secondary.
- [ ] Hierarchy is clear: hero → context or text → background.
- [ ] Hero on rule-of-thirds, or centered to serve emotion; no floating unanchored element.
- [ ] Negative space deliberate; frame not filled with competing detail.
- [ ] Gaze directs to text or object when useful; direct camera contact is valid.
- [ ] No two subjects of equal size or weight.
- [ ] 120 px squint test: subject, emotion, and text stay legible and ordered.

## 6. Typography & text
- [ ] ≤ 5 words; 3–4 is best.
- [ ] Condensed or display bold sans; thin, script, light fail.
- [ ] Tight letter-spacing on display; never loose on body-scale text.
- [ ] Text contrast ≥ 4.5:1 against its immediate background, verified on the final render.
- [ ] Outline, stroke, shadow, or chip prevents text from sinking into the image.
- [ ] Text is never the whole design; pure-text fails unless niche data proves otherwise.
- [ ] ≤ 2 type sizes; hierarchy is clear.

## 7. Color, contrast & brand
- [ ] Palette pairs read on both light and dark YouTube backgrounds.
- [ ] One recurring brand accent across the channel's thumbnails.
- [ ] No low-saturation pastel or muddy mid-tone as dominant.
- [ ] Gradients, glows, and soft blurs survive compression and mobile size, or they go.
- [ ] Subject separates even when desaturated.
- [ ] Color never sole carrier of meaning; labels, shapes, or text reinforce.
- [ ] Design does not blend into YouTube red, white, or gray.

## 8. Mobile & feed proof
- [ ] 120 px squint test: emotion, hero, text readable.
- [ ] Feed test at 160–240 px: still stops the scroll.
- [ ] Critical elements clear the duration stamp and UI overlays.
- [ ] No tiny detail or fine line that vanishes at mobile size.
- [ ] Works on phone and desktop density.
- [ ] Optimized file; mobile download does not degrade type or faces.
- [ ] Cold review on a real phone in the YouTube app confirms legibility and hierarchy.

## 9. Integrity, consistency & anti-patterns
- [ ] No lorem, placeholder, "test" text, or design-tool artifacts.
- [ ] Visual promise matches the video; no bait-and-switch.
- [ ] Brand fonts, colors, and logo lockup match the kit exactly.
- [ ] Not logo-only or pure brand mark; it must sell this video.
- [ ] No "Part N of series" label; it kills discovery for new viewers.
- [ ] No text wall, no 6+ word block, no competing headlines.
- [ ] Reusable as a template: structure survives a copy and hero swap.
- [ ] A/B variants change one variable at a time.

## 10. Score
- [ ] Zero failures across sections 1–9. One unchecked item = no ship. Fix, re-export, rerun mobile, squint, and cold-viewer tests.

## Run

1. Design at 1280 × 720 or larger.
2. Export; view at 120 px wide and inside a phone YouTube feed mockup.
3. Confirm 1-second hero read, ≤ 3 elements, expressive face if used, ≤ 5 words with zero title overlap, high contrast, curiosity gap.
4. A cold second person names the hero and the question it raises.
5. Pass only when every gate holds at full size, feed size, and cold review.
