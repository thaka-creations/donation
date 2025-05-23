import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://45.79.97.25:8013/api/v1';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/account/user/user-stories?user_type=INSTITUTION`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
} 