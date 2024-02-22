import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material";
import { blue, red, grey, green } from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
    }

    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
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
    }
})