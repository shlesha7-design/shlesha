import { NextResponse } from 'next/server';
import { otpStore } from '../send-otp/route';

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json();

    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
      return NextResponse.json(
        { error: 'OTP expired' },
        { status: 400 }
      );
    }

    if (storedOtp !== token) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    otpStore.delete(email);

    return NextResponse.json({
      success: true,
      user: {
        id: email
      }
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}