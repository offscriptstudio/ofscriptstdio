import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectConfig } from './estimate';

interface Props {
  config: ProjectConfig;
  step: number;
}

export default function SummaryCard({ config, step }: Props) {
  const items: { label: string; value: string }[] = [];

  if (config.projectTypes.length > 0)
    items.push({ label: 'Project Type', value: config.projectTypes.join(', ') });
  if (config.business.name) items.push({ label: 'Business', value: config.business.name });
  if (config.goals.length > 0) items.push({ label: 'Primary Goal', value: config.goals.join(', ') });
  if (config.features.length > 0) items.push({ label: 'Features', value: `${config.features.length} selected` });
  if (config.growth.length > 0) items.push({ label: 'Growth', value: config.growth.join(', ') });
  if (config.timeline) items.push({ label: 'Timeline', value: config.timeline });
  if (config.budget) items.push({ label: 'Budget', value: config.budget });

  return (
    <div className="sticky top-24 hidden lg:block">
      <div className="rounded-3xl border border-ink-800 bg-ink-900/40 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-500">Your Project</span>
          <span className="font-mono text-xs text-accent-400">{step + 1}/6</span>
        </div>

        <div className="mt-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-ink-500"
              >
                Start answering questions. Your project summary will build here in real time.
              </motion.p>
            ) : (
              items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start justify-between gap-3 border-b border-ink-800 pb-3"
                >
                  <span className="text-xs uppercase tracking-wide text-ink-500">{item.label}</span>
                  <span className="text-right text-sm text-ink-200">{item.value}</span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
