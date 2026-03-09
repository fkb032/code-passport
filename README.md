# Code Passport

An automated skill that audits your codebase for market-specific cultural, UX, and product issues. Built from 4+ years of building products in Brazil (fraud prevention, real estate technology, ML-powered content moderation) and hard-won lessons about what breaks when you ship Western defaults into emerging markets. Goes beyond localization into payments, trust signals, identity verification, communication patterns, compliance, and more.

**Website:** [codepassport.ai](https://codepassport.ai)

Currently supports **Brazil**. By [Farhan Khalaf](https://linkedin.com/in/farhankhalaf).

## What It Checks

Code Passport scans your actual codebase (templates, components, payment integrations, forms, validators, i18n files, copy, CSS, config) and produces a scored report. Every finding has a file path, line number, and specific fix recommendation.

**15 audit categories for Brazil:**

| Category | Example Checks |
|----------|---------------|
| Payments | Pix, credit card installments (parcelamento), boleto, Pix discount |
| Payment Infrastructure | Brazilian gateway (Pagarme, Stone, Mercado Pago), anti-fraud, chargebacks |
| Trust Signals | CNPJ in footer, Reclame Aqui reference, nota fiscal integration |
| Identity and CPF | CPF field at checkout, mod-11 checksum validation, third-party verification |
| Communication | WhatsApp contact, WhatsApp support channel, platform leakage strategy |
| Copy and Tone | Brazilian Portuguese (not European PT or Spanish), warm informal tone |
| Legal and LGPD | Cookie consent (granular), account deletion, data portability, DPO contact |
| Currency and Formatting | R$ formatting, comma as decimal separator, DD/MM/YYYY dates |
| Social and Cultural | WhatsApp sharing, Brazilian holiday calendar, Southern Hemisphere seasons |
| Forms and Data | CEP auto-fill, complemento field, Brazilian phone format, name conventions |
| Localization | pt-BR locale, hreflang tags, Portuguese error/404/empty states |
| Low-Bandwidth Resilience | JS bundle size, image optimization, CDN, offline handling, Save-Data header |
| SMS and Verification | SMS OTP, phone-as-identifier, Brazilian carrier support |
| Social Login | Facebook/Instagram OAuth, social account age as trust signal |
| Identity Exposure | Optional profile photos, public name display, block functionality |

**Two scores:**
- **Main Score** (X/100): Overall Brazil market readiness
- **Low-Bandwidth Score** (X/100): How well the product works on weak 3G connections and budget Android devices

## Install

Copy the skill folder into your project's `.claude/skills/` directory:

```bash
mkdir -p your-project/.claude/skills/code-passport
cp code-passport/skill/SKILL.md your-project/.claude/skills/code-passport/
```

## Usage

Open your AI coding assistant in the project directory and run:

```
/code-passport brazil
```

The skill scans your codebase and produces a report saved to `outputs/code-passport/audit-brazil-[date].md`.

## Example Output

See [example-output.md](code-passport/skill/example-output.md) for a full sample audit report against a fictional e-commerce codebase.

## Contributing

Code Passport's value comes from practitioner knowledge — people who've shipped products in a specific market and know what breaks. If that's you, we want your expertise.

To contribute market knowledge, clone this repo and run the `/contribute-codepassport` skill in Claude Code. It's a guided interview that walks you through what we need. You don't have to be an expert on everything — skip sections you're unsure about, and others can fill the gaps.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

## Repo Structure

```
code-passport/
  skill/
    SKILL.md           # Skill definition
    example-output.md  # Sample audit report
```

## Coming Soon

- Additional markets (Arabic-speaking, India, Japan)
