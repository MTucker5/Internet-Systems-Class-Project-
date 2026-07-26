import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/transactions — fetch all transactions
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions.' },
      { status: 500 }
    );
  }
}

// POST /api/transactions — create a new transaction
export async function POST(req: NextRequest) {
  try {
    const { description, amount, type } = await req.json();

    if (
      !description ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0 ||
      !['income', 'expense'].includes(type)
    ) {
      return NextResponse.json(
        { error: 'Invalid transaction data.' },
        { status: 400 }
      );
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        description,
        amount: Number(amount),
        type,
        date: new Date().toLocaleDateString(),
      },
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save transaction.' },
      { status: 500 }
    );
  }
}
