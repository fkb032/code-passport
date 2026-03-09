import { useState } from "react";
import { Stamp, RotateCcw, FileText, Copy, Check } from "lucide-react";
import { useChat } from "./use-chat";
import { ChatWindow } from "./ChatWindow";

export function ChatContributePage() {
  const {
    messages,
    isStreaming,
    marketsLoaded,
    finalOutput,
    sendMessage,
    stopStreaming,
    clearChat,
    hasDraft,
  } = useChat();

  const [showStartOver, setShowStartOver] = useState(false);
  const [copied, setCopied] = useState(false);

  // Kick off the conversation with a trigger message if empty
  function startInterview() {
    sendMessage("Hi, I'd like to contribute market knowledge to Code Passport.");
  }

  function handleCopyOutput() {
    if (finalOutput) {
      navigator.clipboard.writeText(finalOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section className="pt-16 h-screen flex flex-col">
      {/* Chat header */}
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Stamp className="w-4 h-4 text-indigo-500" />
            <span
              className="font-semibold text-sm text-slate-900"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              Contribute Interview
            </span>
            {!marketsLoaded && (
              <span className="text-xs text-slate-400 ml-2">
                Loading market data...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasDraft && (
              <div className="relative">
                <button
                  onClick={() => setShowStartOver(!showStartOver)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-slate-100"
                >
                  <RotateCcw className="w-3 h-3" />
                  Start over
                </button>
                {showStartOver && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-10 w-56">
                    <p className="text-xs text-slate-600 mb-2">
                      This will clear your current conversation. Are you sure?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          clearChat();
                          setShowStartOver(false);
                        }}
                        className="text-xs px-3 py-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowStartOver(false)}
                        className="text-xs px-3 py-1.5 rounded bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          {messages.length === 0 ? (
            // Empty state — start the interview
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center max-w-md">
                <Stamp className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                <h2
                  className="text-xl font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "'General Sans', sans-serif" }}
                >
                  Contribute market knowledge
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-1">
                  You'll have a guided conversation about markets you know well.
                  The interview takes about 15–20 minutes.
                </p>
                <p className="text-xs text-slate-400 mb-6">
                  You can skip sections, use your mic to dictate, and save your
                  progress.
                </p>
                <button
                  onClick={startInterview}
                  disabled={!marketsLoaded}
                  className="px-6 py-3 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Start the interview
                </button>
                <p className="text-xs text-slate-400 mt-4">
                  or{" "}
                  <a
                    href="/contribute"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    fill out the form instead
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <ChatWindow
              messages={messages}
              isStreaming={isStreaming}
              onSend={sendMessage}
              onStop={stopStreaming}
            />
          )}
        </div>

        {/* Final output panel */}
        {finalOutput && (
          <div className="hidden lg:flex w-80 border-l border-slate-200 flex-col bg-slate-50">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-slate-700">
                  Knowledge file
                </span>
              </div>
              <button
                onClick={handleCopyOutput}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <pre className="text-xs font-mono text-slate-600 whitespace-pre-wrap leading-relaxed">
                {finalOutput}
              </pre>
            </div>
            <div className="px-4 py-3 border-t border-slate-200">
              <a
                href="https://github.com/fkb032/code-passport/issues/new"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
              >
                Submit contribution
              </a>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Opens a GitHub issue with your contribution
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
