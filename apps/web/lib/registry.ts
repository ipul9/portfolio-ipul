import fs from "fs";
import path from "path";

export type PrototypeStatus = "live" | "wip" | "archived";

export interface Prototype {
  id: string;
  title: string;
  description: string;
  stack: string[];
  status: PrototypeStatus;
  demo_url?: string;
  github_path: string;
  created_at: string;
}

// process.cwd() = apps/web/ at build time; registry.json is at repo root (2 levels up)
export function getPrototypes(): Prototype[] {
  const registryPath = path.join(process.cwd(), "../../registry.json");
  const raw = fs.readFileSync(registryPath, "utf-8");
  return JSON.parse(raw) as Prototype[];
}

export function getAllStacks(prototypes: Prototype[]): string[] {
  const stacks = new Set<string>();
  prototypes.forEach((p) => p.stack.forEach((s) => stacks.add(s)));
  return Array.from(stacks).sort();
}
