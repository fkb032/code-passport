import type { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-500 text-white rounded-br-md"
            : "bg-slate-100 text-slate-800 rounded-bl-md"
        }`}
      >
        <MessageContent content={message.content} isUser={isUser} />
        {isStreaming && !message.content && (
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
          </span>
        )}
      </div>
    </div>
  );
}

function MessageContent({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) {
  if (!content) return null;

  // Simple markdown rendering — bold, code blocks, lists, line breaks
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        // Fenced code block
        if (block.startsWith("```")) {
          const lines = block.split("\n");
          const code = lines.slice(1, -1).join("\n");
          return (
            <pre
              key={i}
              className={`text-xs font-mono p-3 rounded-lg overflow-x-auto ${
                isUser ? "bg-indigo-600/50" : "bg-white border border-slate-200"
              }`}
            >
              {code}
            </pre>
          );
        }

        // Numbered or bullet list
        if (/^[\d]+\.\s|^[-*]\s/.test(block.trim())) {
          const items = block.split("\n").filter((l) => l.trim());
          return (
            <ul key={i} className="space-y-1 pl-1">
              {items.map((item, j) => (
                <li key={j} className="flex gap-2">
                  <span className="shrink-0 opacity-60">
                    {item.match(/^(\d+\.|[-*])/)?.[0] || "•"}
                  </span>
                  <span>
                    <InlineMarkdown
                      text={item.replace(/^(\d+\.\s?|[-*]\s?)/, "")}
                    />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // Blockquote
        if (block.startsWith(">")) {
          const text = block
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join("\n");
          return (
            <blockquote
              key={i}
              className={`border-l-2 pl-3 italic ${
                isUser
                  ? "border-indigo-300 text-indigo-100"
                  : "border-slate-300 text-slate-600"
              }`}
            >
              <InlineMarkdown text={text} />
            </blockquote>
          );
        }

        // Regular paragraph
        return (
          <p key={i}>
            <InlineMarkdown text={block} />
          </p>
        );
      })}
    </div>
  );
}

function InlineMarkdown({ text }: { text: string }) {
  // Bold, italic, inline code
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="text-xs font-mono px-1 py-0.5 rounded bg-black/10"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        // Handle line breaks within a block
        return part.split("\n").map((line, j) => (
          <span key={`${i}-${j}`}>
            {j > 0 && <br />}
            {line}
          </span>
        ));
      })}
    </>
  );
}
