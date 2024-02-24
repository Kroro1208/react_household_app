import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from './components/MonthlySummary'
import Calender from './components/Calender'
import Transaction from './components/Transaction'
import TransactionForm from './components/TransactionForm'
import { Transaction as TransactionType } from '../types'

interface HomeProps {
  monthlyTransactions: TransactionType[],
}

const Home = ({ monthlyTransactions }: HomeProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calender />
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
