import { useState, useRef, useEffect } from "react";
import { Send, Square, Mic, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  onStop,
  isStreaming,
  disabled,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  }, [input]);

  function handleSubmit() {
    if (!input.trim() || isStreaming || disabled) return;
    onSend(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        if (blob.size > 0) {
          await transcribe(blob);
        }

        setIsRecording(false);
        setRecordingTime(0);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev + 1 >= 180) {
            stopRecording();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      // Microphone access denied or not available
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }

  async function transcribe(blob: Blob) {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          setInput((prev) => (prev ? prev + " " + data.text : data.text));
        }
      }
    } catch {
      // Transcription failed — silently ignore
    } finally {
      setIsTranscribing(false);
    }
  }

  const minutes = Math.floor(recordingTime / 60);
  const seconds = recordingTime % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isRecording
                ? "Recording..."
                : isTranscribing
                ? "Transcribing..."
                : "Type your message..."
            }
            disabled={disabled || isRecording || isTranscribing}
            rows={1}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-colors resize-none disabled:opacity-50"
          />

          {/* Mic button inside textarea */}
          {!isStreaming && !isRecording && !isTranscribing && (
            <button
              onClick={startRecording}
              className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Record audio"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}

          {isTranscribing && (
            <div className="absolute right-3 bottom-3">
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
            </div>
          )}
        </div>

        {isRecording ? (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors cursor-pointer shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="font-mono text-xs">{timeStr}</span>
            <Square className="w-3 h-3 fill-white" />
          </button>
        ) : isStreaming ? (
          <button
            onClick={onStop}
            className="p-3 rounded-xl bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer shrink-0"
            title="Stop generating"
          >
            <Square className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled || isTranscribing}
            className="p-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
