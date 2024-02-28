export type TransactionType = "income" | "expense";
export type IncomeCategory = "給料" | "副収入" | "お小遣い";
export type ExpenseCategory =
  | "食費"
  | "日用品"
  | "住居費"
  | "交際費"
  | "趣味"
  | "旅費"
  | "勉強"
  | "教育費"
  | "保健"
  | "医療費"
  | "ペット";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: IncomeCategory | ExpenseCategory;
}

export interface Balance {
  income: number;
  expense: number;
  balance: number;
}

export interface CalendarContent {
  start: string;
  income: string;
  expense: string;
  balance: string;
}
