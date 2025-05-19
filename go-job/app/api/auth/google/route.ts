import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Google OAuth config
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/google/callback`;
  
  if (!clientId) {
    console.error("Missing Google client ID");
    return NextResponse.redirect('/Login?error=configuration_error');
  }

  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2);
  
  // Store state in a cookie for validation in the callback
  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&state=${state}`
  );
  
  response.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    path: '/',
    sameSite: 'lax'
  });
  
  return response;
}
