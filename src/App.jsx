import { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/home';
import Log from './Pages/Log';
import Nav from './component/Nav';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const loadState = () => {
  try {
    const stored = localStorage.getItem("expenseTracker");
    if (!stored) return { balance: 0, transactions: [] };
    const { balance, transactions, savedAt } = JSON.parse(stored);
    if (Date.now() - savedAt > SEVEN_DAYS) {
      localStorage.removeItem("expenseTracker");
      return { balance: 0, transactions: [] };
    }
    return { balance, transactions };
  } catch {
    return { balance: 0, transactions: [] };
  }
};

function App() {
  const [balance, setBalance] = useState(() => loadState().balance);
  const [transactions, setTransactions] = useState(() => loadState().transactions);
  const [page, setPage] = useState("home");

  useEffect(() => {
    localStorage.setItem(
      "expenseTracker",
      JSON.stringify({ balance, transactions, savedAt: Date.now() })
    );
  }, [balance, transactions]);

  const handleAddTransaction = (type, parsedAmount, description) => {
    const newTransaction = {
      id: Date.now(),
      type,
      description,
      amount: parsedAmount,
      date: new Date().toLocaleDateString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setBalance((prev) => type === "earning" ? prev + parsedAmount : prev - parsedAmount);
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all transactions?")) {
      setBalance(0);
      setTransactions([]);
      localStorage.removeItem("expenseTracker");
    }
  };

  return (
    <>
      <Nav page={page} setPage={setPage} />
      {page === "home" ? (
        <Home
          balance={balance}
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onNavigate={setPage}
        />
      ) : (
        <Log
          transactions={transactions}
          onClearAll={handleClearAll}
        />
      )}
    </>
  );
}

export default App;
