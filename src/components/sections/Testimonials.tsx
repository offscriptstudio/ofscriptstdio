import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-400">13 — Testimonials</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
          Your story could be here.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 rounded-3xl border border-dashed border-ink-700 bg-ink-900/20 p-10 text-center sm:p-16"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ink-700 bg-ink-900/50">
            <Sparkles size={24} className="text-accent-400" />
          </div>
          <p className="mx-auto mt-6 max-w-lg text-balance text-lg text-ink-300">
            We're building in public. The first clients who work with us get premium work at early-adopter rates — and a story worth telling.
          </p>
          <p className="mt-4 text-sm text-ink-500">
            Real testimonials will replace this section as projects launch.
          </p>
          <a
            href="#configurator"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3.5 font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Be one of the first
            <Sparkles size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
