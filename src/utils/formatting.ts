import { format } from "date-fns";

export function formatMonth(date: Date): string {
  return format(date, "yyyy-MM");
}

// 千円単位に変換する関数(1,500円)
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("ja-JP");
}
