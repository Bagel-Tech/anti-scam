import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scamReportId, message } = body;

    const discussion = await prisma.discussion.create({
      data: {
        scamReportId,
        message
      }
    });

    return NextResponse.json(discussion);
  } catch (error) {
    console.error('Failed to create discussion:', error);
    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
} 