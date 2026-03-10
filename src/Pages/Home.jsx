import React, { useState } from "react";
import '../Style/home.css';

export default function Home({ balance, transactions, onAddTransaction, onNavigate }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (type) => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) return alert("Enter a valid amount");
    if (!description.trim()) return alert("Enter a description");
    onAddTransaction(type, parsedAmount, description);
    setAmount("");
    setDescription("");
  };

  const totalEarnings = transactions
    .filter((t) => t.type === "earning")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div id="home" className="home-container">

      {/* Balance Card */}
      <div className={`balance-card ${balance >= 0 ? "positive" : "negative"}`}>
        <p className="balance-label">Current Balance</p>
        <h1 className={`balance-amount ${balance >= 0 ? "green" : "red"}`}>
          N{balance.toFixed(2)}
        </h1>
        <div className="summary-row">
          <div className="summary-item">
            <span className="earn-label">↑ Earnings</span>
            <span className="earn-value">${totalEarnings.toFixed(2)}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-item">
            <span className="expense-label">↓ Expenses</span>
            <span className="expense-value">${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          inputMode="decimal"
        />
        <div className="btn-row">
          <button onClick={() => handleAdd("earning")} className="btn btn-earn">
            + Add Earnings
          </button>
          <button onClick={() => handleAdd("expense")} className="btn btn-expense">
            − Add Expense
          </button>
        </div>
      </div>

      {/* View Log Button */}
      <button className="log-nav-btn" onClick={() => onNavigate("log")}>
        <span>View Transaction Log</span>
        <span>→</span>
      </button>

      {transactions.length > 0 && (
        <p className="tx-count">
          {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} recorded
        </p>
      )}
    </div>
  );
}
