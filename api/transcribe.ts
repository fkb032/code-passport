// Whisper transcription endpoint.
// Accepts audio blob via multipart form, sends to OpenAI Whisper API, returns transcript.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { IncomingForm } from "formidable";
import { readFileSync } from "fs";

export const config = {
  api: {
    bodyParser: false, // Required for multipart form parsing
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).send("Transcription not configured");
  }

  try {
    // Parse the multipart form data
    const form = new IncomingForm({ maxFileSize: 3 * 1024 * 1024 });

    const { files } = await new Promise<{ files: Record<string, any> }>(
      (resolve, reject) => {
        form.parse(req, (err, _fields, files) => {
          if (err) reject(err);
          else resolve({ files });
        });
      }
    );

    const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;
    if (!audioFile) {
      return res.status(400).send("Audio file is required");
    }

    // Read the file and send to Whisper
    const fileBuffer = readFileSync(audioFile.filepath);
    const blob = new Blob([fileBuffer], {
      type: audioFile.mimetype || "audio/webm",
    });

    const whisperForm = new FormData();
    whisperForm.append("file", blob, audioFile.originalFilename || "recording.webm");
    whisperForm.append("model", "whisper-1");
    whisperForm.append("response_format", "json");

    const whisperRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: whisperForm,
      }
    );

    if (!whisperRes.ok) {
      const error = await whisperRes.text();
      console.error("Whisper API error:", error);
      return res.status(502).send("Transcription failed");
    }

    const data = await whisperRes.json();
    return res.json({ text: data.text || "" });
  } catch (error) {
    console.error("Transcribe endpoint error:", error);
    return res.status(500).send("Internal server error");
  }
}
