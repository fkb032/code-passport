import { Plus, SkipForward, Trash2 } from "lucide-react";
import { useContribute } from "../context";
import { StepHeader } from "../components/StepHeader";
import { StepNavigation } from "../components/StepNavigation";
import { SECTIONS } from "../constants";
import { parseSectionStep, getNextStep } from "../utils/steps";

export function SectionStep() {
  const { state, dispatch } = useContribute();
  const sectionId = parseSectionStep(state.currentStep);

  if (!sectionId) return null;

  const sectionDef = SECTIONS.find((s) => s.id === sectionId)!;
  const sectionData = state.sections[sectionId];

  function updateContent(content: string) {
    dispatch({
      type: "UPDATE_SECTION",
      sectionId: sectionId!,
      data: { content },
    });
  }

  function updateChecklist(items: string[]) {
    dispatch({
      type: "UPDATE_SECTION",
      sectionId: sectionId!,
      data: { checklistItems: items },
    });
  }

  function addChecklistItem() {
    updateChecklist([...sectionData.checklistItems, ""]);
  }

  function removeChecklistItem(index: number) {
    updateChecklist(sectionData.checklistItems.filter((_, i) => i !== index));
  }

  function updateChecklistItem(index: number, value: string) {
    const next = sectionData.checklistItems.map((item, i) =>
      i === index ? value : item
    );
    updateChecklist(next);
  }

  function handleSkip() {
    dispatch({ type: "SKIP_SECTION", sectionId: sectionId! });
    const next = getNextStep(state);
    if (next) dispatch({ type: "SET_STEP", step: next });
  }

  const hasContent =
    sectionData.content.trim().length > 0 ||
    sectionData.checklistItems.some((item) => item.trim().length > 0);

  return (
    <div>
      <StepHeader
        title={`${sectionDef.id}. ${sectionDef.name}`}
        subtitle={sectionDef.description}
      />

      <div className="mb-6 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100">
        <p className="text-sm text-indigo-900 font-medium leading-relaxed">
          {sectionDef.leadQuestion}
        </p>
        <p className="mt-1.5 text-xs text-indigo-500">{sectionDef.examples}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Your knowledge
          </label>
          <textarea
            value={sectionData.content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder="Share what you know. Be specific — concrete examples beat general advice."
            rows={6}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors resize-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Audit checklist items
          </label>
          <p className="text-xs text-slate-400 mb-3">
            If someone's scanning a codebase, what specifically should they flag?
          </p>

          <div className="space-y-2">
            {sectionData.checklistItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-300 text-sm">-</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateChecklistItem(i, e.target.value)}
                  placeholder='e.g., "CPF field validates using checksum algorithm"'
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors"
                />
                <button
                  onClick={() => removeChecklistItem(i)}
                  className="text-slate-300 hover:text-rose-500 transition-colors cursor-pointer p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              onClick={addChecklistItem}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add checklist item
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <SkipForward className="w-4 h-4" />
          Skip — not my area
        </button>
        <div />
      </div>

      <StepNavigation canProceed={hasContent} />
    </div>
  );
}
