export interface RoiSummary {
  total_closing: number;
  total_revenue: number;
  total_spending: number;
  total_advertising_profit: number;
  ads_profit_margin_pct: number;
  roi_pct: number;
}

export interface RoiDailyTrend {
  tanggal: string;
  revenue: number;
  spending: number;
  advertising_profit: number;
  closing: number;
  roi_pct: number;
}

export interface RoiByPlatform {
  platform: string;
  closing: number;
  revenue: number;
  spending: number;
  advertising_profit: number;
  roi_pct: number;
  gpm_pct: number;
}

export interface RoiByProduct {
  produk: string;
  closing: number;
  revenue: number;
  spending: number;
  advertising_profit: number;
  roi_pct: number;
  ads_profit_margin_pct: number;
}

export type DatePreset = "7d" | "30d" | "mtd" | "last_month" | "ytd";
