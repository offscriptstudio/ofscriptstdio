import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'What kind of projects do you handle?',
    a: 'We work on business websites, landing pages, redesigns, ecommerce setups, and growth-oriented digital experiences built around the goals of your brand.',
  },
  {
    q: 'Do you work with existing businesses?',
    a: 'Yes. We often redesign or upgrade existing websites to better reflect the brand, improve clarity, and increase conversions.',
  },
  {
    q: 'Can you help with marketing after the site is live?',
    a: 'Yes. We can support content, social growth, SEO, and campaigns so your website becomes part of a larger growth engine.',
  },
  {
    q: 'How long does a project usually take?',
    a: 'The timeline depends on scope, content readiness, and complexity. A focused landing page may move quickly, while a full website usually takes longer because of design and development decisions.',
  },
  {
    q: 'Do I need to prepare content before starting?',
    a: 'Not necessarily. We can help shape the messaging, collect what you already have, and guide what needs to be created for a stronger result.',
  },
  {
    q: 'Can you work with our brand and goals?',
    a: 'Absolutely. We adapt to your business, audience, and market position so the website feels aligned with your brand instead of generic.',
  },
  {
    q: 'What happens after the website is launched?',
    a: 'We continue with review, optimization, and growth support. Launch is a milestone, not the end of the work.',
  },
  {
    q: 'How do we start?',
    a: 'You tell us your goals, current business situation, and what you need. We review your brief and reach out to plan the right next step.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">14 — FAQ</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/20">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className={`text-sm font-medium transition-colors ${open === i ? 'text-accent-400' : 'text-ink-200'}`}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-ink-400"
                >
                  <Plus size={18} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm text-ink-400">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
