import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Candidate, Language, VoteRecord } from '../types';
import { t } from '../utils/i18n';
import { playVoteChime } from '../utils/audio';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Fingerprint,
  Building2,
  User,
  Sparkles,
  Lock,
} from 'lucide-react';

interface VoteModalProps {
  isOpen: boolean;
  candidate: Candidate | null;
  language: Language;
  onClose: () => void;
  onSubmitVote: (record: Omit<VoteRecord, 'id' | 'timestamp'>) => void;
}

export const VoteModal: React.FC<VoteModalProps> = ({
  isOpen,
  candidate,
  language,
  onClose,
  onSubmitVote,
}) => {
  const [voterName, setVoterName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedStation, setSelectedStation] = useState('Station 01 — Central Civic Hall');
  const [category, setCategory] = useState<'Public' | 'Student' | 'Professional' | 'Civil Society'>('Public');
  const [pledgeChecked, setPledgeChecked] = useState(true);
  const [step, setStep] = useState<'form' | 'submitting' | 'confirmed'>('form');
  const [ballotReceipt, setBallotReceipt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeChecked) return;

    setStep('submitting');

    // Simulate cryptographic ballot hashing and network verification latency
    setTimeout(() => {
      const generatedHash = `CV-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setBallotReceipt(generatedHash);

      const record = {
        ballotHash: generatedHash,
        voterName: isAnonymous ? 'Anonymous Citizen' : (voterName.trim() || 'Verified Voter'),
        voterId: `ID-***-${Math.floor(1000 + Math.random() * 9000)}`,
        candidateId: candidate.id,
        candidateName: candidate.name[language],
        station: selectedStation,
        verified: true,
      };

      onSubmitVote(record);
      playVoteChime();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: [candidate.color, '#4f46e5', '#10b981', '#f59e0b'],
        });
      } catch {
        // ignore if canvas not supported
      }

      setStep('confirmed');
    }, 750);
  };

  const handleCopyHash = () => {
    if (!ballotReceipt) return;
    navigator.clipboard?.writeText(ballotReceipt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetAndClose = () => {
    setStep('form');
    setBallotReceipt(null);
    setVoterName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={step === 'submitting' ? undefined : handleResetAndClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t('whenSubmittingVote', language)}
            </h3>
          </div>

          {step !== 'submitting' && (
            <button
              onClick={handleResetAndClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Candidate Preview Card */}
              <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
                <img
                  src={candidate.avatar}
                  alt={candidate.name[language]}
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
                    <span>Candidate #{String(candidate.number).padStart(2, '0')}</span>
                    <span className="text-slate-300">·</span>
                    <span className="truncate text-slate-500">{candidate.party[language]}</span>
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {candidate.name[language]}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">
                    {candidate.role[language]}
                  </div>
                </div>
              </div>

              {/* Informational callout regarding ballot encryption */}
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('whenSubmittingVoteSub', language)}
              </p>

              {/* Voter Identification */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    {t('voterFullName', language)}
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{language === 'km' ? 'បោះឆ្នោតអនាមិក' : 'Cast Anonymously'}</span>
                  </label>
                </div>

                {!isAnonymous ? (
                  <div className="relative mt-1.5">
                    <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={voterName}
                      onChange={(e) => setVoterName(e.target.value)}
                      placeholder={language === 'km' ? 'ឧទាហរណ៍៖ សុខ សំបូរ' : 'e.g. S. Henderson'}
                      className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                ) : (
                  <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    <Lock className="h-3.5 w-3.5 text-indigo-600" />
                    <span>
                      {language === 'km'
                        ? 'អត្តសញ្ញាណរបស់អ្នកត្រូវបានលាក់បាំងជាសម្ងាត់ ១០០%'
                        : 'Your identity will be masked as Verified Anonymous Citizen'}
                    </span>
                  </div>
                )}
              </div>

              {/* Polling Station Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  {t('pollingStationLabel', language)}
                </label>
                <div className="relative mt-1.5">
                  <Building2 className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Station 01 — Central Civic Hall">
                      Station 01 — Central Civic Hall (ការិយាល័យកណ្តាល)
                    </option>
                    <option value="Station 02 — Heritage Center">
                      Station 02 — Heritage Center (មជ្ឈមណ្ឌលបេតិកភណ្ឌ)
                    </option>
                    <option value="Station 03 — Innovation District Hub">
                      Station 03 — Innovation District Hub (សង្កាត់នវានុវត្តន៍)
                    </option>
                    <option value="Station 04 — Riverside Community Booth">
                      Station 04 — Riverside Community Booth (មណ្ឌលមាត់ទន្លេ)
                    </option>
                  </select>
                </div>
              </div>

              {/* Voter Category Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  {t('voterAffiliation', language)}
                </label>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {(['Public', 'Student', 'Professional', 'Civil Society'] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`rounded-lg border px-2 py-1.5 text-center text-xs font-medium transition-all ${
                        category === cat
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pledge Checkbox */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pledgeChecked}
                    onChange={(e) => setPledgeChecked(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    {t('pledgeText', language)}
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {t('cancelButtonText', language)}
                </button>

                <button
                  type="submit"
                  disabled={!pledgeChecked}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-98"
                >
                  <span>{t('submitButtonText', language)}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 'submitting' && (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Fingerprint className="h-8 w-8 animate-pulse" />
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-900">
                {t('submittingText', language)}
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                {language === 'km'
                  ? 'កំពុងបង្កើតលេខកូដសន្លឹកឆ្នោតសម្ងាត់ និងផ្ទៀងផ្ទាត់តារាងពិន្ទុ...'
                  : 'Generating verifiable ballot cryptographic hash and streaming live count...'}
              </p>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  {t('voteSuccessTitle', language)}
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  {t('voteSuccessDesc', language)}
                </p>
              </div>

              {/* Official Ballot Receipt */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 text-xs">
                  <span className="font-semibold text-slate-700">
                    {t('ballotReceiptId', language)}
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>{language === 'km' ? 'បានចម្លង' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>{language === 'km' ? 'ចម្លង' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 font-mono text-base font-bold text-slate-900">
                  {ballotReceipt}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200/60 pt-2 text-xs text-slate-500">
                  <div>
                    <span className="block text-slate-400">
                      {language === 'km' ? 'បេក្ខជន' : 'Candidate'}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {candidate.name[language]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400">
                      {language === 'km' ? 'ស្ថានភាព' : 'Status'}
                    </span>
                    <span className="font-semibold text-emerald-700">
                      {language === 'km' ? 'បានរាប់រួចរាល់' : 'Counted Live'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {t('castAnother', language)}
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
                >
                  {t('doneButton', language)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
