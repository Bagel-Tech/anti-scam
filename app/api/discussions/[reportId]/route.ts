import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const discussions = await prisma.discussion.findMany({
      where: {
        scamReportId: params.reportId
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