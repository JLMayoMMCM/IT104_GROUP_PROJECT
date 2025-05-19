import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { executeQuery } from '@/lib/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  
  // Check if there was an error returned from Google
  if (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect('/Login?error=oauth_error');
  }
  
  // Validate the state parameter to prevent CSRF
  const storedState = cookies().get('google_oauth_state')?.value;
  
  if (!storedState || state !== storedState) {
    console.error('Invalid OAuth state');
    return NextResponse.redirect('/Login?error=invalid_state');
  }
  
  if (!code) {
    console.error('No authorization code');
    return NextResponse.redirect('/Login?error=no_code');
  }
  
  try {
    // Exchange the authorization code for tokens
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/google/callback`;
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token exchange error:', errorData);
      return NextResponse.redirect('/Login?error=token_exchange');
    }
    
    const tokenData = await tokenResponse.json();
    
    // Get user information with the access token
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    
    if (!userInfoResponse.ok) {
      console.error('Failed to fetch user info');
      return NextResponse.redirect('/Login?error=user_info');
    }
    
    const userData = await userInfoResponse.json();
    
    // Check if user exists in the database
    const userResult = await executeQuery(
      'SELECT * FROM account WHERE sso_provider = $1 AND sso_id = $2',
      ['google', userData.id]
    );
    
    let userId;
    
    if (userResult.success && userResult.data.length > 0) {
      // User exists, update their token
      userId = userResult.data[0].account_id;
      await executeQuery(
        'UPDATE account SET sso_token = $1, sso_expiry = NOW() + INTERVAL \'1 hour\' WHERE account_id = $2',
        [tokenData.access_token, userId]
      );
    } else {
      // Create new user
      // First, check if email already exists but without SSO
      const emailCheckResult = await executeQuery(
        'SELECT * FROM account WHERE account_email = $1',
        [userData.email]
      );
      
      if (emailCheckResult.success && emailCheckResult.data.length > 0) {
        // Email exists, link the SSO provider to this account
        userId = emailCheckResult.data[0].account_id;
        await executeQuery(
          'UPDATE account SET sso_provider = $1, sso_id = $2, sso_token = $3, sso_expiry = NOW() + INTERVAL \'1 hour\' WHERE account_id = $4',
          ['google', userData.id, tokenData.access_token, userId]
        );
      } else {
        // Create completely new account
        const newUserResult = await executeQuery(
          'INSERT INTO account (account_email, account_role, sso_provider, sso_id, sso_token, sso_expiry) VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL \'1 hour\') RETURNING account_id',
          [userData.email, 'employee', 'google', userData.id, tokenData.access_token]
        );
        
        if (!newUserResult.success || newUserResult.data.length === 0) {
          console.error('Failed to create user');
          return NextResponse.redirect('/Login?error=user_creation');
        }
        
        userId = newUserResult.data[0].account_id;
      }
    }
    
    // Set session
    const sessionId = crypto.randomUUID();
    cookies().set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax'
    });
    
    // Store user info in session
    cookies().set('user_data', JSON.stringify({
      id: userId,
      email: userData.email,
      name: userData.name,
      picture: userData.picture
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax'
    });
    
    // Clear the OAuth state cookie
    cookies().set('google_oauth_state', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/',
      sameSite: 'lax'
    });
    
    // Redirect to dashboard
    return NextResponse.redirect('/Dashboard');
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect('/Login?error=server_error');
  }
}
