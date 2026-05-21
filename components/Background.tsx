'use client';

type BackgroundProps = {
  pov?: 'initial' | 'teacher' | 'student';
};

export default function Background({
  pov = 'initial'
}: BackgroundProps) {

  const backgrounds = {
    initial: '/backgrounds/initial.jpg',
    teacher: '/backgrounds/teacher.jpg',
    student: '/backgrounds/student.jpg'
  };

  return (
    <div className="fixed inset-0 overflow-hidden">

      <div
        className="absolute inset-0 scale-110 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgrounds[pov]})`,
          filter: 'blur(10px) brightness(0.45)'
        }}
      />

      <div className="absolute inset-0 bg-emerald-950/50" />

      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-green-400/10 blur-3xl animate-pulse" />
    </div>
  );
}