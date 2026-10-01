import React from 'react';
import { Candidate, Language } from '../types';
import { t } from '../utils/i18n';
import { Trophy, Users, TrendingUp, CheckCircle, Award } from 'lucide-react';

interface LeaderBannerProps {
  candidates: Candidate[];
  language: Language;
  totalParticipants: number;
  registeredVoters: number;
  onSelectCandidate: (c: Candidate) => void;
}

export const LeaderBanner: React.FC<LeaderBannerProps> = ({
  candidates,
  language,
  totalParticipants,
  registeredVoters,
  onSelectCandidate,
}) => {
  // Sort candidates to find leader and runner up
  const sorted = [...candidates].sort((a, b) => b.votes - a.votes);
  const leader = sorted[0];
  const runnerUp = sorted[1];

  const leaderPercentage =
    totalParticipants > 0 ? ((leader.votes / totalParticipants) * 100).toFixed(1) : '0';
  const marginVotes = runnerUp ? leader.votes - runnerUp.votes : 0;
  const marginPercentage =
    totalParticipants > 0 && runnerUp
      ? (((leader.votes - runnerUp.votes) / totalParticipants) * 100).toFixed(1)
      : '0';

  const turnoutPercentage =
    registeredVoters > 0 ? ((totalParticipants / registeredVoters) * 100).toFixed(1) : '0';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 p-6 shadow-sm transition-all sm:p-8">
      {/* Decorative top-right accent */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-indigo-100/50 blur-2xl" />

      {/* Header kicker row with zero-pill unboxed metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span>{t('leadCandidateHeader', language)}</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 normal-case font-normal">
            {language === 'km' ? 'ផ្អែកលើការរាប់សន្លឹកឆ្នោតផ្សាយផ្ទាល់' : 'Real-time verified count'}
          </span>
        </div>

        {/* Live status dot */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-700">
            {language === 'km' ? 'ការបោះឆ្នោតកំពុងដំណើរការ' : 'Polls Active & Streaming'}
          </span>
        </div>
      </div>

      {/* Main Leader Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left: Leader Profile & Photo */}
        <div className="flex items-center gap-4 sm:gap-6 lg:col-span-7">
          <div className="relative shrink-0">
            <img
              src={leader.avatar}
              alt={leader.name[language]}
              referrerPolicy="no-referrer"
              className="h-24 w-24 rounded-2xl object-cover ring-4 ring-indigo-100 shadow-md sm:h-28 sm:w-28"
            />
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm ring-2 ring-white">
              <Award className="h-4 w-4" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
              <span>{language === 'km' ? `បេក្ខជនលេខ #0${leader.number}` : `Candidate #0${leader.number}`}</span>
              <span className="text-slate-300">·</span>
              <span className="truncate text-slate-500">{leader.party[language]}</span>
            </div>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {leader.name[language]}
            </h2>

            <p className="mt-0.5 text-xs text-slate-600 line-clamp-1 sm:text-sm">
              {leader.role[language]}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-900">
                  {marginVotes > 0 ? `+${marginVotes.toLocaleString()}` : '0'}{' '}
                  {t('leadMarginVotes', language)}
                </span>
                <span className="text-slate-400">
                  ({marginVotes > 0 ? `+${marginPercentage}%` : '0%'} {language === 'km' ? 'លើលេខ ២' : 'lead'})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Key Leading Metrics & Progress Bar */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs lg:col-span-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700">
              {language === 'km' ? 'សំឡេងបច្ចុប្បន្ន' : 'Leader Vote Count'}
            </span>
            <span className="font-mono text-base font-bold tabular-nums text-slate-900">
              {leader.votes.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-500">
                ({leaderPercentage}%)
              </span>
            </span>
          </div>

          {/* Smooth animated progress bar */}
          <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, Math.max(5, parseFloat(leaderPercentage)))}%` }}
            />
          </div>

          {/* Secondary stats row */}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
            <div>
              <div className="text-slate-400">{t('totalParticipants', language)}</div>
              <div className="mt-0.5 flex items-center gap-1 font-mono text-sm font-semibold tabular-nums text-slate-800">
                <Users className="h-3.5 w-3.5 text-indigo-500" />
                {totalParticipants.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-slate-400">{t('turnoutRate', language)}</div>
              <div className="mt-0.5 flex items-center gap-1 font-mono text-sm font-semibold tabular-nums text-slate-800">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {turnoutPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
