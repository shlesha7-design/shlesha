import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samarth Classes',
  description: 'Teacher and student portal for attendance, exams, and reports.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
