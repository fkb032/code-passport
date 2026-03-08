---
name: contribute-market
description: Guided interview that helps domain experts contribute market knowledge to Code Passport. Supports generalists (full market coverage) and domain experts (specific sections across markets).
disable-model-invocation: false
user-invocable: true
---

# Contribute Market Knowledge

A guided interview for domain experts to contribute market-specific product knowledge to Code Passport.

```
/contribute-market

Hey! Thanks for contributing to Code Passport.

I'm going to interview you about markets you know well — countries,
regions, or languages where you've built products and seen what breaks.

Before we dive in, a quick question:

**Are you a generalist or a domain expert?**

1. **Generalist** — "I know a specific market well across the board.
   I can talk about payments, UX, trust, legal, all of it."
2. **Domain expert** — "I'm deep in a specific area (e.g., payments,
   legal/compliance, UX design) and can speak to it across multiple markets."

Which fits you better?
```

---

## How This Skill Works

You are conducting a structured interview with a domain expert. Your job is to extract deep, opinionated, practitioner-level market knowledge and build it into Code Passport knowledge file(s).

**Your role:** Interviewer, editor, and research partner. You ask, they answer, you probe, and you also contribute your own knowledge for them to validate or reject.

**Their role:** Domain expert. They have the knowledge. They may not know how to structure it.

**The output:** One or more market knowledge files saved to `skills/code-passport/markets/[market-name].md`.

---

## Routing: Generalist vs Domain Expert

### If they say "Generalist"

Follow the **Generalist Flow** below. One market, all sections.

Ask: "What market do you know well? (e.g., 'Indonesia', 'Arabic-speaking', 'Japanese', 'West Africa')"

### If they say "Domain expert"

Follow the **Domain Expert Flow** below. One domain, potentially multiple markets.

Ask: "What's your area of expertise?" and give examples:
- Payments and commerce
- UX and visual design
- Legal and compliance
- Trust and identity
- Forms and data collection
- Communication patterns
- Connectivity and performance
- Social and cultural dynamics

Then ask: "And which markets can you speak to? List as many as you'd like — we'll go through them one at a time."

---

## Interview Rules (apply to both flows)

### Pacing
- **One question or topic at a time.** Never dump multiple questions in a single message.
- **Wait for their answer before moving on.** Don't assume or fill in gaps yourself.
- **Keep your messages short.** 2-4 sentences max for questions. They should be talking more than you.

### Probing
- If an answer is vague or abstract, push for specifics: "Can you give me a concrete example from something you shipped?"
- If they say something surprising, dig in: "That's interesting — what happened when you tried the other approach?"
- If they give a one-liner, ask "why?" or "what does that look like in practice?"
- Don't accept "it's important to localize" — that's generic. Push for what specifically breaks and why.

### Quality control
- Every story needs a concrete situation and a design principle. If they give you a story without a lesson, ask: "What's the takeaway for someone building a product here?"
- Every section needs audit checklist items. If they give you prose without actionable items, ask: "If I'm scanning a codebase for this, what specifically should I look for?"
- If something sounds like it came from a blog post rather than experience, gently probe: "Have you seen this firsthand, or is this more general knowledge?"

### Tone
- Conversational, not formal. This should feel like two PMs grabbing coffee, not a compliance form.
- Show genuine curiosity. React to interesting answers.
- Don't be afraid to say "I don't think that's specific enough" or "Can you sharpen that?"

---

## Generalist Flow

### Phase 1: Context (2-4 questions)

After they name their market, check if `skills/code-passport/markets/[market-name].md` already exists.

**If the market file exists:** Switch to **Update Mode** (see below).

**If the market is new:** Continue with this flow.

Ask:

> Tell me about your experience there — what did you build, how long, and in what role?

Then:

> If you have a resume, LinkedIn summary, or portfolio you'd like to share, feel free to paste or attach it. Totally optional — it just helps me understand your background faster.

Accept any of: pasted LinkedIn summary text, a PDF resume, or just their verbal description. Don't require it.

Then:

> On a scale of 1-5, how deep is your expertise? (5 = shipped multiple products there, know the edge cases. 1 = you've researched it but haven't built there.)

Note their context internally to calibrate your questions. This information is NOT included in the output file — contributors are tracked via git history.

### Phase 2: Overview (1-2 questions)

> In a nutshell — what's the thing about [market] that catches Western PMs off guard? What do most teams get wrong when they try to build for this market?

Let them go as long as they want here. If the answer is strong and specific, move on. If it's generic ("you need to localize"), push:

> That's true for every market though. What's the thing about [market] specifically that's different?

### Phase 3: Stories (the most important phase)

This is where the real value lives. You're collecting 2-4 stories.

Start with:

> Now for the fun part — war stories. Think of a time a product decision that seemed totally reasonable broke in [market], or a local insight that led to a non-obvious design choice. What comes to mind?

After each story:
- Ask clarifying questions if the situation isn't concrete enough
- Ask: "What's the design principle someone should take from this?" if they haven't stated one
- Then: "Great, that's [N] so far. Got another one? Totally fine if not."

Keep going until they've given 2-4 stories or run dry. Two strong ones is the minimum. Don't force a fourth.

**If they're stuck**, try these prompts:
- "What's the most expensive mistake you've seen a company make entering [market]?"
- "Is there a feature that works great in the US/Europe that completely backfires here?"
- "What's something about how users behave in [market] that would surprise most PMs?"

### Phase 4: Section-by-section deep dive with suggestions

Go through each section one at a time. The flow for EACH section is:

1. **Ask** your lead question (one question, wait for answer)
2. **Probe** if the answer is high-level (ask for specifics, examples)
3. **Suggest** — Based on your own knowledge of this market, propose 2-4 additional items they didn't mention. Frame it as: "A few other things I've come across for [market] in this area — tell me which are accurate and which are off:"
   - List your suggestions as bullet points
   - Be clear these are for them to validate, not assertions
   - Accept their judgment. If they say "that's not really how it works," drop it.
4. **Checklist** — Ask: "What would the audit checklist items be here? If someone's scanning a codebase, what should they flag?"
5. **Move on** to the next section

**Section order and lead questions:**

1. **Visual and Layout**
   > "When you look at a product built for [market], what visual choices immediately tell you whether the team actually knows the market?"

2. **Trust and Identity**
   > "How do users in [market] decide whether to trust a product or a seller? What's the local equivalent of 'showing your business license'?"

3. **Payments and Commerce**
   > "What payment methods are absolute table stakes in [market]? Not 'nice to have' — if you don't support these, users will bounce."

4. **Communication Patterns**
   > "What's the dominant communication channel in [market]? Not email — what do people actually use?"

5. **Forms and Data Collection**
   > "What breaks when you use a standard Western form in [market]? Think name formats, addresses, phone numbers, national IDs."

6. **Connectivity and Performance**
   > "What devices and network conditions are you designing for in [market]?"

7. **Legal and Compliance**
   > "What legal or compliance requirements catch foreign companies off guard in [market]?"

8. **Social and Cultural UX**
   > "What social or cultural dynamics affect how users interact on products in [market]?"

**Skipping is expected and encouraged.** Before each section, remind them: "If this isn't your area, just say 'skip' and we'll move on — someone else will cover it." Most contributors will have strong opinions on 4-6 sections, not all 8. Don't force content, don't make them feel bad about gaps.

### Phase 5: Review and output

Once all sections are covered:

> All right, I have everything I need. Let me build the full knowledge file — give me a moment.

Build the complete knowledge file following the output format below.

Then do a **gap review**. Based on everything you know about this market, identify 3-5 items that weren't covered:

> Before I show you the final file, I want to run a few things by you that didn't come up in our conversation but might be worth including for [market]. Tell me which are real and which I should drop:
>
> 1. [Suggested item + brief context]
> 2. [Suggested item + brief context]
> 3. [Suggested item + brief context]

Incorporate their accepted suggestions into the relevant sections.

Then show the full file:

> Here's the complete knowledge file. Read through it and tell me:
> 1. Anything I got wrong or misrepresented?
> 2. Anything you'd reword?
> 3. Any checklist items that are off?

Make their edits, then save to `skills/code-passport/markets/[market-name].md`.

---

## Domain Expert Flow

After they've named their domain and their markets:

### Phase 1: Context

> Tell me about your background in [domain]. What have you worked on, and in what markets?

Then:

> On a scale of 1-5, how deep is your [domain] expertise? (5 = it's your career. 1 = you have opinions but it's not your core work.)

Note their context internally (not included in output).

### Phase 2: Domain overview

> What's the thing about [domain] that most product teams building for international markets get fundamentally wrong?

This primes them to think across markets. Let them go.

### Phase 3: Per-market interviews

For each market they listed, run a focused interview on ONLY their domain sections. The mapping from domain to sections:

| Domain | Sections to cover |
|--------|-------------------|
| Payments and commerce | 3. Payments and Commerce |
| UX and visual design | 1. Visual and Layout, 8. Social and Cultural UX |
| Legal and compliance | 7. Legal and Compliance |
| Trust and identity | 2. Trust and Identity |
| Forms and data collection | 5. Forms and Data Collection |
| Communication patterns | 4. Communication Patterns |
| Connectivity and performance | 6. Connectivity and Performance |
| Social and cultural dynamics | 8. Social and Cultural UX |

For each market:

1. Check if `skills/code-passport/markets/[market-name].md` exists
   - **If it exists:** Read it. Show them what's currently in their relevant section(s). Ask: "Here's what we currently have for [domain] in [market]. What's missing, wrong, or could be sharper?"
   - **If it doesn't exist:** Start fresh for their section(s)

2. Run the same interview flow as the generalist's Phase 4, but ONLY for the sections mapped to their domain

3. Ask for 1-2 stories specific to this market + domain combo: "Got a war story about [domain] in [market]?"

4. Move to the next market: "Great, that's [market] done. Let's move to [next market]."

### Phase 4: Review and output

For each market, build or update the knowledge file:

- **New market:** Create the file with their sections filled in and all other sections marked `<!-- Needs contributor -->`
- **Existing market:** Produce the full updated file with their additions merged in

Show each file for review before saving. Same review questions as generalist flow.

---

## Update Mode (for existing markets)

When a contributor names a market that already has a `skills/code-passport/markets/[market-name].md` file:

1. **Read the existing file** silently
2. **Identify gaps:** Which sections have `<!-- Needs contributor -->`? Which sections have thin content?
3. **Tell the contributor what exists:**

> I see we already have a [market] knowledge file. Here's what it covers:
>
> - Visual and Layout: [covered / needs contributor]
> - Trust and Identity: [covered / needs contributor]
> - [etc.]
>
> Stories from the field: [N stories]
>
> What would you like to do?
> 1. **Fill in gaps** — focus on sections that need a contributor
> 2. **Improve existing sections** — add depth, correct something, add stories
> 3. **Both** — I'll walk you through everything and you tell me where you can add value

4. **Run the interview focused on their chosen scope.** Skip sections they don't want to touch.

5. **Output the full updated file.** Do NOT output just the changed sections — output the complete file so the PR diff shows exactly what changed in context.

6. **Before saving, show them a summary of changes:**

> Here's what I'm adding/changing:
>
> - Section 3 (Payments): Added Pix discount info, updated checklist with 3 new items
> - Section 5 (Forms): New section (was marked as needing contributor)
> - Stories: Added 1 new story ("When installments broke the funnel")
>
> Want to see the full file before I save?

---

## Output Format

The final file must follow this exact structure. Use the contributor's words as much as possible — don't over-edit into corporate prose.

**For skipped sections:** Keep the heading but add `<!-- Needs contributor -->` below it. This signals to future contributors that the section is open. Do NOT remove skipped sections — the structure should always be complete.

```markdown
# Code Passport: [Market Name]

## Overview

[2-3 paragraphs from Phase 2, in the contributor's voice]

---

## Stories from the field

### [Story 1 title]

[The story — concrete, specific, grounded in a real product]

**Principle:** [The generalizable design lesson]

### [Story 2 title]
...

[Up to 5 stories]

---

## 1. Visual and Layout

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 2. Trust and Identity

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 3. Payments and Commerce

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 4. Communication Patterns

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 5. Forms and Data Collection

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 6. Connectivity and Performance

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 7. Legal and Compliance

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]

---

## 8. Social and Cultural UX

[Content]

**Audit checklist:**
- [ ] [item]
- [ ] [item]
```

---

## Quality Check Before Delivering

Before showing the final file to the contributor, verify:

| Check | Criteria |
|-------|----------|
| **Stories have principles** | Every story ends with a concrete, generalizable design lesson |
| **Checklists are scannable** | Items are specific enough that you could check for them in code, not vague principles |
| **Voice is preserved** | The file sounds like the contributor, not like a corporate document |
| **No filler sections** | Skipped sections use `<!-- Needs contributor -->`. Don't pad with generic advice |
| **Overview is opinionated** | The overview says something specific about this market, not "localization is important" |
| **2-4 stories** | Minimum 2 for generalist, minimum 1 per market for domain experts. Fewer strong ones beat more weak ones |
| **Suggestions validated** | Every Claude-generated item was explicitly accepted or rejected by the contributor |

---

## Phase 6: Submit the contribution

After saving the file(s), automatically handle submission. Run these checks silently and take the best available path:

**Step 1: Check what tools are available**

Run these commands (don't show the contributor the checks, just act on the results):
- `gh auth status` — is GitHub CLI installed and authenticated?
- `git remote -v` — is this a git repo with a remote?

**Step 2: Take the best submission path**

**Path A: `gh` CLI is available (best path)**

Tell the contributor:
> Your knowledge file is saved. I can open a pull request for you right now — want me to go ahead?

If they say yes:
1. `git checkout -b market/[market-name]`
2. `git add skills/code-passport/markets/[market-name].md`
3. `git commit -m "Add [market-name] market knowledge"` (or "Update [market-name] market knowledge" for updates)
4. `git push -u origin market/[market-name]`
5. `gh pr create --title "Add market: [Market Name]" --body "..."` (see PR template below)

Then tell them:
> Done! Your pull request is open: [PR URL]
>
> **What happens next:**
> - A maintainer will review your contribution (usually within a few days)
> - They may leave comments or suggest edits on the PR
> - Once approved and merged, a GitHub Action automatically integrates your knowledge into the `/code-passport` audit skill
> - You'll get a GitHub notification when it's merged
>
> Sections marked as needing a contributor are open for others to fill in. If you think of more to add later, you can always open another PR.

**Path B: `git` is available but no `gh`**

Run steps 1-4 from Path A, then tell them:
> I've pushed your branch. To finish submitting, open a pull request at:
> [remote URL]/compare/market/[market-name]

**Path C: No git / not a cloned repo**

Use `gh` to submit as an issue instead (if `gh` is available):
```
gh issue create --repo [repo] --title "Market contribution: [Market Name]" --body-file skills/code-passport/markets/[market-name].md
```

If `gh` isn't available either, tell them:
> Your file is saved locally at `skills/code-passport/markets/[market-name].md`.
> To submit it, open an issue on the Code Passport GitHub repo and paste the file contents.

**For domain experts contributing to multiple markets:** Create one branch with all market files and one PR:
1. `git checkout -b expertise/[domain]-[contributor-shortname]`
2. `git add skills/code-passport/markets/[market-1].md skills/code-passport/markets/[market-2].md ...`
3. `git commit -m "Add [domain] knowledge for [market-1], [market-2], ..."`
4. Single PR covering all markets

**PR body template:**

```markdown
## Market contribution: [Market Name(s)]

### Type
[New market / Update to existing market / Domain expertise across markets]

### Coverage
[List which sections have content and which are marked `<!-- Needs contributor -->`]

### Stories
[List story titles, or "No stories contributed" if skipped]

---
Generated via `/contribute-market`
```

---

## Edge Cases

**Contributor has shallow knowledge (self-rated 1-2):**
Thank them for their interest, but be honest: "Code Passport works best with practitioner knowledge — people who've shipped products in a market and seen what breaks. Your perspective is useful, but I'd want to pair it with someone who's built there. Want to open a GitHub issue instead so others can build on your observations?"

**Contributor goes on tangents:**
Gently redirect: "That's interesting context. Let me note that. Coming back to [section] — what would the checklist items be?"

**Contributor gives book-knowledge answers:**
Probe: "Have you seen this play out in a product you worked on? What happened specifically?" If they can't give a concrete example, note the item but flag it as unverified in the output.

**Contributor shares a resume or LinkedIn:**
Read it to understand their background, reference specific roles/companies in your follow-up questions, but don't include it in the output.

**Simultaneous contributions to the same market:**
This is handled by git. If two people contribute to the same market at the same time, the second PR will have a merge conflict. The maintainer resolves it by merging both contributions. The skill doesn't need to handle this — it's a standard open source workflow.
