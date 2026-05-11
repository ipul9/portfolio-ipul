"use client";

function fmtCompact(n: number) {
  if (Math.abs(n) >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toFixed(0);
}

export function fmtRp(n: number) { return `Rp ${fmtCompact(n)}`; }
export function fmtPct(n: number) { return `${n.toFixed(1)}%`; }

interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  prevValue: string;
  accent: "green" | "red" | "blue" | "amber";
  invertDelta?: boolean;
}

const accentMap = {
  green: "border-emerald-500 bg-emerald-50",
  red: "border-red-500 bg-red-50",
  blue: "border-blue-500 bg-blue-50",
  amber: "border-amber-500 bg-amber-50",
};

const accentText = {
  green: "text-emerald-600",
  red: "text-red-600",
  blue: "text-blue-600",
  amber: "text-amber-600",
};

export default function KpiCard({ label, value, delta, prevValue, accent, invertDelta }: KpiCardProps) {
  const positive = invertDelta ? delta < 0 : delta > 0;
  const deltaColor = delta === 0 ? "text-gray-400" : positive ? "text-emerald-600" : "text-red-600";
  const arrow = delta === 0 ? "→" : delta > 0 ? "▲" : "▼";

  return (
    <div className={`rounded-xl border-l-4 bg-white p-4 shadow-sm ${accentMap[accent]}`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accentText[accent]}`}>{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className={`font-medium ${deltaColor}`}>
          {arrow} {Math.abs(delta).toFixed(1)}%
        </span>
        <span className="text-gray-400">vs prev · {prevValue}</span>
      </div>
    </div>
  );
}
