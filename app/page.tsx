'use client';

import Link from 'next/link';
import Background from '../components/Background';

export default function Home() {
  return (
    <>
      <Background pov="initial" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 text-white">

        <div className="w-full max-w-4xl rounded-[40px] border border-white/10 bg-black/30 p-14 text-center shadow-2xl backdrop-blur-xl">

          <h1 className="text-6xl font-black tracking-tight text-white">
            Welcome to
          </h1>

          <h2 className="mt-4 text-7xl font-black text-emerald-400">
            Samarth Classes
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
            Smart classroom management platform for attendance,
            reports, tests and notifications.
          </p>

          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:justify-center">

            <Link
              href="/register"
              className="rounded-2xl bg-emerald-500 px-10 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-emerald-400">

              Register
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/15 bg-white/5 px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-500/10">

              Login
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Already registered? Login to continue
          </p>

        </div>
      </main>
    </>
  );
}