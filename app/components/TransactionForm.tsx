'use client';

import { useState } from 'react';

interface Props {
  onAdd: (description: string, amount: number, type: string) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  function handleSubmit() {
    if (!description || !amount || parseFloat(amount) <= 0) {
      alert('Please fill in a description and a valid amount.');
      return;
    }
    onAdd(description, parseFloat(amount), type);
    setDescription('');
    setAmount('');
  }

  return (
    <section className="form-section">
      <h2>ADD TRANSACTION</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="Description (e.g. Bought Apple Stock)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (e.g. 500)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button className="add-btn" onClick={handleSubmit}>
        Add Transaction
      </button>
    </section>
  );
}
