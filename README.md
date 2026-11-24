# PAXml-mallen

Browser-only tool: paste a staff spreadsheet, fix what is flagged, save a PAXml 2.2 file for Fortnox Lön.
Everything runs in the browser. The CSP in `_headers` blocks all outgoing requests (`connect-src 'none'`).

## Files
- `index.html`: the whole tool (one file, no build step).
- `_headers`: security headers for Cloudflare Pages / Netlify.
- `tests/smoke.js`: loads the sample data in a headless browser and writes `tests/out/sample.xml`.
- `tests/validate.sh`: validates generated XML against `tests/paxml.xsd` (needs `xmllint`).

## Run the tests
    npm i playwright && npx playwright install chromium
    node tests/smoke.js && tests/validate.sh

## Rules
- Never commit real employee data. `.gitignore` blocks `*.tsv`, `*.csv`, `*.xml` and `hibob/`.
- Use made-up data in tests and screenshots.
- Schema validity is not the same as Fortnox accepting the file: re-test in a Fortnox trial company after every change.

## Open points
- Clearing number is written as digits only (83816); check against the Fortnox import.
- Fortnox acceptance of files from an unlisted program name is untested.
- Branding: the colours and font are Voi's (internal test). Replace before any public release.
