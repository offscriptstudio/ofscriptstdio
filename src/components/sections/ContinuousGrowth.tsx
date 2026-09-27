import { motion } from 'framer-motion';

const cycle = ['Website', 'Content', 'SEO', 'Ads', 'Analytics', 'Optimization'];

export default function ContinuousGrowth() {
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-400">12 — Continuous Growth</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
          Launch is not the finish line.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-300">
          Your website evolves. Content compounds. Ads optimize. The work that matters happens after the launch button.
        </p>
      </div>

      {/* Circular motion */}
      <div className="relative mx-auto mt-20 h-[400px] w-[400px] max-w-full sm:h-[500px] sm:w-[500px]">
        <div className="absolute inset-0 rounded-full border border-ink-800" />
        <div className="absolute inset-12 rounded-full border border-ink-800/50" />
        <div className="absolute inset-24 rounded-full border border-ink-800/30" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-display text-2xl font-semibold text-ink-50 sm:text-3xl"
          >
            Grow
          </motion.p>
          <p className="text-xs text-ink-500">continuously</p>
        </div>

        {cycle.map((item, i) => {
          const angle = (i / cycle.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={item}
              className="absolute left-1/2 top-1/2"
              style={{ x, y }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-900/60 backdrop-blur-sm sm:h-20 sm:w-20">
                <motion.span
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="text-center text-xs font-medium text-ink-200 sm:text-sm"
                >
                  {item}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
