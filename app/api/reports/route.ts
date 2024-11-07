import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, title, description, evidence } = body;

    const report = await prisma.scamReport.create({
      data: {
        url,
        title,
        description,
        evidence: {
          create: {
            description: evidence
          }
        }
      }
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error('Failed to create report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
} 