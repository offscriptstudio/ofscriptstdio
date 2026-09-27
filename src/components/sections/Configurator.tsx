import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { initialConfig, type ProjectConfig } from './configurator/estimate';
import SummaryCard from './configurator/SummaryCard';

const projectTypeOptions = [
  'New Website', 'Website Redesign', 'Landing Page', 'E commerce Website',
  'Web Application', 'Website + Marketing', 'Social Media Growth', 'Advertising',
  'SEO', 'Not Sure Yet',
];

const goalOptions = [
  'Get more enquiries', 'Generate leads', 'Sell products', 'Build credibility',
  'Launch a new business', 'Increase bookings', 'Increase Instagram reach',
  'Increase online sales', 'Improve conversion', 'Automate business processes', 'Other',
];

const featureOptions = [
  'Contact form', 'WhatsApp integration', 'Booking system', 'Payment gateway',
  'Authentication', 'Admin dashboard', 'CMS', 'Blog', 'Product catalogue',
  'E commerce', 'Customer portal', 'Analytics', 'CRM integration', 'API integration',
  'AI features', 'Animations', '3D experience', 'Other',
];

const growthOptions = [
  'Instagram management', 'Content creation', 'Reels', 'Static posts',
  'Paid advertising', 'Meta Ads', 'Google Ads', 'SEO', 'Email marketing',
  'Analytics', 'Conversion optimization', 'Not sure',
];

const experienceOptions = ['Simple and focused', 'Premium and polished', 'Highly interactive', 'Experimental', 'Let us recommend'];
const timelineOptions = ['ASAP', '2 to 4 weeks', '1 to 2 months', 'Flexible'];
const budgetOptions = ['Starter budget', 'Balanced budget', 'Premium budget', 'Flexible', 'Not sure yet'];

const stepLabels = [
  'What are you looking for?',
  'Tell us about your business',
  'What is the main goal?',
  'What do you need included?',
  'When do you need it?',
  'Contact details',
];

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<ProjectConfig>(initialConfig);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const toggle = (key: keyof ProjectConfig, value: string) => {
    setConfig((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const toggleFeatures = (value: string) => toggle('features', value);
  const toggleGrowth = (value: string) => toggle('growth', value);
  const toggleGoals = (value: string) => toggle('goals', value);
  const toggleTypes = (value: string) => toggle('projectTypes', value);

  const canProceed = () => {
    if (step === 0) return config.projectTypes.length > 0;
    if (step === 1) return config.business.name.length > 0 && config.business.industry.length > 0;
    if (step === 2) return config.goals.length > 0;
    if (step === 3) return true;
    if (step === 4) return config.timeline.length > 0;
    if (step === 5) return config.contact.name.length > 0 && config.contact.email.length > 0;
    return true;
  };

  const back = () => step > 0 && setStep(step - 1);

  const submitBrief = async () => {
    if (isSubmitting || hasSubmitted) return;
    setIsSubmitting(true);
    setSubmissionMessage('');

    try {
      const projectSummary = [
        `Project Type: ${config.projectTypes.join(', ') || 'Not specified'}`,
        `Business: ${config.business.name || 'Not specified'}`,
        `Industry: ${config.business.industry || 'Not specified'}`,
        `Website: ${config.business.website || 'Not specified'}`,
        `Location: ${config.business.location || 'Not specified'}`,
        `Audience: ${config.business.audience || 'Not specified'}`,
        `Description: ${config.business.description || 'Not specified'}`,
        `Primary Goal: ${config.goals.join(', ') || 'Not specified'}`,
        `Features: ${config.features.join(', ') || 'Not specified'}`,
        `Growth: ${config.growth.join(', ') || 'Not specified'}`,
        `Experience: ${config.experience || 'Not specified'}`,
        `Timeline: ${config.timeline || 'Not specified'}`,
        `Budget: ${config.budget || 'Not specified'}`,
      ].join('\n');

      const formData = new FormData();
      formData.append('access_key', 'eccfceac-875f-4d7a-8d3a-8e995893bc58');
      formData.append('name', config.contact.name || 'New lead');
      formData.append('email', config.contact.email || '');
      formData.append('phone', config.contact.phone || '');
      formData.append('company', config.contact.company || '');
      formData.append('subject', 'Offscript Studio Project Brief');
      formData.append('message', `New project inquiry from Offscript Studio website.\n\n${projectSummary}`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setHasSubmitted(true);
        setSubmissionMessage('Your brief has been submitted successfully. We will contact you shortly.');
      } else {
        setSubmissionMessage('There was a problem submitting your brief. Please email info.offscriptstudio@gmail.com directly.');
      }
    } catch (error) {
      setSubmissionMessage('There was a problem submitting your brief. Please email info.offscriptstudio@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    if (step < 5) setStep(step + 1);
    else {
      setSubmitted(true);
      void submitBrief();
    }
  };

  return (
    <section id="configurator" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-400">04 — Start With Your Idea</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Tell us what you're trying to build.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink-300">
            No package hunting. No guessing. Just tell us what you need.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <FinalSummary
              config={config}
              isSubmitting={isSubmitting}
              hasSubmitted={hasSubmitted}
              submissionMessage={submissionMessage}
              onSubmit={submitBrief}
              onReset={() => { setSubmitted(false); setStep(0); setConfig(initialConfig); setHasSubmitted(false); setSubmissionMessage(''); }}
            />
          ) : (
            <motion.div
              key="configurator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 lg:grid-cols-[1fr_320px]"
            >
              <div className="rounded-3xl border border-ink-800 bg-ink-900/30 p-6 sm:p-10">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs text-ink-500">
                    <span className="font-mono">Step {step + 1} / 6</span>
                    <span>{stepLabels[step]}</span>
                  </div>
                  <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-ink-800">
                    <motion.div
                      className="h-full bg-accent-400"
                      animate={{ width: `${((step + 1) / 6) * 100}%` }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 0 && (
                      <StepGrid options={projectTypeOptions} selected={config.projectTypes} onToggle={toggleTypes} multi />
                    )}
                    {step === 1 && (
                      <BusinessForm config={config} setConfig={setConfig} />
                    )}
                    {step === 2 && (
                      <StepGrid options={goalOptions} selected={config.goals} onToggle={toggleGoals} multi />
                    )}
                    {step === 3 && (
                      <>
                        <p className="mb-6 text-sm text-ink-400">Select everything you think you might need.</p>
                        <StepGrid options={featureOptions} selected={config.features} onToggle={toggleFeatures} multi />
                      </>
                    )}
                    {step === 4 && (
                      <StepGrid options={timelineOptions} selected={config.timeline ? [config.timeline] : []} onToggle={(v) => setConfig({ ...config, timeline: v })} />
                    )}
                    {step === 5 && (
                      <ContactForm config={config} setConfig={setConfig} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="flex items-center gap-2 rounded-full border border-ink-700 px-5 py-2.5 text-sm text-ink-300 transition-colors hover:border-ink-500 hover:text-ink-50 disabled:opacity-30 disabled:hover:border-ink-700 disabled:hover:text-ink-300"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={next}
                    disabled={!canProceed()}
                    className="group flex items-center gap-2 rounded-full bg-accent-400 px-6 py-2.5 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                  >
                    {step === 5 ? 'Send My Brief' : 'Continue'}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              <SummaryCard config={config} step={step} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StepGrid({ options, selected, onToggle, multi }: { options: string[]; selected: string[]; onToggle: (v: string) => void; multi?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
              isSelected
                ? 'border-accent-400 bg-accent-400/10 text-ink-50'
                : 'border-ink-800 bg-ink-900/30 text-ink-300 hover:border-ink-600 hover:bg-ink-900/50'
            }`}
          >
            <span className="text-sm font-medium">{opt}</span>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
              isSelected ? 'border-accent-400 bg-accent-400 text-ink-950' : 'border-ink-700 text-transparent'
            }`}>
              <Check size={12} />
            </span>
          </button>
        );
      })}
      {multi && selected.length > 0 && (
        <p className="col-span-full mt-2 text-xs text-ink-500">{selected.length} selected</p>
      )}
    </div>
  );
}

function BusinessForm({ config, setConfig }: { config: ProjectConfig; setConfig: (c: ProjectConfig) => void }) {
  const update = (key: keyof ProjectConfig['business'], value: string) => {
    setConfig({ ...config, business: { ...config.business, [key]: value } });
  };
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input label="Business name" value={config.business.name} onChange={(v) => update('name', v)} placeholder="e.g. Studio Fitness" required />
      <Input label="Industry" value={config.business.industry} onChange={(v) => update('industry', v)} placeholder="e.g. Fitness & Wellness" required />
      <Input label="Website URL (if available)" value={config.business.website} onChange={(v) => update('website', v)} placeholder="https://..." />
      <Input label="Location" value={config.business.location} onChange={(v) => update('location', v)} placeholder="City, Country" />
      <Input label="Target audience" value={config.business.audience} onChange={(v) => update('audience', v)} placeholder="Who are your customers?" />
      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs uppercase tracking-wide text-ink-500">Short description</label>
        <textarea
          value={config.business.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          placeholder="Tell us about your business..."
          className="w-full rounded-2xl border border-ink-800 bg-ink-900/30 px-4 py-3 text-sm text-ink-100 placeholder-ink-600 outline-none transition-colors focus:border-accent-400"
        />
      </div>
    </div>
  );
}

function ContactForm({ config, setConfig }: { config: ProjectConfig; setConfig: (c: ProjectConfig) => void }) {
  const update = (key: keyof ProjectConfig['contact'], value: string) => {
    setConfig({ ...config, contact: { ...config.contact, [key]: value } });
  };
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input label="Name" value={config.contact.name} onChange={(v) => update('name', v)} placeholder="Your name" required />
      <Input label="Email" value={config.contact.email} onChange={(v) => update('email', v)} placeholder="you@email.com" required />
      <Input label="Phone" value={config.contact.phone} onChange={(v) => update('phone', v)} placeholder="+91..." />
      <Input label="Company" value={config.contact.company} onChange={(v) => update('company', v)} placeholder="Company name" />
    </div>
  );
}

function Input({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wide text-ink-500">
        {label} {required && <span className="text-accent-400">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink-800 bg-ink-900/30 px-4 py-3 text-sm text-ink-100 placeholder-ink-600 outline-none transition-colors focus:border-accent-400"
      />
    </div>
  );
}

function FinalSummary({ config, isSubmitting, hasSubmitted, submissionMessage, onSubmit, onReset }: { config: ProjectConfig; isSubmitting: boolean; hasSubmitted: boolean; submissionMessage: string; onSubmit: () => Promise<void>; onReset: () => void }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Project Type', value: config.projectTypes.join(', ') || 'Not specified' },
    { label: 'Business', value: config.business.name || 'Not specified' },
    { label: 'Industry', value: config.business.industry || 'Not specified' },
    { label: 'Primary Goal', value: config.goals.join(', ') || 'Not specified' },
    { label: 'Features', value: config.features.length > 0 ? `${config.features.length} selected` : 'None' },
    { label: 'Growth', value: config.growth.join(', ') || 'None' },
    { label: 'Experience', value: config.experience || 'Not specified' },
    { label: 'Timeline', value: config.timeline || 'Not specified' },
    { label: 'Budget', value: config.budget || 'Not specified' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      <div className="rounded-3xl border border-ink-800 bg-ink-900/40 p-8 text-center sm:p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-400 text-ink-950"
        >
          <Check size={32} />
        </motion.div>

        <h3 className="mt-6 font-display text-4xl font-semibold text-ink-50">
          {isSubmitting ? 'Sending your brief.' : hasSubmitted ? 'Got it.' : 'Review your brief.'}
        </h3>
        <p className="mt-3 text-ink-300">
          {isSubmitting ? 'Sending your project details now.' : hasSubmitted ? 'Your project is being shaped around your requirements.' : 'Your details are ready to send.'}
        </p>

        <div className="mt-10 space-y-3 text-left">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-between border-b border-ink-800 pb-3"
            >
              <span className="text-xs uppercase tracking-wide text-ink-500">{row.label}</span>
              <span className="text-right text-sm text-ink-200">{row.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-2xl border border-accent-400/20 bg-accent-400/5 p-6"
        >
          <span className="text-xs uppercase tracking-wide text-accent-400">Project brief</span>
          <p className="mt-2 text-lg font-medium text-ink-50">Your requirements are ready for the next review step.</p>
          <p className="mt-2 text-xs text-ink-500">We’ll reach out by phone or email to confirm the right next step.</p>
        </motion.div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onSubmit}
            disabled={isSubmitting || hasSubmitted}
            className="group flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3.5 font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles size={18} />
            {isSubmitting ? 'Sending...' : hasSubmitted ? 'Brief Sent' : 'Send My Brief'}
          </button>
          <button
            onClick={onReset}
            className="rounded-full border border-ink-700 px-7 py-3.5 text-sm text-ink-300 transition-colors hover:text-ink-50"
          >
            Start Over
          </button>
        </div>

        {submissionMessage && (
          <p className="mt-4 text-sm text-accent-300">{submissionMessage}</p>
        )}
      </div>
    </motion.div>
  );
}
