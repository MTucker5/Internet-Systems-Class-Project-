'use client';

interface Props {
  income: number;
  expenses: number;
}

export default function SummaryCards({ income, expenses }: Props) {
  const balance = income - expenses;

  return (
    <div className="summary-cards">
      <div className="card income">
        <div className="card-label">TOTAL INCOME</div>
        <div className="card-value">${income.toFixed(2)}</div>
      </div>
      <div className="card expense">
        <div className="card-label">TOTAL EXPENSES</div>
        <div className="card-value">${expenses.toFixed(2)}</div>
      </div>
      <div className="card balance">
        <div className="card-label">REMAINING</div>
        <div className="card-value">${balance.toFixed(2)}</div>
      </div>
    </div>
  );
}
