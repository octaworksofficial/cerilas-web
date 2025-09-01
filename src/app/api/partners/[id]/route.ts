import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

// GET - Get single partner
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const partnerId = parseInt(params.id);
    
    const partner = await prisma.partner.findUnique({
      where: { id: partnerId },
    });
    
    if (!partner) {
      return NextResponse.json(
        { error: 'Partner not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(partner);
  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partner' }, 
      { status: 500 }
    );
  }
}

// PUT - Update partner
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const partnerId = parseInt(params.id);
    const body = await request.json();
    
    const partner = await prisma.partner.update({
      where: { id: partnerId },
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
    
    console.log('Updated partner:', partner);
    return NextResponse.json(partner);
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json(
      { error: 'Failed to update partner' }, 
      { status: 500 }
    );
  }
}

// DELETE - Delete partner
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const partnerId = parseInt(params.id);
    
    await prisma.partner.delete({
      where: { id: partnerId },
    });
    
    console.log('Deleted partner:', partnerId);
    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json(
      { error: 'Failed to delete partner' }, 
      { status: 500 }
    );
  }
}
