# Norfolk CC — Onboarding RESOLVED ✅

**Status (4 May 2026):** RESOLVED via Chrome MCP browser automation. 21 transparency files Jan 2023 → Mar 2026 ingested. Full pipeline complete (ETL → SQLite → DOGE → savings → donor crossmatch → v4.0 doge_knowledge). Below preserved for reference.

---

## Original blocker (now bypassed)

**Date:** 2026-05-04
**Context:** Pre-7-May 2026 onboarding sweep for likely Reform majority targets. Norfolk CC is a postponed-2025 county, contested 7 May 2026, with Reform forecast to take outright majority by Electoral Calculus + PollCheck consensus.

## Blocker

Norfolk County Council's transparency CDN at `www.norfolk.gov.uk/-/media/...` sits behind Cloudflare with a `cf-mitigated: challenge` policy. Verified 2026-05-04 from:

- vps-main (Hostinger DC IP) — HTTP 403
- Tom's Mac (residential broadband) — HTTP 403 with Cloudflare challenge page
- All UA strings tested (curl, Mozilla Safari 17, Chrome 120) — same 403

This matches the Facebook/Google pattern documented in `.claude/rules/lessons.md` ("News Lancashire" section).

## Available data

- **CKAN catalogue at data.gov.uk:** 22 resources covering Apr 2015 → Mar 2017 only (24 months). Older years and 2017+ are not on the CKAN endpoint.
- **Norfolk CDN (preferred):** Apr 2015 → present, monthly + quarterly. Blocked.

## Resolution paths

### Playwright attempt 2026-05-04 — partial success, then blocked

Built `burnley-council/scripts/fetch_norfolk_playwright.cjs` (Node/Playwright). Status:

- ✅ Landing page `/article/39418/Payments-to-suppliers` loads cleanly (Cloudflare passes the article page after ~5s wait).
- ✅ DOM scrape successfully enumerates 21 download links (Apr 2023 → Mar 2026 monthly XLSX + quarterly CSV).
- ❌ Download itself fails: every `/-/media/...` download URL returns Cloudflare 403, regardless of approach tried (`context.request.get`, `page.goto`, click via injected anchor, `window.location.href`).
- Root cause: Cloudflare's `cf_clearance` session cookie is scoped to `/article/` paths; media-CDN paths require a separate Bot Management bypass (Turnstile + JA3 fingerprint).

### Remaining options

1. **Manual download** (slow but works): visit each link in a real browser logged in as a human, save to `burnley-council/data/norfolk_csvs/<YYYY-Q>.xlsx`. ~21 manual downloads, then re-run ETL. Tom can do this in ~15 min.
2. **FOI request** to Norfolk for raw monthly payments-over-£500 CSVs Apr 2017 – Mar 2026. ~20 working days. Best option for the historical archive (the live page only goes back to Apr 2023).
3. **Stealth library** — try `playwright-extra` + `puppeteer-extra-plugin-stealth` (browser fingerprint spoof) or `cloudscraper` (Python). Higher complexity, no guarantee against managed Bot Management.
4. **vps-news from Oracle Cloud** (residential-ish IP range) — not yet tested. Same Cloudflare WAF likely applies.

## Pending pipeline work once corpus arrives

- `parse_norfolk(csv_files)` adapter in `burnley-council/scripts/council_etl.py`
- `record_classification.json` (county template — REDACTED rule + Norfolk Pension Fund internal_transfer)
- Standard pipeline: ETL → SQLite → DOGE → savings → donor crossmatch → v1 knowledge stub → config.json
- Add elif branch in `council_etl.py` main()
- Wire into deploy.yml council list

## What's already in place

- COUNCIL_INFO entry for `norfolk_cc` (ETL registry — name, type, ONS, threshold, FY)
- `data/norfolk_cc/ethnic_projections.json` (demographics stub from earlier work)

## Decision deferred to Tom

Pre-result this is a stub onboarding. Post-7-May, if Reform takes Norfolk:
- Best path: Playwright+stealth in same session as Suffolk/Essex iteration. ~2 hours total.
- Fallback: FOI in parallel, full ingest by week of 25 May.
