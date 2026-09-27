import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    num: '01',
    title: 'Websites',
    desc: 'Custom websites designed around your business, audience and goals.',
    detail: 'From landing pages to e-commerce to web applications — every build starts with your business, not a template.',
    tags: ['Landing Pages', 'E-commerce', 'Web Apps', 'Redesigns'],
  },
  {
    num: '02',
    title: 'Brand Experiences',
    desc: 'Visual systems and digital experiences that make your business memorable.',
    detail: 'Identity, motion, interaction design — the layer that makes people remember you after they close the tab.',
    tags: ['Identity', 'Motion', 'Interaction'],
  },
  {
    num: '03',
    title: 'Social Content',
    desc: 'Content designed to make your brand worth following.',
    detail: 'Reels, static posts, creative direction, content calendars — built to earn attention, not buy it.',
    tags: ['Reels', 'Posts', 'Creative Direction'],
  },
  {
    num: '04',
    title: 'Paid Growth',
    desc: 'Meta Ads, Google Ads and campaign strategy focused on measurable outcomes.',
    detail: 'We don\'t just run ads. We build systems around them — audience, creative, landing page, analytics.',
    tags: ['Meta Ads', 'Google Ads', 'Strategy'],
  },
  {
    num: '05',
    title: 'SEO',
    desc: 'Technical and content driven optimization to improve discoverability.',
    detail: 'On-page, technical, content — the work that makes sure people find you before they find your competitors.',
    tags: ['Technical', 'Content', 'Local'],
  },
  {
    num: '06',
    title: 'Conversion',
    desc: 'Landing pages, funnels, analytics and experiments designed to turn attention into action.',
    detail: 'Traffic without conversion is just numbers. We turn clicks into enquiries, leads and sales.',
    tags: ['Funnels', 'Analytics', 'A/B Testing'],
  },
  {
    num: '07',
    title: 'Continuous Growth',
    desc: 'Your website does not stop evolving after launch.',
    detail: 'Content, SEO, experiments, improvements — the work that compounds after launch day.',
    tags: ['Content', 'SEO', 'Optimization'],
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">02 — What We Do</span>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Not a menu of services.
            <br />
            <span className="text-ink-400">A system for growth.</span>
          </h2>
        </div>

        <div className="border-t border-ink-800">
          {services.map((s, i) => (
            <div
              key={s.num}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative border-b border-ink-800"
            >
              <div className="flex items-center justify-between py-8 transition-all duration-500 group-hover:px-4">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-ink-600">{s.num}</span>
                  <h3 className="font-display text-3xl font-medium text-ink-200 transition-colors duration-300 group-hover:text-ink-50 sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h3>
                </div>
                <span className="hidden max-w-xs text-right text-sm text-ink-500 transition-colors duration-300 group-hover:text-ink-300 lg:block">
                  {s.desc}
                </span>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 pb-8 pl-12 sm:flex-row sm:items-end sm:justify-between">
                      <p className="max-w-xl text-ink-300">{s.detail}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-ink-700 bg-ink-900/50 px-3 py-1 text-xs text-ink-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
