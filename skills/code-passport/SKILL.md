---
name: code-passport
description: Audit a codebase for market-specific cultural, UX, and product considerations. Currently supports Brazil.
disable-model-invocation: false
user-invocable: true
---

# /code-passport - Market-Specific Product Audit

Scan a codebase for cultural, UX, and product issues that break or underperform in specific markets. Goes beyond localization into payments, trust, identity, communication patterns, forms, compliance, and social dynamics.

## Quick Start

```
/code-passport           # Audit against ALL supported markets
/code-passport brazil    # Audit against a single market
```

Then provide:
1. **The codebase to audit** (defaults to current working directory)
2. **Any specific areas of concern** (optional: "just check payments" or "focus on trust signals")

I'll scan the codebase and produce a scored report with specific findings, file locations, and fix recommendations.

**Output:** `outputs/code-passport/audit-[date].md` (all markets) or `outputs/code-passport/audit-<market>-[date].md` (single market)

**Supported markets:** Brazil

---

## How It Works

The audit reads your actual codebase: templates, components, payment integrations, form validators, i18n files, copy, CSS, and configuration. Every check maps to a specific, tangible thing that is either present or absent, correct or incorrect. No vibes. No subjective scoring. Concrete findings with file paths and line numbers.

---

## Audit Process

### Step 1: Determine Scope

**If no market is specified:** Run against all supported markets. Load every `.md` file from `markets/` and run each market's checklist. Produce a combined report with per-market sections and an overall score.

**If a market is specified:** Run against that single market. If the requested market doesn't have a checklist file, inform the user and list the available markets by checking which `.md` files exist in `markets/`.

### Step 2: Codebase Discovery

When invoked, immediately scan the project to understand the stack:

**Identify:**
- Framework (Next.js, React, Vue, Django, Rails, etc.)
- Where templates/components live
- Where payment logic lives
- Where form components and validation logic live
- Where i18n/copy files live
- Where auth/login configuration lives
- Where layout/footer/header components live
- Where CSS/styling lives
- Where API integrations are configured

**Search patterns:**
- `**/*.{tsx,jsx,vue,html,ejs,hbs,pug,erb,blade.php}` for templates
- `**/*payment*`, `**/*checkout*`, `**/*billing*` for payment logic
- `**/*form*`, `**/*input*`, `**/*validation*` for forms
- `**/*i18n*`, `**/*locale*`, `**/*lang*`, `**/*translation*` for copy
- `**/*auth*`, `**/*login*`, `**/*oauth*` for authentication
- `**/*footer*`, `**/*header*`, `**/*layout*` for layout
- `**/*.css`, `**/*.scss`, `**/*.tailwind*` for styling

### Step 3: Load Market Checklist(s)

Read the market checklist file(s) from the `markets/` directory located alongside this SKILL.md file. **Load only the market files relevant to the current audit scope.** If auditing a single market, read only that file. If auditing all markets, read each file as you reach that market's section — do not load everything upfront.

**Location:** `markets/` is a sibling directory to this file. For example, `markets/brazil.md` contains the Brazil market checklist. Each file follows a consistent structure with categories, audit checklists, and contextual knowledge.

### Step 4: Run Market Audit(s)

Execute each check category from the loaded market checklist(s). For every finding, record:
- **What was checked**
- **Result** (PASS, FAIL, WARNING, or NOT APPLICABLE)
- **File path and line number** (when a specific file is relevant)
- **What to fix** (specific recommendation)

Use the "Audit checklist" items in each category as the checks to verify. Use the surrounding narrative knowledge to understand context and make judgment calls.

---

## Step 5: Generate Report

### Single market report

```markdown
# Code Passport: <Market> Audit
**Project:** [project name]
**Date:** [date]
**Scanned:** [number] files across [number] directories

---

## Score: [X]/100

**CRITICAL issues:** [count]
**Warnings:** [count]
**Passing:** [count]
**Not applicable:** [count] (excluded from scoring)

---

## Critical Issues (Must Fix)

### 1. [Issue title]
**Category:** [category]
**File:** [file path]:[line number]
**Finding:** [what's wrong]
**Fix:** [specific recommendation]

---

## Warnings (Should Fix)

### 1. [Issue title]
**Category:** [category]
**File:** [file path]:[line number]
**Finding:** [what's wrong]
**Fix:** [specific recommendation]

---

## Passing Checks

- [check name] - [file where it was found]

---

## Not Applicable

- [check name] - [reason]

---

## Manual Review Checklist

These items require human judgment and can't be fully verified from code alone:

- [ ] [market-specific manual check items]

---

## Additional Observations

[Specific findings that don't fit into checklist categories but a PM who knows this market would flag. Reference file and line.]
```

### All-markets report

When auditing against all markets, produce one combined report:

```markdown
# Code Passport: Full Audit
**Project:** [project name]
**Date:** [date]
**Scanned:** [number] files across [number] directories
**Markets audited:** [list of markets]

---

## Overall Score: [X]/100

| Market | Score | Critical | Warnings | Passing |
|--------|-------|----------|----------|---------|
| Brazil | 52/100 | 3 | 11 | 38 |
| [next] | ... | ... | ... | ... |

---

## [Market 1]

[Full single-market report content for this market]

---

## [Market 2]

[Full single-market report content for this market]

---

## Cross-Market Issues

[Issues that appear across multiple markets — e.g., no cookie consent affects both Brazil (LGPD) and EU markets. Deduplicate and note which markets each issue impacts.]
```

**Scoring:**
- Start at 100
- Each CRITICAL failure: -15 points
- Each WARNING failure: -5 points
- Minimum score: 0
- **Not Applicable checks are excluded entirely.** They don't count as passing or failing.
- Overall score is the average of all per-market scores
- Scoring gives a rough sense of readiness, not a precise grade

---

## Step 6: Output and Next Steps

1. **Save report** to `outputs/code-passport/audit-[date].md` or `outputs/code-passport/audit-<market>-[date].md`

2. **Display summary:**
```
Market audit complete.

Score: 34/100 (Not ready)

5 critical issues, 8 warnings, 12 passing

Top 3 fixes:
1. [most impactful critical fix]
2. [second most impactful]
3. [third most impactful]

Full report: outputs/code-passport/audit-[date].md
```

3. **Offer next steps:**
- "Want me to fix [specific issue]? I can see the exact files."
- "Want me to scaffold [specific utility]?"
- "Want me to create tickets for the critical issues?"

---

## Contextual Intelligence

The audit adapts based on what kind of product it detects. Weight checks appropriately:

**E-commerce / marketplace:**
- Payment checks weighted heavily
- Trust signals critical
- Safe meetup and safety checks apply (if C2C)

**SaaS / subscription:**
- Pricing model and installment checks prioritized
- Payment gateway compatibility important

**Content / media:**
- Copy, tone, and localization primary focus
- Social sharing and communication channels
- Performance and connectivity

**Fintech / financial services:**
- Identity validation critical
- Compliance weighted heavily
- Trust signals essential

---

## Related Skills

**Before this:**
- `/prd-draft` - Define requirements for a new market launch
- `/competitor-analysis` - Understand local competitors
- `/journey-map` - Map the user journey for the target market

**After this:**
- `/create-tickets` - Turn critical findings into engineering tickets
- `/code-first-draft` - Implement fixes for identified issues
- `/launch-checklist` - Plan the market launch with audit findings addressed

---

## Output Quality Self-Check

Before delivering the audit, verify:

- [ ] Every finding references a specific file path and line number
- [ ] CRITICAL vs WARNING severity is applied correctly per the market checklist
- [ ] Recommendations are specific and actionable (file names, function names)
- [ ] Product type was correctly detected and irrelevant checks marked as NOT APPLICABLE
- [ ] Score reflects actual readiness
- [ ] Manual review checklist only includes items that genuinely require human judgment
- [ ] No generic advice that applies to every market (everything is market-specific)
- [ ] Cross-market issues are deduplicated in all-markets mode
