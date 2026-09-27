import { motion } from 'framer-motion';

const words = ['It should', 'attract.', 'Explain.', 'Build trust.', 'Convert.', 'Measure.', 'Improve.'];

export default function WhyUs() {
  return (
    <section id="about" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-400">11 — Why Us</span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
          We care about what happens after launch.
        </h2>

        <div className="mt-12">
          <p className="font-display text-2xl text-ink-400 sm:text-3xl lg:text-4xl">
            A website should not simply exist.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`font-display text-2xl font-medium sm:text-3xl lg:text-4xl ${
                  i === 0 ? 'text-ink-400' : 'text-ink-50'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {[
            { title: 'Custom, not copied', desc: 'Every project starts with your business. No templates, no reused designs.' },
            { title: 'Pay as we build', desc: 'Milestone-based payments. You see progress before you pay for it.' },
            { title: 'Growth after launch', desc: "We don't disappear after deployment. Content, SEO, ads, improvements." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-ink-800 bg-ink-900/30 p-6">
              <h3 className="font-display text-lg font-medium text-ink-50">{item.title}</h3>
              <p className="mt-3 text-sm text-ink-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
