# Kit budget (measured Task 1.3)
| Piece | Elements | Bytes |
|---|---|---|
| Tree | 40 | 11046 |
| Nest | 18 | 2561 |
| House (lit) | 124 | 15568 |
| House (open) | 109 | 14681 |
| Hills + trees | 14 | 2438 |
| Grass | 4 | 4185 |
| Flowers | 8 | 4726 |
| Stones | 6 | 1097 |
| Fence | 19 | 2148 |
| Wallpaper + floor | 29 | 1899 |
| Window | 30 | 2070 |
| Frames | 46 | 3024 |
| Rug | 7 | 572 |
| Table | 16 | 1066 |
| Chair | 17 | 1123 |
| Sofa | 24 | 1749 |
| Armchair | 17 | 1303 |
| Bed | 23 | 1595 |
| Counter | 23 | 1561 |
| Lamp (lit) | 20 | 1219 |
| Plant | 13 | 1313 |
| Cushions | 17 | 1188 |
| Kitchen | 41 | 2663 |
| Plate + pills + books | 51 | 3482 |
| Figures | 344 | 30860 |
| **All pieces once** | **1060** | **115137** |

## World caps (set Task 3.1)
Caps: 500 drawn elements and 125 KB markup per single-scene world; Services (three rooms) 900 elements; no blur filters; at most 60 gradients.
| World | Elements | KB | Gradients | Filters | Status |
|---|---|---|---|---|---|
| Home | 384 | 112.0 | 19 | 0 | pass |
| About | 374 | 105.3 | 19 | 0 | pass |
| Services | 882 | 105.8 | 54 | 0 | pass, 98% of element cap |
| FAQ | 408 | 49.0 | 24 | 0 | pass |
| Testimonials | 493 | 59.8 | 27 | 0 | pass, 99% of element cap |
| Contact | 469 | 117.3 | 20 | 0 | pass (re-measured after Task 3.3) |
Rule: a world near its cap gets no new pieces without removing something. Re-run `tools/count-worlds.jsx` after any world edit.

## Load and speed (measured Task 3.2)
Full CRA build compiles. Page JS 126.5 -> 138.4 kB gzip (+11.9 kB); total transfer per page about 476 -> 524 KB (+48 KB), inside the agreed +100 to 200 KB.
Scroll test (6 s top to bottom, headless Chromium, software rendering, no GPU; compare old vs new only, not absolute):
| Route | Old fps desktop | New fps desktop | Old fps phone | New fps phone |
|---|---|---|---|---|
| Home | 6.0 | 3.3 | 17.0 | 6.8 |
| About | 9.3 | 3.7 | 23.5 | 9.3 |
| Services | 11.5 | 3.3 | 29.7 | 9.0 |
| Testimonials | 10.7 | 2.5 | 32.0 | 6.8 |
| FAQ | 11.5 | 3.3 | 33.0 | 9.2 |
| Contact | 8.2 | 3.2 | 20.2 | 7.8 |
DOM nodes: 334-496 old, 777-1585 new. Pausing all CSS animations recovers about a third of the gap (About 3.7 -> 5.5, Services 3.2 -> 4.7); the rest is repainting the larger scaled SVG.

## After speed fixes (Task 3.2b)
Same test, new version only (fps desktop / phone): About 3.7 -> 4.0 / 9.3 -> 12.2; Services 3.3 -> 3.3 / 9.0 -> 10.8; Contact 3.2 -> 3.7 / 7.8 -> 11.8. Phone gains 20-50%; desktop barely moves. Tried and rejected: one compositor layer per world layer (slower in software rendering). Old flat version for reference: desktop 8-11, phone 20-33.

## Contrast audit (Task 3.3)
Method: for each route, desktop and phone, 9 scroll points; text hidden, pixels behind each visible text box sampled (10th-percentile contrast vs text colour). Targets: 4.5 normal text, 3 large. Script: `tools/contrast-audit.py`; raw results `contrast-audit-results.json`.
Result: new 86 flagged of 1790 checked; old flat version 88 of 1874. Nothing is flagged in the new version that is not also flagged in the old one, so the new art did not lower readability. Many flags are method noise (dark footer, mobile menu, filled buttons). Spots that look real but are unchanged from the old version: text crossing the soft fade at the edge of the cream panels (About, Testimonials, Contact, about 2.1:1 in the fade only), a few small labels. Panels are otherwise near-opaque and dark text reads clearly (checked by eye).
