import { motion } from 'framer-motion';

const stages = [
  { num: '01', title: 'Strategy', desc: 'We understand your business and define the scope.' },
  { num: '02', title: 'Design', desc: 'We create the visual direction and experience.' },
  { num: '03', title: 'Build', desc: 'We develop the approved sections and functionality.' },
  { num: '04', title: 'Launch', desc: 'We test, optimize and deploy.' },
  { num: '05', title: 'Grow', desc: 'Content, SEO, advertising and continuous improvements.' },
];

export default function Pricing() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">05 — How We Work</span>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Clear scope. Thoughtful execution. No guesswork.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-3xl border border-ink-800 bg-ink-900/30 p-6 transition-colors hover:border-accent-400/30"
            >
              <span className="font-mono text-xs text-accent-400">{stage.num}</span>
              <h3 className="mt-4 font-display text-2xl font-medium text-ink-50">{stage.title}</h3>
              <p className="mt-3 text-sm text-ink-400">{stage.desc}</p>
              <div className="mt-6 flex items-center gap-2 rounded-full border border-ink-700 px-3 py-1.5 text-xs text-ink-400 transition-colors group-hover:border-accent-400/30 group-hover:text-accent-400">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                Scoped to your goals
              </div>
              {i < stages.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-ink-700 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
