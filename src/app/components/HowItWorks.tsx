import { motion } from "motion/react";
import { DownloadCloud, PlayCircle, Wrench } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Add the skill",
      description: "One command installs it. Works with Claude Code, Codex, Gemini CLI, Cursor, and more.",
      icon: <DownloadCloud className="w-5 h-5 text-indigo-500" />,
      code: "npx skills add fkb032/code-passport"
    },
    {
      number: "02",
      title: "Run the audit",
      description: "Run it for all markets at once, or pass a specific one. It scans your codebase for market-specific gaps.",
      icon: <PlayCircle className="w-5 h-5 text-indigo-500" />,
      code: "/code-passport",
      codeAlt: "/code-passport brazil"
    },
    {
      number: "03",
      title: "Fix what matters",
      description: "Get a prioritized list of actionable issues (payments, identity, UX) mapped directly to your files.",
      icon: <Wrench className="w-5 h-5 text-indigo-500" />,
      code: "CRIT  No Pix payment option           payments/checkout.ts",
      isOutput: true
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-slate-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
          >
            How it works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            Code Passport audits your entire frontend and backend codebase against market-specific product requirements.
          </motion.p>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-white pt-8"
              >
                {/* Step indicator circle */}
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm absolute -top-8 left-1/2 lg:left-0 -translate-x-1/2 lg:-translate-x-0 group">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                <div className="mt-6 text-center lg:text-left">
                  <div className="text-sm font-bold text-indigo-500 tracking-wider uppercase mb-2">Step {step.number}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6 h-20">
                    {step.description}
                  </p>
                  
                  {/* Terminal code snippet */}
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-800 shadow-inner text-left space-y-2">
                    <div className="flex items-center gap-3">
                      {!step.isOutput && <span className="text-indigo-500 select-none">$</span>}
                      <code className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {step.code}
                      </code>
                    </div>
                    {step.codeAlt && (
                      <div className="flex items-center gap-3 pt-1 border-t border-slate-800">
                        <span className="text-indigo-500 select-none">$</span>
                        <code className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                          {step.codeAlt}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
