# CF-45: Scroll diagnostics + fixes (Phases A-D)
Found (test: Playwright scroll on 6 pages x desktop/phone, plus DOM/frame-time comparison against the original build):
- Scenes had ~3,500-4,000 SVG nodes (orig ~400): scroll frame time home 86ms vs 59ms baseline.
- Toronto skyline sat below the ground line for most of the home scroll (invisible).
- Hard seam from the lake-haze band.
Fixed:
- Street joints/dashes now single paths; far row uses simple houses (LOD); rows and skyline cut to the x-range the camera can reach. Nodes ~1,500; frame time back to baseline (home 60ms vs 59ms).
- Skyline raised (base local y=420), CN Tower scaled 1.2x0.85, lake haze stepped in 4 soft bands; tower absolute x kept the same per scene.
Verified: no console/page errors, no horizontal overflow, camera track smooth. Rebuilt docs/ (main.e233bffa.js); old hashed files removed.
Pending: delete old docs hashes from your repo (see DELETE-OLD-DOCS-FILES.txt). Real-device FPS check recommended; headless Chrome is software-rendered.
