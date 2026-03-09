import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square } from "lucide-react";

const MAX_DURATION_S = 180; // 3 minutes

interface AudioRecorderProps {
  onTranscript: (text: string) => void;
}

export function AudioRecorder({ onTranscript }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setElapsed(0);

    const text = transcriptRef.current.trim();
    if (text) {
      onTranscript(text);
    }
    transcriptRef.current = "";
  }, [onTranscript]);

  function start() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    transcriptRef.current = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          text += event.results[i][0].transcript + " ";
        }
      }
      transcriptRef.current = text;
    };

    recognition.onerror = () => {
      stop();
    };

    recognition.onend = () => {
      // If we're still supposed to be recording (didn't manually stop),
      // the browser auto-stopped — finalize.
      if (recognitionRef.current) {
        stop();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setElapsed(0);

    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= MAX_DURATION_S) {
          stop();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!supported) return null;

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const remaining = MAX_DURATION_S - elapsed;
  const remainingMin = Math.floor(remaining / 60);
  const remainingSec = remaining % 60;
  const remainingStr = `${remainingMin}:${remainingSec.toString().padStart(2, "0")}`;

  if (isRecording) {
    return (
      <button
        onClick={stop}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-sm text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
        </span>
        <span className="font-mono text-xs">{timeStr}</span>
        <span className="text-rose-400 text-xs">({remainingStr} left)</span>
        <Square className="w-3 h-3 fill-rose-500" />
      </button>
    );
  }

  return (
    <button
      onClick={start}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
      title="Record audio — we'll transcribe it into text"
    >
      <Mic className="w-3.5 h-3.5" />
      Record
    </button>
  );
}
