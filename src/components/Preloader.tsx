import { useEffect, useState } from 'react';

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(100);
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
      }
      setCount(Math.min(Math.floor(current), 100));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950 transition-transform duration-700 ${
        done ? '-translate-y-full' : ''
      }`}
      style={{ pointerEvents: done ? 'none' : 'auto' }}
    >
      <div className="overflow-hidden">
        <div
          className="font-display text-4xl font-semibold tracking-tight text-ink-50 sm:text-6xl"
          style={{
            transform: done ? 'translateY(-120%)' : 'translateY(0)',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          Offscript<span className="text-accent-400"> Studio</span>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <div className="h-px w-40 overflow-hidden rounded-full bg-ink-800">
          <div
            className="h-full bg-accent-400 transition-all duration-200 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
        <span className="font-mono text-xs text-ink-400">{count}%</span>
      </div>
    </div>
  );
}
