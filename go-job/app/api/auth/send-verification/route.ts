import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ success: false, error: 'Missing email or code' }, { status: 400 });
  }

  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // or your SMTP server
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER, // set in .env.local
      pass: process.env.SMTP_PASS, // set in .env.local
    },
  });

  try {
    await transporter.sendMail({
      from: '"Go-Job" <no-reply@go-job.com>',
      to: email,
      subject: 'Your Go-Job Verification Code',
      text: `Your verification code is: ${code}`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
