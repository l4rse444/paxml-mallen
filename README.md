# PAXml-mallen

Browser-only tool: drop or paste a staff list (Excel .xlsx, CSV/TSV or pasted from Excel), fix what is flagged, save a PAXml 2.2 `.xml` file for Fortnox Lön.
Everything runs in the browser. A CSP (meta tag in `index.html`, and `_headers` on Cloudflare/Netlify) blocks all outgoing requests (`connect-src 'none'`).

## What it checks
Personnummer (format, date, check digit, duplicates, samordningsnummer), optional date-of-birth column vs personnummer, unusual age at start date, dates (ISO, dd/mm/yyyy, Excel serials), employment type and pay type, tax table/column, bank details, salary sanity, leavers before the import date. Errors block saving; warnings must be acknowledged. Column headers are matched by name (Swedish, English and HiBob export names).

## Files
- `index.html`: the whole tool (one file, no build step).
- `_headers`: security headers for Cloudflare Pages / Netlify.
- `tests/smoke.js`: loads the sample data in a headless browser and writes `tests/out/sample.xml`.
- `tests/validate.sh`: validates generated XML against `tests/paxml.xsd` (needs `xmllint`).

## Run the tests
    npm i playwright && npx playwright install chromium
    node tests/smoke.js && tests/validate.sh

## Rules
- Never commit real employee data. `.gitignore` blocks `*.tsv`, `*.csv`, `*.xlsx`, `*.xls`, `*.xml` and `hibob/`.
- Use made-up data in tests and screenshots.
- Schema validity is not the same as Fortnox accepting the file: re-test in a Fortnox trial company after every change.

## Open points
- Clearing number is written as digits only (83816); check against the Fortnox import.
- Fortnox acceptance of files from an unlisted program name is untested.
- Branding: neutral design with Voi's dark red as the only accent (internal test). Replace before any public release.
- Excel: only .xlsx/.xlsm (first visible sheet). Old .xls, .ods and Numbers files must be saved as .xlsx or CSV.
