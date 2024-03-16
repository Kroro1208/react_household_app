import { Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addMonths } from 'date-fns';
import { ja } from "date-fns/locale"

interface MonthlySelectorProps {
    currentMonth: Date;
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({ currentMonth, setCurrentMonth }: MonthlySelectorProps) => {
    const handlePreviousMonth = () => {
        const previousMonth = addMonths(currentMonth, -1);
        setCurrentMonth(previousMonth);
    }

    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth, +1);
        setCurrentMonth(nextMonth);
    }

    const handleDateChange = (newDate: Date | null) => {
        if (newDate) {
            setCurrentMonth(newDate);
        }
    }

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ja}
            dateFormats={{ monthAndYear: "yyyy年 MM月" }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button color={"error"} variant={"contained"} onClick={handlePreviousMonth}>先月</Button>
                <DatePicker sx={{ mx: 2, background: "white" }}
                    onChange={handleDateChange}
                    value={currentMonth}
                    label="年月を選択"
                    views={["year", "month"]}
                    format={"yyyy年MM月"}
                    slotProps={{
                        toolbar: {
                            toolbarFormat: "yyyy年MM月"
                        }
                    }} />
                <Button color={"primary"} variant={"contained"} onClick={handleNextMonth}>次月</Button>
            </Box>
        </LocalizationProvider>
    )
}

export default MonthSelector
