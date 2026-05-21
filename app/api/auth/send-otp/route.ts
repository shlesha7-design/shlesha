import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { otpStore } from '../../../../lib/otpStore';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, otp);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Samarth Classes OTP',
      text: `Your OTP is ${otp}`
    });

    return NextResponse.json({
      success: true
    });

  } catch (err: any) {
    console.log(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}