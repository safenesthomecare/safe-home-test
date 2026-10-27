# CF-48 — Auto-publish pipeline
Done: pages.yml workflow (build frontend with REACT_APP_DEMO=true, PUBLIC_URL=/<repo>, 404 copy, deploy to Pages); docs/ retired (notes -> notes/, kit page -> frontend/public/); README updated; cleanup.sh + DELETE-OBSOLETE.txt.
Pending: user sets Settings > Pages > Source = GitHub Actions and creates .github/workflows/pages.yml (web uploader skips dot-folders).
Decision: root CF logs left in place.
