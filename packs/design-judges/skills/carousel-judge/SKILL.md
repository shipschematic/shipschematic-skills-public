---
name: carousel-judge
description: Judge a multi-platform carousel — LinkedIn, Instagram, X. Use when designing, reviewing, or shipping a carousel. Ten gated sections covering hook, copy, design, flow, CTA, and accessibility; one failed gate blocks ship.
license: MIT
metadata:
  version: "2.0"
  source: https://github.com/shipschematic/shipschematic-skills-public
  package: "@shipschematic/design-judges"
---

# Carousel Judge

Gate every carousel. One failed gate = no ship.

## Install

Install with npm: `npx @shipschematic/design-judges --only carousel-judge`. Omit `--only` to install all five design judges. Requires Node.js 18 or newer.

**Spec:** LinkedIn document carousel at 1080 × 1350 or 1080 × 1080. Instagram feed at 1080 × 1350. X thread at 1600 × 1600. B2B, founder or agency seller. Goal: stop the scroll **and** convert to sale, demo, or qualified DM. Two-ink system on screen; no print object.

Print gates are N/A by declaration — CMYK, bleed, crop marks, ISBN, spine. Every type, composition, palette, integrity, accessibility, hook, swipe, and conversion gate applies at mobile render and feed size.

## 1. Slide architecture & format
- [ ] Slide count 5–8. Ship 9+ only with a written narrative reason. Never 11+ without justification.
- [ ] ≥ 2 slides; ≤ 20 — Instagram ceiling, never the default.
- [ ] Ratio matches platform: 1080 × 1350 for IG and LinkedIn; 1080 × 1080 or 1600 × 1600 for X.
- [ ] One ratio end-to-end; no mixed orientations.
- [ ] Slide 1 ratio equals every later slide — mixed ratios trigger auto-crop.
- [ ] Slide order final before export — LinkedIn and X cannot reorder.
- [ ] Filenames stable: `brand-topic-YYYYMMDD-slideNN.png`. Never `Untitled-1.png` or `final-final-v3.jpg`.
- [ ] Export ≥ 1080 px short edge at 72 DPI; no upscaling artifacts at 2×.
- [ ] ≤ 1 MB per slide on Instagram, ≤ 5 MB per image on X, ≤ 30 MB total.
- [ ] No near-duplicate slides; a text-only delta reuses one background, not a new asset.

## 2. Hook slide — first 3 seconds
- [ ] Hook ≤ 8 words; readable at arm's length without zoom.
- [ ] Hook interrupts: contrarian claim, specific number, named enemy, or avoided question. "5 tips" fails.
- [ ] Hook promises a specific outcome, not a topic. "Onboarding" fails; "Cut activation from 11 days to 3" passes.
- [ ] Last slide delivers the slide-1 promise. No straight line from hook to payoff = the hook lies.
- [ ] Hook carries a visual: number, chart fragment, face, or arrow. Never flat type alone.
- [ ] Hook hides the answer; curiosity gap survives until swipe.
- [ ] ≤ 1 emoji, only as semantic marker.
- [ ] Legible at feed thumbnail ≈ 240 px wide; title dominates, subtitle reads.
- [ ] No logo, headshot, or "Part 3" opener — all kill scroll-stop.
- [ ] 3-second read test: a stranger repeats the promise.

## 3. Slide content & copy
- [ ] One idea per slide. Two ideas = two slides.
- [ ] Body ≤ 30 words per slide.
- [ ] Headline 1.5–2× body size; body line height 1.4–1.6.
- [ ] No sentence repeats the prior slide; recap owns repetition.
- [ ] Numbers specific: "47%" beats "most"; "$12,400 saved" beats "thousands saved".
- [ ] Remove a slide; if the argument survives, cut it.
- [ ] No lorem ipsum, `[placeholder]`, TBD, or visible Figma frame titles.
- [ ] No hedges: "in today's fast-paced world", "at the end of the day", "leverage synergies".
- [ ] Reads aloud in ≤ 90 seconds — longer is a deck, not a carousel.

## 4. Visual & design system
- [ ] Two inks: cream, ink, one accent. No third decorative color.
- [ ] No gradient, glow, drop shadow, or blur.
- [ ] Accent ≤ 10% of any single slide — emphasis only, never a background wash.
- [ ] Body contrast ≥ 4.5:1 at final render; check the render, not the design file.
- [ ] One headline family, one body family — ≤ 2 families, same across all slides.
- [ ] Body ≥ 24 pt at export; headline ≥ 32 pt.
- [ ] Cap letter-spacing ≥ 0.1 em; never on lower-case body.
- [ ] Margins, gutters, content frame identical slide-to-slide; no floating element.
- [ ] No JPEG artifacts at 2×; no rasterized text screenshots used as body copy.
- [ ] One illustration or photo style across the carousel — no flat icon beside 3D beside stock.

## 5. Story flow & swipe-through
- [ ] Named structure stated in the brief: problem → stakes → 3–5 moves → recap → CTA, or myth-bust, or before–after.
- [ ] Slide N+1 pays off slide N; every transition earns the swipe.
- [ ] Slide counter "3/8" in the same corner from slide 2 onward.
- [ ] Swipe cue — arrow, peek, or "swipe →" — on slides 1 to N−1; final slide has none.
- [ ] Recap slide holds ≤ 5 lines and earns the save.
- [ ] No content-free transition slide.
- [ ] Drop-off audit names the likeliest abandon slide; that slide gets the strongest visual or copy.
- [ ] Design supports ≥ 50% completion to the last slide.

## 6. CTA & conversion
- [ ] Final slide carries exactly one CTA.
- [ ] CTA verb specific and singular: "Comment SHIP", "DM me ONBOARDING", "Book a 15-minute call". Not "engage" or "thoughts?".
- [ ] CTA matches funnel stage: save or comment at top, DM keyword mid, booking bottom.
- [ ] Keyword CTA is ≤ 1 word, all caps, memorable: "PIPELINE", not "pipeline2024q4".
- [ ] Link CTA appears in caption and bio — never only on the slide.
- [ ] CTA promises next-step value: "DM ONBOARDING and I'll send the 11-day checklist" beats "DM ONBOARDING".
- [ ] Author block: name, role, one-line position, one handle. No contact card, no QR code.
- [ ] Friction test: action completes in ≤ 2 taps.

## 7. Caption, alt text & accessibility
- [ ] Every slide has alt text describing the idea, not "image of text".
- [ ] Caption hook lands in the first 2 lines, before "See more".
- [ ] Caption repeats the core promise and ends with the slide CTA verb.
- [ ] Color never the only signal — label the focal bar, number the step.
- [ ] Body contrast ≥ 4.5:1 on the rendered PNG, not the design file.
- [ ] No image-of-text when the caption could carry it.
- [ ] Hashtags at the end, ≤ 5, all relevant — no stuffing.

## 8. Anti-patterns
- [ ] No text wall — > 60 words or > 6 lines fails.
- [ ] No 11+ slides without written reason; 15+ never ships.
- [ ] No "swipe for the answer" that answers on slide 2; the answer earns slide 4 or the carousel is too thin.
- [ ] No stock cliché hook: handshake, lightbulb, staircase, growth arrow, laughing laptop team.
- [ ] No glow, drop shadow, gradient, blur, or `mix-blend-mode`.
- [ ] No logo-only final slide.
- [ ] No "Part N of ongoing series" on slide 1.
- [ ] No mismatched brand assets; fonts, colors, logo match the kit.

## 9. Platform fit & consistency
- [ ] Each platform gets its native ratio; no letterboxed IG post on LinkedIn; no square X thread on IG.
- [ ] LinkedIn PDF keeps selectable text where possible — no rasterized text.
- [ ] X ships one tweet with multiple images, not a reply chain of single images.
- [ ] Same palette, families, logo lockup, and counter style across every brand carousel.
- [ ] Posting cadence protects the 24–48 hour re-serve window.
- [ ] Reusable as a template: strip the copy and the structure re-skins.

## 10. Score
- [ ] Zero failures across sections 1–9. One unchecked item = no ship. Fix, re-export, rerun.

## Run

1. Export PNGs or the platform-native file.
2. Open on a phone at 100% in the platform preview.
3. Read every slide at feed thumbnail size. If the hook fails there, rebuild the hook.
4. Confirm legibility, a swipe reason per transition, one specific CTA, written alt text, and 5–8 slides.
5. Draft-post; a cold second reviewer on **their** phone must state the promise after slide 1 and the CTA after the last.
6. Pass only when every gate holds at mobile render, feed size, and cold review.
