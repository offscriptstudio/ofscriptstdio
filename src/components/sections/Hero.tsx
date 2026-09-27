import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 lg:pb-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-ink-700/20 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 inline-flex max-w-[90vw] items-center gap-2 rounded-full border border-ink-800 bg-ink-900/50 px-3 py-1.5 text-[10px] text-ink-300 backdrop-blur-sm sm:px-4 sm:text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
          </span>
          Custom scoped. Pay as you go.
        </motion.div>

        <h1 className="font-display text-[2.5rem] font-semibold leading-[0.9] tracking-tight text-ink-50 sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              We don't build
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              websites.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block text-ink-400"
            >
              We build reasons
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              to choose you.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-balance text-base text-ink-300 sm:text-xl"
        >
          Websites, content and growth systems designed around your business, not a template.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex w-full max-w-[320px] flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row"
        >
          <a
            href="#configurator"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-400 px-6 py-3.5 font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowUpRight size={18} className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute inset-0 translate-y-full bg-ink-50 transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <a
            href="#services"
            className="w-full rounded-full border border-ink-700 px-6 py-3.5 text-center font-medium text-ink-200 transition-colors hover:border-ink-500 hover:text-ink-50 sm:w-auto"
          >
            See Our Approach
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-ink-500">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
