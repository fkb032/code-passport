import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { useContribute } from "../context";
import { StepHeader } from "../components/StepHeader";
import { StepNavigation } from "../components/StepNavigation";
import { SECTIONS } from "../constants";
import { generateMarkdown } from "../utils/generate-markdown";
import type { StepId } from "../types";

export function ReviewStep() {
  const { state, dispatch } = useContribute();
  const [showRaw, setShowRaw] = useState(false);
  const markdown = generateMarkdown(state);

  function jumpTo(step: StepId) {
    dispatch({ type: "SET_STEP", step });
  }

  const validStories = state.stories.filter(
    (s) => s.title.trim() && s.content.trim()
  );

  const filledSections = SECTIONS.filter(
    (s) => !state.sections[s.id].skipped && state.sections[s.id].content.trim()
  );

  const skippedSections = SECTIONS.filter(
    (s) => state.sections[s.id].skipped || !state.sections[s.id].content.trim()
  );

  return (
    <div>
      <StepHeader
        title="Review your contribution"
        subtitle={`Here's everything you've shared about ${state.market}. Make sure it looks right before submitting.`}
      />

      <div className="space-y-4">
        {/* Overview */}
        <ReviewCard
          title="Overview"
          onEdit={() => jumpTo("overview")}
          filled={!!state.overview.trim()}
        >
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {state.overview || "Not provided"}
          </p>
        </ReviewCard>

        {/* Stories */}
        <ReviewCard
          title={`Stories (${validStories.length})`}
          onEdit={() => jumpTo("stories")}
          filled={validStories.length > 0}
        >
          {validStories.length === 0 ? (
            <p className="text-sm text-slate-400">No stories added</p>
          ) : (
            <ul className="space-y-2">
              {validStories.map((s, i) => (
                <li key={i} className="text-sm text-slate-600">
                  <span className="font-medium">{s.title}</span>
                  {s.principle && (
                    <span className="text-slate-400">
                      {" "}
                      — {s.principle}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ReviewCard>

        {/* Filled sections */}
        {filledSections.map((section) => {
          const data = state.sections[section.id];
          return (
            <ReviewCard
              key={section.id}
              title={`${section.id}. ${section.name}`}
              onEdit={() => jumpTo(`section-${section.id}` as StepId)}
              filled
            >
              <p className="text-sm text-slate-600 line-clamp-2">
                {data.content}
              </p>
              {data.checklistItems.filter((i) => i.trim()).length > 0 && (
                <p className="text-xs text-slate-400 mt-1">
                  {data.checklistItems.filter((i) => i.trim()).length} checklist
                  items
                </p>
              )}
            </ReviewCard>
          );
        })}

        {/* Skipped sections */}
        {skippedSections.length > 0 && (
          <div className="p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Skipped — open for other contributors
            </p>
            <div className="flex flex-wrap gap-2">
              {skippedSections.map((s) => (
                <span
                  key={s.id}
                  className="text-xs text-slate-400 px-2 py-1 rounded border border-slate-200 bg-white"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Raw markdown toggle */}
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
        >
          {showRaw ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          View raw markdown
        </button>

        {showRaw && (
          <div className="bg-slate-900 rounded-xl p-5 overflow-auto max-h-96">
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
              {markdown}
            </pre>
          </div>
        )}
      </div>

      <StepNavigation nextLabel="Looks good — submit" />
    </div>
  );
}

function ReviewCard({
  title,
  onEdit,
  filled,
  children,
}: {
  title: string;
  onEdit: () => void;
  filled: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        filled ? "border-slate-200" : "border-dashed border-slate-200 bg-slate-50/50"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-700">{title}</h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}
