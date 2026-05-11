"use client";

import { DatePreset } from "@/lib/roi-types";

const PRESETS: { key: DatePreset; label: string }[] = [
  { key: "7d", label: "7 Hari" },
  { key: "30d", label: "30 Hari" },
  { key: "mtd", label: "Bulan Ini" },
  { key: "last_month", label: "Bulan Lalu" },
  { key: "ytd", label: "YTD" },
];

interface FilterBarProps {
  active: DatePreset;
  onChange: (p: DatePreset) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-gray-400 mr-1">Periode:</span>
      {PRESETS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            active === key
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
