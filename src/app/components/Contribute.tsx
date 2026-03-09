import { motion } from "motion/react";
import { Globe, BookOpen, Microscope } from "lucide-react";

const MODES = [
  {
    icon: <Globe className="w-5 h-5 text-indigo-500" />,
    title: "New market",
    description:
      "Know a market well? Walk through all 8 sections — payments, trust, UX, and more — to create a new knowledge file from scratch.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    title: "Update existing",
    description:
      "Fill gaps in a market that already exists. The skill shows you what's covered and focuses your time on what's missing.",
  },
  {
    icon: <Microscope className="w-5 h-5 text-indigo-500" />,
    title: "Domain expert",
    description:
      "Specialist in payments, compliance, or RTL? Contribute your domain expertise across multiple markets at once.",
  },
];

export function Contribute() {
  return (
    <section
      id="contribute"
      className="py-24 bg-slate-50 border-t border-slate-200/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            Contribute market knowledge
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            Code Passport is open source and community-driven. If you've built products for a specific market,
            your experience makes the audits better for everyone.
          </motion.p>
        </div>

        {/* Contribution modes */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {MODES.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                {mode.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {mode.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {mode.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* How to contribute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-slate-300 border border-slate-800 shadow-inner text-left">
            <div className="flex items-center gap-3">
              <span className="text-indigo-500 select-none">$</span>
              <code className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                /contribute-codepassport
              </code>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed">
            Run the skill in Claude Code to start a guided interview. You don't need to be an expert on everything
            — skip sections and let others fill in the gaps.
          </p>
          <a
            href="https://github.com/fkb032/code-passport/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors mt-3"
          >
            Read the contributing guide &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
