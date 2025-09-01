import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET() {
  console.log('GET /api/projects called');
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    console.log('Found projects:', projects.length);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('POST /api/projects called');
  try {
    const data = await request.json();
    console.log('Received data:', data);
    const project = await prisma.project.create({ data });
    console.log('Created project:', project);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
