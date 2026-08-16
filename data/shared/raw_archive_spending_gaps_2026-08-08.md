# England Raw Data archive: content-level spending coverage audit (8 Aug 2026)

Definitive replacement for the folder-level coverage claim. Every council that
claimed spending data in `_provenance/archive_index.sqlite` had up to 3
payments-candidate files byte-sampled from Drive; every confirmed gap was
source-scouted live and `council_sources.json` patched with verified URLs.

## Headline numbers (317 registry councils)

| Bucket | Count | Meaning |
|---|---|---|
| Verified real payments data | 118 | At least one sampled file is genuine CSV/XLSX/ODS/JSON payments content (includes Ealing and Croydon, verified after transient Drive errors) |
| Verified but thin (1 to 3 payments files) | 28 | Real data, shallow coverage; backfill candidates |
| Junk confirmed | 18 | Every sampled "spending" file is saved HTML (Wayback frames or portal pages), not data |
| ETL-covered | 27 | Corpus lives in the AI DOGE ETL cache (deploy.yml or config spending flags); archive folder state is secondary |
| Structural gap, never harvested | 106 | No spending category in any per-council layer (76 of these have no per-council presence at all) |
| Scouted this session, ready to harvest | 42 | Confirmed gap or junk with a live, HEAD-verified source now in the registry |

## The systemic finding: HTML junk saved as data files

The harvesters saved Wayback replay frames or CMS/portal HTML pages under
CSV/XLS filenames. Folder-level coverage counted these as data. Junk-confirmed
councils (non-ETL): babergh, barnet, colchester, east_lindsey, fareham,
gloucester, harrow, hounslow, islington, kensington_and_chelsea,
kingston_upon_thames, lambeth, newark_and_sherwood, rotherham, somerset,
st_albans. Also junk but ETL-covered (corpus safe, archive copy worthless):
solihull, south_ribble. Partial junk mixed with real data: northumberland,
wiltshire. Delete the junk files from Drive when re-harvesting.

Birmingham is a special case: its spending folder held only fraud-transparency
PDFs. The real data is a rolling OpenDataSoft dataset (227,654 rows, Jul 2024
to May 2026) on cityobservatory.birmingham.gov.uk; pre-2024 history needs FOI
or Wayback.

## Wave 1: re-harvest scouted councils (registry now has verified URLs)

All URLs, structure traps and formats are in each council's
`council_sources.json` entry (notes tagged "source-scout 2026-08-08").
Common traps the old harvest fell into, worth coding for generically:

1. Per-year hub pages (rotherham 18 hubs to 2010, stafford 13, wirral 5,
   southend_on_sea, charnwood, harrow, cumberland). Walk every hub.
2. Trailing suffix or redirect required (bristol needs /file suffix, elmbridge
   follows a doubled-path 301, stafford month links 302 to the real file).
3. Landing page one hop short of the file (harborough Jadu two-hop, chelmsford
   child page, stratford intermediate stub page).
4. Portal, not council site (cambridgeshire_cc on data.cambridgeshireinsight.org.uk,
   hounslow on data.hounslow.gov.uk with hashed blob URLs, camden Socrata,
   birmingham OpenDataSoft, nottingham_city Data Hub media CDN).
5. Extensionless or misleading names (bromley, hillingdon, watford, dorset,
   castle_point are real data already in the archive; no re-harvest needed,
   the index just could not see it from filenames).
6. East Riding: parse the assetManagerInlineData JS data island in the page
   HTML; there is no separate feed endpoint.
7. Knowsley and elmbridge and south_staffordshire: Drupal upload-date folders
   do not match the reporting period; never key periods off the path.

Harvest queue (vps-main, harvest_council.py or bespoke walker per trap notes):
birmingham (API pull), brentwood, bristol, cambridgeshire_cc, camden (API
bulk CSV), charnwood, chelmsford, colchester (Azure blob links; SharePoint
links need a browser), cumberland (document-search views, includes legacy
Allerdale/Carlisle/Copeland/Cumbria), east_riding_of_yorkshire, elmbridge,
fareham, gosport, harborough, harrow, high_peak, hounslow, knowsley,
newark_and_sherwood, north_hertfordshire, north_kesteven, nottingham_city,
rotherham, runnymede, southend_on_sea, stafford, stratford_on_avon,
westminster, wirral.

Plus the second scout wave (junk councils found by the content sweep, all
scouted and registry-patched): babergh, barnet (open.barnet.gov.uk CKAN API,
one dataset per FY back to 2013/14), gloucester, islington,
kensington_and_chelsea, kingston_upon_thames, lambeth, st_albans (old
registry URL 404s; £250 threshold).

## Wave 1 exceptions (not harvestable headless)

- enfield: site-wide Cloudflare managed challenge, every path 403s. Mac
  browser route only (same class as Kent). Monthly XLSX known to exist.
- worcester: Sucuri Cloudproxy JS challenge site-wide. Browser or Wayback.
- east_lindsey: site-wide Cloudflare challenge including direct CSV media
  URLs. Browser or Wayback.
- somerset: every spend file (current and all predecessor-council archives)
  is a somersetcc.sharepoint.com link behind a Microsoft 365 tenant login,
  not a bot challenge. Needs a signed-in browser session or Wayback.
- south_staffordshire: genuinely PDF-only (supplier payments and no GPC CSV).
  Record as pdf_only; FOI for machine-readable is the only upgrade path.

## Wave 2: thin-coverage backfill (real data, shallow)

birmingham (pre-2024 history), broadland, cheshire_west_and_chester,
cumberland, derbyshire_dales, east_cambridgeshire, forest_of_dean, hackney
(card spend sheets; check core payments dataset), huntingdonshire,
north_norfolk, north_west_leicestershire, richmond_upon_thames,
south_cambridgeshire, swindon, tendring, trafford, waverley,
west_oxfordshire, wychavon, wyre_forest. (ETL-covered thin councils excluded:
burnley, calderdale, havant, ribble_valley, suffolk_cc, wigan, southend now
wave 1, wirral now wave 1.)

## Wave 3: structural gaps (never harvested per-council)

106 councils have no spending category in any per-council layer; 93 of them
also lack a registry spending page, so each needs scout-then-harvest. Full
list in `_provenance/spending_coverage_audit_2026-08-08.json` (bucket
structural_gap_no_harvest). Prioritise by AI DOGE tier plans (Tier C/D P1/P2
first), not alphabetically.

## Verification method (for repeatability)

1. Pull `_provenance/archive_index.sqlite`, take every file under category
   "1 Spending over 500" in the per-council layers.
2. Payments-candidate filter: tabular ext (or ext embedded in the name, or
   none) plus keyword, month name or date pattern.
3. Sample first, middle and last candidate per council; `rclone cat` 400
   bytes; classify by magic bytes (PK, OLE2, %PDF) and content (comma
   density vs HTML markers).
4. Wayback-layer Drive paths carry a " (Wayback archive)" suffix on the
   category folder. Transient Drive errors return empty stdout; check the
   rclone exit code or every quota blip becomes a false "empty file".
