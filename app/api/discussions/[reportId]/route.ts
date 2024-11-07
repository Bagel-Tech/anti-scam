import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: {
    reportId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
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