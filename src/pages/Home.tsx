import { Box } from '@mui/material'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import Transaction from '../components/Transaction'
import TransactionForm from '../components/TransactionForm'
import { Transaction as TransactionType } from '../types'
import TransactionMenu from '../components/TransactionMenu'
import { useState } from 'react'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

interface HomeProps {
  monthlyTransactions: TransactionType[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
  onSaveTransaction: (transaction: Schema) => Promise<void>,
  onDeleteTransaction: (transactionId: string) => Promise<void>
}

const Home = ({ monthlyTransactions, setCurrentMonth, onSaveTransaction, onDeleteTransaction }: HomeProps) => {
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType | null>(null);


  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  console.log(dailyTransactions);

  // 内訳フォームをデフォルトでは閉じた状態にしておく
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
    setSelectedTransaction(null);
  };

  // 内訳フォームの開閉処理
  const openForm = () => {
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  }

  // 取引が選択されたときの処理
  const onSelectTransaction = (transaction: TransactionType) => {
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
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
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
          onDeleteTransaction={onDeleteTransaction}
          setSelectedTransaction={setSelectedTransaction}
          />
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          openForm={openForm}
          onSelectTransaction={onSelectTransaction} />
      </Box>
    </Box>
  )
}

export default Home
