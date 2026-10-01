import React from 'react';
import { Candidate, Language } from '../types';
import { t } from '../utils/i18n';
import { X, Check, Award, ArrowRight } from 'lucide-react';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  language: Language;
  onClose: () => void;
  onVote: (candidate: Candidate) => void;
  isLeader: boolean;
  totalVotes: number;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  language,
  onClose,
  onVote,
  isLeader,
  totalVotes,
}) => {
  if (!candidate) return null;

  const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative border-b border-slate-100 bg-slate-50/70 p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              src={candidate.avatar}
              alt={candidate.name[language]}
              referrerPolicy="no-referrer"
              className="h-24 w-24 rounded-2xl object-cover ring-2 ring-white shadow-md sm:h-28 sm:w-28"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
                <span>Candidate #{String(candidate.number).padStart(2, '0')}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{candidate.party[language]}</span>
                {isLeader && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <Award className="h-3.5 w-3.5" />
                      <span>{language === 'km' ? 'បេក្ខជននាំមុខ' : 'Current Leader'}</span>
                    </span>
                  </>
                )}
              </div>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {candidate.name[language]}
              </h2>

              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                {candidate.role[language]}
              </p>

              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <span className="font-mono font-bold text-slate-800 tabular-nums">
                  {candidate.votes.toLocaleString()} {t('votesCount', language)}
                </span>
                <span className="text-slate-300">·</span>
                <span>{percentage}% of all cast ballots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 sm:p-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {language === 'km' ? 'ទស្សនវិស័យ និងប្រវត្តិសង្ខេប' : 'Vision & Background'}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {candidate.bio[language]}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {language === 'km' ? 'គោលនយោបាយ និងការប្តេជ្ញាចិត្តផ្លូវការ' : 'Official Manifesto Pillars'}
            </h4>
            <div className="mt-3 space-y-2.5">
              {candidate.manifesto[language].map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="text-xs text-slate-700 leading-relaxed font-medium sm:text-sm">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            {language === 'km' ? 'បិទ' : 'Close'}
          </button>

          <button
            onClick={() => {
              onClose();
              onVote(candidate);
            }}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 active:scale-98 transition-all"
          >
            <span>{t('selectCandidate', language)}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
