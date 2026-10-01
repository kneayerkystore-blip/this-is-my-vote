import React, { useState, useEffect } from 'react';
import { Candidate, Language } from '../types';
import { t } from '../utils/i18n';
import { Award, ArrowRight, Check, Plus, Edit3, Save } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  isLeader: boolean;
  rank: number;
  totalVotes: number;
  language: Language;
  onVote: (candidate: Candidate) => void;
  onOpenDetails: (candidate: Candidate) => void;
  onUpdateVotes: (candidateId: string, newVotes: number) => void;
  onAddVotes: (candidateId: string, delta: number) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isLeader,
  rank,
  totalVotes,
  language,
  onVote,
  onOpenDetails,
  onUpdateVotes,
  onAddVotes,
}) => {
  const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : '0.0';

  // State for direct value insertion
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [inputValue, setInputValue] = useState(candidate.votes.toString());

  // Keep input value in sync when candidate.votes changes externally
  useEffect(() => {
    if (!isEditingValue) {
      setInputValue(candidate.votes.toString());
    }
  }, [candidate.votes, isEditingValue]);

  const handleSaveValue = () => {
    const parsed = parseInt(inputValue.replace(/,/g, ''), 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateVotes(candidate.id, parsed);
    } else {
      setInputValue(candidate.votes.toString());
    }
    setIsEditingValue(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveValue();
    } else if (e.key === 'Escape') {
      setInputValue(candidate.votes.toString());
      setIsEditingValue(false);
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:shadow-md ${
        isLeader
          ? 'border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Header metadata */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="font-mono text-sm font-bold text-slate-900">
              #{String(candidate.number).padStart(2, '0')}
            </span>
            <span className="text-slate-300">·</span>
            <span className="truncate">{candidate.party[language]}</span>
          </div>

          {isLeader ? (
            <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-300">
              <Award className="h-3.5 w-3.5" />
              <span>{language === 'km' ? 'នាំមុខ' : 'Rank 1'}</span>
            </div>
          ) : (
            <span className="text-xs font-medium text-slate-400">
              {language === 'km' ? `ចំណាត់ថ្នាក់ #${rank}` : `Rank #${rank}`}
            </span>
          )}
        </div>

        {/* Candidate Profile Info */}
        <div className="mt-4 flex items-start gap-3.5">
          <div className="relative shrink-0">
            <img
              src={candidate.avatar}
              alt={candidate.name[language]}
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200 shadow-2xs"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              {candidate.name[language]}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
              {candidate.role[language]}
            </p>

            <blockquote className="mt-1.5 text-[11px] italic text-slate-600 border-l-2 border-indigo-200 pl-2 line-clamp-2">
              "{candidate.tagline[language]}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Live Vote Share & Progress Bar */}
      <div className="mt-4 border-t border-slate-100 pt-3.5">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium text-slate-700">{t('voteShare', language)}</span>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="font-bold tabular-nums text-slate-900">
              {candidate.votes.toLocaleString()}
            </span>
            <span className="text-slate-400">({percentage}%)</span>
          </div>
        </div>

        {/* Smooth animated progress bar */}
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(100, Math.max(3, parseFloat(percentage)))}%`,
              backgroundColor: candidate.color,
            }}
          />
        </div>

        {/* Direct Value Insertion Box (Requirement: "can insert value") */}
        <div className="mt-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1.5">
            <span className="font-semibold text-slate-700">
              {language === 'km' ? 'បញ្ចូល / កែប្រែចំនួន' : 'Insert / Edit Votes'}
            </span>
            <button
              onClick={() => {
                if (isEditingValue) {
                  handleSaveValue();
                } else {
                  setIsEditingValue(true);
                }
              }}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {isEditingValue ? (
                <>
                  <Save className="h-3 w-3" />
                  <span>{language === 'km' ? 'រក្សាទុក' : 'Save'}</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-3 w-3" />
                  <span>{language === 'km' ? 'បញ្ចូលផ្ទាល់' : 'Type'}</span>
                </>
              )}
            </button>
          </div>

          {/* Value Input and Quick Add row */}
          {isEditingValue ? (
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full rounded-lg border border-indigo-400 bg-white px-2.5 py-1 text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                placeholder="0"
              />
              <button
                onClick={handleSaveValue}
                className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700 whitespace-nowrap"
              >
                {language === 'km' ? 'អនុវត្ត' : 'Set'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => onAddVotes(candidate.id, 1)}
                className="rounded-lg border border-slate-200 bg-white py-1 text-[11px] font-mono font-bold text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                title="Add 1 vote"
              >
                +1
              </button>
              <button
                onClick={() => onAddVotes(candidate.id, 10)}
                className="rounded-lg border border-slate-200 bg-white py-1 text-[11px] font-mono font-bold text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                title="Add 10 votes"
              >
                +10
              </button>
              <button
                onClick={() => onAddVotes(candidate.id, 50)}
                className="rounded-lg border border-slate-200 bg-white py-1 text-[11px] font-mono font-bold text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                title="Add 50 votes"
              >
                +50
              </button>
              <button
                onClick={() => onAddVotes(candidate.id, 100)}
                className="rounded-lg border border-slate-200 bg-white py-1 text-[11px] font-mono font-bold text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                title="Add 100 votes"
              >
                +100
              </button>
            </div>
          )}
        </div>

        {/* Primary Action Row: Cast Official Ballot & View Details */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onVote(candidate)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-indigo-600 active:scale-98"
          >
            <span>{t('selectCandidate', language)}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => onOpenDetails(candidate)}
            className="rounded-xl border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
            title="Read manifesto & bio"
          >
            {language === 'km' ? 'ព័ត៌មាន' : 'Bio'}
          </button>
        </div>
      </div>
    </div>
  );
};
