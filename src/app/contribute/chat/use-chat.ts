import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage, ConversationState } from "./types";

const STORAGE_KEY = "code-passport-chat-draft";
const FINAL_OUTPUT_MARKER = "<!-- FINAL_OUTPUT -->";

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function extractFinalOutput(messages: ChatMessage[]): string | null {
  // Scan assistant messages in reverse for the latest FINAL_OUTPUT
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "assistant") continue;

    const content = msg.content;
    // Look for a fenced code block containing the marker
    const codeBlockRegex = /```(?:markdown)?\s*\n(<!-- FINAL_OUTPUT -->[\s\S]*?)```/;
    const match = content.match(codeBlockRegex);
    if (match) {
      // Return content after the marker line
      const lines = match[1].split("\n");
      // Remove the marker line itself
      const withoutMarker = lines.slice(1).join("\n").trim();
      return withoutMarker;
    }
  }
  return null;
}

export function useChat() {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    isStreaming: false,
    existingMarkets: {},
    marketsLoaded: false,
    finalOutput: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.messages?.length > 0) {
          setState((prev) => ({
            ...prev,
            messages: parsed.messages,
            finalOutput: extractFinalOutput(parsed.messages),
          }));
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Persist to localStorage when messages change
  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages: state.messages })
      );
    }
  }, [state.messages]);

  // Fetch existing markets from GitHub
  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await fetch("/api/markets");
        if (res.ok) {
          const data = await res.json();
          setState((prev) => ({
            ...prev,
            existingMarkets: data.markets || {},
            marketsLoaded: true,
          }));
        } else {
          setState((prev) => ({ ...prev, marketsLoaded: true }));
        }
      } catch {
        setState((prev) => ({ ...prev, marketsLoaded: true }));
      }
    }
    fetchMarkets();
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (state.isStreaming || !content.trim()) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, assistantMessage],
        isStreaming: true,
      }));

      const allMessages = [...state.messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: allMessages,
            existingMarkets: state.existingMarkets,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error("Failed to get response");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Parse SSE events from the buffer
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);

            if (data === "[DONE]") continue;

            try {
              const event = JSON.parse(data);

              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta"
              ) {
                fullText += event.delta.text;

                setState((prev) => {
                  const msgs = [...prev.messages];
                  const last = msgs[msgs.length - 1];
                  if (last.role === "assistant") {
                    msgs[msgs.length - 1] = { ...last, content: fullText };
                  }
                  return { ...prev, messages: msgs };
                });
              }
            } catch {
              // Skip unparseable lines
            }
          }
        }

        // Finalize
        setState((prev) => {
          const msgs = [...prev.messages];
          const finalOut = extractFinalOutput(msgs);
          return { ...prev, isStreaming: false, finalOutput: finalOut };
        });
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          setState((prev) => ({ ...prev, isStreaming: false }));
          return;
        }

        // Add error indicator to the assistant message
        setState((prev) => {
          const msgs = [...prev.messages];
          const last = msgs[msgs.length - 1];
          if (last.role === "assistant" && !last.content) {
            msgs[msgs.length - 1] = {
              ...last,
              content: "Sorry, something went wrong. Please try sending your message again.",
            };
          }
          return { ...prev, isStreaming: false };
        });
      } finally {
        abortRef.current = null;
      }
    },
    [state.messages, state.isStreaming, state.existingMarkets]
  );

  const stopStreaming = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, []);

  const clearChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      messages: [],
      isStreaming: false,
      existingMarkets: state.existingMarkets,
      marketsLoaded: state.marketsLoaded,
      finalOutput: null,
    });
  }, [state.existingMarkets, state.marketsLoaded]);

  return {
    messages: state.messages,
    isStreaming: state.isStreaming,
    marketsLoaded: state.marketsLoaded,
    finalOutput: state.finalOutput,
    sendMessage,
    stopStreaming,
    clearChat,
    hasDraft: state.messages.length > 0,
  };
}
