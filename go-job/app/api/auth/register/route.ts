import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      email, password, role,
      firstName, lastName, middleName,
      address
    } = body;

    if (!email || !password || !firstName || !lastName || !address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!address.street || !address.barangay || !address.city || !address.province) {
      return NextResponse.json(
        { success: false, error: 'Missing required address fields' },
        { status: 400 }
      );
    }

    const result = await createUser({
      email,
      password,
      role: role || 'employee',
      firstName,
      lastName,
      middleName,
      address: {
        street: address.street,
        barangay: address.barangay,
        city: address.city,
        province: address.province
      }
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      userId: result.accountId
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
