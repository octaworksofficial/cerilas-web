import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const projectId = parseInt(params.id);
    
    const project = await prisma.project.update({
      where: { id: projectId },
      data,
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = parseInt(params.id);
    
    await prisma.project.delete({
      where: { id: projectId },
    });
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
