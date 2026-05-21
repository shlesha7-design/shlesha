'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Background from '../../../components/Background';

export default function TeacherDashboard() {
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Background pov="teacher" />

      <main className="relative min-h-screen z-10 flex text-white">
        
        {/* Sidebar */}
        <aside className="w-80 border-r border-white/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col justify-between">
          
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">
              Samarth Classes
            </h1>

            <div className="mt-10 space-y-5">

              {/* Standard */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Select Standard
                </label>

                <select
                  value={selectedStandard}
                  onChange={(e) => {
                    setSelectedStandard(e.target.value);
                    setSelectedDivision('');
                    setSelectedBatch('');
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400">
                  <option value="">Choose Standard</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                </select>
              </div>

              {/* Division */}
              {selectedStandard && (
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Select Division
                  </label>

                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedBatch('');
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400">
                    <option value="">Choose Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              )}

              {/* Batch */}
              {selectedDivision && (
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Select Batch
                  </label>

                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-emerald-400">
                    <option value="">Choose Batch</option>
                    <option value="Batch 1">Batch 1</option>
                    <option value="Batch 2">Batch 2</option>
                    <option value="Batch 3">Batch 3</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Profile */}
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-xl font-bold text-emerald-300">
                {user?.email?.charAt(0)?.toUpperCase() || 'T'}
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Teacher
                </h3>

                <p className="text-sm text-slate-400 break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <button className="rounded-2xl border border-white/10 px-4 py-3 text-sm transition hover:border-emerald-400 hover:bg-emerald-500/10">
                Change Account
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-8">

          <div className="rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-white">
                  Teacher Dashboard
                </h2>

                <p className="mt-3 text-slate-300">
                  Manage attendance, tests and student activity.
                </p>
              </div>

              <Link
                href="/"
                className="rounded-2xl border border-white/10 px-5 py-3 transition hover:border-emerald-400 hover:bg-emerald-500/10">
                Home
              </Link>
            </div>

            {/* Empty State */}
            {!selectedBatch && (
              <div className="mt-12 rounded-3xl border border-dashed border-white/10 bg-slate-950/40 p-14 text-center">
                <h3 className="text-2xl font-semibold text-white">
                  No Class Selected
                </h3>

                <p className="mt-3 text-slate-400">
                  Select standard, division and batch to manage attendance and tests.
                </p>
              </div>
            )}

            {/* Attendance Section */}
            {selectedBatch && (
              <div className="mt-10 space-y-8">

                {/* Attendance */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">
                      Attendance
                    </h3>

                    <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300">
                      {selectedStandard} • {selectedDivision} • {selectedBatch}
                    </span>
                  </div>

                  <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-10 text-center">
                    <p className="text-slate-400">
                      No attendance data available yet.
                    </p>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400">
                      Save Attendance
                    </button>

                    <button className="rounded-2xl border border-white/10 px-6 py-3 transition hover:border-emerald-400 hover:bg-emerald-500/10">
                      Forward Attendance
                    </button>
                  </div>
                </div>

                {/* Tests */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-8">
                  <h3 className="text-2xl font-semibold">
                    Tests & Exams
                  </h3>

                  <p className="mt-3 text-slate-400">
                    Create MCQ tests or add external exam links.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400">
                      Create MCQ Test
                    </button>

                    <button className="rounded-2xl border border-white/10 px-6 py-3 transition hover:border-emerald-400 hover:bg-emerald-500/10">
                      Add External Exam Link
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}