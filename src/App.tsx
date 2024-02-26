import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Report from './pages/Report';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { Transaction } from "./types/index";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./firebase";
import { formatMonth } from './utils/formatting';

function App() {

  // Firebaseエラーかどうかを判断する型ガードを実装
  function isFireStoreError(error: unknown): error is { code: string, message: string } {
    return typeof error === "object" && error !== null && "code" in error
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"))
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction // 型アサーションでエラー解消
        });
        console.log(transactionsData)
        setTransactions(transactionsData);
      } catch (error) {
        if (isFireStoreError(error)) {
          console.log("Firebaseエラー", error);
          // console.log("Firebaseエラーメッセージ", error.message);
          // console.log("Firebaseエラーコード", error.code);
        } else {
          console.log("一般的なエラー:", error);
        }
      }
    }
    fetchTransactions();
  }, [])

  //transactionから今月のデータのみを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  })

  console.log(monthlyTransactions)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
