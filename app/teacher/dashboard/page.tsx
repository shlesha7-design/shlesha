'use client';

import Link from 'next/link';

const attendanceStats = [
  { label: 'Daily Present', value: '92%' },
  { label: 'Weekly Attendance', value: '89%' },
  { label: 'Monthly Attendance', value: '91%' },
  { label: 'Individual Reports', value: 'View details' }
];

export default function TeacherDashboard() {
  return (
    <main className="min-h-screen p-8 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-glass backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold">Teacher Portal</h1>
              <p className="mt-3 text-slate-400">Manage attendance, create exams, and see aggregated reports.</p>
            </div>
            <Link href="/" className="rounded-2xl bg-white/5 px-5 py-3 text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10">Back to Home</Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {attendanceStats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/5 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-glass">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">Attendance Panel</h2>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-200">Standard 10th</span>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-300">
                <thead className="bg-slate-900/90">
                  <tr>
                    <th className="border-b border-white/10 px-4 py-3">Student Name</th>
                    <th className="border-b border-white/10 px-4 py-3">Present</th>
                    <th className="border-b border-white/10 px-4 py-3">Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {['Rahul', 'Sneha', 'Aisha', 'Rohan'].map((name) => (
                    <tr key={name} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-4">{name}</td>
                      <td className="px-4 py-4"><input type="radio" name={name} defaultChecked className="h-5 w-5 text-cyan-400" /></td>
                      <td className="px-4 py-4"><input type="radio" name={name} className="h-5 w-5 text-rose-400" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">Save Attendance</button>
              <button className="rounded-2xl border border-white/10 px-6 py-3 text-slate-100 transition hover:border-cyan-300/40">Forward Attendance</button>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-glass">
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <h3 className="text-xl font-semibold">Create Exam</h3>
              <p className="mt-2 text-slate-400">Add MCQ tests or external exam links for selected standard/batch/division.</p>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-900/80 p-6">
              <button className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">Create MCQ Test</button>
              <button className="rounded-2xl border border-white/10 px-5 py-3 text-slate-100 transition hover:border-cyan-300/40">Add External Exam Link</button>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-6">
              <h3 className="text-xl font-semibold">Reports</h3>
              <p className="mt-2 text-slate-400">Teacher dashboard shows daily, weekly and monthly attendance percentages.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
