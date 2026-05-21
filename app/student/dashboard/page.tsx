'use client';

import Link from 'next/link';
import Background from '../../../components/Background';

const exam = {
  title: 'Mathematics MCQ Exam',
  type: 'Internal MCQ',
  assigned: '10th Standard, Batch 2, Division A'
};

export default function StudentDashboard() {
  return (
    <>
      <Background pov="student" />
      <main className="relative min-h-screen p-8 text-slate-100 z-10">
      <div className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-glass backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Student Portal</h1>
            <p className="mt-3 text-slate-400">Only assigned exams and notifications appear in your dashboard.</p>
          </div>
          <Link href="/" className="rounded-2xl bg-white/5 px-5 py-3 text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10">Back to Home</Link>
        </div>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8">
            <h2 className="text-2xl font-semibold">Exam Available</h2>
            <div className="mt-6 rounded-3xl bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Assigned Exam</p>
              <p className="mt-3 text-2xl font-semibold text-white">{exam.title}</p>
              <p className="mt-2 text-slate-300">Type: {exam.type}</p>
              <p className="mt-1 text-slate-300">Assigned to: {exam.assigned}</p>
              <button className="mt-6 rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">Attempt Exam</button>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8">
            <div className="rounded-3xl bg-slate-950/80 p-6">
              <h3 className="text-xl font-semibold">Notifications</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="rounded-2xl bg-slate-900/70 p-4">New exam link posted for your division.</li>
                <li className="rounded-2xl bg-slate-900/70 p-4">Attendance summary updated by your teacher.</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6">
              <h3 className="text-xl font-semibold">Access Rules</h3>
              <p className="mt-2 text-slate-400">Students cannot view attendance sheets, reports, or teacher-only APIs.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
