'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Background from '../../components/Background';

type LoginStep = 'email' | 'otp' | 'success';

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');

  // Auto login if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      window.location.href =
        user.role === 'teacher'
          ? '/teacher/dashboard'
          : '/student/dashboard';
    }
  }, []);

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          token: otp
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      const role = userRole;

      // Save session locally
      localStorage.setItem(
        'user',
        JSON.stringify({
          email,
          role
        })
      );

      setStep('success');

      // Redirect
      setTimeout(() => {
        window.location.href =
          role === 'student'
            ? '/student/dashboard'
            : '/teacher/dashboard';
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background pov="initial" />

      <main className="relative z-10 min-h-screen p-8 text-slate-100">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/40 p-10 shadow-2xl backdrop-blur-xl">

          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-white">
              Login to Samarth Classes
            </h1>

            <p className="text-slate-300">
              Enter your email to receive an OTP code
            </p>
          </div>

          {step === 'email' && (
            <form
              className="mt-10 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendOtp();
              }}>

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-emerald-400"
                required
              />

              <select
                value={userRole}
                onChange={(e) =>
                  setUserRole(
                    e.target.value as 'student' | 'teacher'
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-emerald-400">

                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>

              {error && (
                <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50">

                {loading
                  ? 'Sending OTP...'
                  : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form
              className="mt-10 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyOtp();
              }}>

              <p className="text-center text-slate-300">
                Check your email for the 6-digit OTP code
              </p>

              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-center text-3xl tracking-[0.5em] text-white outline-none transition focus:border-emerald-400"
                required
              />

              {error && (
                <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !otp}
                className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50">

                {loading
                  ? 'Verifying...'
                  : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full rounded-2xl border border-white/10 px-5 py-4 text-white transition hover:border-emerald-400 hover:bg-emerald-500/10">

                Back to Email
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="mt-10 rounded-3xl bg-emerald-500/10 p-10 text-center text-emerald-200">

              <p className="text-2xl font-semibold">
                Login Successful!
              </p>

              <p className="mt-3">
                Redirecting to your {userRole} portal...
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-slate-300">
            New user?{' '}

            <Link
              href="/register"
              className="text-emerald-400 hover:underline">

              Register here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}