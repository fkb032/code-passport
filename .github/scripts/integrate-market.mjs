import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const MARKETS_DIR = "skills/code-passport/markets";
const SKILL_PATH = "skills/code-passport/SKILL.md";

function isChecklistFormat(content) {
  // Checklist format has tables with "Check | How to Verify | Severity"
  const tableCount = (
    content.match(/\|\s*Check\s*\|\s*How to Verify\s*\|\s*Severity\s*\|/g) ||
    []
  ).length;
  // Needs at least 3 category tables to count as checklist format
  return tableCount >= 3;
}

function getMarketFiles() {
  if (!fs.existsSync(MARKETS_DIR)) return [];
  return fs
    .readdirSync(MARKETS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      name: f.replace(".md", ""),
      path: path.join(MARKETS_DIR, f),
      content: fs.readFileSync(path.join(MARKETS_DIR, f), "utf-8"),
    }));
}

async function convertToChecklist(marketName, content) {
  const client = new Anthropic();

  // Use Brazil checklist as the reference format
  const brazilPath = path.join(MARKETS_DIR, "brazil.md");
  if (!fs.existsSync(brazilPath)) {
    console.error("Brazil checklist not found — needed as format reference");
    process.exit(1);
  }
  const brazilChecklist = fs.readFileSync(brazilPath, "utf-8");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
    messages: [
      {
        role: "user",
        content: `You are converting a market knowledge file into a structured audit checklist for the Code Passport tool. Code Passport audits codebases for market-specific cultural, UX, and product issues.

Here is the Brazil checklist as a reference for the exact format to follow:

<example_format>
${brazilChecklist}
</example_format>

Now convert this ${marketName} market knowledge file into the same structured checklist format:

<knowledge>
${content}
</knowledge>

Rules:
- Start with "# Code Passport: ${marketName.charAt(0).toUpperCase() + marketName.slice(1)} Checklist" and a one-line description
- Use the exact same structure: categories with markdown tables (Check | How to Verify | Severity), followed by "How to scan" code blocks with grep/read patterns
- Adapt categories to what's relevant for this market. Not all Brazil categories apply, and some markets need unique categories (e.g., RTL for Arabic, regulatory for India)
- Every check must be concrete and verifiable from code — something you can grep, read, or inspect in a file. No subjective checks
- CRITICAL = will definitely break functionality or violate law. WARNING = will underperform or miss best practice
- Include a "Contextual Intelligence" section at the end adapting audit behavior by product type
- Include a "How to scan" block after each category table with specific grep terms and file patterns
- Output ONLY the markdown checklist. No preamble, no explanation, no wrapping`,
      },
    ],
  });

  return response.content[0].text;
}

function updateSkillMarkets(marketNames) {
  let skill = fs.readFileSync(SKILL_PATH, "utf-8");

  const marketList = marketNames
    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
    .join(", ");

  // Update the supported markets line in the body
  skill = skill.replace(
    /\*\*Supported markets:\*\*.*/,
    `**Supported markets:** ${marketList}`
  );

  // Update description in frontmatter
  skill = skill.replace(
    /description: .*/,
    `description: Audit a codebase for market-specific cultural, UX, and product considerations. Currently supports ${marketList}.`
  );

  fs.writeFileSync(SKILL_PATH, skill);
  console.log(`Updated SKILL.md supported markets: ${marketList}`);
}

async function main() {
  const markets = getMarketFiles();

  if (markets.length === 0) {
    console.log("No market files found in skills/code-passport/markets/");
    return;
  }

  const marketNames = markets.map((m) => m.name);
  console.log(`Found markets: ${marketNames.join(", ")}`);

  let anyConverted = false;

  for (const market of markets) {
    if (isChecklistFormat(market.content)) {
      console.log(`${market.name}: already in checklist format, skipping`);
      continue;
    }

    console.log(`${market.name}: converting to checklist format...`);
    try {
      const checklist = await convertToChecklist(market.name, market.content);
      fs.writeFileSync(market.path, checklist);
      console.log(`${market.name}: conversion complete`);
      anyConverted = true;
    } catch (err) {
      console.error(`${market.name}: conversion failed — ${err.message}`);
      // Don't exit — continue with other markets and still update the list
    }
  }

  // Always update supported markets list (even if no conversions happened,
  // a new market file in checklist format was added directly)
  updateSkillMarkets(marketNames);

  if (anyConverted) {
    console.log("Conversions completed. Changes will be submitted as a PR.");
  } else {
    console.log(
      "No conversions needed. Supported markets list updated if changed."
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
