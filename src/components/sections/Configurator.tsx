import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles, Edit3, CheckSquare, Square, Rocket, Target, Cpu, Clock, UserCheck, ShieldCheck } from 'lucide-react';
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
      const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const accessKey = (envKey && envKey.trim().length > 0) ? envKey.trim() : 'eccfceac-875f-4d7a-8d3a-8e995893bc58';

      const emailSubject = `🚀 NEW PROJECT BRIEF: ${config.business.name || config.contact.name || 'Offscript Studio Client'}`;

      const projectSummary = `
==================================================
✨ NEW PROJECT INQUIRY - OFFSCRIPT STUDIO
==================================================

1️⃣ PROJECT TYPE & LOOKING FOR:
--------------------------------------------------
• Selected Type: ${config.projectTypes.join(', ') || 'Not specified'}

2️⃣ BUSINESS DETAILS:
--------------------------------------------------
• Business Name: ${config.business.name || 'N/A'}
• Industry: ${config.business.industry || 'N/A'}
• Website URL: ${config.business.website || 'N/A'}
• Location: ${config.business.location || 'N/A'}
• Target Audience: ${config.business.audience || 'N/A'}
• Business Description: ${config.business.description || 'N/A'}

3️⃣ PRIMARY GOALS:
--------------------------------------------------
• Goals: ${config.goals.join(', ') || 'Not specified'}

4️⃣ INCLUDED FEATURES NEEDED:
--------------------------------------------------
• Features: ${config.features.length > 0 ? config.features.join(', ') : 'None selected'}

5️⃣ TIMELINE:
--------------------------------------------------
• Desired Timeline: ${config.timeline || 'Not specified'}

6️⃣ CLIENT CONTACT DETAILS:
--------------------------------------------------
• Full Name: ${config.contact.name || 'N/A'}
• Email Address: ${config.contact.email || 'N/A'}
• Phone Number: ${config.contact.phone || 'N/A'}
• Company: ${config.contact.company || 'N/A'}

==================================================
Sent via Offscript Studio Configurator Brief Form
Target: info.offscriptstudio@gmail.com
==================================================
`.trim();

      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', config.contact.name || 'Offscript Studio Client');
      formData.append('email', config.contact.email || 'info.offscriptstudio@gmail.com');
      formData.append('phone', config.contact.phone || '');
      formData.append('company', config.contact.company || '');
      formData.append('subject', emailSubject);
      formData.append('message', projectSummary);
      formData.append('from_name', 'Offscript Studio Brief Configurator');

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
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber-400 backdrop-blur-md">
            <Sparkles size={14} className="animate-spin-slow" />
            04 — Start With Your Idea
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            Tell us what you're trying to build.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink-300">
            No package hunting. No guessing. Just tell us what you need.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-ink-900/90 via-ink-900/60 to-ink-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

            {/* Progress bar */}
            <div className="relative z-10 mb-8">
              <div className="flex items-center justify-between text-xs text-ink-400 font-medium">
                <span className="font-mono text-amber-400">
                  {isPreviewMode ? 'Step 7 / 7' : `Step ${step + 1} / 6`}
                </span>
                <span className="text-ink-200">{isPreviewMode ? stepLabels[6] : stepLabels[step]}</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-950 border border-ink-800/80 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 shadow-[0_0_12px_rgba(245,150,0,0.5)]"
                  animate={{ width: isPreviewMode ? '100%' : `${((step + 1) / 6) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isPreviewMode ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink-800/80 pb-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
                        <ShieldCheck size={14} /> Ready to Submit
                      </span>
                      <h3 className="text-2xl font-bold text-ink-50 font-display">Review & Confirm Your Brief</h3>
                      <p className="text-sm text-ink-300 mt-1">
                        Double check your details. Click <strong className="text-amber-400">Edit</strong> on any card to update info before sending.
                      </p>
                    </div>
                  </div>

                  {/* Colorful Preview Grid */}
                  <div className="grid gap-4 mb-8">
                    <ColorfulPreviewCard
                      icon={<Rocket className="text-amber-400" size={18} />}
                      badge="01 • Project Type"
                      title="Looking For"
                      bgGradient="from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30"
                      onEdit={() => jumpToStep(0)}
                    >
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.projectTypes.length > 0 ? (
                          config.projectTypes.map(t => (
                            <span key={t} className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-medium text-amber-200">
                              {t}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-ink-500 italic">Not specified</span>
                        )}
                      </div>
                    </ColorfulPreviewCard>

                    <ColorfulPreviewCard
                      icon={<UserCheck className="text-indigo-400" size={18} />}
                      badge="02 • Business Profile"
                      title="Business Details"
                      bgGradient="from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/30"
                      onEdit={() => jumpToStep(1)}
                    >
                      <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink-200 mt-2">
                        <div className="rounded-xl bg-ink-950/50 p-2.5 border border-ink-800/60">
                          <span className="text-ink-500 block uppercase font-mono text-[10px]">Business Name</span>
                          <strong className="text-ink-100 text-sm font-semibold">{config.business.name || '-'}</strong>
                        </div>
                        <div className="rounded-xl bg-ink-950/50 p-2.5 border border-ink-800/60">
                          <span className="text-ink-500 block uppercase font-mono text-[10px]">Industry</span>
                          <strong className="text-ink-100 text-sm font-semibold">{config.business.industry || '-'}</strong>
                        </div>
                        {config.business.website && (
                          <div className="rounded-xl bg-ink-950/50 p-2.5 border border-ink-800/60">
                            <span className="text-ink-500 block uppercase font-mono text-[10px]">Website</span>
                            <span className="text-indigo-300 font-mono text-xs">{config.business.website}</span>
                          </div>
                        )}
                        {config.business.location && (
                          <div className="rounded-xl bg-ink-950/50 p-2.5 border border-ink-800/60">
                            <span className="text-ink-500 block uppercase font-mono text-[10px]">Location</span>
                            <span className="text-ink-200">{config.business.location}</span>
                          </div>
                        )}
                        {config.business.description && (
                          <div className="sm:col-span-2 rounded-xl bg-ink-950/50 p-2.5 border border-ink-800/60">
                            <span className="text-ink-500 block uppercase font-mono text-[10px]">About Business</span>
                            <p className="text-ink-300 text-xs italic mt-0.5">{config.business.description}</p>
                          </div>
                        )}
                      </div>
                    </ColorfulPreviewCard>

                    <ColorfulPreviewCard
                      icon={<Target className="text-cyan-400" size={18} />}
                      badge="03 • Goal & Objective"
                      title="Primary Objectives"
                      bgGradient="from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/30"
                      onEdit={() => jumpToStep(2)}
                    >
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.goals.length > 0 ? (
                          config.goals.map(g => (
                            <span key={g} className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 text-xs font-medium text-cyan-200">
                              🎯 {g}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-ink-500 italic">Not specified</span>
                        )}
                      </div>
                    </ColorfulPreviewCard>

                    <ColorfulPreviewCard
                      icon={<Cpu className="text-purple-400" size={18} />}
                      badge="04 • Technical Scope"
                      title="Features Included"
                      bgGradient="from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30"
                      onEdit={() => jumpToStep(3)}
                    >
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {config.features.length > 0 ? (
                          config.features.map(f => (
                            <span key={f} className="rounded-lg bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 text-xs text-purple-200">
                              ⚡ {f}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-ink-500 italic">None selected</span>
                        )}
                      </div>
                    </ColorfulPreviewCard>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <ColorfulPreviewCard
                        icon={<Clock className="text-emerald-400" size={18} />}
                        badge="05 • Schedule"
                        title="Timeline"
                        bgGradient="from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30"
                        onEdit={() => jumpToStep(4)}
                      >
                        <span className="mt-2 inline-block rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300">
                          ⏱ {config.timeline || 'Not specified'}
                        </span>
                      </ColorfulPreviewCard>

                      <ColorfulPreviewCard
                        icon={<UserCheck className="text-rose-400" size={18} />}
                        badge="06 • Contact Info"
                        title="Client Details"
                        bgGradient="from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/30"
                        onEdit={() => jumpToStep(5)}
                      >
                        <div className="text-xs text-ink-200 mt-2 space-y-1">
                          <p><strong className="text-ink-100">{config.contact.name}</strong></p>
                          <p className="text-rose-300 font-mono">{config.contact.email}</p>
                          {config.contact.phone && <p className="text-ink-400">{config.contact.phone}</p>}
                        </div>
                      </ColorfulPreviewCard>
                    </div>
                  </div>

                  {hasSubmitted && submitSuccess ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/20 via-emerald-950/40 to-ink-950 p-8 text-center shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 text-ink-950 shadow-lg">
                        <Check size={32} className="stroke-[3]" />
                      </div>
                      <h4 className="text-2xl font-bold text-emerald-300 font-display">Brief Successfully Sent!</h4>
                      <p className="mt-2 text-sm text-ink-200 max-w-md mx-auto">{submissionMessage}</p>
                      <button
                        onClick={() => {
                          setHasSubmitted(false);
                          setIsPreviewMode(false);
                          setStep(0);
                          setConfig(initialConfig);
                          setIsConfirmed(false);
                          setSubmissionMessage('');
                        }}
                        className="mt-6 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-ink-950 hover:bg-emerald-400 transition-transform active:scale-95 shadow-md"
                      >
                        Start Another Brief
                      </button>
                    </motion.div>
                  ) : (
                    <div className="rounded-2xl border border-ink-800 bg-ink-950/60 p-6 backdrop-blur-md">
                      {/* Confirmation Checkbox */}
                      <div className="mb-6">
                        <button
                          type="button"
                          onClick={() => setIsConfirmed(!isConfirmed)}
                          className="flex items-start gap-3.5 text-left group cursor-pointer"
                        >
                          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                            isConfirmed
                              ? 'border-amber-400 bg-gradient-to-tr from-amber-500 to-orange-400 text-ink-950 shadow-[0_0_10px_rgba(245,150,0,0.5)]'
                              : 'border-ink-700 bg-ink-900/80 group-hover:border-amber-400/60'
                          }`}>
                            {isConfirmed ? <CheckSquare size={16} className="stroke-[2.5]" /> : <Square size={16} className="text-transparent" />}
                          </span>
                          <span className="text-sm font-medium text-ink-200 leading-relaxed">
                            I confirm that all details provided above are accurate and ready for submission to <strong className="text-amber-400">info.offscriptstudio@gmail.com</strong>.
                          </span>
                        </button>
                      </div>

                      {submissionMessage && !submitSuccess && (
                        <div className="mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300 font-medium">
                          ⚠️ {submissionMessage}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink-800/80">
                        <button
                          onClick={back}
                          disabled={isSubmitting}
                          className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/50 px-6 py-3 text-sm font-medium text-ink-300 transition-colors hover:border-ink-500 hover:text-ink-50 disabled:opacity-30"
                        >
                          <ArrowLeft size={16} /> Back to Contact
                        </button>

                        <button
                          onClick={submitBrief}
                          disabled={!isConfirmed || isSubmitting}
                          className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 px-8 py-3.5 text-sm font-bold text-ink-950 shadow-[0_0_20px_rgba(245,150,0,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:shadow-none"
                        >
                          <Sparkles size={18} className="animate-pulse" />
                          {isSubmitting ? 'Sending Brief...' : 'Confirm & Submit Brief'}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
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
                      <p className="mb-6 text-sm text-ink-400 font-medium">Select everything you think you might need.</p>
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
                      className="flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/40 px-6 py-2.5 text-sm font-medium text-ink-300 transition-colors hover:border-ink-500 hover:text-ink-50 disabled:opacity-30 disabled:hover:border-ink-700 disabled:hover:text-ink-300"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={next}
                      disabled={!canProceed()}
                      className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-2.5 text-sm font-bold text-ink-950 shadow-md transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
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

function ColorfulPreviewCard({
  icon,
  badge,
  title,
  bgGradient,
  content,
  children,
  onEdit
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  bgGradient: string;
  content?: string;
  children?: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${bgGradient} p-5 transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-950/60 backdrop-blur-sm border border-ink-800">
            {icon}
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-400 block">{badge}</span>
            <h4 className="text-sm font-bold text-ink-100 font-display">{title}</h4>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded-full border border-ink-700/80 bg-ink-950/60 px-3.5 py-1.5 text-xs font-semibold text-ink-200 hover:border-amber-400 hover:text-amber-400 transition-all active:scale-95 shadow-sm"
        >
          <Edit3 size={13} /> Edit
        </button>
      </div>

      {content && <p className="text-sm text-ink-200 mt-2 font-medium">{content}</p>}
      {children}
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
            className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${isSelected
              ? 'border-amber-400/80 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent text-ink-50 shadow-[0_0_15px_rgba(245,150,0,0.15)] font-semibold'
              : 'border-ink-800 bg-ink-950/40 text-ink-300 hover:border-ink-600 hover:bg-ink-900/60'
              }`}
          >
            <span className="text-sm font-medium">{opt}</span>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${isSelected
              ? 'border-amber-400 bg-amber-400 text-ink-950 shadow-sm'
              : 'border-ink-700 text-transparent'
              }`}>
              <Check size={12} className="stroke-[3]" />
            </span>
          </button>
        );
      })}
      {multi && selected.length > 0 && (
        <p className="col-span-full mt-2 text-xs font-mono text-amber-400/80">{selected.length} items selected</p>
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
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-400">Short description</label>
        <textarea
          value={config.business.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          placeholder="Tell us about your business..."
          className="w-full rounded-2xl border border-ink-800 bg-ink-950/60 px-4 py-3 text-sm text-ink-100 placeholder-ink-600 outline-none transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
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
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-400">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink-800 bg-ink-950/60 px-4 py-3 text-sm text-ink-100 placeholder-ink-600 outline-none transition-all focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
      />
    </div>
  );
}
