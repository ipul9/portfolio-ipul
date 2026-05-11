import type { RoiDailyTrend, RoiByPlatform, RoiByProduct } from "./roi-types";

const PLATFORMS = ["Tiktok Ads", "Meta Ads", "Shopee Ads", "Google Ads", "CTWA"];
const PRODUCTS = [
  "Serum Wajah Brightening", "Krim Malam Anti-aging", "Toner Niacinamide",
  "Sunscreen SPF50", "Masker Clay Pori", "Eye Cream Peptide",
  "Body Lotion Whitening", "Lip Serum Plump", "Micellar Water",
  "Essence Hyaluronic", "Retinol Cream", "Vitamin C Serum",
  "BB Cream Natural", "Face Mist Hydra", "Cleanser Gentle",
];

function seed(n: number) {
  const x = Math.sin(n + 1) * 10000;
  return x - Math.floor(x);
}

function genDay(i: number) {
  const base = 180_000_000 + seed(i * 7) * 220_000_000;
  const spending = base * (0.22 + seed(i * 3) * 0.12);
  const advProfit = base - spending * (1 + 0.11);
  return {
    revenue: Math.round(base / 1000) * 1000,
    spending: Math.round(spending / 1000) * 1000,
    advertising_profit: Math.round(advProfit / 1000) * 1000,
    closing: Math.round(30 + seed(i * 5) * 120),
    roi_pct: Math.round((advProfit / spending) * 10000) / 100,
  };
}

// 60 days ending 2026-05-10
export const DAILY_TREND: RoiDailyTrend[] = Array.from({ length: 60 }, (_, i) => {
  const d = new Date("2026-05-10");
  d.setDate(d.getDate() - (59 - i));
  const day = genDay(i);
  return { tanggal: d.toISOString().slice(0, 10), ...day };
});

export const BY_PLATFORM: RoiByPlatform[] = PLATFORMS.map((platform, pi) => {
  const revenue = Math.round((120_000_000 + seed(pi * 11) * 800_000_000) / 1000) * 1000;
  const spending = Math.round(revenue * (0.20 + seed(pi * 7) * 0.15) / 1000) * 1000;
  const advProfit = Math.round((revenue - spending * 1.11) / 1000) * 1000;
  const closing = Math.round(200 + seed(pi * 3) * 1200);
  return {
    platform,
    closing,
    revenue,
    spending,
    advertising_profit: advProfit,
    roi_pct: Math.round((advProfit / spending) * 10000) / 100,
    gpm_pct: Math.round((advProfit / revenue) * 10000) / 100,
  };
});

export const BY_PRODUCT: RoiByProduct[] = PRODUCTS.map((produk, pi) => {
  const revenue = Math.round((40_000_000 + seed(pi * 13) * 360_000_000) / 1000) * 1000;
  const spending = Math.round(revenue * (0.18 + seed(pi * 9) * 0.18) / 1000) * 1000;
  const advProfit = Math.round((revenue - spending * 1.11) / 1000) * 1000;
  const closing = Math.round(50 + seed(pi * 5) * 600);
  return {
    produk,
    closing,
    revenue,
    spending,
    advertising_profit: advProfit,
    roi_pct: Math.round((advProfit / spending) * 10000) / 100,
    ads_profit_margin_pct: Math.round((advProfit / revenue) * 10000) / 100,
  };
});

export function filterByDatePreset(
  data: RoiDailyTrend[],
  preset: string,
  customStart?: string,
  customEnd?: string
): RoiDailyTrend[] {
  const today = new Date("2026-05-10");
  let start: Date, end: Date;

  if (preset === "7d") {
    start = new Date(today); start.setDate(today.getDate() - 6); end = today;
  } else if (preset === "30d") {
    start = new Date(today); start.setDate(today.getDate() - 29); end = today;
  } else if (preset === "mtd") {
    start = new Date(today.getFullYear(), today.getMonth(), 1); end = today;
  } else if (preset === "last_month") {
    start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    end = new Date(today.getFullYear(), today.getMonth(), 0);
  } else if (preset === "ytd") {
    start = new Date(today.getFullYear(), 0, 1); end = today;
  } else if (preset === "custom" && customStart && customEnd) {
    start = new Date(customStart); end = new Date(customEnd);
  } else {
    start = new Date(today); start.setDate(today.getDate() - 29); end = today;
  }

  const s = start.toISOString().slice(0, 10);
  const e = end.toISOString().slice(0, 10);
  return data.filter((d) => d.tanggal >= s && d.tanggal <= e);
}

export function calcSummary(data: RoiDailyTrend[]) {
  const total_revenue = data.reduce((a, d) => a + d.revenue, 0);
  const total_spending = data.reduce((a, d) => a + d.spending, 0);
  const total_advertising_profit = data.reduce((a, d) => a + d.advertising_profit, 0);
  const total_closing = data.reduce((a, d) => a + d.closing, 0);
  return {
    total_revenue,
    total_spending,
    total_advertising_profit,
    total_closing,
    ads_profit_margin_pct: total_revenue ? Math.round((total_advertising_profit / total_revenue) * 10000) / 100 : 0,
    roi_pct: total_spending ? Math.round((total_advertising_profit / total_spending) * 10000) / 100 : 0,
  };
}
