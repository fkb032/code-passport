export type ContributeMode = "generalist" | "domain-expert";

export type StepId =
  | "mode"
  | "context"
  | "overview"
  | "stories"
  | "section-1"
  | "section-2"
  | "section-3"
  | "section-4"
  | "section-5"
  | "section-6"
  | "section-7"
  | "section-8"
  | "review"
  | "submit";

export type SectionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Story {
  title: string;
  content: string;
  principle: string;
}

export interface SectionData {
  content: string;
  checklistItems: string[];
  skipped: boolean;
}

export interface FormState {
  mode: ContributeMode | null;
  market: string;
  experience: string;
  expertiseLevel: number;
  selectedDomains: SectionId[];
  overview: string;
  stories: Story[];
  sections: Record<SectionId, SectionData>;
  currentStep: StepId;
}

export const INITIAL_SECTION_DATA: SectionData = {
  content: "",
  checklistItems: [],
  skipped: false,
};

export const INITIAL_FORM_STATE: FormState = {
  mode: null,
  market: "",
  experience: "",
  expertiseLevel: 0,
  selectedDomains: [],
  overview: "",
  stories: [{ title: "", content: "", principle: "" }],
  sections: {
    1: { ...INITIAL_SECTION_DATA },
    2: { ...INITIAL_SECTION_DATA },
    3: { ...INITIAL_SECTION_DATA },
    4: { ...INITIAL_SECTION_DATA },
    5: { ...INITIAL_SECTION_DATA },
    6: { ...INITIAL_SECTION_DATA },
    7: { ...INITIAL_SECTION_DATA },
    8: { ...INITIAL_SECTION_DATA },
  },
  currentStep: "mode",
};
