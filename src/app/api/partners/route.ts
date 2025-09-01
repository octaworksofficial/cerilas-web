import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

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
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' }, 
      { status: 500 }
    );
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
    
    console.log('Created partner:', partner);
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json(
      { error: 'Failed to create partner' }, 
      { status: 500 }
    );
  }
}
