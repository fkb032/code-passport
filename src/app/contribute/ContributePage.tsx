import { motion } from "motion/react";
import { ContributeProvider, useContribute } from "./context";
import { StepList } from "./components/ProgressBar";
import { ModeStep } from "./steps/ModeStep";
import { ContextStep } from "./steps/ContextStep";
import { OverviewStep } from "./steps/OverviewStep";
import { StoriesStep } from "./steps/StoriesStep";
import { SectionStep } from "./steps/SectionStep";
import { ReviewStep } from "./steps/ReviewStep";
import { SubmitStep } from "./steps/SubmitStep";

function ContributeForm() {
  const { state } = useContribute();
  const showSidebar = state.currentStep !== "mode";

  function renderStep() {
    switch (state.currentStep) {
      case "mode":
        return <ModeStep />;
      case "context":
        return <ContextStep />;
      case "overview":
        return <OverviewStep />;
      case "stories":
        return <StoriesStep />;
      case "review":
        return <ReviewStep />;
      case "submit":
        return <SubmitStep />;
      default:
        if (state.currentStep.startsWith("section-")) {
          return <SectionStep />;
        }
        return null;
    }
  }

  if (!showSidebar) {
    return (
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-32 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderStep()}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-32 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex gap-12">
          {/* Step list sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-36 self-start">
            <StepList />
          </aside>

          {/* Form content */}
          <div className="flex-1 min-w-0 max-w-2xl">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {renderStep()}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContributePage() {
  return (
    <ContributeProvider>
      <ContributeForm />
    </ContributeProvider>
  );
}
