"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart, Line, Legend,
} from "recharts";
import KpiCard, { fmtRp, fmtPct } from "@/components/roi/KpiCard";
import FilterBar from "@/components/roi/FilterBar";
import { DAILY_TREND, BY_PLATFORM, filterByDatePreset, calcSummary } from "@/lib/roi-dummy";
import type { DatePreset } from "@/lib/roi-types";

const COLORS = ["#4F46E5", "#0891B2", "#16A34A", "#D97706", "#7C3AED"];

function pctDiff(curr: number, prev: number) {
  if (!prev) return 0;
  return ((curr - prev) / Math.abs(prev)) * 100;
}

export default function PlatformPage() {
  const [preset, setPreset] = useState<DatePreset>("30d");

  const curr = useMemo(() => filterByDatePreset(DAILY_TREND, preset), [preset]);
  const prev = useMemo(() => {
    const days = curr.length;
    const firstDate = new Date(curr[0]?.tanggal ?? "2026-04-11");
    const prevEnd = new Date(firstDate); prevEnd.setDate(firstDate.getDate() - 1);
    const prevStart = new Date(prevEnd); prevStart.setDate(prevEnd.getDate() - days + 1);
    return DAILY_TREND.filter(
      (d) => d.tanggal >= prevStart.toISOString().slice(0, 10) &&
             d.tanggal <= prevEnd.toISOString().slice(0, 10)
    );
  }, [curr]);

  const s = useMemo(() => calcSummary(curr), [curr]);
  const p = useMemo(() => calcSummary(prev), [prev]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Platform Analyst</h1>
          <p className="text-sm text-gray-500">Breakdown performa per platform iklan</p>
        </div>
        <FilterBar active={preset} onChange={setPreset} />
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <KpiCard label="Adv Profit" value={fmtRp(s.total_advertising_profit)} delta={pctDiff(s.total_advertising_profit, p.total_advertising_profit)} prevValue={fmtRp(p.total_advertising_profit)} accent="blue" />
        <KpiCard label="Spending" value={fmtRp(s.total_spending)} delta={pctDiff(s.total_spending, p.total_spending)} prevValue={fmtRp(p.total_spending)} accent="red" invertDelta />
        <KpiCard label="ROI" value={fmtPct(s.roi_pct)} delta={pctDiff(s.roi_pct, p.roi_pct)} prevValue={fmtPct(p.roi_pct)} accent={s.roi_pct >= 100 ? "green" : "red"} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Spending vs Profit per platform */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Spending vs Adv Profit per Platform</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={BY_PLATFORM} layout="vertical" margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
              <YAxis type="category" dataKey="platform" tick={{ fontSize: 10, fill: "#64748B" }} width={80} />
              <Tooltip formatter={((v: unknown) => `Rp ${(Number(v ?? 0) / 1_000_000).toFixed(0)}M`) as never}
                contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="spending" name="Spending" fill="#DC2626" opacity={0.8} radius={[0, 3, 3, 0]} />
              <Bar dataKey="advertising_profit" name="Adv Profit" fill="#4F46E5" opacity={0.8} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending & ROI trend */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Tren Spending & ROI Harian</h2>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={curr} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="tanggal" tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(v) => v.slice(5)} interval={Math.floor(curr.length / 6)} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} width={44} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(v) => `${v}%`} width={38} />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={((value: unknown, name: string) => {
                  const v = Number(value ?? 0);
                  return name === "ROI %" ? [`${v.toFixed(1)}%`, name] : [`Rp ${(v / 1_000_000).toFixed(1)}M`, name];
                }) as never}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar yAxisId="left" dataKey="spending" name="Spending" fill="#DC2626" opacity={0.7} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="advertising_profit" name="Adv Profit" fill="#4F46E5" opacity={0.7} radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="roi_pct" name="ROI %" stroke="#0891B2" dot={false} strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Detail per Platform</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-gray-500">
              <tr>
                {["Platform", "Closing", "Revenue", "Spending", "GPM %", "Adv Profit", "ROI %"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...BY_PLATFORM].sort((a, b) => b.revenue - a.revenue).map((row, i) => (
                <tr key={row.platform} className={`border-t border-gray-50 hover:bg-slate-50 ${row.roi_pct < 0 ? "bg-red-50/60" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      {row.platform}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{row.closing.toLocaleString("id")}</td>
                  <td className="px-4 py-2.5 text-emerald-700">{fmtRp(row.revenue)}</td>
                  <td className="px-4 py-2.5 text-red-600">{fmtRp(row.spending)}</td>
                  <td className="px-4 py-2.5 text-gray-600">{fmtPct(row.gpm_pct)}</td>
                  <td className={`px-4 py-2.5 font-medium ${row.advertising_profit >= 0 ? "text-blue-700" : "text-red-700"}`}>
                    {fmtRp(row.advertising_profit)}
                  </td>
                  <td className={`px-4 py-2.5 font-semibold ${row.roi_pct >= 100 ? "text-emerald-600" : row.roi_pct >= 0 ? "text-amber-600" : "text-red-600"}`}>
                    {row.roi_pct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
