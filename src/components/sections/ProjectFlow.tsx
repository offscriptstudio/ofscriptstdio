import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stages = [
  { label: 'Discovery', desc: 'We learn your business, audience and competitors.' },
  { label: 'Strategy', desc: 'We define what matters and what doesn\'t.' },
  { label: 'Design', desc: 'We create the visual direction and experience.' },
  { label: 'Development', desc: 'We build the approved sections and functionality.' },
  { label: 'Review', desc: 'We test, refine and get your feedback.' },
  { label: 'Launch', desc: 'We deploy, optimize and go live.' },
  { label: 'Grow', desc: 'Content, SEO, ads and continuous improvements.' },
];

export default function ProjectFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-60%']);

  return (
    <section id="process" className="relative py-32 sm:py-40">
      <div className="px-6">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">06 — Project Flow</span>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            From idea to launch to growth.
            <br />
            <span className="text-ink-400">One stage at a time.</span>
          </h2>
        </div>
      </div>

      <div ref={ref} className="relative overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6">
          {stages.map((stage, i) => (
            <div
              key={stage.label}
              className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-ink-800 bg-ink-900/30 p-8 sm:w-[400px]"
            >
              <span className="font-mono text-4xl text-ink-700">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-3xl font-medium text-ink-50">{stage.label}</h3>
              <p className="mt-3 text-sm text-ink-400">{stage.desc}</p>
              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-ink-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  className="h-full bg-accent-400"
                />
              </div>
              {i < stages.length - 1 && (
                <div className="mt-4 flex items-center gap-2 text-xs text-ink-600">
                  <span>Next: {stages[i + 1].label}</span>
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
