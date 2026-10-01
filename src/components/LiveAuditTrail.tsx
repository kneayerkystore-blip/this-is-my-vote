import React from 'react';
import { Language, VoteRecord } from '../types';
import { t } from '../utils/i18n';
import { ShieldCheck, Check, Clock, ExternalLink } from 'lucide-react';

interface LiveAuditTrailProps {
  recentVotes: VoteRecord[];
  language: Language;
}

export const LiveAuditTrail: React.FC<LiveAuditTrailProps> = ({ recentVotes, language }) => {
  const formatTimeAgo = (timestamp: number) => {
    const diffSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSeconds < 10) return t('justNow', language);
    if (diffSeconds < 60) return `${diffSeconds}${t('secAgo', language)}`;
    const mins = Math.floor(diffSeconds / 60);
    return `${mins}${t('minAgo', language)}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            {t('recentVotesTitle', language)}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>{language === 'km' ? 'ធ្វើបច្ចុប្បន្នភាពតាមពេលជាក់ស្តែង' : 'Streaming live'}</span>
        </div>
      </div>

      {/* Table / List */}
      <div className="mt-4 divide-y divide-slate-100">
        {recentVotes.slice(0, 7).map((vote) => (
          <div
            key={vote.id}
            className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">
                {vote.ballotHash}
              </span>
              <div>
                <span className="font-semibold text-slate-900">{vote.candidateName}</span>
                <span className="text-slate-400 mx-1.5">·</span>
                <span className="text-slate-500">{vote.station}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-slate-500 font-mono">
              <span className="flex items-center gap-1 text-emerald-600 font-sans font-medium">
                <Check className="h-3 w-3 stroke-[3]" />
                <span>Verified</span>
              </span>
              <span className="text-slate-400">{formatTimeAgo(vote.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
