import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - List all partners
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' }
      ]
    });
    
    return NextResponse.json(partners);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

// POST - Create new partner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const partner = await prisma.partner.create({
      data: {
        name: body.name,
        logoUrl: body.logoUrl,
        website: body.website || null,
        description: body.description || null,
        category: body.category || null,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
      },
    });
    
    return NextResponse.json(partner, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create partner' }, 
      { status: 500 }
    );
  }
}
