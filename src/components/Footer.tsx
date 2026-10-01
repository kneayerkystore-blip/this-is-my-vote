import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div>
          <span className="font-semibold text-slate-800">CivicVote</span> ·{' '}
          {language === 'km'
            ? 'ប្រព័ន្ធបោះឆ្នោត និងរាប់សន្លឹកឆ្នោតផ្សាយផ្ទាល់'
            : 'Official Live Ballot & Election Portal'}
        </div>

        <div className="flex items-center gap-6">
          <span className="text-slate-400">
            {language === 'km'
              ? 'រក្សាសិទ្ធិគ្រប់យ៉ាង ២០២៦'
              : '© 2026 CivicVote Independent Electoral Committee'}
          </span>
        </div>
      </div>
    </footer>
  );
};
