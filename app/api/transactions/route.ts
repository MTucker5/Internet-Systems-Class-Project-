import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/transactions — fetch all transactions
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(transactions, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('GET /api/transactions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions.' },
      { status: 500 }
    );
  }
}

// POST /api/transactions — create a new transaction
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, amount, type } = body;

    // Server-side validation
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive number.' }, { status: 400 });
    }
    if (!['income', 'expense'].includes(type)) {
      return NextResponse.json({ error: 'Type must be income or expense.' }, { status: 400 });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        description: description.trim(),
        amount: Number(amount),
        type,
        date: new Date().toLocaleDateString(),
      },
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('POST /api/transactions error:', error);
    return NextResponse.json(
      { error: 'Failed to save transaction.' },
      { status: 500 }
    );
  }
}
