import { motion } from 'framer-motion';

const traditional = [
  'Choose a package',
  'Get predefined features',
  'Pay upfront',
  'Website gets delivered',
  'Project ends',
];

const ours = [
  'Tell us your goal',
  'We understand your business',
  'We define the required scope',
  'We build in stages',
  'You pay as stages are completed',
  'We continue improving what matters',
];

export default function Difference() {
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">03 — The Difference</span>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Most agencies sell packages.
            <br />
            <span className="text-ink-400">We build what your business actually needs.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Traditional */}
          <div className="rounded-3xl border border-ink-800 bg-ink-900/20 p-8 sm:p-10">
            <span className="text-sm font-medium text-ink-500">Traditional approach</span>
            <div className="mt-8 space-y-4">
              {traditional.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-700 font-mono text-xs text-ink-500">
                    {i + 1}
                  </span>
                  <span className="text-ink-400 line-through decoration-ink-600/50">{step}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 border-t border-ink-800 pt-6">
              <p className="text-sm text-ink-500">You get a website. Then you're on your own.</p>
            </div>
          </div>

          {/* Ours */}
          <div className="relative rounded-3xl border border-accent-400/20 bg-gradient-to-b from-accent-400/5 to-transparent p-8 sm:p-10">
            <span className="text-sm font-medium text-accent-400">Our approach</span>
            <div className="mt-8 space-y-4">
              {ours.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-400 font-mono text-xs font-medium text-ink-950">
                    {i + 1}
                  </span>
                  <span className="text-ink-100">{step}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 border-t border-accent-400/20 pt-6">
              <p className="text-sm text-accent-400">You get a partner. Launch is just the start.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
