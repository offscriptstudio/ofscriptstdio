import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const metrics = ['Visual presence', 'Mobile experience', 'Content', 'SEO visibility', 'Conversion paths', 'Social presence', 'Trust signals'];

const demoScores: Record<string, number[]> = {
  'Your Brand': [8, 9, 7, 6, 8, 7, 8],
  'Competitor A': [6, 5, 8, 7, 5, 9, 6],
  'Competitor B': [7, 6, 5, 8, 6, 5, 7],
  'Competitor C': [5, 4, 6, 5, 7, 6, 5],
};

export default function CompetitorEdge() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">07 — Competitor Edge</span>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Your competitors are already online.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-300">
            So the question isn't whether you should have a digital presence. It's whether yours gives people a reason to choose you.
          </p>
        </div>

        <div className="rounded-3xl border border-ink-800 bg-ink-900/30 p-6 sm:p-10">
          <p className="mb-8 text-xs uppercase tracking-wide text-ink-500">
            Example demonstration — illustrative scores
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-ink-800 pb-4 text-left text-xs uppercase tracking-wide text-ink-500">Metric</th>
                  {Object.keys(demoScores).map((brand) => (
                    <th key={brand} className="border-b border-ink-800 pb-4 text-center">
                      <span className={`text-sm font-medium ${brand === 'Your Brand' ? 'text-accent-400' : 'text-ink-300'}`}>
                        {brand}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, i) => (
                  <tr key={metric} className="border-b border-ink-800/50">
                    <td className="py-4 text-sm text-ink-400">{metric}</td>
                    {Object.entries(demoScores).map(([brand, scores]) => (
                      <td key={brand} className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-800">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${scores[i] * 10}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className={`h-full ${brand === 'Your Brand' ? 'bg-accent-400' : 'bg-ink-500'}`}
                            />
                          </div>
                          <span className="font-mono text-xs text-ink-500">{scores[i]}/10</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-ink-400">
              This is an example. We can run a real analysis for your business.
            </p>
            <a
              href="#configurator"
              className="group flex items-center gap-2 rounded-full border border-ink-700 px-6 py-3 text-sm text-ink-200 transition-colors hover:border-accent-400 hover:text-accent-400"
            >
              Analyze My Market
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
