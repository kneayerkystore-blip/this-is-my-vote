import React from 'react';
import { Language } from '../types';
import { Lock, FileCheck, RefreshCw, EyeOff } from 'lucide-react';

interface VotingIntegrityInfoProps {
  language: Language;
}

export const VotingIntegrityInfo: React.FC<VotingIntegrityInfoProps> = ({ language }) => {
  const points = [
    {
      icon: EyeOff,
      title: language === 'km' ? 'ការបោះឆ្នោតសម្ងាត់ ១០០%' : '100% Secret Ballot',
      desc:
        language === 'km'
          ? 'គ្មាននរណាម្នាក់អាចភ្ជាប់អត្តសញ្ញាណរបស់អ្នកទៅនឹងបេក្ខជនដែលអ្នកបានបោះឆ្នោតឡើយ។'
          : 'Your vote is decoupled from your identity using randomized cryptographic tokens.',
    },
    {
      icon: FileCheck,
      title: language === 'km' ? 'សន្លឹកឆ្នោតមួយ សំឡេងមួយ' : 'One Person, One Ballot',
      desc:
        language === 'km'
          ? 'ប្រព័ន្ធផ្ទៀងផ្ទាត់ដោយស្វ័យប្រវត្តិនូវបញ្ជីឈ្មោះ ដើម្បីធានាភាពសុក្រឹត និងយុត្តិធម៌។'
          : 'Duplicate detection protocols ensure every voter is counted exactly once.',
    },
    {
      icon: RefreshCw,
      title: language === 'km' ? 'រាប់លទ្ធផលភ្លាមៗ' : 'Instant Decentralized Tally',
      desc:
        language === 'km'
          ? 'ពេលបញ្ចូលការបោះឆ្នោត លទ្ធផលត្រូវបានគណនា និងផ្សាយផ្ទាល់តាមពេលវេលាជាក់ស្តែង។'
          : 'Ballots update live metrics and comparative graphs immediately upon transmission.',
    },
    {
      icon: Lock,
      title: language === 'km' ? 'សវនកម្មតម្លាភាព' : 'Tamper-Evident Ledger',
      desc:
        language === 'km'
          ? 'សន្លឹកឆ្នោតទាំងអស់ត្រូវបានកត់ត្រាក្នុងបញ្ជីសវនកម្មដែលអាចផ្ទៀងផ្ទាត់បាន។'
          : 'Every submission generates an immutable verification receipt hash for auditing.',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-base font-bold text-slate-900">
          {language === 'km' ? 'ស្តង់ដារសុក្រឹតភាព និងច្បាប់នៃការបោះឆ្នោត' : 'Integrity Standards & Voting Protocol'}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {language === 'km'
            ? 'គោលការណ៍ដែលធានានូវការបោះឆ្នោតត្រឹមត្រូវ សេរី និងយុត្តិធម៌សម្រាប់បេក្ខជនទាំង ៤ រូប'
            : 'Guarantees preserving free, equal, and confidential democratic participation'}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((pt, i) => {
          const Icon = pt.icon;
          return (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-indigo-600 shadow-2xs">
                <Icon className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1">{pt.title}</h4>
              <p className="text-xs leading-relaxed text-slate-600">{pt.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
