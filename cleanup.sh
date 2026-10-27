#!/bin/sh
# Run once from the repo root AFTER copying this zip over the repo, then commit and push.
git rm -r -q --ignore-unmatch docs APPLY.txt DELETE-OLD-DOCS-FILES.txt UPDATE-NOTES.txt START-HERE.txt readable-copies-of-hidden-files/github-workflows/demo-pages.yml.txt .github/workflows/demo-pages.yml
echo "Done. Now: git add -A && git commit -m 'Auto-build Pages from source' && git push"
