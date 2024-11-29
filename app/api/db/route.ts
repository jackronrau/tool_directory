import { NextResponse } from 'next/server';
import { db, initializeDatabase } from '@/db';

export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ status: 'Database is connected' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
}