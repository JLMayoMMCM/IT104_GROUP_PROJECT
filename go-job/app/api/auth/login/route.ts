import { NextRequest, NextResponse } from 'next/server';
import { verifyUserCredentials } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await verifyUserCredentials(email, password);
    
    if (!result.success || result.data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = result.data[0];
    
    if (role && user.account_role !== role) {
      return NextResponse.json(
        { success: false, error: `Invalid credentials for ${role} account` },
        { status: 401 }
      );
    }

    // Set auth cookie/session
    const sessionId = crypto.randomUUID();
    cookies().set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict'
    });

    // Store user info in cookie/session
    cookies().set('user_data', JSON.stringify({
      id: user.account_id,
      email: user.account_email,
      role: user.account_role
    }), {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict'
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.account_id,
        email: user.account_email,
        role: user.account_role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
