import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Growth', href: '#growth' },
  { label: 'About', href: '#about' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-2 top-4 z-[100] mx-auto w-auto max-w-7xl sm:inset-x-4"
      >
        <div
          className={`flex items-center justify-between rounded-full px-3 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled ? 'glass shadow-2xl shadow-black/40' : 'bg-transparent'
          }`}
        >
          <a href="#top" onClick={() => setMenuOpen(false)} className="flex min-w-0 items-center gap-1 font-display text-sm font-semibold tracking-tight sm:text-lg">
            <span className="hidden sm:inline">Offscript<span className="text-accent-400"> Studio</span></span>
            <span className="sm:hidden">Offscript</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative px-4 py-2 text-sm text-ink-300 transition-colors hover:text-ink-50"
              >
                {l.label}
                <span className="absolute bottom-1 left-4 h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#configurator"
              className="group relative overflow-hidden rounded-full bg-ink-50 px-2.5 py-2 text-[10px] font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95 sm:px-5 sm:text-sm"
            >
              <span className="relative z-10">Start</span>
              <span className="absolute inset-0 translate-y-full bg-accent-400 transition-transform duration-300 group-hover:translate-y-0" />
            </a>
            <a
              href="tel:+918171924503"
              aria-label="Call Offscript Studio"
              title="Call Offscript Studio"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-700 text-ink-100 transition-colors hover:border-accent-400 hover:text-accent-400 md:hidden"
            >
              <Phone size={16} />
            </a>
            <button
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-700 text-ink-100 transition-colors hover:border-accent-400 hover:text-accent-400 md:hidden"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            id="mobile-navigation"
            className="glass mt-2 rounded-3xl p-3 md:hidden"
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-ink-200 transition-colors hover:bg-ink-50/5 hover:text-accent-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
