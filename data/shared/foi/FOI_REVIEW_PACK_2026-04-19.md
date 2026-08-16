# FOI Review Pack — GL Account Code Dictionary (3 councils)
**Drafted:** 2026-04-19 — Council Intel Session 1
**Status:** 3 letters drafted, NOT sent. This pack collates the decisions Tom needs to make before sending.
**Tracked in SR:** task `t-19apr-gl-foi` (pending).

---

## What the drafts ask for (in plain English)

Every council publishes monthly "Payments over £500" transparency files with an `Account` column full of internal Oracle Fusion / finance-system GL codes (e.g. Warks `R5806` = 204K rows, £957M alone). Without a human mapping, AI DOGE can't tell accrual journals apart from real procurement spend. The letters ask each council for:

1. A machine-readable dictionary: `code → description → category` (procurement / grant / accrual / pension / internal-transfer / other).
2. Nearest equivalent if no dictionary exists.
3. The period-valid mapping history if their chart of accounts has changed since 2011.

Staffordshire gets one extra question: what does the `SCC SUNDRY BACS` supplier label mean.

Full drafts:
- `burnley-council/data/warwickshire_cc/foi_drafts/gl_code_dictionary_2026-04-19.md`
- `burnley-council/data/worcestershire_cc/foi_drafts/gl_code_dictionary_2026-04-19.md`
- `burnley-council/data/staffordshire_cc/foi_drafts/gl_code_dictionary_2026-04-19.md`

---

## Decisions you need to make before send

### A. Sender identity

All three drafts currently end with placeholders `[Name]` and `[Email]`. Pick one of:

1. **Personal** — your name + personal email. Quickest. Treated as a private-citizen FOI.
2. **Personal + Tompickup.one context line** — "Tom Pickup, researcher, AI DOGE project (aidoge.co.uk)". Gives the request context without framing it as a commercial press request.
3. **Journalistic** — "Tom Pickup, News Lancashire / AI DOGE". Slightly raises the political temperature; the councils may route to press office.
4. **Company** — if Council Intel Ltd / a trading entity exists. Probably premature.

Recommendation: **option 2**. Gives enough context to get a good-faith response without flagging you as a hostile press enquiry.

### B. Send channel

1. **Direct email** to each council's FOI inbox. Private until you choose to publish. Faster reply typically.
2. **WhatDoTheyKnow** (whatdotheyknow.com, mySociety, free). Public by default. Creates a permanent audit trail. Cannot be withdrawn. Good if you eventually want to publish the response anyway.
3. **Council online form** (each council has one). No advantage over email; loses control over what you sent.

Recommendation: **option 1 (direct email)**. Keeps optionality. You can republish the request + response on WDTK later if useful.

### C. Recipient email addresses — VERIFY before send

Drafts assume the standard `foi@<council>.gov.uk` pattern. Verify each from the council's own website (the pattern is correct for all three at time of drafting, but council FOI desks reorganise):

- Warwickshire: https://www.warwickshire.gov.uk/foi
- Worcestershire: https://www.worcestershire.gov.uk/doitonline/information-requests
- Staffordshire: https://www.staffordshire.gov.uk/Council/Freedom-of-information/Freedom-of-Information.aspx

If any has changed (e.g. moved to an online-form-only system), tell me and I'll regenerate the relevant draft's header + recipient block.

### D. Tone / content red pencil

Before signing off, skim each draft for:

- **Factual claims** (Warks: "1,149,212 records / £6.99B / 15 FYs"; "R5806 alone ~204K rows / £957M"). These are from the 19-Apr session 3 classification data and are correct at commit `55978883`. Safe to leave as-is.
- **URLs cited in the background** (Warks: `api.warwickshire.gov.uk/documents/WCCC-428063900-NNNN`). This is the real endpoint map — leave as-is.
- **Staffs extra question on "SCC SUNDRY BACS"** — technically correct per `.claude/rules/lessons.md` entry. The phrasing "clearing account rather than individual external suppliers" is accurate but mildly pointed. Adjust down if you want a gentler first ask.
- **Drafting notes section at the bottom of each letter** — these are explicitly flagged as non-letter commentary but will be visible if you paste the whole file. When sending, use only the content ABOVE the `---` / "Drafting notes" heading.

### E. Date sent

Decide today or batch for Monday 2026-04-20. Each letter's `[Date sent: TBD]` placeholder + the frontmatter `status:` line will be updated to reflect the real send date.

---

## Pre-send checklist

- [ ] Sender identity chosen (A)
- [ ] Send channel chosen (B)
- [ ] All three recipient emails verified on council websites (C)
- [ ] Each draft read end-to-end at least once (D)
- [ ] Drafting notes section stripped from the outgoing version
- [ ] Placeholders `[Name]`, `[Email]`, `[Date sent: TBD]` replaced
- [ ] Subject line: "FOI — General Ledger account code dictionary for payments-over-£500 transparency publications" (or your preferred short variant)
- [ ] Copy of the outgoing letter saved/forwarded to yourself for the audit trail
- [ ] SR task `t-19apr-gl-foi` notes appended with send dates + response-due dates (send date + 20 working days)

---

## What I'll do once you sign off

1. Replace the `[Name]`, `[Email]`, `[Date sent: TBD]` placeholders across all three drafts with the values you give me.
2. Strip the drafting-notes section from an `_outgoing/` copy of each letter, keeping the annotated version in the repo for future reference.
3. Update frontmatter `status:` from `DRAFT — awaiting verbatim sign-off before send` to `SENT <yyyy-mm-dd>`.
4. Write the expected response-due date into each file (send date + 20 working days).
5. Commit as `docs(foi): finalise gl-code dictionary drafts — signed off by Tom`.
6. Append SR task `t-19apr-gl-foi` notes with: send date, response-due date, recipient addresses confirmed.
7. Create three per-council follow-up tasks in SR: `t-foi-gl-warks`, `t-foi-gl-worcs`, `t-foi-gl-staffs` — each due on the response-due date.

I will NOT send the emails themselves from this session — you're sending them from your own inbox. The output is three signed-off letter bodies plus subject lines ready to paste.

---

## Minimum info I need from you to take the next step

Paste a short reply like:

```
A: 2 (personal + AI DOGE context)
B: 1 (direct email)
C: all 3 verified
D: no changes
E: send date = 2026-04-20
Name: Tom Pickup
Email: tom@<your-domain>
```

That's enough for me to finalise the send-ready versions.
