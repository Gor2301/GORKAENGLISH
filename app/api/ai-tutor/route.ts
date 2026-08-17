import { NextRequest, NextResponse } from 'next/server';
import { getAITutorResponse } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get response from Gemini
    const response = await getAITutorResponse(message, context);

    return NextResponse.json({
      success: true,
      response,
    }, { status: 200 });

  } catch (error: any) {
    console.error('AI Tutor API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get AI response' },
      { status: 500 }
    );
  }
}