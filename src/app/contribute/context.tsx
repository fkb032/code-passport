import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { FormState, StepId, SectionId, Story, ContributeMode } from "./types";
import { INITIAL_FORM_STATE, INITIAL_SECTION_DATA } from "./types";

const STORAGE_KEY = "code-passport-contribute-draft";

type Action =
  | { type: "SET_MODE"; mode: ContributeMode }
  | { type: "SET_STEP"; step: StepId }
  | { type: "SET_MARKET"; market: string }
  | { type: "SET_EXPERIENCE"; experience: string }
  | { type: "SET_EXPERTISE_LEVEL"; level: number }
  | { type: "SET_SELECTED_DOMAINS"; domains: SectionId[] }
  | { type: "SET_OVERVIEW"; overview: string }
  | { type: "SET_STORIES"; stories: Story[] }
  | { type: "UPDATE_SECTION"; sectionId: SectionId; data: Partial<FormState["sections"][SectionId]> }
  | { type: "SKIP_SECTION"; sectionId: SectionId }
  | { type: "RESTORE_DRAFT"; state: FormState }
  | { type: "RESET" };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "SET_MARKET":
      return { ...state, market: action.market };
    case "SET_EXPERIENCE":
      return { ...state, experience: action.experience };
    case "SET_EXPERTISE_LEVEL":
      return { ...state, expertiseLevel: action.level };
    case "SET_SELECTED_DOMAINS":
      return { ...state, selectedDomains: action.domains };
    case "SET_OVERVIEW":
      return { ...state, overview: action.overview };
    case "SET_STORIES":
      return { ...state, stories: action.stories };
    case "UPDATE_SECTION":
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: {
            ...state.sections[action.sectionId],
            ...action.data,
          },
        },
      };
    case "SKIP_SECTION":
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.sectionId]: { ...INITIAL_SECTION_DATA, skipped: true },
        },
      };
    case "RESTORE_DRAFT":
      return action.state;
    case "RESET":
      return INITIAL_FORM_STATE;
    default:
      return state;
  }
}

interface ContributeContextValue {
  state: FormState;
  dispatch: React.Dispatch<Action>;
  hasDraft: boolean;
}

const ContributeContext = createContext<ContributeContextValue | null>(null);

export function ContributeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_FORM_STATE);
  const hasDraft = state.currentStep !== "mode" || state.market !== "";

  // Persist to localStorage on every state change
  useEffect(() => {
    if (state.currentStep !== "mode" || state.market !== "") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FormState;
        if (parsed.currentStep && parsed.currentStep !== "mode") {
          dispatch({ type: "RESTORE_DRAFT", state: parsed });
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  return (
    <ContributeContext.Provider value={{ state, dispatch, hasDraft }}>
      {children}
    </ContributeContext.Provider>
  );
}

export function useContribute() {
  const ctx = useContext(ContributeContext);
  if (!ctx) throw new Error("useContribute must be used within ContributeProvider");
  return ctx;
}

export function clearDraft() {
  localStorage.removeItem(STORAGE_KEY);
}
