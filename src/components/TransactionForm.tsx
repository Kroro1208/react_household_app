import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
import MoneyIcon from '@mui/icons-material/Money';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';
import { zodResolver } from '@hookform/resolvers/zod';


import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { ExpenseCategory, IncomeCategory } from "../types";
import { transactionSchema } from "../validations/schema";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string
}

type incomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

// interface IFormInput {
//   type: string;
//   date: string;
//   amount: number;
//   category: string;
//   content: string;
// }

const TransactionForm = ({ onCloseForm, isEntryDrawerOpen, currentDay }: TransactionFormProps) => {
  // const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
  const { control, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: ""
    },
    resolver: zodResolver(transactionSchema),
  });

  console.log(errors);

  // const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: < FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: < LocalGroceryStoreIcon fontSize="small" /> },
    { label: "住居費", icon: < HomeWorkIcon fontSize="small" /> },
    { label: "交際費", icon: < Diversity3Icon fontSize="small" /> },
    { label: "趣味", icon: < SportsEsportsIcon fontSize="small" /> },
    { label: "旅費", icon: < LocalAirportIcon fontSize="small" /> },
    { label: "教育費", icon: < ChildCareIcon fontSize="small" /> },
    { label: "保健", icon: < LocalHospitalIcon fontSize="small" /> },
    { label: "医療費", icon: < VaccinesIcon fontSize="small" /> },
    { label: "ペット", icon: < PetsIcon fontSize="small" /> },
    { label: "勉強", icon: < SchoolIcon fontSize="small" /> },
  ]

  const incomeCategories: CategoryItem[] = [
    { label: "給料", icon: < AttachMoneyIcon fontSize="small" /> },
    { label: "お小遣い", icon: < MoneyIcon fontSize="small" /> },
    { label: "副収入", icon: < PaidIcon fontSize="small" /> },

  ]

  const [categories, setCategories] = useState(expenseCategories);

  const incomeExpenseToggle = (type: incomeExpense) => {
    setValue("type", type);
  };

  // 収支タイプを監視
  const currentType = watch("type");

  useEffect(() => {
    setValue('date', currentDay);
  }, [currentDay]);

  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType])

  const onSubmit = (data: any) => {
    console.log(data);
  }


  const formWidth = 320;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        // フォーム開閉のアニメーション
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}

      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <ButtonGroup fullWidth>
                  <Button variant={field.value === "expense" ? "contained" : "outlined"}
                    color="error" onClick={() => incomeExpenseToggle("expense")}>
                    支出
                  </Button>
                  <Button variant={field.value === "income" ? "contained" : "outlined"}
                    color={"primary"} onClick={() => incomeExpenseToggle("income")}>
                    収入
                  </Button>
                </ButtonGroup>
              );
            }}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field} id="カテゴリ" label="カテゴリ" select>
                {categories.map((category, index) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field} label="金額" type="number" value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }} />
            )}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field} label="内容" type="text" />
            )}
          />

          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={currentType === "income" ? "primary" : "error"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
