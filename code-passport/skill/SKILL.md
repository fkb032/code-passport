---
name: code-passport
description: Audit a codebase for market-specific cultural, UX, and product considerations. Catches what Western-default design misses. Currently supports Brazil.
disable-model-invocation: false
user-invocable: true
---

# /code-passport - Market-Specific Product Audit

Scan a codebase for cultural, UX, and product issues that break or underperform in a specific market. Goes beyond localization into payments, trust, identity, communication patterns, forms, compliance, and social dynamics.

## Quick Start

```
/code-passport <market>
```

Then provide:
1. **The codebase to audit** (defaults to current working directory)
2. **Any specific areas of concern** (optional: "just check payments" or "focus on trust signals")

I'll scan the codebase and produce a scored report with specific findings, file locations, and fix recommendations.

**Output:** `outputs/code-passport/audit-<market>-[date].md`

**Supported markets:** Brazil

---

## How It Works

The audit reads your actual codebase: templates, components, payment integrations, form validators, i18n files, copy, CSS, and configuration. Every check maps to a specific, tangible thing that is either present or absent, correct or incorrect. No vibes. No subjective scoring. Concrete findings with file paths and line numbers.

---

## Audit Process

### Step 1: Codebase Discovery

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

### Step 2: Load Market Checklist

Read the market checklist file from `markets/<market>.md` in this repository. The checklist contains all audit categories, checks, severity levels, and scan patterns specific to that market.

**Repository location:** The `markets/` directory is at the root of the Code Passport repository. Each file follows a consistent structure with categories, check tables (Check | How to Verify | Severity), and scan patterns.

If the requested market doesn't have a checklist file, inform the user and list the available markets by checking which `.md` files exist in `markets/`.

### Step 3: Run Market Audit

Execute each check category from the loaded market checklist. For every finding, record:
- **What was checked**
- **Result** (PASS, FAIL, WARNING, or NOT APPLICABLE)
- **File path and line number** (when a specific file is relevant)
- **What to fix** (specific recommendation)

Use the "How to scan" sections in each category as guidance for what to grep and read.

---

## Step 4: Generate Report

After scanning all categories, produce the report in this format:

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

## Low-Bandwidth Score: [X]/100

_(Include only if the market checklist has a Low-Bandwidth category)_

---

## Critical Issues (Must Fix)

### 1. [Issue title]
**Category:** [category]
**File:** [file path]:[line number]
**Finding:** [what's wrong]
**Fix:** [specific recommendation]

### 2. [Issue title]
...

---

## Warnings (Should Fix)

### 1. [Issue title]
**Category:** [category]
**File:** [file path]:[line number]
**Finding:** [what's wrong]
**Fix:** [specific recommendation]

...

---

## Passing Checks

- [check name] - [file where it was found]
- [check name] - [file where it was found]
...

---

## Not Applicable

- [check name] - [reason: e.g., "no marketplace features detected"]
...

---

## Manual Review Checklist

These items require human judgment and can't be fully verified from code alone:

- [ ] [market-specific manual check items from the checklist]

---

## Additional Observations

_After completing the structured audit above, review the codebase one more time with fresh eyes. Look for anything market-specific that doesn't fit into the checklist categories but a PM who knows this market would flag. These are not scored. They are observations and suggestions._

[List observations here. These should be specific to what was actually found in this codebase, not generic advice. Reference the file and line where the observation applies.]
```

**Scoring:**
- Start at 100
- Each CRITICAL failure: -15 points
- Each WARNING failure: -5 points
- Minimum score: 0
- **Not Applicable checks are excluded entirely.** They don't count as passing or failing. The score is calculated only against checks that are relevant to this product.
- Scoring gives a rough sense of readiness, not a precise grade

---

## Step 5: Output and Next Steps

1. **Save report** to `outputs/code-passport/audit-<market>-[date].md`

2. **Display summary:**
```
<Market> market audit complete.

Score: 34/100 (Not ready)

5 critical issues, 8 warnings, 12 passing

Top 3 fixes:
1. [most impactful critical fix]
2. [second most impactful]
3. [third most impactful]

Full report: outputs/code-passport/audit-<market>-[date].md
```

3. **Offer next steps:**
- "Want me to fix [specific issue]? I can see the exact files."
- "Want me to scaffold [specific utility]?"
- "Want me to create tickets for the critical issues?"

---

## Contextual Intelligence

The audit adapts based on what kind of product it detects. Use the market checklist's contextual intelligence section (if present) to weight checks appropriately:

**E-commerce / marketplace:**
- Payment checks weighted heavily
- Trust signals critical
- Safe meetup and safety checks apply (if C2C)
- Social login as identity verification emphasized

**SaaS / subscription:**
- Pricing model and installment checks prioritized
- Payment gateway compatibility important
- Trust signals for business credibility

**Content / media:**
- Copy, tone, and localization primary focus
- Social sharing and communication channels
- Performance and connectivity

**Fintech / financial services:**
- Identity validation critical
- Compliance weighted heavily
- Trust signals essential
- All payment checks apply

---

## Related Skills

**Before this:**
- `/prd-draft` - Define requirements for a new market launch
- `/competitor-analysis` - Understand local competitors before auditing your own product
- `/journey-map` - Map the user journey for the target market

**After this:**
- `/create-tickets` - Turn critical findings into engineering tickets
- `/code-first-draft` - Implement fixes for identified issues
- `/launch-checklist` - Plan the market launch with audit findings addressed

---

## Output Quality Self-Check

Before delivering the audit, verify:

- [ ] Every finding references a specific file path and line number (not "somewhere in the codebase")
- [ ] CRITICAL vs WARNING severity is applied correctly per the market checklist
- [ ] Recommendations are specific and actionable (file names, function names, not vague advice)
- [ ] Product type was correctly detected and irrelevant checks marked as NOT APPLICABLE
- [ ] Score reflects actual readiness
- [ ] Manual review checklist only includes items that genuinely require human judgment
- [ ] No generic advice that applies to every market (everything is market-specific)
