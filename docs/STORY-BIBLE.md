# A Day at Home — Story Bible (Phase 1)

Defaults: illustrated people, 8 scenes, public site only.

## 1.1 Script (one scroll step = one moment of care)

| # | Clock | Scene | What happens | Service it maps to | Motion loop (Phase 2) |
|---|-------|-------|--------------|--------------------|-----------------------|
| 1 | 8:00 | The Knock | PSW arrives; porch light still on; door opens warmly | Intro / "Why us" | Door swing, porch light fade |
| 2 | 8:30 | Good Morning | Curtains opened, bed made, gentle check-in | Personal Support | Curtain sway, dust in light |
| 3 | 9:15 | Personal Care | Dignified help getting ready (stylised, no body detail) | Personal Support | Towel/mirror shimmer |
| 4 | 10:30 | Breakfast Together | Meal prepared and shared | Companion Care | Steam from cup/pan |
| 5 | 11:30 | Medication Reminder | Pill organiser, glass of water, a smile | Elderly & Disability Support | Soft check-mark pulse |
| 6 | 14:00 | A Walk Together | Arm-in-arm stroll, mobility support | Post-Hospital & Recovery | Two-figure walk cycle, leaves drift |
| 7 | 16:30 | Tea & Conversation | Tea, photo album, family respite handoff | Respite Care for Families | Steam, page turn |
| 8 | 19:30 | The Lit Window | PSW leaves; window glows gold; house is safe | Peace of Mind / Contact CTA | Window-gold pulse (logo heartbeat) |

Copy rule: one headline (≤6 words) + one sentence (≤20 words) per scene. Plain language, warm, no jargon.
Draft headlines: 1 "Someone familiar at the door." 2 "Mornings start gently." 3 "Care that keeps dignity." 4 "A meal, and good company." 5 "Every dose, on time." 6 "Fresh air, steady arm." 7 "Time for tea, and for family." 8 "Home, safe for the night."

## 1.2 Art direction
- Style: flat layered SVG, soft rounded shapes, no outlines, subtle grain; matches logo (hearth blue house, orange sun, gold window).
- People: faceless/stylised silhouettes with warm skin-tone variety, simple shapes. No real clients or staff.
- Palette (existing tokens only): `--sn-hearth-blue`, `--sn-nest-navy`, `--sn-warm-orange`, `--sn-sunrise`, `--sn-window-gold`, `--sn-cream`, `--sn-sand`, `--sn-leaf-green`, `--sn-twig-brown`, `--sn-night`.
- Type: Fredoka for scene headlines, Nunito for body, Satisfy only for the handwritten notes (testimonials, scene 8 sign-off).
- Layers per scene (max 5): sky/wall, house/room, furniture/props, people, light overlay. Each layer carries `data-depth` (0.2–1.0) for parallax.
- Weight budget: ≤150 KB SVG per scene, ≤1.5 MB total story assets.

## 1.3 Lighting arc (scroll progress 0→1)

| Progress | Clock | Sky / ambient | Overlay | Window glow |
|---------|-------|---------------|---------|-------------|
| 0.00 | 8:00 | `--sn-sunrise` → `--sn-cream` | warm gold 20% | off |
| 0.25 | 10:30 | `--sn-sky-mist` → `--sn-cream` | neutral | off |
| 0.50 | 14:00 | `--sn-sky-mist` bright | cool-white 10% | off |
| 0.75 | 16:30 | `--sn-sand` → `--sn-sunrise` | amber 25% | faint |
| 1.00 | 19:30 | `--sn-nest-navy` → `--sn-night` | blue 35% | `--sn-window-gold` full + glow |

Implementation hint: one CSS custom property `--day` (0–1) set by scroll; all colours interpolate from it. Phase 3 wires it up.

## Reduced-motion / a11y contract
Reduce-motion users get all 8 scenes stacked as static cards in the 1.0-progress-neutral palette; headlines stay as real `<h2>` text; illustrations get `role="img"` + alt text.
