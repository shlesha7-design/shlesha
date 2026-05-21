import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const {
      role,
      name,
      email,
      standard,
      batch,
      division,
      rollNumber
    } = await req.json();

    if (!role || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (role === 'student') {
      const student = await prisma.student.create({
        data: {
          name,
          email,
          standard: standard ?? '',
          batch: batch ?? '',
          division: division ?? '',
          rollNumber: rollNumber ?? ''
        }
      });

      return NextResponse.json({
        message: 'Student registered successfully',
        data: student
      });
    }

    const teacher = await prisma.teacher.create({
      data: {
        name,
        email
      }
    });

    return NextResponse.json({
      message: 'Teacher registered successfully',
      data: teacher
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
