import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from './components/MonthlySummary'
import Calender from './components/Calender'
import Transaction from './components/Transaction'
import TransactionForm from './components/TransactionForm'

const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary />
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
