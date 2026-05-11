import fs from "fs";
import path from "path";

export interface WorkEntry {
  slug: string;
  title: string;
  client: string;
  year: number;
  summary: string;
  stack: string[];
  cover?: string;
  anonymized?: boolean;
}

export interface WorkContentSection {
  heading: string;
  body: string;
}

export interface WorkContent {
  slug: string;
  sections: WorkContentSection[];
  screenshots?: string[];
  links?: {
    demo?: string | null;
    source?: string | null;
  };
}

export function getWorkEntries(): WorkEntry[] {
  const file = path.join(process.cwd(), "data/work.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as WorkEntry[];
}

export function getWorkContent(slug: string): WorkContent | null {
  const file = path.join(process.cwd(), "data/content/work", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as WorkContent;
}
