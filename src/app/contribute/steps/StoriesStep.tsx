import { Plus, Trash2 } from "lucide-react";
import { useContribute } from "../context";
import { StepHeader } from "../components/StepHeader";
import { StepNavigation } from "../components/StepNavigation";
import { AudioRecorder } from "../components/AudioRecorder";
import type { Story } from "../types";

export function StoriesStep() {
  const { state, dispatch } = useContribute();

  function updateStory(index: number, updates: Partial<Story>) {
    const next = state.stories.map((s, i) =>
      i === index ? { ...s, ...updates } : s
    );
    dispatch({ type: "SET_STORIES", stories: next });
  }

  function addStory() {
    if (state.stories.length < 3) {
      dispatch({
        type: "SET_STORIES",
        stories: [...state.stories, { title: "", content: "", principle: "" }],
      });
    }
  }

  function removeStory(index: number) {
    if (state.stories.length > 1) {
      dispatch({
        type: "SET_STORIES",
        stories: state.stories.filter((_, i) => i !== index),
      });
    }
  }

  const hasAtLeastOneStory = state.stories.some(
    (s) => s.title.trim() && s.content.trim()
  );

  return (
    <div>
      <StepHeader
        title="War stories"
        subtitle={`Think of a time a product decision that seemed totally reasonable broke in ${state.market || "this market"}, or a local insight that led to a non-obvious design choice.`}
      />

      <div className="space-y-6">
        {state.stories.map((story, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Story {i + 1}
              </span>
              {state.stories.length > 1 && (
                <button
                  onClick={() => removeStory(i)}
                  className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <input
              type="text"
              value={story.title}
              onChange={(e) => updateStory(i, { title: e.target.value })}
              placeholder="Give it a short title (e.g., 'When installments broke the funnel')"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors"
            />

            <div>
              <textarea
                value={story.content}
                onChange={(e) => updateStory(i, { content: e.target.value })}
                placeholder="What happened? Be concrete — a specific product, feature, or decision."
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-slate-400">
                  or tell it in your own words
                </span>
                <AudioRecorder
                  onTranscript={(text) => {
                    const existing = story.content.trim();
                    const joined = existing
                      ? existing + "\n\n" + text
                      : text;
                    updateStory(i, { content: joined });
                  }}
                />
              </div>
            </div>

            <input
              type="text"
              value={story.principle}
              onChange={(e) => updateStory(i, { principle: e.target.value })}
              placeholder="What's the design principle? (e.g., 'Never assume credit cards are the default')"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors"
            />
          </div>
        ))}

        {state.stories.length < 3 && (
          <button
            onClick={addStory}
            className="flex items-center gap-2 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add another story
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        At least one strong story. Quality over quantity — two good ones beat three weak ones.
      </p>

      <StepNavigation canProceed={hasAtLeastOneStory} />
    </div>
  );
}
