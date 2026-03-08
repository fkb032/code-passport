import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Download, Github, Sparkles, Stamp, TerminalSquare } from "lucide-react";
import { SKILL_MD_CONTENT } from "../data/skill-content";

const INSTALL_CMD = `mkdir -p .claude/skills/code-passport && curl -sL https://raw.githubusercontent.com/fkb032/code-passport/main/SKILL.md -o .claude/skills/code-passport/SKILL.md`;

const SKILL_URL = "https://raw.githubusercontent.com/fkb032/code-passport/main/SKILL.md";

async function fetchSkillContent(): Promise<string> {
  try {
    const r = await fetch(SKILL_URL);
    if (!r.ok) throw new Error("not found");
    return await r.text();
  } catch {
    return SKILL_MD_CONTENT;
  }
}

function InstallBlock() {
  const [tab, setTab] = useState<"terminal" | "copy" | "download">("terminal");
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab("terminal")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              tab === "terminal"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <TerminalSquare className="w-3.5 h-3.5" />
            Terminal
          </button>
          <button
            onClick={() => setTab("copy")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              tab === "copy"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy SKILL.md
          </button>
          <button
            onClick={() => setTab("download")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              tab === "download"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
        <a
          href="https://github.com/fkb032/code-passport"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
      </div>

      {tab === "terminal" && (
        <div>
          <div
            onClick={() => handleCopy(INSTALL_CMD)}
            className="bg-slate-900 rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer border border-slate-800 hover:bg-slate-800 transition-colors group"
          >
            <span className="text-indigo-400 select-none font-mono text-sm">$</span>
            <code className="flex-1 text-sm font-mono text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-hide text-left">
              mkdir -p .claude/skills/code-passport && curl -sL ...SKILL.md -o .claude/skills/code-passport/SKILL.md
            </code>
            <span className="text-slate-500 group-hover:text-slate-300 transition-colors shrink-0">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-left">
            Downloads SKILL.md into your project's <code className="text-slate-500">.claude/skills/code-passport/</code> directory. Then use <code className="text-slate-500">/code-passport</code> in Claude Code.
          </p>
        </div>
      )}

      {tab === "copy" && (
        <div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">SKILL.md</span>
              <button
                onClick={() => fetchSkillContent().then((text) => handleCopy(text))}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy contents"}
              </button>
            </div>
            <div className="px-5 py-4 font-mono text-[13px] text-slate-400 leading-relaxed text-left max-h-[160px] overflow-y-auto scrollbar-hide">
              <div className="text-slate-600">---</div>
              <div><span className="text-indigo-400">name</span>: code-passport</div>
              <div><span className="text-indigo-400">description</span>: Audit a codebase for market-specific</div>
              <div className="pl-4">cultural, UX, and product considerations.</div>
              <div><span className="text-indigo-400">user-invocable</span>: true</div>
              <div className="text-slate-600">---</div>
              <div className="mt-2 text-slate-300"># /code-passport - Market-Specific Product Audit</div>
              <div className="mt-1">Scan a codebase for cultural, UX, and product</div>
              <div>issues that break or underperform in a specific</div>
              <div>market...</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-left">
            Save to <code className="text-slate-500">.claude/skills/code-passport/SKILL.md</code> in your project. Then use <code className="text-slate-500">/code-passport</code> in Claude Code.
          </p>
        </div>
      )}

      {tab === "download" && (
        <div>
          <button
            onClick={() => {
              fetchSkillContent().then((text) => {
                const blob = new Blob([text], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "SKILL.md";
                a.click();
                URL.revokeObjectURL(url);
              });
            }}
            className="w-full bg-slate-900 rounded-xl px-5 py-4 flex items-center gap-4 border border-slate-800 hover:bg-slate-800 transition-colors group cursor-pointer"
          >
            <Download className="w-5 h-5 text-indigo-400" />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-slate-200">SKILL.md</div>
              <div className="text-xs text-slate-500">Code Passport skill file</div>
            </div>
            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Download</span>
          </button>
          <p className="text-[11px] text-slate-400 mt-2 text-left">
            Save to <code className="text-slate-500">.claude/skills/code-passport/SKILL.md</code> in your project. Then use <code className="text-slate-500">/code-passport</code> in Claude Code.
          </p>
        </div>
      )}
    </div>
  );
}

type CountryKey = "brazil" | "japan" | "india" | "arabic";

interface CountryData {
  flag: string;
  name: string;
  score: number;
  issues: number;
  filesScanned: number;
  checksPassed: number;
  checksWarned: number;
  checksCrit: number;
  clearanceLabel: string;
  statusLabel: string;
  statusColor: "emerald" | "amber" | "rose";
  scoreColor: "emerald" | "amber" | "rose";
  findings: { severity: "CRIT" | "WARN"; label: string; path: string }[];
}

const COUNTRY_DATA: Record<CountryKey, CountryData> = {
  brazil: {
    flag: "🇧🇷",
    name: "Brazil",
    score: 8.7,
    issues: 4,
    filesScanned: 342,
    checksPassed: 54,
    checksWarned: 23,
    checksCrit: 8,
    clearanceLabel: "Brazil Clearance",
    statusLabel: "Cleared",
    statusColor: "emerald",
    scoreColor: "emerald",
    findings: [
      { severity: "CRIT", label: "No PIX payment integration", path: "payments/" },
      { severity: "CRIT", label: "CPF validation missing", path: "auth/verify.ts" },
      { severity: "WARN", label: "No installment (parcelamento) support", path: "payments/checkout.ts" },
      { severity: "WARN", label: "No WhatsApp notification channel", path: "notifications/" },
    ],
  },
  japan: {
    flag: "🇯🇵",
    name: "Japan",
    score: 6.3,
    issues: 7,
    filesScanned: 342,
    checksPassed: 41,
    checksWarned: 29,
    checksCrit: 15,
    clearanceLabel: "Japan Clearance",
    statusLabel: "Review",
    statusColor: "amber",
    scoreColor: "amber",
    findings: [
      { severity: "CRIT", label: "No konbini payment option", path: "payments/" },
      { severity: "CRIT", label: "Missing keigo (honorific) form copy", path: "i18n/ja.json" },
      { severity: "WARN", label: "No furigana input for name fields", path: "components/forms/" },
      { severity: "WARN", label: "No LINE integration", path: "auth/social.ts" },
    ],
  },
  india: {
    flag: "🇮🇳",
    name: "India",
    score: 7.1,
    issues: 5,
    filesScanned: 342,
    checksPassed: 48,
    checksWarned: 26,
    checksCrit: 11,
    clearanceLabel: "India Clearance",
    statusLabel: "Review",
    statusColor: "amber",
    scoreColor: "amber",
    findings: [
      { severity: "CRIT", label: "No UPI payment integration", path: "payments/" },
      { severity: "CRIT", label: "Aadhaar/PAN validation missing", path: "auth/verify.ts" },
      { severity: "WARN", label: "No COD (cash on delivery) option", path: "payments/checkout.ts" },
      { severity: "WARN", label: "No WhatsApp Business API", path: "notifications/" },
    ],
  },
  arabic: {
    flag: "🇦🇪",
    name: "Arabic",
    score: 4.8,
    issues: 9,
    filesScanned: 342,
    checksPassed: 32,
    checksWarned: 31,
    checksCrit: 22,
    clearanceLabel: "Arabic Clearance",
    statusLabel: "Blocked",
    statusColor: "rose",
    scoreColor: "rose",
    findings: [
      { severity: "CRIT", label: "No RTL layout support", path: "styles/global.css" },
      { severity: "CRIT", label: "UI breaks in mirrored layout", path: "components/layout/" },
      { severity: "CRIT", label: "No Arabic font stack configured", path: "styles/fonts.css" },
      { severity: "WARN", label: "Hijri calendar not supported", path: "utils/date.ts" },
    ],
  },
};

const SCORE_COLORS = {
  emerald: {
    border: "border-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  rose: {
    border: "border-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
};

const STATUS_COLORS = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-600",
  amber: "border-amber-200 bg-amber-50 text-amber-600",
  rose: "border-rose-200 bg-rose-50 text-rose-600",
};

export function Hero() {
  const [activeCountry, setActiveCountry] = useState<CountryKey>("brazil");
  const country = COUNTRY_DATA[activeCountry];
  const scoreStyle = SCORE_COLORS[country.scoreColor];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background decorations to make it less flat */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-400/[0.06] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-100/60 bg-indigo-50/40 text-indigo-500 text-sm font-medium mb-8 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Open source &middot; Global product audits</span>
        </motion.div>

        {/* Headlines */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]"
        >
          Audit your product for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400">
            global market readiness
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-500 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Find localization, payments, UX, and compliance gaps before you launch. 
          Get per-market scores and a prioritized list of actionable issues directly in your codebase.
        </motion.p>

        {/* Install block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center"
        >
          <InstallBlock />
        </motion.div>

        {/* The "Passport" UI Dashboard Mockup - Rebuilt for better fidelity */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
          className="mt-20 w-full max-w-5xl mx-auto"
        >
          {/* Subtle glowing shadow container */}
          <div className="relative rounded-2xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-3xl blur-xl opacity-15 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
            
            {/* The actual Document UI */}
            <div className="relative flex flex-col md:flex-row rounded-2xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-200/60 overflow-hidden text-left font-sans">
              
              {/* Left Column (Metadata) */}
              <div className="w-full md:w-[280px] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 px-6 py-5 flex flex-col justify-between shrink-0">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">
                    Clearance Document
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 mb-1.5">
                    <Stamp className="w-5 h-5 text-indigo-500" />
                    Code<span className="text-indigo-500">Passport</span>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                    Scan your codebase for market-specific product issues before shipping.
                  </p>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-xs font-mono mb-6">
                    <div>
                      <div className="text-slate-400 mb-1 tracking-wider text-[10px]">ORIGIN</div>
                      <div className="text-slate-900 font-medium">Local</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1 tracking-wider text-[10px]">DESTINATION</div>
                      <div className="text-indigo-500 font-medium">Global</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1 tracking-wider text-[10px]">FILES SCANNED</div>
                      <div className="text-slate-900 font-medium">342</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1 tracking-wider text-[10px]">CHECKS RUN</div>
                      <div className="text-slate-900 font-medium">85</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1 tracking-wider text-[10px]">DATE</div>
                      <div className="text-slate-900 font-medium">2026-03-06</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1 tracking-wider text-[10px]">VERSION</div>
                      <div className="text-slate-900 font-medium">v1.2.0</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button className="py-2 rounded-lg bg-indigo-500 text-white font-medium text-[13px] hover:bg-indigo-600 transition-colors shadow-sm">
                    Get Started
                  </button>
                  <button className="py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[13px] hover:bg-slate-50 transition-colors shadow-sm">
                    GitHub
                  </button>
                </div>
              </div>

              {/* Right Column (Details) */}
              <div className="flex-1 px-6 py-5 flex flex-col bg-white overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono">
                    Clearance Check
                  </h2>
                  <div className={`px-2 py-0.5 rounded border ${STATUS_COLORS[country.statusColor]} text-[10px] font-bold tracking-widest uppercase shadow-sm`}>
                    {country.statusLabel}
                  </div>
                </div>

                {/* Country Tabs */}
                <div className="flex flex-wrap gap-2 mb-5 font-mono text-xs">
                  {(Object.keys(COUNTRY_DATA) as CountryKey[]).map((key) => {
                    const c = COUNTRY_DATA[key];
                    const isActive = key === activeCountry;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveCountry(key)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                          isActive
                            ? "border border-slate-200 shadow-sm bg-white font-medium text-indigo-700 ring-1 ring-indigo-500/20"
                            : "border border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{c.flag}</span> {c.name} <span className={isActive ? "text-indigo-400 ml-1" : "text-slate-400 ml-1"}>{c.score}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Score Summary */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-full border-[3px] ${scoreStyle.border} flex items-center justify-center ${scoreStyle.bg} shadow-sm`}>
                      <span className={`text-xl font-bold ${scoreStyle.text}`}>{country.score}</span>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">{country.clearanceLabel}</div>
                      <div className="text-xl font-bold text-slate-900">{country.issues} issues found</div>
                      <div className="text-xs font-mono text-slate-500 mt-1">{country.filesScanned} files scanned &middot; {country.checksPassed} checks passed</div>
                    </div>
                  </div>
                  <div className="font-mono text-xs space-y-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-emerald-600">{country.checksPassed}</span> pass <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-amber-500">{country.checksWarned}</span> warn <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-200"></span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-rose-500">{country.checksCrit}</span> crit <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-200"></span>
                    </div>
                  </div>
                </div>

                {/* Issues List */}
                <div className="space-y-2 font-mono text-xs flex-1 mb-5">
                  {country.findings.map((finding, i) => {
                    const isCrit = finding.severity === "CRIT";
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg border group transition-colors ${
                          isCrit
                            ? "border-rose-100 bg-rose-50/50 hover:border-rose-200"
                            : "border-amber-100 bg-amber-50/50 hover:border-amber-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-1.5 py-0.5 rounded border bg-white text-[9px] font-bold tracking-wider shadow-sm ${
                              isCrit
                                ? "border-rose-200 text-rose-600"
                                : "border-amber-200 text-amber-600"
                            }`}
                          >
                            {finding.severity}
                          </span>
                          <span className="text-slate-700 font-medium">{finding.label}</span>
                        </div>
                        <span className="text-slate-400 group-hover:text-slate-500 transition-colors text-[10px]">{finding.path}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Machine Readable Zone */}
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-slate-300 break-all select-all">
                    P&lt;DFV&lt;&lt;CODEPASSPORT&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
