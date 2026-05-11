"use client";

import { useState, useMemo } from "react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import KpiCard, { fmtRp, fmtPct } from "@/components/roi/KpiCard";
import FilterBar from "@/components/roi/FilterBar";
import { DAILY_TREND, BY_PLATFORM, filterByDatePreset, calcSummary } from "@/lib/roi-dummy";
import type { DatePreset } from "@/lib/roi-types";

const COLORS = ["#4F46E5", "#0891B2", "#16A34A", "#D97706", "#7C3AED"];
const fmt = (v: number) => `${(v / 1_000_000).toFixed(0)}M`;

function pctDiff(curr: number, prev: number) {
  if (!prev) return 0;
  return ((curr - prev) / Math.abs(prev)) * 100;
}

export default function RoiPage() {
  const [preset, setPreset] = useState<DatePreset>("30d");

  const curr = useMemo(() => filterByDatePreset(DAILY_TREND, preset), [preset]);
  const prev = useMemo(() => {
    if (curr.length === 0) return [];
    const days = curr.length;
    const firstDate = new Date(curr[0].tanggal);
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
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-500">{curr.length} hari data · {curr[0]?.tanggal} – {curr[curr.length - 1]?.tanggal}</p>
        </div>
        <FilterBar active={preset} onChange={setPreset} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <KpiCard label="Revenue" value={fmtRp(s.total_revenue)} delta={pctDiff(s.total_revenue, p.total_revenue)} prevValue={fmtRp(p.total_revenue)} accent="green" />
        <KpiCard label="Spending" value={fmtRp(s.total_spending)} delta={pctDiff(s.total_spending, p.total_spending)} prevValue={fmtRp(p.total_spending)} accent="red" invertDelta />
        <KpiCard label="Adv Profit" value={fmtRp(s.total_advertising_profit)} delta={pctDiff(s.total_advertising_profit, p.total_advertising_profit)} prevValue={fmtRp(p.total_advertising_profit)} accent="blue" />
        <KpiCard label="ROI" value={fmtPct(s.roi_pct)} delta={pctDiff(s.roi_pct, p.roi_pct)} prevValue={fmtPct(p.roi_pct)} accent={s.roi_pct >= 100 ? "green" : "red"} />
        <KpiCard label="APM" value={fmtPct(s.ads_profit_margin_pct)} delta={pctDiff(s.ads_profit_margin_pct, p.ads_profit_margin_pct)} prevValue={fmtPct(p.ads_profit_margin_pct)} accent="amber" />
        <KpiCard label="Closing" value={s.total_closing.toLocaleString("id")} delta={pctDiff(s.total_closing, p.total_closing)} prevValue={p.total_closing.toLocaleString("id")} accent="blue" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trend chart */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Tren Harian — Revenue & Spending</h2>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={curr} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="tanggal" tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(v) => v.slice(5)} interval={Math.floor(curr.length / 7)} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#94A3B8" }} tickFormatter={fmt} width={48} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(v) => `${v}%`} width={40} />
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={((value: unknown, name: string) => {
                  const v = Number(value ?? 0);
                  return name === "ROI %" ? [`${v.toFixed(1)}%`, name] : [`Rp ${(v / 1_000_000).toFixed(1)}M`, name];
                }) as never}
                labelFormatter={(l) => `Tanggal: ${l}`}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#16A34A" opacity={0.8} radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="spending" name="Spending" fill="#DC2626" opacity={0.7} radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="roi_pct" name="ROI %" stroke="#0891B2" dot={false} strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Spending per Platform</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={BY_PLATFORM} dataKey="spending" nameKey="platform" cx="50%" cy="50%"
                innerRadius={55} outerRadius={80} paddingAngle={3}>
                {BY_PLATFORM.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={((v: unknown) => `Rp ${(Number(v ?? 0) / 1_000_000).toFixed(0)}M`) as never}
                contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-col gap-1">
            {BY_PLATFORM.map((p, i) => (
              <div key={p.platform} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-gray-600">{p.platform}</span>
                </div>
                <span className="text-gray-500">{fmtRp(p.spending)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Detail Harian</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-50 text-gray-500">
              <tr>
                {["Tanggal", "Closing", "Revenue", "Spending", "Adv Profit", "ROI %"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...curr].reverse().map((d) => (
                <tr key={d.tanggal}
                  className={`border-t border-gray-50 hover:bg-slate-50 ${d.roi_pct < 0 ? "bg-red-50/60" : ""}`}>
                  <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">{d.tanggal}</td>
                  <td className="px-4 py-2 text-gray-600">{d.closing.toLocaleString("id")}</td>
                  <td className="px-4 py-2 text-emerald-700">{fmtRp(d.revenue)}</td>
                  <td className="px-4 py-2 text-red-600">{fmtRp(d.spending)}</td>
                  <td className={`px-4 py-2 font-medium ${d.advertising_profit >= 0 ? "text-blue-700" : "text-red-700"}`}>
                    {fmtRp(d.advertising_profit)}
                  </td>
                  <td className={`px-4 py-2 font-semibold ${d.roi_pct >= 100 ? "text-emerald-600" : d.roi_pct >= 0 ? "text-amber-600" : "text-red-600"}`}>
                    {d.roi_pct.toFixed(1)}%
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
