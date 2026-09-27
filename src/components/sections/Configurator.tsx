import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles, Edit3, CheckSquare, Square } from 'lucide-react';
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

const timelineOptions = ['ASAP', '2 to 4 weeks', '1 to 2 months', 'Flexible'];

const stepLabels = [
  'What are you looking for?',
  'Tell us about your business',
  'What is the main goal?',
  'What do you need included?',
  'When do you need it?',
  'Contact details',
  'Preview & Confirm',
];

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<ProjectConfig>(initialConfig);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const back = () => {
    if (isPreviewMode) {
      setIsPreviewMode(false);
      setStep(5);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const jumpToStep = (targetStep: number) => {
    setIsPreviewMode(false);
    setStep(targetStep);
  };

  const submitBrief = async () => {
    if (!isConfirmed || isSubmitting || hasSubmitted) return;
    setIsSubmitting(true);
    setSubmissionMessage('');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'eccfceac-875f-4d7a-8d3a-8e995893bc58';

      const projectSummary = [
        `Target Email: info.offscriptstudio@gmail.com`,
        `Project Type: ${config.projectTypes.join(', ') || 'Not specified'}`,
        `Business Name: ${config.business.name || 'Not specified'}`,
        `Industry: ${config.business.industry || 'Not specified'}`,
        `Website URL: ${config.business.website || 'Not specified'}`,
        `Location: ${config.business.location || 'Not specified'}`,
        `Target Audience: ${config.business.audience || 'Not specified'}`,
        `Description: ${config.business.description || 'Not specified'}`,
        `Primary Goals: ${config.goals.join(', ') || 'Not specified'}`,
        `Features Needed: ${config.features.join(', ') || 'None'}`,
        `Timeline: ${config.timeline || 'Not specified'}`,
        `Contact Name: ${config.contact.name || 'Not specified'}`,
        `Contact Email: ${config.contact.email || 'Not specified'}`,
        `Contact Phone: ${config.contact.phone || 'Not specified'}`,
        `Company: ${config.contact.company || 'Not specified'}`,
      ].join('\n');

      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', config.contact.name || 'New Lead');
      formData.append('email', config.contact.email || 'info.offscriptstudio@gmail.com');
      formData.append('phone', config.contact.phone || '');
      formData.append('company', config.contact.company || '');
      formData.append('subject', `New Project Brief - ${config.business.name || config.contact.name}`);
      formData.append('message', `New project inquiry received for Offscript Studio:\n\n${projectSummary}`);
      formData.append('from_name', 'Offscript Studio Brief Form');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error('Non-JSON response from Web3Forms:', text);
        result = { success: false, message: 'Server returned HTML response instead of JSON.' };
      }

      if (response.ok && result.success) {
        setHasSubmitted(true);
        setSubmitSuccess(true);
        setSubmissionMessage('Your brief has been sent successfully to info.offscriptstudio@gmail.com! We will get back to you shortly.');
      } else {
        console.error('Web3Forms submit error:', result);
        setSubmitSuccess(false);
        setSubmissionMessage(result.message || 'There was a problem submitting your brief via Web3Forms. Please check your Access Key in .env or contact info.offscriptstudio@gmail.com directly.');
      }
    } catch (error) {
      console.error('Submission catch error:', error);
      setSubmitSuccess(false);
      setSubmissionMessage('Network error occurred while submitting your brief. Please check your connection or contact info.offscriptstudio@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsPreviewMode(true);
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

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-ink-800 bg-ink-900/30 p-6 sm:p-10">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-ink-500">
                <span className="font-mono">
                  {isPreviewMode ? 'Step 7 / 7' : `Step ${step + 1} / 6`}
                </span>
                <span>{isPreviewMode ? stepLabels[6] : stepLabels[step]}</span>
              </div>
              <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-ink-800">
                <motion.div
                  className="h-full bg-accent-400"
                  animate={{ width: isPreviewMode ? '100%' : `${((step + 1) / 6) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isPreviewMode ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-ink-50 mb-2">Preview Your Information</h3>
                  <p className="text-sm text-ink-400 mb-6">
                    Please review your details below. You can edit any section before confirming and submitting.
                  </p>

                  <div className="space-y-4 mb-8">
                    <PreviewSection
                      title="1. Looking For (Project Type)"
                      content={config.projectTypes.join(', ') || 'Not specified'}
                      onEdit={() => jumpToStep(0)}
                    />
                    <PreviewSection
                      title="2. Business Details"
                      content={
                        <div>
                          <p><strong>Name:</strong> {config.business.name || '-'}</p>
                          <p><strong>Industry:</strong> {config.business.industry || '-'}</p>
                          {config.business.website && <p><strong>Website:</strong> {config.business.website}</p>}
                          {config.business.location && <p><strong>Location:</strong> {config.business.location}</p>}
                          {config.business.audience && <p><strong>Audience:</strong> {config.business.audience}</p>}
                          {config.business.description && <p><strong>Description:</strong> {config.business.description}</p>}
                        </div>
                      }
                      onEdit={() => jumpToStep(1)}
                    />
                    <PreviewSection
                      title="3. Main Goal"
                      content={config.goals.join(', ') || 'Not specified'}
                      onEdit={() => jumpToStep(2)}
                    />
                    <PreviewSection
                      title="4. Included Features"
                      content={config.features.length > 0 ? config.features.join(', ') : 'None selected'}
                      onEdit={() => jumpToStep(3)}
                    />
                    <PreviewSection
                      title="5. Timeline"
                      content={config.timeline || 'Not specified'}
                      onEdit={() => jumpToStep(4)}
                    />
                    <PreviewSection
                      title="6. Contact Details"
                      content={
                        <div>
                          <p><strong>Name:</strong> {config.contact.name || '-'}</p>
                          <p><strong>Email:</strong> {config.contact.email || '-'}</p>
                          {config.contact.phone && <p><strong>Phone:</strong> {config.contact.phone}</p>}
                          {config.contact.company && <p><strong>Company:</strong> {config.contact.company}</p>}
                        </div>
                      }
                      onEdit={() => jumpToStep(5)}
                    />
                  </div>

                  {hasSubmitted && submitSuccess ? (
                    <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-ink-950">
                        <Check size={24} />
                      </div>
                      <h4 className="text-lg font-semibold text-green-400">Brief Submitted!</h4>
                      <p className="mt-2 text-sm text-ink-200">{submissionMessage}</p>
                      <button
                        onClick={() => {
                          setHasSubmitted(false);
                          setIsPreviewMode(false);
                          setStep(0);
                          setConfig(initialConfig);
                          setIsConfirmed(false);
                          setSubmissionMessage('');
                        }}
                        className="mt-6 rounded-full border border-ink-700 px-6 py-2.5 text-sm text-ink-300 hover:text-ink-50 transition-colors"
                      >
                        Submit Another Idea
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Confirmation Checkbox */}
                      <div className="mb-6">
                        <button
                          type="button"
                          onClick={() => setIsConfirmed(!isConfirmed)}
                          className="flex items-start gap-3 text-left group"
                        >
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                            isConfirmed ? 'border-accent-400 bg-accent-400 text-ink-950' : 'border-ink-600 bg-ink-900/50 group-hover:border-ink-400'
                          }`}>
                            {isConfirmed ? <CheckSquare size={14} /> : <Square size={14} className="text-transparent" />}
                          </span>
                          <span className="text-sm text-ink-200">
                            I confirm that all details provided above are accurate and ready for submission to <strong>info.offscriptstudio@gmail.com</strong>.
                          </span>
                        </button>
                      </div>

                      {submissionMessage && !submitSuccess && (
                        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
                          {submissionMessage}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink-800">
                        <button
                          onClick={back}
                          disabled={isSubmitting}
                          className="flex items-center gap-2 rounded-full border border-ink-700 px-5 py-2.5 text-sm text-ink-300 transition-colors hover:border-ink-500 hover:text-ink-50 disabled:opacity-30"
                        >
                          <ArrowLeft size={16} /> Back to Contact
                        </button>

                        <button
                          onClick={submitBrief}
                          disabled={!isConfirmed || isSubmitting}
                          className="group flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                        >
                          <Sparkles size={16} />
                          {isSubmitting ? 'Submitting...' : 'Submit Brief'}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
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
                      {step === 5 ? 'Preview & Confirm' : 'Continue'}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <SummaryCard config={config} step={isPreviewMode ? 6 : step} />
        </div>
      </div>
    </section>
  );
}

function PreviewSection({ title, content, onEdit }: { title: string; content: React.ReactNode; onEdit: () => void }) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-ink-800 bg-ink-900/40 p-4">
      <div className="space-y-1">
        <h4 className="text-xs font-mono uppercase tracking-wider text-accent-400">{title}</h4>
        <div className="text-sm text-ink-200">{content}</div>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-1.5 rounded-lg border border-ink-700 px-3 py-1.5 text-xs text-ink-300 hover:border-accent-400 hover:text-accent-400 transition-colors"
      >
        <Edit3 size={13} /> Edit
      </button>
    </div>
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
