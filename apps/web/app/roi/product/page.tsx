"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { fmtRp, fmtPct } from "@/components/roi/KpiCard";
import { BY_PRODUCT } from "@/lib/roi-dummy";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"revenue" | "roi_pct" | "advertising_profit">("revenue");

  const sorted = [...BY_PRODUCT].sort((a, b) => b[sortKey] - a[sortKey]);
  const top15 = sorted.slice(0, 15);
  const filtered = sorted.filter((p) => p.produk.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Product Analyst</h1>
        <p className="text-sm text-gray-500">Performa {BY_PRODUCT.length} produk berdasarkan data dummy</p>
      </div>

      {/* Top 15 bar chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Top 15 Produk by Revenue</h2>
          <div className="flex flex-wrap gap-1">
            {(["revenue", "roi_pct", "advertising_profit"] as const).map((k) => (
              <button key={k} onClick={() => setSortKey(k)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${sortKey === k ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {k === "revenue" ? "Revenue" : k === "roi_pct" ? "ROI %" : "Profit"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={top15} layout="vertical" margin={{ left: 4, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }}
              tickFormatter={(v) => sortKey === "roi_pct" ? `${v.toFixed(0)}%` : `${(v / 1_000_000).toFixed(0)}M`} />
            <YAxis type="category" dataKey="produk" tick={{ fontSize: 10, fill: "#64748B" }} width={90} tickFormatter={(v: string) => v.length > 14 ? v.slice(0, 13) + "…" : v} />
            <Tooltip
              formatter={((v: unknown) => { const n = Number(v ?? 0); return sortKey === "roi_pct" ? [`${n.toFixed(1)}%`, sortKey] : [`Rp ${(n / 1_000_000).toFixed(1)}M`, sortKey]; }) as never}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Bar dataKey={sortKey} radius={[0, 3, 3, 0]}>
              {top15.map((entry, i) => (
                <Cell key={i} fill={entry.advertising_profit < 0 ? "#DC2626" : "#4F46E5"} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
          <h2 className="text-sm font-semibold text-gray-700">Semua Produk</h2>
          <input
            type="text" placeholder="Cari produk..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:w-48"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-gray-500">
              <tr>
                {["Produk", "Closing", "Revenue", "Spending", "Adv Profit", "APM %", "ROI %"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.produk} className={`border-t border-gray-50 hover:bg-slate-50 ${row.roi_pct < 0 ? "bg-red-50/60" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap max-w-[180px] truncate">{row.produk}</td>
                  <td className="px-4 py-2.5 text-gray-600">{row.closing.toLocaleString("id")}</td>
                  <td className="px-4 py-2.5 text-emerald-700">{fmtRp(row.revenue)}</td>
                  <td className="px-4 py-2.5 text-red-600">{fmtRp(row.spending)}</td>
                  <td className={`px-4 py-2.5 font-medium ${row.advertising_profit >= 0 ? "text-blue-700" : "text-red-700"}`}>
                    {fmtRp(row.advertising_profit)}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{fmtPct(row.ads_profit_margin_pct)}</td>
                  <td className={`px-4 py-2.5 font-semibold ${row.roi_pct >= 100 ? "text-emerald-600" : row.roi_pct >= 0 ? "text-amber-600" : "text-red-600"}`}>
                    {row.roi_pct.toFixed(1)}%
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-400">Produk tidak ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
