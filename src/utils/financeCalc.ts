import { Balance, Transaction } from "../types";

export function financeCalc(transactions: Transaction[]): Balance {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type == "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );
}

// 日付ごとの収支計算
export function calcDailyBalance(
  transactions: Transaction[]
): Record<string, Balance> {
  {
    return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
      const day = transaction.date;
      if (!acc[day]) {
        acc[day] = { income: 0, expense: 0, balance: 0 };
      }

      if (transaction.type === "income") {
        acc[day].income += transaction.amount;
      } else {
        acc[day].expense += transaction.amount;
      }
      acc[day].balance = acc[day].income - acc[day].expense;
      return acc;
    }, {});

    // 下記のような値がtransactionとして渡ってくる
    // "2024-02-23": {income: 0, expense: 500, balance: -500},
    // "2024-02-23": {income: 0, expense: 700, balance: -700},
    // "2024-02-23": {income: 5000, expense: 0, balance: 5000},
  }
}
