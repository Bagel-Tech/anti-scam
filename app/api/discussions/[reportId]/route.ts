import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const discussions = await prisma.discussion.findMany({
      where: {
        scamReportId: (await params).reportId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(discussions);
  } catch (error) {
    console.error('Failed to fetch discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
} 