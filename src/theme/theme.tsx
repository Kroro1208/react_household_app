import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material";
import { blue, red, grey, green, lightBlue, cyan, lightGreen, deepOrange, amber, pink, orange, purple } from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
        incomeCategoryColor: Record<IncomeCategory, string>;
        expenseCategoryColor: Record<ExpenseCategory, string>;
    }

    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
        incomeCategoryColor?: Record<IncomeCategory, string>;
        expenseCategoryColor?: Record<ExpenseCategory, string>;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    },

    palette: {
        incomeColor: {
            main: green[500],
            light: green[100],
            dark: green[700]
        },

        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700]
        },

        balanceColor: {
            main: grey[500],
            light: grey[100],
            dark: grey[700]
        },

        incomeCategoryColor: {
            給与: lightBlue[600],
            副収入: cyan[200],
            お小遣い: green[500]
        },

        expenseCategoryColor: {
            食費: lightBlue[600],
            日用品: cyan[200],
            住居費: green[500],
            交際費: deepOrange[500],
            趣味: lightGreen[500],
            旅費: amber[500],
            勉強: pink[300],
            教育費: blue[300],
            保健: orange[200],
            医療費: purple[200],
            ペット: red[200]
        }
    }
})