import { Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const MonthSelector = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button color={"error"} variant={"contained"}>先月</Button>
                <div><DatePicker sx={{ mx: 2 }} /></div>
                <Button color={"primary"} variant={"contained"}>次月</Button>
            </Box>
        </LocalizationProvider>
    )
}

export default MonthSelector
