import { Check } from "lucide-react";
import { useContribute } from "../context";
import { getStepList } from "../utils/steps";
import type { StepId } from "../types";

const STEP_LABELS: Record<string, string> = {
  mode: "Getting started",
  context: "Your background",
  overview: "Market overview",
  stories: "Stories from the field",
  "section-1": "Visual and Layout",
  "section-2": "Trust and Identity",
  "section-3": "Payments and Commerce",
  "section-4": "Communication Patterns",
  "section-5": "Forms and Data Collection",
  "section-6": "Connectivity and Performance",
  "section-7": "Legal and Compliance",
  "section-8": "Social and Cultural UX",
  review: "Review",
  submit: "Submit",
};

// Group steps into logical phases for display
function groupSteps(steps: StepId[]): { label: string; steps: StepId[] }[] {
  const groups: { label: string; steps: StepId[] }[] = [];
  const sectionSteps: StepId[] = [];

  for (const step of steps) {
    if (step === "mode") continue; // Don't show mode in the list
    if (step.startsWith("section-")) {
      sectionSteps.push(step);
    } else {
      // Flush any accumulated section steps
      if (sectionSteps.length > 0) {
        groups.push({ label: "Knowledge sections", steps: [...sectionSteps] });
        sectionSteps.length = 0;
      }
      groups.push({ label: STEP_LABELS[step] || step, steps: [step] });
    }
  }
  if (sectionSteps.length > 0) {
    groups.push({ label: "Knowledge sections", steps: sectionSteps });
  }

  return groups;
}

export function StepList() {
  const { state } = useContribute();
  const steps = getStepList(state);
  const currentIdx = steps.indexOf(state.currentStep);
  const groups = groupSteps(steps);

  return (
    <nav className="space-y-1">
      {groups.map((group) => {
        const isExpandedGroup = group.steps.length > 1;
        const groupFirstIdx = steps.indexOf(group.steps[0]);
        const groupLastIdx = steps.indexOf(group.steps[group.steps.length - 1]);
        const isGroupActive = currentIdx >= groupFirstIdx && currentIdx <= groupLastIdx;
        const isGroupDone = currentIdx > groupLastIdx;

        if (isExpandedGroup) {
          return (
            <div key={group.label}>
              <div
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm ${
                  isGroupActive
                    ? "font-medium text-indigo-700"
                    : isGroupDone
                    ? "text-slate-400"
                    : "text-slate-400"
                }`}
              >
                <StepDot
                  state={isGroupDone ? "done" : isGroupActive ? "active" : "upcoming"}
                />
                {group.label}
              </div>
              {isGroupActive && (
                <div className="ml-5 mt-0.5 space-y-0.5 border-l border-slate-200 pl-3">
                  {group.steps.map((step) => {
                    const idx = steps.indexOf(step);
                    const isCurrent = idx === currentIdx;
                    const isDone = idx < currentIdx;
                    return (
                      <div
                        key={step}
                        className={`text-xs py-1 px-2 rounded ${
                          isCurrent
                            ? "text-indigo-600 font-medium bg-indigo-50"
                            : isDone
                            ? "text-slate-400"
                            : "text-slate-400"
                        }`}
                      >
                        {STEP_LABELS[step]}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        const step = group.steps[0];
        const idx = steps.indexOf(step);
        const isCurrent = idx === currentIdx;
        const isDone = idx < currentIdx;

        return (
          <div
            key={step}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              isCurrent
                ? "font-medium text-indigo-700 bg-indigo-50"
                : isDone
                ? "text-slate-400"
                : "text-slate-400"
            }`}
          >
            <StepDot
              state={isDone ? "done" : isCurrent ? "active" : "upcoming"}
            />
            {group.label}
          </div>
        );
      })}
    </nav>
  );
}

function StepDot({ state }: { state: "done" | "active" | "upcoming" }) {
  if (state === "done") {
    return (
      <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="w-4 h-4 rounded-full border-2 border-indigo-500 shrink-0">
        <div className="w-full h-full rounded-full bg-indigo-500 scale-50" />
      </div>
    );
  }
  return (
    <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
  );
}
