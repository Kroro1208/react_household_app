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
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "./firebase";
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  // Firebaseエラーかどうかを判断する型ガードを実装
  function isFireStoreError(error: unknown): error is { code: string, message: string } {
    return typeof error === "object" && error !== null && "code" in error
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Firebaseからデータを取得
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
        setTransactions(transactionsData); // 取得したデータをセット
      } catch (error) {
        if (isFireStoreError(error)) {
          console.log("Firebaseエラー", error);
          // console.log("Firebaseエラーメッセージ", error.message);
          // console.log("Firebaseエラーコード", error.code);
        } else {
          console.log("一般的なエラー:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, [])

  //transactionから今月のデータのみを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  })

  // firebaseにデータを保存する処理
  const onSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction
      } as Transaction;

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    } catch (error: any) {
      if (isFireStoreError(error)) {
        console.error('firestoreエラー:', error);
      } else {
        console.error('一般エラー:', error);
      };
    }
  };

  const onDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteDoc(doc(db, 'Transactions', transactionId));
      // 削除ボタンを押された取引以外の記録を取得してstateで管理して表示させる
      const filteredTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      setTransactions(filteredTransactions);
    } catch (error: any) {
      if (isFireStoreError(error)) {
        console.error('firestore エラー:', error);
      } else {
        console.error('一般エラー:', error);
      };
    }
  }

  const onUpdateTransaction = async (transaction: Schema, transactionId: string) => {
    try {
      // firebaseの更新メソッド
      const docRef = doc(db, "Transactions", transactionId); // 更新対象を取得
      await updateDoc(docRef, transaction); // 更新
      // 選択されたidとstateで管理されているidが一致する場合に更新する
      const updatedTransactions = transactions.map((t) => t.id === transactionId ? { ...t, ...transaction } : t) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error('firestore エラー:', error);
      } else {
        console.error('一般エラー:', error);
      };
    }
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={
              <Home
                monthlyTransactions={monthlyTransactions}
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={onSaveTransaction}
                onDeleteTransaction={onDeleteTransaction}
                onUpdateTransaction={onUpdateTransaction}
              />} />
            <Route path="/report" element={<Report isLoading={isLoading} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} monthlyTransactions={monthlyTransactions} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
