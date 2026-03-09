import { useContribute } from "../context";
import { StepHeader } from "../components/StepHeader";
import { StepNavigation } from "../components/StepNavigation";
import { SECTIONS } from "../constants";
import type { SectionId } from "../types";

export function ContextStep() {
  const { state, dispatch } = useContribute();
  const isDomainExpert = state.mode === "domain-expert";

  const canProceed =
    state.market.trim().length > 0 &&
    state.experience.trim().length > 0 &&
    state.expertiseLevel > 0 &&
    (!isDomainExpert || state.selectedDomains.length > 0);

  function toggleDomain(id: SectionId) {
    const current = state.selectedDomains;
    const next = current.includes(id)
      ? current.filter((d) => d !== id)
      : [...current, id];
    dispatch({ type: "SET_SELECTED_DOMAINS", domains: next });
  }

  return (
    <div>
      <StepHeader
        title="Tell us about yourself"
        subtitle="This helps us understand your perspective. Your personal info won't appear in the knowledge file — contributors are tracked via git history."
      />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {isDomainExpert
              ? "Which market are you contributing to?"
              : "What market do you know well?"}
          </label>
          <input
            type="text"
            value={state.market}
            onChange={(e) =>
              dispatch({ type: "SET_MARKET", market: e.target.value })
            }
            placeholder='e.g., "Indonesia", "Arabic-speaking", "West Africa"'
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            What's your experience there?
          </label>
          <textarea
            value={state.experience}
            onChange={(e) =>
              dispatch({ type: "SET_EXPERIENCE", experience: e.target.value })
            }
            placeholder="e.g., I built fraud prevention at OLX Brazil for 3 years, focused on marketplace trust..."
            rows={3}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            How deep is your expertise? (1–5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  dispatch({ type: "SET_EXPERTISE_LEVEL", level })
                }
                className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  state.expertiseLevel === level
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20"
                    : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-400">Researched it</span>
            <span className="text-xs text-slate-400">Shipped multiple products</span>
          </div>
        </div>

        {isDomainExpert && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Which areas can you speak to?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleDomain(section.id)}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-all cursor-pointer ${
                    state.selectedDomains.includes(section.id)
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <StepNavigation canProceed={canProceed} />
    </div>
  );
}
