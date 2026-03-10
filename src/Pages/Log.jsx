import React from "react";
import '../Style/log.css';

export default function Log({ transactions, onClearAll }) {
  return (
    <div id="log" className="log-container">

      <div className="log-header">
        <h2 className="log-title">Transaction Log</h2>
        {transactions.length > 0 && (
          <button onClick={onClearAll} className="log-clear-btn">Clear All</button>
        )}
      </div>

      <p className="log-hint">History auto-clears after 7 days.</p>

      {transactions.length === 0 ? (
        <p className="log-empty">No transactions yet.</p>
      ) : (
        <ul className="log-list">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`log-item ${t.type === "earning" ? "log-item-earn" : "log-item-expense"}`}
            >
              <div>
                <strong className="log-desc">{t.description}</strong>
                <div className="log-date">{t.date}</div>
              </div>
              <span className={`log-amount ${t.type === "earning" ? "earn-value" : "expense-value"}`}>
                {t.type === "earning" ? "+" : "-"}₦{t.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
