import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from '../types';
ChartJS.register(ArcElement, Tooltip, Legend);

interface categoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const CategoryChart = ({ monthlyTransactions, isLoading }: categoryChartProps) => {
  const theme = useTheme()
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");
  const handleChange = (e: SelectChangeEvent<TransactionType>) => {
    setSelectedType(e.target.value as TransactionType);
  }

  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === selectedType)
    .reduce<Record<IncomeCategory | ExpenseCategory, number>>((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<IncomeCategory | ExpenseCategory, number>);

  const categoryLabels = Object.keys(categorySums) as (IncomeCategory | ExpenseCategory)[];
  const categoryValues = Object.values(categorySums);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const incomeCategoryColor: Record<IncomeCategory, string> = {
    "給与": theme.palette.incomeCategoryColor.給与,
    "副収入": theme.palette.incomeCategoryColor.副収入,
    "お小遣い": theme.palette.incomeCategoryColor.お小遣い,
  }

  const expenseCategoryColor: Record<ExpenseCategory, string> = {
    "食費": theme.palette.expenseCategoryColor.食費,
    "日用品": theme.palette.expenseCategoryColor.日用品,
    "住居費": theme.palette.expenseCategoryColor.住居費,
    "交際費": theme.palette.expenseCategoryColor.交際費,
    "趣味": theme.palette.expenseCategoryColor.趣味,
    "旅費": theme.palette.expenseCategoryColor.旅費,
    "教育費": theme.palette.expenseCategoryColor.教育費,
    "保健": theme.palette.expenseCategoryColor.保健,
    "医療費": theme.palette.expenseCategoryColor.医療費,
    "ペット": theme.palette.expenseCategoryColor.ペット,
    "勉強": theme.palette.expenseCategoryColor.勉強,
  }

  const getCategoryColor = (category: IncomeCategory | ExpenseCategory): string => {
    if (selectedType == "income") {
      return incomeCategoryColor[category as IncomeCategory];
    } else {
      return expenseCategoryColor[category as ExpenseCategory];
    }
  }

  const data: ChartData<"pie"> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        borderColor: categoryLabels.map((category) =>
        getCategoryColor(category)
      ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* <TextField label="収支の種類" select fullWidth value={selectedType} onChange={handleChange}>
        <MenuItem value={"income"}>収入</MenuItem>
        <MenuItem value={"expense"}>支出</MenuItem>
      </TextField> */}
      <FormControl fullWidth>
        <InputLabel id="type-select-label">収支の種類</InputLabel>
        <Select
          labelId='type-select-label'
          id="type-select"
          value={selectedType}
          label="収支の種類"
          onChange={handleChange}
        >
          <MenuItem value={"income"}>収入</MenuItem>
          <MenuItem value={"expense"}>支出</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          isLoading ? (
            <CircularProgress />
          ) : monthlyTransactions.length > 0 ? (
            <Pie data={data} options={options} />
          ) : (
            <Typography>データがありません</Typography>
          )
        }
      </Box >
    </>
  )
}

export default CategoryChart
