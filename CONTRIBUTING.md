# Contributing to Code Passport

Code Passport's value comes from deep, opinionated market knowledge — the kind you only get from building products in a specific region. If you've done that work, we want your expertise.

## What we're looking for

Each market in Code Passport is a knowledge file. It's a structured markdown document that tells the skill what to look for when scanning a codebase for market-specific issues. Think of it as a senior PM's brain dump: "here's everything I wish someone had told me before we launched in [market]."

We're not looking for i18n checklists. Those exist. We're looking for the stuff that breaks products in ways that no translation layer or date formatter will catch — payment expectations, trust dynamics, cultural UX patterns, abuse surfaces, legal landmines.

## How to contribute

### Option 1: Use the skill (recommended)

Run `/contribute-market` in Claude Code. It'll interview you, structure your knowledge, and open a PR automatically.

The skill supports two modes:
- **Generalist** — you know a market well across the board
- **Domain expert** — you're deep in a specific area (payments, legal, UX, etc.) across multiple markets

### Option 2: Edit directly

1. Copy the template below (or use `skills/code-passport/markets/brazil.md` as a reference)
2. Fill it out for your market
3. Open a pull request

You can edit directly in GitHub's web UI — no dev setup needed. If you'd rather just share your knowledge informally, open an issue and we'll work with you to shape it.

## Updating an existing market

If a market file already exists and you think it's missing something or could be improved:

- Run `/contribute-market` and name that market — it'll show you what's covered and what's missing, then focus the interview on gaps
- Or open a PR directly with your additions

Contributors are tracked via git history — no need to add your name to the file.

## What happens after you contribute

1. A maintainer reviews your PR
2. Once merged, a GitHub Action automatically integrates your knowledge into the `/code-passport` audit skill
3. The skill's supported markets list updates automatically

## Quality bar

Before submitting, check:

- **Every section ends with an audit checklist.** Concrete, scannable items — not vibes. "CPF field validates using checksum algorithm" not "make sure identity works."
- **Stories have a lesson.** Each story should end with a clear design principle that generalizes beyond the specific anecdote.
- **You've built here.** We'll ask about your experience in the market. "I read about this" is not the same as "I shipped a product and watched users do this."

---

# Market Template

Copy everything below this line into a new file at `skills/code-passport/markets/[market-name].md`.

---

```markdown
# Code Passport: [Market Name]

<!--
  Market name can be a country (Brazil), a region (Arabic-speaking),
  or a language/cultural context (Japanese). Use whatever framing
  best captures the design surface you're writing about.
-->

## Overview

<!--
  2-3 paragraphs max. Set the stage: what makes this market different
  from a Western-default product perspective? What are the forces that
  shape how users behave, trust, and transact here?

  Don't try to be comprehensive. Be opinionated. What's the one thing
  someone building for this market needs to understand above all else?
-->

[Your overview here]

---

## Stories from the field

<!--
  Up to 5 stories that capture the spirit of building for this market.
  These are the "I wish someone had told me" moments — real examples
  where a product decision that seemed reasonable broke in this market,
  or where a local insight led to a non-obvious design choice.

  Each story should be:
  - Concrete (a specific product, feature, or decision — not abstract)
  - Surprising (the outcome wasn't what a Western-default PM would expect)
  - Actionable (ends with a clear design principle)
-->

### [Story 1 title]

[Your story]

**Principle:** [The generalizable design lesson]

### [Story 2 title]

[Your story]

**Principle:** [The generalizable design lesson]

---

## 1. Visual and Layout

<!--
  Currency display, iconography, text direction (RTL/LTR),
  typography conventions, color associations, visual trust signals.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 2. Trust and Identity

<!--
  How do users decide whether to trust a product, a seller, or a platform?
  What identity documents or signals matter? What destroys trust instantly?
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 3. Payments and Commerce

<!--
  Local payment methods, pricing display conventions, installment
  expectations, digital wallets, cash-on-delivery norms.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 4. Communication Patterns

<!--
  Primary messaging platforms, customer support expectations,
  tone and formality norms, platform leakage dynamics.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 5. Forms and Data Collection

<!--
  Name formats, address conventions, phone number formats,
  national ID numbers, data entry expectations.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 6. Connectivity and Performance

<!--
  Device landscape, network conditions, data cost sensitivity,
  offline patterns.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 7. Legal and Compliance

<!--
  Data protection laws, consumer protection rules, content
  regulations, accessibility requirements.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]

---

## 8. Social and Cultural UX

<!--
  Social dynamics, cultural calendar, gender/class/race considerations,
  community patterns, sharing behavior.
-->

[Your content here]

**Audit checklist:**
- [ ] [Concrete, scannable item]
- [ ] [...]
```
