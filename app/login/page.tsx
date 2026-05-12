'use client';

import { useState } from 'react';
import Link from 'next/link';

type LoginStep = 'email' | 'otp' | 'success';

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Determine role from user metadata or default to student
      const role = userRole;
      setStep('success');

      // Redirect after brief delay
      setTimeout(() => {
        window.location.href = role === 'student' ? '/student/dashboard' : '/teacher/dashboard';
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-glass backdrop-blur-xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold">Login to Samarth Classes</h1>
          <p className="text-slate-400">Enter your email to receive an OTP code.</p>
        </div>

        {step === 'email' && (
          <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
              required
            />
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as 'student' | 'teacher')}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {error && <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">{error}</p>}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
            <p className="text-slate-400">Check your email for the 6-digit code</p>
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-center text-2xl tracking-widest text-slate-100"
              required
            />
            {error && <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">{error}</p>}
            <button
              type="submit"
              disabled={loading || !otp}
              className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full rounded-2xl border border-white/10 px-5 py-3 text-slate-100 transition hover:border-cyan-300/40">
              Back to Email
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="mt-8 rounded-2xl bg-emerald-500/10 p-8 text-center text-emerald-200">
            <p className="text-lg font-semibold">Login successful!</p>
            <p className="mt-2">Redirecting to your {userRole} portal...</p>
          </div>
        )}

        <p className="mt-6 text-slate-400">
          New user?{' '}
          <Link href="/register" className="text-cyan-300 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
