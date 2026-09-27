import { motion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 sm:py-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink-50 sm:text-7xl lg:text-8xl"
        >
          Let's build something
          <br />
          <span className="text-ink-400">people remember.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-lg text-balance text-lg text-ink-300"
        >
          Tell us where you are, where you want to go, and what you need to get there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#configurator"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-accent-400 px-8 py-4 font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowUpRight size={18} className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute inset-0 translate-y-full bg-ink-50 transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <a
            href="tel:+918171924503"
            className="flex items-center gap-2 rounded-full border border-ink-700 px-8 py-4 font-medium text-ink-200 transition-colors hover:border-ink-500 hover:text-ink-50"
          >
            <Phone size={18} />
            Call Us
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-sm text-ink-500"
        >
          No fixed packages. No unnecessary features. Just a plan built around your business.
        </motion.p>
      </div>
    </section>
  );
}
