import { useContribute } from "../context";
import { StepHeader } from "../components/StepHeader";
import { StepNavigation } from "../components/StepNavigation";

export function OverviewStep() {
  const { state, dispatch } = useContribute();
  const market = state.market || "this market";

  return (
    <div>
      <StepHeader
        title="The big picture"
        subtitle={`What do most teams get wrong when they try to build for ${market}? What's the thing that someone unfamiliar with this market wouldn't think to check?`}
      />

      <textarea
        value={state.overview}
        onChange={(e) =>
          dispatch({ type: "SET_OVERVIEW", overview: e.target.value })
        }
        placeholder="Be opinionated, not comprehensive. A few sentences is enough — we'll go deeper in the sections that follow."
        rows={6}
        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors resize-none leading-relaxed"
      />

      <p className="mt-2 text-xs text-slate-400">
        This sets the stage. The detail comes later — just capture the core insight here.
      </p>

      <StepNavigation canProceed={state.overview.trim().length > 20} />
    </div>
  );
}
