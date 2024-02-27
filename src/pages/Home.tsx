import { Box } from '@mui/material'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import Transaction from '../components/Transaction'
import TransactionForm from '../components/TransactionForm'
import { Transaction as TransactionType } from '../types'
import TransactionMenu from '../components/TransactionMenu'
import { useState } from 'react'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: TransactionType[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);

  const DailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  console.log(DailyTransactions);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} setCurrentDay={setCurrentDay} />
      </Box>
      {/* 右側 */}
      <Box>
        <Transaction />
        <TransactionForm />
        <TransactionMenu />
      </Box>
    </Box>
  )
}

export default Home
