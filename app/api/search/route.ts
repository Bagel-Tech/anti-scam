// import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // TODO: this is where the google search should be there
    

    

    // TODO add search for common scams search, reddit, etc.

    // TODO: Ranking
    // if theres no similar findings, its low risk
    // if there are similar findings, its medium risk
    // if there are many similar findings, its high risk
    const searchQuery = request.nextUrl.searchParams.get('q');

    if (!searchQuery) {
      return new Response(JSON.stringify({ error: 'Search query is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const results = await prisma.scamReport.findMany({
      where: {
        OR: [
          {
            url: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        url: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        reportCount: true,
      },
      orderBy: [
        {
          status: 'asc', // VERIFIED reports first
        },
        {
          createdAt: 'desc', // Newest reports first
        },
      ],
      take: 20, // Limit results to 20 items
    });

    // Transform the results to match the SearchResult interface
    const transformedResults = results.map(result => ({
      id: result.id,
      url: result.url,
      title: result.title,
      description: result.description,
      status: result.status,
      reportCount: result.reportCount,
      createdAt: result.createdAt.toISOString(),
    }));

    return new Response(JSON.stringify(transformedResults), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while searching' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}