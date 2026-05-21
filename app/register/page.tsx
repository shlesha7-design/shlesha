'use client';

import { useState } from 'react';
import Link from 'next/link';
import Background from '../../components/Background';

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

  const pov = step === 'role' ? 'initial' : role;

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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role,
          name,
          email,
          standard:
            role === 'student'
              ? standard
              : undefined,
          batch:
            role === 'student'
              ? batch
              : undefined,
          rollNumber:
            role === 'student'
              ? rollNumber
              : undefined,
          division:
            role === 'student'
              ? division
              : undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background pov={pov} />

      <main className="relative z-10 min-h-screen p-8 text-white">

        <div className="mx-auto max-w-4xl space-y-8 rounded-[40px] border border-white/10 bg-black/40 p-10 shadow-2xl backdrop-blur-xl">

          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-white">
              Register for Samarth Classes
            </h1>

            <p className="text-slate-300">
              Complete OTP verification and join your portal
            </p>
          </div>

          {step === 'role' && (
            <section className="space-y-6 rounded-3xl bg-black/30 p-8">

              <h2 className="text-2xl font-semibold text-white">
                Select Your Role
              </h2>

              <div className="grid gap-4">

                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setRole(
                        option.value as
                          | 'student'
                          | 'teacher'
                      );

                      setStep('email');
                    }}
                    className={`rounded-2xl border px-5 py-5 text-left transition-all duration-300 ${
                      role === option.value
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                        : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-emerald-400/40'
                    }`}>

                    <span className="block text-xl font-semibold">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 'email' && (
            <section className="space-y-6 rounded-3xl bg-black/30 p-8">

              <h2 className="text-2xl font-semibold">
                Enter Your Email
              </h2>

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-emerald-400"
              />

              {error && (
                <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">
                  {error}
                </p>
              )}

              <button
                onClick={handleSendOtp}
                disabled={loading || !email}
                className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50">

                {loading
                  ? 'Sending OTP...'
                  : 'Send OTP'}
              </button>
            </section>
          )}

          {step === 'otp' && (
            <section className="space-y-6 rounded-3xl bg-black/30 p-8">

              <h2 className="text-2xl font-semibold">
                Enter OTP Code
              </h2>

              <p className="text-slate-300">
                Check your email for the 6-digit code
              </p>

              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                maxLength={6}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-center text-3xl tracking-[0.5em] text-white outline-none transition focus:border-emerald-400"
              />

              {error && (
                <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">
                  {error}
                </p>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
                className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50">

                {loading
                  ? 'Verifying...'
                  : 'Verify OTP'}
              </button>
            </section>
          )}

          {step === 'details' && (
            <section className="space-y-6 rounded-3xl bg-black/30 p-8">

              <h2 className="text-2xl font-semibold">
                Complete Your Profile
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-emerald-400"
              />

              {role === 'student' && (
                <div className="grid gap-4 md:grid-cols-2">

                  <select
                    value={standard}
                    onChange={(e) =>
                      setStandard(e.target.value)
                    }
                    className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white">

                    <option value="">
                      Select Standard
                    </option>

                    <option value="7th">
                      7th
                    </option>

                    <option value="8th">
                      8th
                    </option>

                    <option value="9th">
                      9th
                    </option>

                    <option value="10th">
                      10th
                    </option>
                  </select>

                  <select
                    value={batch}
                    onChange={(e) =>
                      setBatch(e.target.value)
                    }
                    className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white">

                    <option value="">
                      Select Batch
                    </option>

                    <option value="1">
                      Batch 1
                    </option>

                    <option value="2">
                      Batch 2
                    </option>

                    <option value="3">
                      Batch 3
                    </option>
                  </select>

                  <input
                    type="text"
                    placeholder="Roll Number"
                    value={rollNumber}
                    onChange={(e) =>
                      setRollNumber(e.target.value)
                    }
                    className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white"
                  />

                  <input
                    type="text"
                    placeholder="Division"
                    value={division}
                    onChange={(e) =>
                      setDivision(e.target.value)
                    }
                    className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white"
                  />
                </div>
              )}

              {error && (
                <p className="rounded-2xl bg-red-500/10 p-4 text-red-200">
                  {error}
                </p>
              )}

              <button
                onClick={handleCompleteRegistration}
                disabled={loading || !name}
                className="w-full rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50">

                {loading
                  ? 'Completing Registration...'
                  : 'Complete Registration'}
              </button>
            </section>
          )}

          {step === 'success' && (
            <section className="space-y-6 rounded-3xl bg-emerald-500/10 p-8 text-center text-emerald-200">

              <h2 className="text-3xl font-bold">
                Registration Complete!
              </h2>

              <p>
                Your account has been created successfully.
              </p>

              <Link
                href="/login"
                className="inline-block rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-500">

                Go to Login
              </Link>
            </section>
          )}

          <div className="text-center">
            <Link
              href="/"
              className="text-emerald-300 transition hover:text-emerald-200 hover:underline">

              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}