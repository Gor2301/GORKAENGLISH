import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/pocketbase-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, lesson_type } = body;
    if (!name || !email || !lesson_type) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and lesson type are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create booking in PocketBase
    // Create booking in PocketBase
const result = await createBooking({
  ...body,
  status: 'pending'  // Add default status
});
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: result.data,
      message: 'Booking created successfully' 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // For development/testing only — would need auth in production
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}