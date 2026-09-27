import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useScroll';

const statements = [
  'Build what matters.',
  'Pay for what you need.',
  'Grow when you\'re ready.',
];

export default function Problem() {
  const [setRef, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={setRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">01 — The Problem</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Your business isn't generic.
            <br />
            <span className="text-ink-400">Why should your digital presence be?</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-ink-800 bg-ink-900/30 p-8"
          >
            <span className="text-sm text-ink-500">What most businesses get</span>
            <ul className="mt-6 space-y-4">
              {['Generic templates dressed up as custom', 'Fixed packages with features you don\'t need', 'Pay everything upfront, hope for the best', 'A website that launches and then nothing'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 text-ink-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-600" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center rounded-3xl border border-accent-400/20 bg-accent-400/5 p-8"
          >
            <span className="text-sm text-accent-400">What we believe</span>
            <div className="mt-6 space-y-6">
              {statements.map((s, i) => (
                <motion.p
                  key={s}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.6 }}
                  className="font-display text-2xl font-medium text-ink-50 sm:text-3xl"
                >
                  {s}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
