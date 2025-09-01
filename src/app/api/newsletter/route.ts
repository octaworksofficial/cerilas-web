import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check if the email is already subscribed
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: {
        email,
      },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: 'This email is already subscribed to our newsletter.' },
        { status: 200 }
      );
    }

    // Insert the new subscription
    await prisma.newsletterSubscription.create({
      data: {
        email,
        name: name || null,
        status: 'active',
      },
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to the newsletter. Please try again later.' },
      { status: 500 }
    );
  }
}
