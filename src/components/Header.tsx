import React from 'react';
import { Language } from '../types';
import { t } from '../utils/i18n';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenCastVote: () => void;
  totalParticipants: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
  onOpenCastVote,
  totalParticipants,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#ballot"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('ballot');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-indigo-600"
        >
          CivicVote
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => onNavigate('ballot')}
            className={`text-sm font-medium transition-colors ${
              activeSection === 'ballot'
                ? 'text-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('navCandidates', language)}
          </button>
          <button
            onClick={() => onNavigate('results')}
            className={`text-sm font-medium transition-colors ${
              activeSection === 'results'
                ? 'text-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('navLiveResults', language)}
          </button>
          <button
            onClick={() => onNavigate('graphs')}
            className={`text-sm font-medium transition-colors ${
              activeSection === 'graphs'
                ? 'text-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('navAnalytics', language)}
          </button>
          <button
            onClick={() => onNavigate('audit')}
            className={`text-sm font-medium transition-colors ${
              activeSection === 'audit'
                ? 'text-indigo-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('navAudit', language)}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('en')}
              className={`rounded-md px-2.5 py-1 transition-all ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('km')}
              className={`rounded-md px-2.5 py-1 transition-all ${
                language === 'km'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ខ្មែរ
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenCastVote}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-700 active:scale-98 whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-200 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            <span>{t('castVoteNavBtn', language)}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
