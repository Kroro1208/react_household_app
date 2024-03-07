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
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  console.log(dailyTransactions);

  // 内訳フォームをデフォルトでは閉じた状態にしておく
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };

  // 内訳フォームの開閉処理
  const openForm = ()=> {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  }



  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today} />

      </Box>
      {/* 右側 */}
      <Box>
        <Transaction />
        <TransactionForm onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay}/>
        <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} openForm={openForm}/>
      </Box>
    </Box>
  )
}

export default Home
