'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Props {
  income: number;
  expenses: number;
}

export default function FinanceChart({ income, expenses }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [
          {
            label: 'Amount ($)',
            data: [income, expenses],
            backgroundColor: ['#3fb950', '#f85149'],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
          x: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [income, expenses]);

  return (
    <section className="chart-section">
      <h2>INCOME VS EXPENSES</h2>
      <div className="chart-wrapper">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
