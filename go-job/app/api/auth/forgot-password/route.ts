import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const result = await getUserByEmail(email);
    
    if (!result.success || result.data.length === 0) {
      // For security reasons, still return success even if email doesn't exist
      return NextResponse.json({
        success: true,
        message: 'If your email is registered, you will receive password reset instructions.'
      });
    }

    //FOR SIMULATION PURPOSES ONLY
    console.log(`Password reset requested for email: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
