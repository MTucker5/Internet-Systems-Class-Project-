'use client';

import { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <section className="history-section">
      <div className="history-header">
        <h2>TRANSACTION HISTORY</h2>
        <button className="toggle-btn" onClick={() => setVisible(!visible)}>
          {visible ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {visible && (
        <div className="transaction-list">
          {transactions.length === 0 ? (
            <p className="no-transactions">No transactions yet.</p>
          ) : (
            [...transactions].reverse().map((t) => (
              <div className="transaction-item" key={t.id}>
                <div>
                  <div className="t-description">{t.description}</div>
                  <div className="t-date">{t.date}</div>
                </div>
                <div className={`t-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
