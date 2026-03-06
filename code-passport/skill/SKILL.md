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
/code-passport brazil
```

Then provide:
1. **The codebase to audit** (defaults to current working directory)
2. **Any specific areas of concern** (optional: "just check payments" or "focus on trust signals")

I'll scan the codebase and produce a scored report with specific findings, file locations, and fix recommendations.

**Output:** `outputs/code-passport/audit-brazil-[date].md`
**Time:** ~5 minutes depending on codebase size

**Supported markets:** Brazil (more coming)

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

### Step 2: Run Brazil Audit

Execute each check category. For every finding, record:
- **What was checked**
- **Result** (PASS, FAIL, WARNING, or NOT APPLICABLE)
- **File path and line number** (when a specific file is relevant)
- **What to fix** (specific recommendation)

---

## Brazil Audit Checklist

### Category 1: Currency and Formatting

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Currency uses R$ symbol | Grep for currency display patterns. Look for `$`, `USD`, or hardcoded dollar signs that should be R$. | CRITICAL |
| Brazilian number formatting (comma as decimal, period as thousands) | Grep for number formatting. Look for patterns like `1,299.90` that should be `1.299,90`. Check i18n config for locale settings. | CRITICAL |
| Date format is DD/MM/YYYY | Grep for date formatting functions, date picker configs, and displayed dates. Look for MM/DD/YYYY patterns. | WARNING |

**How to scan:**
```
Grep for: "$", "USD", "currency", "format", "locale", "toLocaleString", "Intl.NumberFormat"
Read: i18n configuration files, currency formatting utilities, product display components
```

### Category 2: Trust Signals

| Check | How to Verify | Severity |
|-------|--------------|----------|
| CNPJ displayed | Grep footer, about page, and layout components for CNPJ pattern (XX.XXX.XXX/XXXX-XX) or the string "CNPJ". | CRITICAL |
| Reclame Aqui reference | Grep entire codebase for "reclame aqui", "reclameaqui", or links to reclameaqui.com.br. | CRITICAL |
| Physical address visible | Check footer and contact page components for address content. | WARNING |
| Phone number visible | Check footer and contact components for Brazilian phone patterns (+55 or (XX) XXXXX-XXXX). | WARNING |
| Security seals present | Grep for security badge components, seal images, or references to Brazilian security providers. | WARNING |
| Nota fiscal integration | Grep for "nota fiscal", "nfe", "invoice" in checkout and receipt logic. | WARNING |

**How to scan:**
```
Grep for: "CNPJ", "cnpj", "reclame", "reclameaqui", "nota fiscal", "nfe"
Read: footer component, about/contact page, checkout completion/receipt page
```

### Category 3: Identity and CPF

| Check | How to Verify | Severity |
|-------|--------------|----------|
| CPF field at checkout | Read checkout form components. Look for a CPF input field. | CRITICAL |
| CPF checksum validation | Read validation logic for CPF field. Check if it implements the mod-11 checksum algorithm, not just length/format check. | CRITICAL |
| CPF in signup flow | Read registration/signup form. Check if CPF is collected. | WARNING |
| CPF auto-formatting | Check if CPF input auto-formats as user types (XXX.XXX.XXX-XX). Look for input masks. | WARNING |
| CPF third-party verification | Grep for CPF verification API integrations (Serpro, BigDataCorp, Neoway, etc.). | WARNING |

**How to scan:**
```
Grep for: "cpf", "CPF", "cadastro", tax ID patterns, input mask libraries
Read: checkout form, signup form, validation utility files
```

### Category 4: Payments

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Pix payment option | Grep payment modules for "pix", Pix API integrations, or Pix QR code generation. | CRITICAL |
| Credit card installments (parcelamento) | Grep for "parcela", "installment", "parcelamento". Check if product pages display installment breakdown. | CRITICAL |
| Installment display on product pages | Read product display components. Look for installment pricing alongside full price. | CRITICAL |
| Boleto bancario option | Grep payment modules for "boleto". | WARNING |
| Boleto expiration messaging | If boleto exists, check that expiration date and processing time are communicated to the user. | WARNING |
| Pix discount displayed | Check if a Pix discount is calculated and shown at checkout or on product pages. | WARNING |
| Installments in pricing model | Check pricing pages and plan comparison components for installment equivalents. Especially important for SaaS/subscription products. | WARNING |

**How to scan:**
```
Grep for: "pix", "boleto", "parcela", "installment", "sem juros", "parcelamento"
Read: payment configuration, checkout flow, product display components, pricing page
```

### Category 5: Communication and WhatsApp

| Check | How to Verify | Severity |
|-------|--------------|----------|
| WhatsApp contact present | Grep for "whatsapp", "wa.me", WhatsApp icon references. | CRITICAL |
| WhatsApp link uses wa.me format | Check that WhatsApp links use the wa.me/[number] format (number can be any valid number, not necessarily +55). | WARNING |
| WhatsApp as support channel | Check support/help/contact pages for WhatsApp as a listed channel. | WARNING |
| Platform leakage strategy (marketplaces) | If the product is a marketplace or platform with user-to-user messaging: check for in-platform chat, warnings about off-platform communication, or controlled WhatsApp integration. | WARNING |

**How to scan:**
```
Grep for: "whatsapp", "wa.me", "wapi", "whatsapp-web"
Read: footer, header, contact page, support page, chat/messaging components
```

### Category 6: Copy and Tone

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Copy is in Brazilian Portuguese | Read i18n files and hardcoded copy. Check for Portuguese content. Flag if only English or if European Portuguese conventions are used. | CRITICAL |
| Not Spanish | Grep for common Spanish-only words that would indicate language confusion. | CRITICAL |
| Tone is warm and informal | Read key user-facing copy (homepage, onboarding, error messages, CTAs). Assess whether it uses informal "voce" and conversational tone vs stiff/corporate language. | WARNING |
| Error messages are helpful | Read validation and error message strings. Check if they are specific and in Portuguese ("CPF invalido. Confira os numeros e tente novamente.") vs generic/technical English. | WARNING |

**How to scan:**
```
Read: i18n/locale files for pt-BR, key page components, error/validation message files
Grep for: "usted" (Spanish formal), "vale" (European Portuguese), language locale configs
```

### Category 7: Forms and Data Collection

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Name field accommodates Brazilian names | Read form components. Check if name is a single "full name" field or has enough fields for Brazilian naming convention (not just first/last). | WARNING |
| CEP auto-fill | Grep for CEP lookup integration (ViaCEP API or similar). Check if entering CEP auto-populates address fields. | WARNING |
| Address includes Complemento | Read address form. Check for a complemento/apartment field that is visible and usable. | WARNING |
| Phone field accepts Brazilian format | Read phone input validation. Check it accepts 11-digit mobile numbers with 2-digit DDD. | WARNING |

**How to scan:**
```
Grep for: "cep", "viacep", "complemento", "bairro", "cpf", phone validation patterns
Read: address form component, phone input component, name input component
```

### Category 8: Social Login and Identity Verification

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Facebook login available | Grep for Facebook OAuth, Facebook Login SDK, or social auth configuration. | WARNING |
| Instagram login available | Grep for Instagram OAuth or social auth configuration. | WARNING |
| Social account signals surfaced | If social login exists, check if account age or activity level is stored or displayed as a trust indicator. | WARNING |

**How to scan:**
```
Grep for: "facebook", "instagram", "oauth", "social", "passport" (auth library)
Read: auth configuration, user profile components, trust/verification logic
```

### Category 9: Legal, Compliance, and LGPD

Brazil's LGPD (Lei Geral de Protecao de Dados) has been in effect since 2020 and is actively enforced. It's modeled after GDPR but has Brazilian-specific requirements. This is not optional.

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Cookie consent banner present | Grep for cookie banner/consent components or third-party consent libraries (e.g., CookieYes, OneTrust, Cookiebot, custom implementations). | CRITICAL |
| Cookie consent is granular | Check that cookie consent allows users to accept/reject by category (essential, analytics, marketing), not just a single "accept all" button. | CRITICAL |
| Privacy policy exists in Portuguese | Check for privacy policy page/link. Read content to verify it is in Brazilian Portuguese. | CRITICAL |
| Privacy policy states data collection purposes | Read privacy policy content. Check that it explicitly states what data is collected and why (LGPD Article 7 requires a legal basis for each processing activity). | CRITICAL |
| User data deletion mechanism | Grep for account deletion, data deletion, or "direito ao esquecimento" (right to be forgotten) functionality. LGPD requires users be able to request deletion of their personal data. Check settings/account pages for a delete account or request data deletion flow. | CRITICAL |
| Data processing consent is explicit | Check signup and data collection forms for explicit consent checkboxes or mechanisms. Consent cannot be buried in Terms of Service. Look for separate, unchecked-by-default consent for data processing, especially for marketing communications. | CRITICAL |
| DPO or privacy contact listed | Grep for "encarregado" (LGPD term for DPO), "dpo", "privacidade", or a dedicated privacy contact email on privacy policy or contact pages. LGPD requires organizations to appoint a Data Protection Officer. | WARNING |
| Data portability option | Check if users can export/download their data. LGPD Article 18 gives users the right to data portability. Look for "export data", "download my data" in account settings. | WARNING |
| Consent revocation mechanism | Check that users can withdraw consent after initially granting it. Look for marketing preference toggles, email unsubscribe, notification settings that allow opt-out. | WARNING |
| Return policy displayed | Grep for "devolucao", "arrependimento", "troca", return policy pages. The Codigo de Defesa do Consumidor gives buyers 7 days unconditional return for online purchases. | WARNING |
| Transparent pricing (no hidden fees) | Read checkout flow for any fees added after initial price display. Final price shown must be final price charged. | WARNING |
| Delivery timeframe commitments | Check checkout and order confirmation for delivery time estimates. In Brazil these are legally binding once stated. | WARNING |

**How to scan:**
```
Grep for: "cookie", "consent", "lgpd", "privacidade", "devolucao", "arrependimento",
          "encarregado", "dpo", "delete account", "excluir conta", "exportar dados",
          "unsubscribe", "descadastrar"
Read: cookie consent component, privacy policy page, account settings/profile page,
      signup form (consent checkboxes), checkout flow, order confirmation
```

### Category 10: Social, Cultural, and Safety

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Social sharing includes WhatsApp | Check share components for WhatsApp as a sharing option (not just Twitter/Facebook). | WARNING |
| Referral flow supports WhatsApp | If referral system exists, check that referral links can be shared via WhatsApp. | WARNING |
| Promotional calendar (Brazilian holidays) | Grep for holiday/promotional logic. Check if it references Brazilian dates (Carnival, Dia das Maes June 12, Dia das Criancas Oct 12) vs only US holidays. | WARNING |
| Southern Hemisphere seasonal awareness | Check promotional/marketing components for December. Flag winter/snow imagery in Christmas content. | WARNING |
| User profiles default to minimal exposure | For platforms with user profiles: check if real name, photo, and location are required or optional at signup. | WARNING |
| Safe meetup features (marketplaces) | If C2C marketplace: check for safe meeting point suggestions, "share my meetup" functionality, location privacy (neighborhood-level vs exact address). | WARNING |
| In-app payment promoted over cash (marketplaces) | If C2C marketplace: check if Pix or in-app payment is the default/promoted transaction method. | WARNING |

**How to scan:**
```
Grep for: "share", "referral", "invite", holiday names, profile settings
Read: share component, referral flow, user profile/settings, listing creation flow
```

### Category 11: Localization Infrastructure

| Check | How to Verify | Severity |
|-------|--------------|----------|
| pt-BR locale configured | Check i18n configuration for pt-BR locale (not just pt, which could default to European Portuguese). | CRITICAL |
| hreflang tag for pt-BR | Grep HTML head or meta components for hreflang="pt-BR" tag. Important for SEO and signaling to Google that this is Brazilian Portuguese content. | WARNING |
| Timezone handling for BRT | Check date/time logic for awareness of Brazilian timezones (BRT UTC-3, AMST UTC-4 for Amazonas, etc.). Brazil spans multiple timezones. | WARNING |
| Portuguese 404 and error pages | Read 404 page, 500 page, and other error boundary components. Check if they are in Portuguese or default to English. | WARNING |
| Portuguese transactional emails | Grep email templates for Portuguese content. Check order confirmation, password reset, welcome emails. | WARNING |
| Portuguese loading and empty states | Check loading spinners, skeleton screens, and empty state components for Portuguese copy (not "Loading..." or "No results found"). | WARNING |
| Brazilian Portuguese spell check | Read key copy for common errors: using "contacto" (European PT) instead of "contato" (Brazilian PT), "autocarro" instead of "onibus", "telemovel" instead of "celular". | WARNING |

**How to scan:**
```
Grep for: "pt-BR", "pt_BR", "hreflang", locale config files, "BRT", timezone config
Read: i18n config, 404 page, error boundary, email templates, loading/empty state components
```

### Category 12: Payment Gateway and Infrastructure

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Brazilian payment gateway | Check for integration with a gateway that supports Brazilian payment methods natively (Pagarme, Cielo, Rede, Mercado Pago, Stone, Iugu, Asaas). International-only gateways like Stripe have limited Brazil support and may reject local cards. | CRITICAL |
| Local card acquirer support | If using international gateway: check if it's configured for Brazilian card acquiring. International cards processed through foreign acquirers have higher decline rates in Brazil. | WARNING |
| Mercado Pago integration | Grep for Mercado Pago SDK or API integration. Mercado Pago is one of the most trusted payment brands in Brazil (via MercadoLivre ecosystem). | WARNING |
| Anti-fraud integration | Grep for fraud prevention tools common in Brazil (ClearSale, Konduto, Emailage). Brazil's high fraud rate means generic fraud detection often isn't enough. | WARNING |
| Chargeback handling | Check for chargeback/dispute handling logic. Brazil has very high chargeback rates compared to US/Europe. | WARNING |

**How to scan:**
```
Grep for: "pagarme", "cielo", "rede", "mercadopago", "mercado_pago", "stone", "iugu",
          "asaas", "clearsale", "konduto", "chargeback", "dispute"
Read: payment configuration, gateway setup, fraud prevention logic
```

### Category 13: SMS and Verification

| Check | How to Verify | Severity |
|-------|--------------|----------|
| SMS OTP for verification | Check auth/verification flow for SMS-based OTP. SMS is the standard second factor in Brazil. Email-only verification is less effective. | WARNING |
| Phone number as account identifier | Check if phone number can be used to create an account or log in (not just email). Many Brazilians are phone-first, not email-first. | WARNING |
| SMS provider supports Brazil | If SMS is used, check that the provider (Twilio, Vonage, etc.) is configured for Brazilian numbers. Some providers have delivery issues with certain Brazilian carriers. | WARNING |

**How to scan:**
```
Grep for: "sms", "otp", "twilio", "vonage", "verification", "phone.*login", "celular"
Read: auth flow, verification logic, SMS configuration
```

### Category 14: Low-Bandwidth Resilience

A significant share of Brazilian users access the internet on prepaid 3G connections with data caps, using Android devices that cost R$500-1000 (~$100-200 USD). If your product doesn't work on a weak 3G connection on a 4-year-old phone, you're excluding millions of potential users. This category produces a separate **Low-Bandwidth Score** in the report.

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Image optimization pipeline | Check for WebP/AVIF usage, lazy loading attributes (`loading="lazy"`), responsive image srcsets, or an image optimization pipeline (Next.js Image, Cloudinary, imgix, sharp). | CRITICAL |
| No auto-playing video | Grep for video elements with `autoplay` attribute. Auto-playing video on a metered connection burns data the user is paying for. | CRITICAL |
| No auto-playing GIFs or heavy animations | Check for large GIFs, Lottie animations, or heavy CSS animations that load on page entry. These consume data and CPU on low-end devices. | WARNING |
| JavaScript bundle size | Check build configuration for code splitting and tree shaking. Look for bundle analysis config or output. Flag if total JS exceeds 300KB gzipped for initial page load. | CRITICAL |
| Third-party script bloat | Count third-party scripts (analytics, chat widgets, ad trackers, social embeds). Each one adds latency and data. Flag if more than 5 third-party scripts load on initial page. | WARNING |
| CDN with Brazilian edge nodes | Check for CDN usage (Cloudflare, Fastly, CloudFront, Vercel Edge). Serving assets from US/Europe adds 100-200ms latency per request. | WARNING |
| Responsive down to 360px | Check CSS breakpoints. Test coverage should include 360px width (common budget Android). Flag if smallest breakpoint is above 375px. | WARNING |
| Font loading strategy | Check for font-display: swap or optional, WOFF2 format, and subsetting. Custom fonts on slow connections cause invisible text or layout shift. | WARNING |
| Offline or degraded-connection handling | Check for service worker, offline fallback pages, or graceful degradation when requests fail. Not required but valuable for unreliable connections. | WARNING |
| Data-lite or reduced-data mode | Check for a `Save-Data` HTTP header handler or prefers-reduced-data media query. Some browsers signal when users have enabled data saving. Responding to this is a strong signal of market awareness. | WARNING |
| Core flow works without JavaScript | Check if critical flows (browse products, view pricing, contact support) render server-side or have progressive enhancement. Full client-side rendering on slow connections means a blank screen for seconds. | WARNING |

**How to scan:**
```
Grep for: "autoplay", "lazy", "loading=", "srcset", "webp", "avif", "Save-Data",
          "prefers-reduced-data", "service-worker", "sw.js", "font-display",
          bundle/webpack/vite config, third-party script tags
Read: image components, video components, build config, HTML head/layout (script tags),
      font loading config, service worker registration
```

**Low-Bandwidth Score:**
Calculate separately from main score. Based on the checks above:
- 90-100: Excellent. Works on weak 3G, budget devices, metered connections.
- 70-89: Good. Most content loads reasonably but some heavy elements remain.
- 50-69: Needs work. Users on 3G will experience significant friction.
- Below 50: Not viable for low-bandwidth Brazilian users.

### Category 15: Identity Exposure (User Safety)

Any product with user accounts exposes some level of identity. In Brazil's high-harassment environment, unnecessary identity exposure creates risk. These checks apply to any product with user accounts. If the product has no user accounts at all, mark as NOT APPLICABLE.

| Check | How to Verify | Severity |
|-------|--------------|----------|
| Profile photo required vs optional | Read signup/profile schema and form components. Is `profilePhoto`, `avatar`, or similar a required field? If users must upload a photo to create an account or use the product, that's a finding. N/A if the product has no user profiles. | WARNING |
| Real name displayed publicly | Read components that render user information (profile pages, comments, reviews, community features, any public-facing user display). Does the component render `fullName` or `legalName`? Or does it use `displayName`, `username`, or first name only? Exposing full legal names publicly is unnecessary for most products. N/A if no public user-facing display. | WARNING |
| Block functionality exists | Grep for block/mute user functionality. If the product has any user-to-user interaction (comments, reviews, messaging, community), users need a way to block other users. N/A if no user-to-user interaction. | WARNING |

**How to scan:**
```
Grep for: "avatar", "profilePhoto", "profile_photo", "required" near photo/image upload,
          "fullName", "legalName", "displayName", "username",
          "block", "mute", "block.*user"
Read: user model/schema, signup form, profile components, any component rendering user info publicly
```

---

## Step 3: Generate Report

After scanning all categories, produce the report in this format:

```markdown
# Code Passport: Brazil Audit
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

- [ ] December/Christmas promotional content uses summer imagery (not snow/winter)
- [ ] Brand's Reclame Aqui page is actively monitored and maintained
- [ ] Customer support team includes Portuguese-speaking agents on WhatsApp
- [ ] Installment pricing model accounts for interest absorption costs

---

## Additional Observations

_After completing the structured audit above, review the codebase one more time with fresh eyes. Look for anything Brazil-specific that doesn't fit into the checklist categories but a PM who knows Brazil would flag. These are not scored. They are observations and suggestions._

[List observations here. Examples of the kind of thing to look for:]

- "Your contact page only offers email support. Brazilian users expect a phone number and WhatsApp at minimum."
- "Your onboarding flow collects company size and industry but not CNPJ. For B2B sales in Brazil, CNPJ is the standard business identifier and collecting it early signals legitimacy."
- "Your pricing page shows annual billing only with USD pricing. Brazilian buyers expect monthly options with installment breakdowns in BRL."
- "Your signup form asks for 'ZIP code' with US formatting. Brazilian postal codes are CEPs with a different format (XXXXX-XXX) and users expect auto-fill when they enter it."
- "Your error messages are in English with technical language ('Invalid input for field tax_id'). Brazilian users need clear Portuguese error messages."
- "Your referral flow generates a link for email sharing. In Brazil, the primary sharing channel is WhatsApp. A share-via-WhatsApp button would significantly increase referral conversion."
- "Your checkout has a single 'Full Name' field which is good, but it then splits into 'First Name' and 'Last Name' on the confirmation page. Brazilian names don't split cleanly into two parts."

_These should be specific to what was actually found in this codebase, not generic advice. Reference the file and line where the observation applies._
```

**Scoring:**
- Start at 100
- Each CRITICAL failure: -15 points
- Each WARNING failure: -5 points
- Minimum score: 0
- **Not Applicable checks are excluded entirely.** They don't count as passing or failing. The score is calculated only against checks that are relevant to this product. A blog with no payments that skips all payment checks is not penalized for lacking Pix.
- Scoring gives a rough sense of readiness, not a precise grade

---

## Step 4: Output and Next Steps

1. **Save report** to `outputs/code-passport/audit-brazil-[date].md`

2. **Display summary:**
```
Brazil market audit complete.

Score: 34/100 (Not ready)

5 critical issues, 8 warnings, 12 passing

Top 3 fixes:
1. Add Pix payment integration
2. Add CPF field with checksum validation at checkout
3. Fix currency formatting (3 files use USD format)

Full report: outputs/code-passport/audit-brazil-[date].md
```

3. **Offer next steps:**
- "Want me to fix the currency formatting issues? I can see the exact files."
- "Want me to scaffold a CPF validation utility with the checksum algorithm?"
- "Want me to create tickets for the critical issues?"

---

## Contextual Intelligence

The audit adapts based on what kind of product it detects:

**E-commerce / marketplace:**
- Full payment audit (Pix, boleto, parcelamento, Pix discount)
- Trust signals weighted heavily (CNPJ, Reclame Aqui, nota fiscal)
- Safe meetup checks (if C2C)
- Social login as identity verification emphasized
- WhatsApp leakage strategy checked

**SaaS / subscription:**
- Installment pricing model check (can users pay monthly on credit card installments?)
- Brazilian entity/CNPJ for issuing nota fiscal
- Payment gateway compatibility with Brazilian cards
- Boleto for annual plans

**Content / media:**
- Portuguese copy and tone primary focus
- WhatsApp sharing
- Performance and connectivity

**Fintech / financial services:**
- CPF validation critical
- Compliance (LGPD, Central Bank regulations) weighted heavily
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
- [ ] CRITICAL vs WARNING severity is applied correctly (payment and identity issues are critical, nice-to-haves are warnings)
- [ ] Recommendations are specific and actionable ("add CPF checksum validation using mod-11 algorithm in checkout-form.tsx" not "improve CPF handling")
- [ ] Product type was correctly detected and irrelevant checks marked as NOT APPLICABLE
- [ ] Score reflects actual readiness (a site with no Pix and no CPF should not score above 50)
- [ ] Manual review checklist only includes items that genuinely require human judgment
- [ ] No generic advice that applies to every market (everything is Brazil-specific)
