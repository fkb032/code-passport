// Streaming chat endpoint powered by the Claude API.
// Accepts conversation messages, prepends the contribute-market system prompt,
// and streams the response back.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildSystemPrompt } from "./_lib/system-prompt";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  existingMarkets?: Record<string, string>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).send("Server configuration error");
  }

  const body = req.body as ChatRequest;
  const { messages, existingMarkets = {} } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).send("Messages array is required");
  }

  const systemPrompt = buildSystemPrompt(existingMarkets);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Claude API error:", error);
      return res.status(502).send("Failed to get response from AI");
    }

    // Set up SSE streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = response.body?.getReader();
    if (!reader) {
      return res.status(502).send("No response stream");
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error("Chat endpoint error:", error);
    if (!res.headersSent) {
      return res.status(500).send("Internal server error");
    }
    res.end();
  }
}
