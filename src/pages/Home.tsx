import { Box } from '@mui/material'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import Transaction from '../components/Transaction'
import TransactionForm from '../components/TransactionForm'
import { Transaction as TransactionType } from '../types'

interface HomeProps {
  monthlyTransactions: TransactionType[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />
      </Box>
      {/* 右側 */}
      <Box>
        <Transaction />
        <TransactionForm />
      </Box>
    </Box>
  )
}

export default Home
