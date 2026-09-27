import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, MousePointerClick, Users, Target, DollarSign } from 'lucide-react';

const metrics = [
  { label: 'Reach', value: '48.2k', icon: Users, note: 'Illustrative' },
  { label: 'Clicks', value: '3,240', icon: MousePointerClick, note: 'Illustrative' },
  { label: 'Leads', value: '186', icon: Target, note: 'Illustrative' },
  { label: 'CTR', value: '6.7%', icon: TrendingUp, note: 'Illustrative' },
  { label: 'Conv. Rate', value: '5.7%', icon: Target, note: 'Illustrative' },
  { label: 'Budget', value: 'Flexible', icon: DollarSign, note: 'Illustrative' },
];

const process = ['Audience', 'Creative', 'Campaign', 'Landing Page', 'Conversion', 'Analytics', 'Optimization'];

export default function Advertising() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">09 — Advertising</span>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Don't just spend on ads.
            <br />
            <span className="text-ink-400">Build a system around them.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Dashboard mockup */}
          <div className="rounded-3xl border border-ink-800 bg-ink-900/30 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink-200">Campaign Dashboard</span>
              <span className="rounded-full bg-ink-800 px-3 py-1 text-xs text-ink-400">Demo data</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-ink-800 bg-ink-950/40 p-4"
                >
                  <m.icon size={16} className="text-accent-400" />
                  <p className="mt-3 font-display text-2xl font-semibold text-ink-50">{m.value}</p>
                  <p className="text-xs text-ink-500">{m.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Simple chart bars */}
            <div className="mt-6 flex h-24 items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-accent-600 to-accent-400"
                />
              ))}
            </div>
            <p className="mt-2 text-right text-xs text-ink-600">Weekly performance (illustrative)</p>
          </div>

          {/* Process */}
          <div className="flex flex-col justify-center rounded-3xl border border-ink-800 bg-ink-900/20 p-6 sm:p-8">
            <span className="text-sm font-medium text-ink-200">The system</span>
            <div className="mt-6 space-y-3">
              {process.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-700 font-mono text-xs text-ink-400">
                    {i + 1}
                  </span>
                  <span className="text-ink-200">{step}</span>
                  {i < process.length - 1 && <span className="text-ink-700">→</span>}
                </motion.div>
              ))}
            </div>
            <a
              href="#configurator"
              className="group mt-8 flex items-center gap-2 self-start rounded-full border border-ink-700 px-6 py-3 text-sm text-ink-200 transition-colors hover:border-accent-400 hover:text-accent-400"
            >
              Plan My Campaign
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
