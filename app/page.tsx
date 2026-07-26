'use client';

import { useState, useEffect } from 'react';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import FinanceChart from '../components/FinanceChart';
import TransactionList from '../components/TransactionList';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  date: string;
}

export default function MonitorPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions from the API on page load
  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error('Failed to load transactions:', err));
  }, []);

  async function handleAdd(description: string, amount: number, type: string) {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, amount, type }),
    });

    if (!res.ok) {
      alert('Could not save transaction.');
      return;
    }

    const newTransaction = await res.json();
    setTransactions((prev) => [...prev, newTransaction]);
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <main>
      <header>
        <h1>Monitor</h1>
        <button className="back-btn" onClick={() => (window.location.href = '/')}>
          Back Home
        </button>
      </header>

      <SummaryCards income={totalIncome} expenses={totalExpenses} />
      <TransactionForm onAdd={handleAdd} />
      <FinanceChart income={totalIncome} expenses={totalExpenses} />
      <TransactionList transactions={transactions} />
    </main>
  );
}
