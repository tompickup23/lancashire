# Suffolk County Council — FOI Request Draft

**Subject:** Request under the Freedom of Information Act 2000 — historical
payments-over-£250 transparency data

**To:** foi@suffolk.gov.uk
**From:** [Tom Pickup, requester address]

---

Dear Information Governance Team,

I am writing to request information under the Freedom of Information Act 2000.

Suffolk County Council currently publishes monthly payments-over-£250
transparency data on its open-data page at:

> https://www.suffolk.gov.uk/council-and-democracy/open-data-suffolk/council-data-and-transparency/council-expenditure-and-contracts/expenditure-exceeding-250

The live page only links to data from January 2025 onwards. Files for
earlier financial years (2018/19 through 2024/25) appear to have been
removed from the public-facing index but are required by the Local
Government Transparency Code 2015 to be made available.

**Information requested:**

Please provide the monthly payments-over-£250 CSV files (in the same
format as the current published files: `Organisation Name`, `Organisation
Code`, `Directorate`, `Service Area`, `Sub-Service Area`, `Sub-description`,
`Payment Date`, `Sub Amount`, `Inv Amount`, `Supplier Name`) for the
following financial years:

- 2018/19 (April 2018 – March 2019)
- 2019/20 (April 2019 – March 2020)
- 2020/21 (April 2020 – March 2021)
- 2021/22 (April 2021 – March 2022)
- 2022/23 (April 2022 – March 2023)
- 2023/24 (April 2023 – March 2024)
- 2024/25 (April 2024 – December 2024)

Files may be returned individually per month, or as annual aggregates,
whichever is most convenient. Please provide the data in CSV or XLSX
format (not PDF).

I would also welcome the same files for the **Suffolk Pension Fund**
expenditure feed (currently published separately at the same URL) for
the same period, if held.

**Cost limit and exemptions:**

I believe this request falls within the appropriate cost limit for FOIA
s.12 (Local Authority — £450 / 18 hours), since the data is held in
electronic form and was previously published. If you consider the
request would exceed the limit, please contact me to discuss a narrower
scope rather than refusing in full.

I am content to receive the data via email, secure download link, or by
publishing it back to the live transparency page (the latter being the
most efficient outcome for all transparency users).

**Format request:** Electronic copy preferred (CSV or XLSX). If the
underlying ledger has been migrated and direct CSV export is no longer
straightforward, an extract from the archived Oracle / SAP / Civica
ledger as XLSX is acceptable.

I look forward to your acknowledgement within 20 working days as
required by FOIA s.10.

Yours faithfully,

Tom Pickup
County Councillor for Padiham & Burnley West, Lancashire County Council

---

## Tom — when ready to send

1. Email **foi@suffolk.gov.uk** with the body above
2. Copy `tom.pickup@lancashire.gov.uk` (your work address) so it's logged
   internally as a councillor-to-councillor information request
3. Save reply + reference number under
   `burnley-council/data/suffolk_cc/foi/`
4. If they refuse on s.12 grounds, narrow to one FY at a time
5. If they release: drop the files into `burnley-council/data/suffolk_csvs/`
   under the same `YYYY-MM.csv` naming convention, then re-run:
   `python3 burnley-council/scripts/council_etl.py --council suffolk_cc`
   `python3 scripts/classify_council.py --council suffolk_cc`
   `python3 burnley-council/scripts/doge_analysis.py --council suffolk_cc`
   `python3 burnley-council/scripts/savings_recommendations.py --council suffolk_cc`
6. Update `burnley-council/scripts/govuk_budgets.py` data_start_fy if
   coverage extends past 2018/19
