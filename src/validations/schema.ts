import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額は1以上の数字を入力してください" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内にしてください" }),
  category: z
    .union([
      z.enum([
        "食費",
        "日用品",
        "住居費",
        "交際費",
        "教育費",
        "医療費",
        "趣味",
        "旅費",
        "保健",
        "ペット",
        "勉強",
      ]),
      z.literal(""),
      z.enum(["給与", "副収入", "お小遣い"]),
    ])
    .refine((val) => val !== "", { message: "カテゴリーを選択してください" }),
});

export type Schema = z.infer<typeof transactionSchema>;
