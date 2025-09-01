import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';

import prisma from '@/libs/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Get all newsletter subscribers
    const subscribers = await prisma.newsletterSubscription.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert data to Excel format
    const worksheet = xlsx.utils.json_to_sheet(
      subscribers.map(sub => ({
        'ID': sub.id,
        'Email': sub.email,
        'Name': sub.name || '',
        'Status': sub.status,
        'Date Subscribed': sub.createdAt ? new Date(sub.createdAt).toLocaleString() : '',
      })),
    );

    // Set column widths
    const columnWidths = [
      { wch: 5 }, // ID
      { wch: 35 }, // Email
      { wch: 20 }, // Name
      { wch: 10 }, // Status
      { wch: 20 }, // Date Subscribed
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook and add the worksheet
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Newsletter Subscribers');

    // Generate buffer
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Return as downloadable file
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="newsletter-subscribers.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error) {
    console.error('Error exporting subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to export subscribers' },
      { status: 500 },
    );
  }
}
