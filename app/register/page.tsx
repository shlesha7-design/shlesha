'use client';

import { useState } from 'react';
import Link from 'next/link';

const roleOptions = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' }
];

type Step = 'role' | 'email' | 'otp' | 'details' | 'success';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [standard, setStandard] = useState('');
  const [batch, setBatch] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [division, setDivision] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setStep('details');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          name,
          email,
          standard: role === 'student' ? standard : undefined,
          batch: role === 'student' ? batch : undefined,
          rollNumber: role === 'student' ? rollNumber : undefined,
          division: role === 'student' ? division : undefined
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-glass backdrop-blur-xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold">Register for Samarth Classes</h1>
          <p className="text-slate-400">Complete OTP verification and join your portal.</p>
        </div>

        {step === 'role' && (
          <section className="space-y-6 rounded-3xl bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Select Your Role</h2>
            <div className="grid gap-3">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setRole(option.value as 'student' | 'teacher');
                    setStep('email');
                  }}
                  className={`rounded-2xl border px-5 py-4 text-left transition ${role === option.value ? 'border-cyan-400 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-slate-950 text-slate-300'}`}>
                  <span className="block text-lg font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 'email' && (
          <section className="space-y-6 rounded-3xl bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Enter Your Email</h2>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
            />
            {error && <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">{error}</p>}
            <button
              onClick={handleSendOtp}
              disabled={loading || !email}
              className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </section>
        )}

        {step === 'otp' && (
          <section className="space-y-6 rounded-3xl bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Enter OTP Code</h2>
            <p className="text-slate-400">Check your email for the 6-digit code</p>
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-center text-2xl tracking-widest text-slate-100"
            />
            {error && <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              disabled={loading || !otp}
              className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </section>
        )}

        {step === 'details' && (
          <section className="space-y-6 rounded-3xl bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Complete Your Profile</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
            />
            {role === 'student' && (
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Standard (7th-10th)"
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Batch (1-3)"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Division"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100"
                />
              </div>
            )}
            {error && <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">{error}</p>}
            <button
              onClick={handleCompleteRegistration}
              disabled={loading || !name}
              className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">
              {loading ? 'Completing Registration...' : 'Complete Registration'}
            </button>
          </section>
        )}

        {step === 'success' && (
          <section className="space-y-6 rounded-3xl bg-emerald-500/10 p-8 text-emerald-200">
            <h2 className="text-2xl font-semibold">Registration Complete!</h2>
            <p>Your account has been created. You can now log in to access your {role} portal.</p>
            <Link href="/login" className="inline-block rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Go to Login
            </Link>
          </section>
        )}

        <Link href="/" className="text-cyan-300 hover:underline">Back to Home</Link>
      </div>
    </main>
  );
}
