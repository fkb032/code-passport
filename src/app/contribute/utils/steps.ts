import type { FormState, StepId, SectionId } from "../types";
import { SECTIONS } from "../constants";

/** Get the ordered list of steps based on mode and selected domains. */
export function getStepList(state: FormState): StepId[] {
  const steps: StepId[] = ["mode", "context", "overview", "stories"];

  if (state.mode === "domain-expert" && state.selectedDomains.length > 0) {
    // Only include selected domain sections
    for (const section of SECTIONS) {
      if (state.selectedDomains.includes(section.id)) {
        steps.push(`section-${section.id}` as StepId);
      }
    }
  } else {
    // Generalist: all sections
    for (const section of SECTIONS) {
      steps.push(`section-${section.id}` as StepId);
    }
  }

  steps.push("review", "submit");
  return steps;
}

/** Get the next step in the sequence. */
export function getNextStep(state: FormState): StepId | null {
  const steps = getStepList(state);
  const idx = steps.indexOf(state.currentStep);
  return idx < steps.length - 1 ? steps[idx + 1] : null;
}

/** Get the previous step in the sequence. */
export function getPrevStep(state: FormState): StepId | null {
  const steps = getStepList(state);
  const idx = steps.indexOf(state.currentStep);
  return idx > 0 ? steps[idx - 1] : null;
}

/** Get current step index and total count. */
export function getStepProgress(state: FormState): {
  current: number;
  total: number;
} {
  const steps = getStepList(state);
  return {
    current: steps.indexOf(state.currentStep) + 1,
    total: steps.length,
  };
}

/** Parse section ID from a section step. */
export function parseSectionStep(step: StepId): SectionId | null {
  const match = step.match(/^section-(\d)$/);
  return match ? (parseInt(match[1]) as SectionId) : null;
}
