import { Globe, Microscope, RotateCcw } from "lucide-react";
import { useContribute, clearDraft } from "../context";
import { StepHeader } from "../components/StepHeader";
import type { ContributeMode } from "../types";

export function ModeStep() {
  const { state, dispatch, hasDraft } = useContribute();

  function selectMode(mode: ContributeMode) {
    dispatch({ type: "SET_MODE", mode });
    dispatch({ type: "SET_STEP", step: "context" });
  }

  function handleResumeDraft() {
    // Draft is already loaded — just navigate to where they left off
    // The currentStep from the draft is already restored
  }

  function handleStartFresh() {
    clearDraft();
    dispatch({ type: "RESET" });
  }

  // If there's a restored draft and we're on mode step, show resume prompt
  if (hasDraft && state.market) {
    return (
      <div>
        <StepHeader
          title="Welcome back"
          subtitle={`You have an in-progress contribution for "${state.market}". Want to pick up where you left off?`}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleResumeDraft}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            Resume draft
          </button>
          <button
            onClick={handleStartFresh}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Start fresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepHeader
        title="How do you want to contribute?"
        subtitle="Code Passport's value comes from deep, opinionated market knowledge — the kind you only get from building products in a specific region."
      />

      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />
        Takes about 15–20 minutes. You can skip sections and save your progress.
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => selectMode("generalist")}
          className="group text-left p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
        >
          <Globe className="w-6 h-6 text-indigo-500 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">Generalist</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            I know a specific market well across the board. I can talk about payments, UX, trust, legal, all of it.
          </p>
        </button>

        <button
          onClick={() => selectMode("domain-expert")}
          className="group text-left p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
        >
          <Microscope className="w-6 h-6 text-indigo-500 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">Domain Expert</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            I'm deep in a specific area (e.g., payments, legal, UX) for one or more markets.
          </p>
        </button>
      </div>
    </div>
  );
}
