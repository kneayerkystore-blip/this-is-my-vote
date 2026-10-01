import React, { useState } from 'react';
import { Candidate, Language } from '../types';
import { t } from '../utils/i18n';
import {
  BarChart3,
  PieChart,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Users,
  CheckCircle,
  TrendingUp,
  Award,
} from 'lucide-react';

interface LiveAnalyticsProps {
  candidates: Candidate[];
  language: Language;
  totalParticipants: number;
  registeredVoters: number;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onQuickVote: (candidateId: string) => void;
  onResetVotes: () => void;
}

export const LiveAnalytics: React.FC<LiveAnalyticsProps> = ({
  candidates,
  language,
  totalParticipants,
  registeredVoters,
  isSimulating,
  onToggleSimulation,
  onQuickVote,
  onResetVotes,
}) => {
  const [activeTab, setActiveTab] = useState<'bars' | 'distribution' | 'timeline'>('bars');

  // Find max votes for scaling vertical bar chart
  const maxVotes = Math.max(...candidates.map((c) => c.votes), 1);
  const sorted = [...candidates].sort((a, b) => b.votes - a.votes);
  const leaderId = sorted[0]?.id;

  // Turnout percentage
  const turnoutPercent =
    registeredVoters > 0 ? ((totalParticipants / registeredVoters) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Top Controls & View Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {t('liveResultsHeading', language)}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {t('liveResultsDesc', language)}
          </p>
        </div>

        {/* Action Controls: Live Sim Toggle & Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Simulation Toggle Button */}
          <button
            onClick={onToggleSimulation}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              isSimulating
                ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="h-3.5 w-3.5 text-amber-700" />
                <span>{t('simulationActive', language)}</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-slate-600" />
                <span>{t('simulationInactive', language)}</span>
              </>
            )}
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetVotes}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            title="Reset votes to initial count"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('resetVotesBtn', language)}</span>
          </button>
        </div>
      </div>

      {/* Main KPI metric cards row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total Participants */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('totalParticipants', language)}</span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900">
            {totalParticipants.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {language === 'km' ? 'សន្លឹកឆ្នោតបានបញ្ចូលក្នុងប្រព័ន្ធ' : 'Ballots logged in system'}
          </div>
        </div>

        {/* Turnout Percentage */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('turnoutRate', language)}</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900">
            {turnoutPercent}%
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {language === 'km' ? `ក្នុងចំណោម ${registeredVoters.toLocaleString()} នាក់` : `Of ${registeredVoters.toLocaleString()} registered`}
          </div>
        </div>

        {/* Lead Margin */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('leadCandidateHeader', language)}</span>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 truncate text-base font-bold text-slate-900">
            {sorted[0]?.name[language]}
          </div>
          <div className="mt-1 flex items-center gap-1 font-mono text-xs text-emerald-600">
            <span className="font-semibold">
              +{(sorted[0]?.votes - (sorted[1]?.votes || 0)).toLocaleString()} votes
            </span>
            <span className="text-slate-400">ahead</span>
          </div>
        </div>

        {/* Verification Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('verifiedBallots', language)}</span>
            <CheckCircle className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-slate-900">
            100%
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {language === 'km' ? 'ការផ្ទៀងផ្ទាត់ដោយស្វ័យប្រវត្តិ' : 'Cryptographically verified'}
          </div>
        </div>
      </div>

      {/* Segmented View Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('bars')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === 'bars'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>{language === 'km' ? 'ក្រាហ្វសសរប្រៀបធៀប' : 'Comparative Bar Chart'}</span>
        </button>

        <button
          onClick={() => setActiveTab('distribution')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === 'distribution'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PieChart className="h-3.5 w-3.5" />
          <span>{language === 'km' ? 'ការបែងចែក ១០០%' : '100% Proportional Share'}</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === 'timeline'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>{language === 'km' ? 'សកម្មភាពតាមម៉ោង' : 'Hourly Velocity'}</span>
        </button>
      </div>

      {/* Tab 1: Comparative Vertical Bar Chart */}
      {activeTab === 'bars' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">
              {t('comparativeGraph', language)}
            </span>
            <span className="font-mono text-slate-400">
              Scale: 0 – {(Math.ceil(maxVotes / 200) * 200).toLocaleString()} votes
            </span>
          </div>

          {/* Vertical Bar Columns */}
          <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6 pt-6 pb-2">
            {candidates.map((c) => {
              const isLeader = c.id === leaderId;
              const heightPercent = Math.max(12, Math.round((c.votes / maxVotes) * 100));
              const share =
                totalParticipants > 0 ? ((c.votes / totalParticipants) * 100).toFixed(1) : '0';

              return (
                <div key={c.id} className="flex flex-col items-center">
                  {/* Lead Crown or Percent Callout */}
                  <div className="mb-2 flex flex-col items-center">
                    {isLeader && (
                      <span className="mb-1 flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-amber-300">
                        <Award className="h-3 w-3" />
                        <span>Leader</span>
                      </span>
                    )}
                    <span className="font-mono text-xs sm:text-sm font-bold tabular-nums text-slate-900">
                      {c.votes.toLocaleString()}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {share}%
                    </span>
                  </div>

                  {/* The animated vertical bar container */}
                  <div className="relative flex h-56 w-full items-end justify-center rounded-xl bg-slate-50 p-1.5">
                    {/* Background grid lines */}
                    <div className="pointer-events-none absolute inset-x-0 top-1/4 border-b border-slate-200/50" />
                    <div className="pointer-events-none absolute inset-x-0 top-2/4 border-b border-slate-200/50" />
                    <div className="pointer-events-none absolute inset-x-0 top-3/4 border-b border-slate-200/50" />

                    {/* Animated Bar with smooth height transition */}
                    <div
                      className={`w-full max-w-[56px] rounded-lg transition-all duration-700 ease-out shadow-xs ${
                        isLeader ? 'ring-2 ring-indigo-400/50' : ''
                      }`}
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: c.color,
                      }}
                    />
                  </div>

                  {/* Candidate Avatar & Label */}
                  <div className="mt-3 flex flex-col items-center text-center">
                    <img
                      src={c.avatar}
                      alt={c.name[language]}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                    />
                    <div className="mt-1 text-xs font-bold text-slate-900 truncate max-w-[85px] sm:max-w-none">
                      {c.name[language].split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      #{String(c.number).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 100% Proportional Stack Bar */}
      {activeTab === 'distribution' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-800">
              {language === 'km' ? 'ការបែងចែកសំឡេងឆ្នោតសរុប (១០០%)' : 'Total Vote Allocation (100%)'}
            </span>
            <span className="font-mono text-slate-400">
              {totalParticipants.toLocaleString()} ballots
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="h-6 w-full overflow-hidden rounded-xl bg-slate-100 flex shadow-inner">
            {candidates.map((c) => {
              const share = totalParticipants > 0 ? (c.votes / totalParticipants) * 100 : 25;
              return (
                <div
                  key={c.id}
                  className="h-full transition-all duration-700 ease-out relative group"
                  style={{
                    width: `${share}%`,
                    backgroundColor: c.color,
                  }}
                  title={`${c.name[language]}: ${c.votes.toLocaleString()} votes (${share.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          {/* Candidate breakdown legend */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            {candidates.map((c) => {
              const share =
                totalParticipants > 0 ? ((c.votes / totalParticipants) * 100).toFixed(1) : '0';
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 bg-slate-50/50"
                >
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-slate-900">
                      {c.name[language]}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono mt-0.5">
                      <span>{c.votes.toLocaleString()} votes</span>
                      <span className="font-bold text-slate-800">{share}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Hourly Turnout Activity */}
      {activeTab === 'timeline' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span className="font-semibold text-slate-800">
              {language === 'km' ? 'បរិមាណបោះឆ្នោតតាមពេលវេលា' : 'Ballot Stream Velocity (Hourly)'}
            </span>
            <span className="font-mono text-emerald-600 font-medium">
              Peak: 1:00 PM – 2:00 PM
            </span>
          </div>

          {/* Visual Bar Velocity */}
          <div className="grid grid-cols-6 items-end gap-2 h-44 pt-4">
            {[
              { time: '08:00', count: 320, label: '320' },
              { time: '10:00', count: 680, label: '680' },
              { time: '12:00', count: 1140, label: '1,140' },
              { time: '14:00', count: 1420, label: '1,420' },
              { time: '16:00', count: 860, label: '860' },
              { time: 'Current', count: Math.round(totalParticipants / 6), label: 'Active', isCurrent: true },
            ].map((slot, i) => (
              <div key={i} className="flex flex-col items-center h-full justify-end">
                <span className="font-mono text-[10px] text-slate-500 mb-1">
                  {slot.label}
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    slot.isCurrent ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                  style={{ height: `${Math.min(100, Math.max(15, (slot.count / 1420) * 100))}%` }}
                />
                <span className="mt-2 text-[10px] font-mono text-slate-400">
                  {slot.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Vote Simulator Row (For instant testing and live demonstrations) */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800">
              {t('quickVoteTest', language)}
            </div>
            <div className="text-[11px] text-slate-500">
              {language === 'km'
                ? 'ចុចដើម្បីសាកល្បងបន្ថែមសំឡេង និងមើលការផ្លាស់ប្តូរតារាងភ្លាមៗ'
                : 'Instantly add a vote to test real-time recalculations and graph animations'}
            </div>
          </div>

          {/* 4 quick buttons */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {candidates.map((c) => (
              <button
                key={c.id}
                onClick={() => onQuickVote(c.id)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all active:scale-95"
              >
                <Plus className="h-3 w-3 text-indigo-600" />
                <span className="truncate">{c.name[language].split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-slate-400">+1</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
