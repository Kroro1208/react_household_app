import { Grid, Paper } from "@mui/material"
import MonthSelector from "../components/MonthSelector"
import CategoryChart from "../components/CategoryChart"
import TransactionTable from "../components/TransactionTable"
import BarChart from "../components/BarChart"

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Report = ({ currentMonth, setCurrentMonth }: ReportProps) => {

  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
    p: 2
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}><CategoryChart /></Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}><BarChart /></Paper>
      </Grid>
      <Grid item xs={12}>
        <TransactionTable />
      </Grid>
    </Grid>
  )
}

export default Report
