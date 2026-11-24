#!/usr/bin/env bash
# Validates generated files against the official PAXml 2.2 schema.
# The published XSD declares iso-8859-1 but may be UTF-8 on disk; we validate a UTF-8 copy.
set -e
cd "$(dirname "$0")"
sed 's/encoding="iso-8859-1"/encoding="UTF-8"/' paxml.xsd > out/paxml-utf8.xsd 2>/dev/null || { mkdir -p out; sed 's/encoding="iso-8859-1"/encoding="UTF-8"/' paxml.xsd > out/paxml-utf8.xsd; }
for f in out/*.xml; do xmllint --noout --schema out/paxml-utf8.xsd "$f"; done
