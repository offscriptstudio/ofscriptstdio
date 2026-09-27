import { motion } from 'framer-motion';

const projects = [
  {
    client: 'Selected experiment',
    industry: 'E-commerce',
    challenge: 'A product-first brand needed a storefront that felt premium without slowing down.',
    built: 'A fast, animated e-commerce experience with a custom checkout flow.',
    services: ['Website', 'SEO', 'Analytics'],
    outcome: 'A storefront designed to convert attention into purchases.',
  },
  {
    client: 'Selected experiment',
    industry: 'Fitness & Wellness',
    challenge: 'A local studio wanted bookings, not just a brochure website.',
    built: 'A booking-integrated website with class scheduling and WhatsApp automation.',
    services: ['Website', 'Booking System', 'Instagram'],
    outcome: 'A digital presence that fills classes, not just pages.',
  },
  {
    client: 'Selected experiment',
    industry: 'B2B SaaS',
    challenge: 'A startup needed credibility and lead capture before launch.',
    built: 'A landing page with lead capture, demo scheduling and conversion tracking.',
    services: ['Landing Page', 'Meta Ads', 'Conversion'],
    outcome: 'A launch that started with qualified leads, not cold traffic.',
  },
];

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-400">10 — Work</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
              Selected experiments.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-400">
            We're building in public. Real case studies with real metrics will replace these as projects launch.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group grid gap-6 rounded-3xl border border-ink-800 bg-ink-900/20 p-6 transition-colors hover:border-ink-600 sm:p-10 lg:grid-cols-[1fr_1fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-ink-700 px-3 py-1 text-xs text-ink-400">{p.industry}</span>
                  <span className="font-mono text-xs text-ink-600">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-ink-50 sm:text-3xl">{p.client}</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-ink-500">Challenge</span>
                    <p className="mt-1 text-sm text-ink-300">{p.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wide text-ink-500">What we built</span>
                    <p className="mt-1 text-sm text-ink-300">{p.built}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wide text-ink-500">Services</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <span key={s} className="rounded-full border border-ink-700 bg-ink-900/50 px-3 py-1 text-xs text-ink-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-accent-400/20 bg-accent-400/5 p-4">
                  <span className="text-xs uppercase tracking-wide text-accent-400">Outcome</span>
                  <p className="mt-2 text-sm text-ink-200">{p.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
