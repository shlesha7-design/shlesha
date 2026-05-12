import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
        <section className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            Samarth Classes — Teacher & Student Portals
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Separate portals for teachers and students, with secure role-based access.
          </h1>
          <p className="max-w-2xl text-slate-300">
            Teachers manage attendance, exams, reports, and classes. Students can log in, view assigned exams, and access exam links only for their standard, batch, and division.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/register" className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 transition hover:border-cyan-300/40 hover:bg-slate-900/90">
            <h2 className="text-2xl font-semibold text-white">Register</h2>
            <p className="mt-3 text-slate-400">Sign up as a teacher or student with OTP verification and role-specific onboarding.</p>
          </Link>

          <Link href="/login" className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 transition hover:border-violet-300/40 hover:bg-slate-900/90">
            <h2 className="text-2xl font-semibold text-white">Login</h2>
            <p className="mt-3 text-slate-400">Authenticate with email/password or OTP, then access the correct portal based on your role.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
