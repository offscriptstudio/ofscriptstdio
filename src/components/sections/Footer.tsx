import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const navLinks = ['Services', 'Work', 'Process', 'About', 'Contact'];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-800 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-1 font-display text-2xl font-semibold tracking-tight">
              Offscript<span className="text-accent-400"> Studio</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-ink-400">
              We build digital experiences that help businesses get noticed, trusted and chosen.
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-ink-500">Navigation</span>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-sm text-ink-300 transition-colors hover:text-accent-400">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-ink-500">Connect</span>
            <ul className="mt-4 space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-accent-400"><Instagram size={14} /> Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-accent-400"><Linkedin size={14} /> LinkedIn</a></li>
              <li><a href="mailto:info.offscriptstudio@gmail.com" className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-accent-400"><Mail size={14} /> info.offscriptstudio@gmail.com</a></li>
              <li><a href="tel:+918171924503" className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-accent-400"><Phone size={14} /> +91 81719 24503</a></li>
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide text-ink-500">Legal</span>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-ink-300 transition-colors hover:text-accent-400">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-ink-300 transition-colors hover:text-accent-400">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row">
          <p className="text-xs text-ink-600">© {new Date().getFullYear()} Offscript Studio. Built around your business.</p>
          <p className="text-xs text-ink-600">Your business is different. Your website should be too.</p>
        </div>
      </div>
    </footer>
  );
}
