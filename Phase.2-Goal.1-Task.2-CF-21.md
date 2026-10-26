# CF-21: Phase 2.2 palettes and contrast
**Done:** ran `tools`-style check (scratch script, WCAG ratios) on each time-of-day tone set. Fixes: patient cardigan darkened to `#BC5509` (was `#F47A1F`, only 1.6-2.3:1 on light mids), dusk figures lightened (PSW `#7FC1F5`, patient `#FFA24D`), room key/mid separated, morning/afternoon/dusk mids adjusted. All figure-on-mid ratios now about 3:1 or better; text on mid 5.8:1 to 11:1; dark foreground is 15-25% brightness or darker and 2.4:1 to 10:1 against mid.
**Pending:** ratios are on the flat tone values, not rendered scenes; Phase 5 re-audits real pages. Cardigan is now a deeper burnt orange; say if you want it brighter and accept a lower ratio.
**Files:** worlds/light.jsx (TONES), worlds/figure.jsx (CAST), this file.
**Next:** Phase 3.1 Home world.
