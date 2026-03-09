import { useState } from "react";
import { Github, Mail, CheckCircle2 } from "lucide-react";
import { useContribute, clearDraft } from "../context";
import { StepHeader } from "../components/StepHeader";
import { generateMarkdown } from "../utils/generate-markdown";

type SubmitPath = "github" | "email" | null;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function SubmitStep() {
  const { state } = useContribute();
  const [path, setPath] = useState<SubmitPath>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const markdown = generateMarkdown(state);

  async function handleGitHubSubmit() {
    // TODO: Wire up GitHub OAuth flow via serverless function
    // For now, copy markdown to clipboard as fallback
    setStatus("submitting");
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("success");
      clearDraft();
    } catch {
      setErrorMessage("Failed to copy to clipboard");
      setStatus("error");
    }
  }

  async function handleEmailSubmit() {
    if (!email.trim() || !email.includes("@")) return;
    // TODO: Wire up email verification + issue creation via serverless function
    setStatus("submitting");
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("success");
      clearDraft();
    } catch {
      setErrorMessage("Failed to process submission");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2
          className="text-2xl font-bold text-slate-900 mb-2"
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          Contribution received
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
          Your knowledge file for <span className="font-medium text-slate-700">{state.market}</span> has
          been copied to your clipboard. For now, please open a pull request or
          issue on GitHub and paste the content.
        </p>
        <p className="text-xs text-slate-400">
          Full GitHub OAuth integration is coming soon — you'll be able to submit
          directly from here.
        </p>
        <a
          href="https://github.com/fkb032/code-passport/issues/new"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Github className="w-4 h-4" />
          Open an issue on GitHub
        </a>
      </div>
    );
  }

  return (
    <div>
      <StepHeader
        title="Submit your contribution"
        subtitle="Choose how you'd like to submit. Either way, a maintainer will review your contribution and merge it into Code Passport."
      />

      {!path && (
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setPath("github")}
            className="group text-left p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
          >
            <Github className="w-6 h-6 text-slate-700 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">
              Sign in with GitHub
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We'll open a pull request on your behalf. You get contributor
              credit automatically.
            </p>
            <span className="inline-block mt-3 text-xs font-medium text-indigo-500 border border-indigo-200 rounded px-2 py-0.5">
              Recommended
            </span>
          </button>

          <button
            onClick={() => setPath("email")}
            className="group text-left p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all cursor-pointer"
          >
            <Mail className="w-6 h-6 text-slate-500 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">
              Submit via email
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              No GitHub account needed. We'll verify your email and create an
              issue for you.
            </p>
          </button>
        </div>
      )}

      {path === "github" && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Clicking below will copy your contribution to your clipboard. Then
              you can paste it into a new GitHub issue or pull request.
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Direct GitHub OAuth submission is coming soon.
            </p>
            <button
              onClick={handleGitHubSubmit}
              disabled={status === "submitting"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              {status === "submitting"
                ? "Copying..."
                : "Copy & open GitHub"}
            </button>
          </div>

          <button
            onClick={() => setPath(null)}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Choose a different method
          </button>
        </div>
      )}

      {path === "email" && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors"
              />
              <p className="mt-1 text-xs text-slate-400">
                We'll send a verification link. Your email won't be published.
              </p>
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={!email.includes("@") || status === "submitting"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              {status === "submitting"
                ? "Submitting..."
                : "Submit contribution"}
            </button>
          </div>

          <button
            onClick={() => setPath(null)}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          >
            Choose a different method
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-sm text-rose-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
