import type { FormState } from "../types";
import { SECTIONS } from "../constants";

export function generateMarkdown(state: FormState): string {
  const lines: string[] = [];

  lines.push(`# Code Passport: ${state.market}`);
  lines.push("");
  lines.push("## Overview");
  lines.push("");
  lines.push(state.overview || "<!-- Needs contributor -->");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Stories from the field");
  lines.push("");

  const validStories = state.stories.filter(
    (s) => s.title.trim() && s.content.trim()
  );

  if (validStories.length === 0) {
    lines.push("<!-- Needs contributor -->");
  } else {
    for (const story of validStories) {
      lines.push(`### ${story.title}`);
      lines.push("");
      lines.push(story.content);
      lines.push("");
      if (story.principle.trim()) {
        lines.push(`**Principle:** ${story.principle}`);
        lines.push("");
      }
    }
  }

  lines.push("---");
  lines.push("");

  for (const section of SECTIONS) {
    const data = state.sections[section.id];

    lines.push(`## ${section.id}. ${section.name}`);
    lines.push("");

    if (data.skipped || (!data.content.trim() && data.checklistItems.length === 0)) {
      lines.push("<!-- Needs contributor -->");
    } else {
      if (data.content.trim()) {
        lines.push(data.content);
        lines.push("");
      }

      if (data.checklistItems.length > 0) {
        lines.push("**Audit checklist:**");
        for (const item of data.checklistItems) {
          if (item.trim()) {
            lines.push(`- [ ] ${item}`);
          }
        }
      }
    }

    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}
