"use client";

import { useState } from "react";
import { Prototype } from "@/lib/registry";
import PrototypeCard from "./PrototypeCard";
import StackFilter from "./StackFilter";

export default function PortfolioGrid({
  prototypes,
  stacks,
}: {
  prototypes: Prototype[];
  stacks: string[];
}) {
  const [activeStack, setActiveStack] = useState<string | null>(null);

  const filtered = activeStack
    ? prototypes.filter((p) => p.stack.includes(activeStack))
    : prototypes;

  return (
    <div className="flex flex-col gap-6">
      <StackFilter stacks={stacks} active={activeStack} onChange={setActiveStack} />

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada prototype. Tambahkan entry ke registry.json.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proto) => (
            <PrototypeCard key={proto.id} proto={proto} />
          ))}
        </div>
      )}
    </div>
  );
}
