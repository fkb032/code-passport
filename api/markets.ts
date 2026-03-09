// Fetches existing market knowledge files from the GitHub repo.
// Public repo, no auth needed.

import type { VercelRequest, VercelResponse } from "@vercel/node";

const REPO = "fkb032/code-passport";
const MARKETS_PATH = "skills/code-passport/markets";

interface GitHubFile {
  name: string;
  download_url: string;
  type: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const listRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${MARKETS_PATH}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "code-passport",
        },
      }
    );

    if (!listRes.ok) {
      return res.json({ markets: {} });
    }

    const files: GitHubFile[] = await listRes.json();
    const mdFiles = files.filter(
      (f) => f.type === "file" && f.name.endsWith(".md")
    );

    const markets: Record<string, string> = {};
    await Promise.all(
      mdFiles.map(async (file) => {
        try {
          const r = await fetch(file.download_url);
          if (r.ok) {
            markets[file.name] = await r.text();
          }
        } catch {
          // skip
        }
      })
    );

    return res.json({ markets });
  } catch {
    return res.json({ markets: {} });
  }
}
