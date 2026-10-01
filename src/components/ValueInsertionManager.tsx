import React, { useState } from 'react';
import { Candidate, Language } from '../types';
import { t } from '../utils/i18n';
import { Sliders, Plus, Check, RefreshCw, Sparkles, Edit2 } from 'lucide-react';

interface ValueInsertionManagerProps {
  candidates: Candidate[];
  language: Language;
  onUpdateCandidateVotes: (candidateId: string, votes: number) => void;
  onSetAllCandidateVotes: (votesMap: Record<string, number>) => void;
  onResetToDefault: () => void;
}

export const ValueInsertionManager: React.FC<ValueInsertionManagerProps> = ({
  candidates,
  language,
  onUpdateCandidateVotes,
  onSetAllCandidateVotes,
  onResetToDefault,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customAddAmount, setCustomAddAmount] = useState<number>(50);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(candidates[0]?.id || 'c1');

  // Local draft inputs for all 4 candidates
  const [draftVotes, setDraftVotes] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    candidates.forEach((c) => {
      map[c.id] = c.votes.toString();
    });
    return map;
  });

  // Sync draft votes when candidate votes change externally if manager is closed
  React.useEffect(() => {
    if (!isOpen) {
      const map: Record<string, string> = {};
      candidates.forEach((c) => {
        map[c.id] = c.votes.toString();
      });
      setDraftVotes(map);
    }
  }, [candidates, isOpen]);

  const handleDraftChange = (id: string, val: string) => {
    setDraftVotes((prev) => ({ ...prev, [id]: val }));
  };

  const handleApplySingle = (id: string) => {
    const parsed = parseInt(draftVotes[id]?.replace(/,/g, '') || '0', 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateCandidateVotes(id, parsed);
    }
  };

  const handleApplyAll = () => {
    const map: Record<string, number> = {};
    candidates.forEach((c) => {
      const parsed = parseInt(draftVotes[c.id]?.replace(/,/g, '') || '0', 10);
      map[c.id] = !isNaN(parsed) && parsed >= 0 ? parsed : c.votes;
    });
    onSetAllCandidateVotes(map);
  };

  const handleAddCustomToSelected = () => {
    const current = candidates.find((c) => c.id === selectedCandidateId)?.votes || 0;
    const next = Math.max(0, current + (customAddAmount || 0));
    onUpdateCandidateVotes(selectedCandidateId, next);
  };

  // Presets
  const applyPreset = (preset: 'equal' | 'tight' | 'landslide') => {
    if (preset === 'equal') {
      const equalVotes = 1250;
      const map: Record<string, number> = {};
      candidates.forEach((c) => {
        map[c.id] = equalVotes;
      });
      onSetAllCandidateVotes(map);
    } else if (preset === 'tight') {
      // 1-vote margin neck and neck
      const map: Record<string, number> = {
        [candidates[0]?.id || 'c1']: 1450,
        [candidates[1]?.id || 'c2']: 1445,
        [candidates[2]?.id || 'c3']: 1390,
        [candidates[3]?.id || 'c4']: 1380,
      };
      onSetAllCandidateVotes(map);
    } else if (preset === 'landslide') {
      const map: Record<string, number> = {
        [candidates[0]?.id || 'c1']: 3200,
        [candidates[1]?.id || 'c2']: 950,
        [candidates[2]?.id || 'c3']: 820,
        [candidates[3]?.id || 'c4']: 610,
      };
      onSetAllCandidateVotes(map);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header with toggle and presets */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t('directValueEditor', language)}
            </h3>
            <p className="text-[11px] text-slate-500">
              {t('directValueSubtitle', language)}
            </p>
          </div>
        </div>

        {/* Quick Simulation Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] mr-1 hidden md:inline">Presets:</span>
          <button
            onClick={() => applyPreset('tight')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
          >
            {language === 'km' ? 'ប្រកៀកប្រកិត' : 'Tight Race'}
          </button>
          <button
            onClick={() => applyPreset('landslide')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
          >
            {language === 'km' ? 'នាំមុខដាច់' : 'Landslide'}
          </button>
          <button
            onClick={() => applyPreset('equal')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
          >
            {language === 'km' ? 'ស្មើគ្នា ២៥%' : 'Equalize'}
          </button>
        </div>
      </div>

      {/* 4 Candidate Direct Input Row */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-2.5"
          >
            <img
              src={c.avatar}
              alt={c.name[language]}
              referrerPolicy="no-referrer"
              className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
            />

            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-slate-900">
                #{String(c.number).padStart(2, '0')} {c.name[language].split(' ')[0]}
              </div>

              {/* Direct Value Input */}
              <div className="mt-1 flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  value={draftVotes[c.id] ?? c.votes.toString()}
                  onChange={(e) => handleDraftChange(c.id, e.target.value)}
                  onBlur={() => handleApplySingle(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleApplySingle(c.id);
                  }}
                  className="w-full rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs font-mono font-bold text-slate-900 focus:border-indigo-500 focus:outline-hidden"
                  placeholder="0"
                />
                <button
                  onClick={() => handleApplySingle(c.id)}
                  className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-indigo-600"
                  title="Apply value"
                >
                  <Check className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insert Custom Delta Bar */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 text-[11px]">
            {language === 'km' ? 'បន្ថែមចំនួនរហ័ស:' : 'Quick Add Custom:'}
          </span>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-hidden"
          >
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                #{String(c.number).padStart(2, '0')} {c.name[language]}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={customAddAmount}
            onChange={(e) => setCustomAddAmount(parseInt(e.target.value, 10) || 0)}
            className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:outline-hidden"
            placeholder="50"
          />
          <button
            onClick={handleAddCustomToSelected}
            className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{language === 'km' ? 'បន្ថែម' : 'Add'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyAll}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            {t('saveValues', language)}
          </button>

          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
            title="Reset default vote tallies"
          >
            <RefreshCw className="h-3 w-3" />
            <span>{language === 'km' ? 'កំណត់ឡើងវិញ' : 'Reset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
