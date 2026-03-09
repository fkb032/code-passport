import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContribute } from "../context";
import { getNextStep, getPrevStep } from "../utils/steps";

interface StepNavigationProps {
  canProceed?: boolean;
  nextLabel?: string;
  onNext?: () => void;
  hideBack?: boolean;
}

export function StepNavigation({
  canProceed = true,
  nextLabel = "Continue",
  onNext,
  hideBack = false,
}: StepNavigationProps) {
  const { state, dispatch } = useContribute();
  const prevStep = getPrevStep(state);
  const nextStep = getNextStep(state);

  function handleNext() {
    if (onNext) {
      onNext();
      return;
    }
    if (nextStep) {
      dispatch({ type: "SET_STEP", step: nextStep });
    }
  }

  function handleBack() {
    if (prevStep) {
      dispatch({ type: "SET_STEP", step: prevStep });
    }
  }

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
      {!hideBack && prevStep ? (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      ) : (
        <div />
      )}

      {nextStep && (
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
