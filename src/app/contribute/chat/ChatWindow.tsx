import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatMessage as ChatMessageType } from "./types";

interface ChatWindowProps {
  messages: ChatMessageType[];
  isStreaming: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
  disabled?: boolean;
}

export function ChatWindow({
  messages,
  isStreaming,
  onSend,
  onStop,
  disabled,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-400">
              The interview will begin once you send your first message.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isStreaming={
              isStreaming && i === messages.length - 1 && msg.role === "assistant"
            }
          />
        ))}
      </div>

      {/* Input area */}
      <ChatInput
        onSend={onSend}
        onStop={onStop}
        isStreaming={isStreaming}
        disabled={disabled}
      />
    </div>
  );
}
