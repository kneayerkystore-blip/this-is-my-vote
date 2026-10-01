import React, { useState, useEffect, useRef } from 'react';
import { Candidate, Language, VoteRecord } from './types';
import { INITIAL_CANDIDATES, INITIAL_RECENT_VOTES } from './data/candidates';
import { t } from './utils/i18n';
import { Header } from './components/Header';
import { LeaderBanner } from './components/LeaderBanner';
import { CandidateCard } from './components/CandidateCard';
import { ValueInsertionManager } from './components/ValueInsertionManager';
import { LiveAnalytics } from './components/LiveAnalytics';
import { LiveAuditTrail } from './components/LiveAuditTrail';
import { VoteModal } from './components/VoteModal';
import { CandidateDetailModal } from './components/CandidateDetailModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_CANDIDATES_KEY = 'civic_vote_candidates_v2';
const STORAGE_VOTES_KEY = 'civic_vote_records_v2';
const STORAGE_LANG_KEY = 'civic_vote_lang_v2';
const TOTAL_REGISTERED_VOTERS = 5800;

export default function App() {
  // Language State
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      return saved === 'km' ? 'km' : 'en';
    } catch {
      return 'en';
    }
  });

  // Candidates State
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CANDIDATES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CANDIDATES;
  });

  // Recent Votes State
  const [recentVotes, setRecentVotes] = useState<VoteRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_VOTES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_RECENT_VOTES;
  });

  // Modals & Selection State
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [detailCandidate, setDetailCandidate] = useState<Candidate | null>(null);

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationTimerRef = useRef<number | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Active section for header navigation
  const [activeSection, setActiveSection] = useState('ballot');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CANDIDATES_KEY, JSON.stringify(candidates));
    } catch {
      // ignore
    }
  }, [candidates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(recentVotes));
    } catch {
      // ignore
    }
  }, [recentVotes]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  };

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Total votes computed dynamically from candidates
  const totalParticipants = candidates.reduce((acc, c) => acc + c.votes, 0);

  // Sort candidates to determine leader and ranks
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  const leaderId = sortedCandidates[0]?.id;

  // Direct value update (Requirement: "can insert value")
  const handleUpdateCandidateVotes = (candidateId: string, newVotes: number) => {
    const safeVotes = Math.max(0, Math.floor(newVotes));
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, votes: safeVotes } : c))
    );
    const candidate = candidates.find((c) => c.id === candidateId);
    showToast(
      language === 'km'
        ? `បានកំណត់ ${candidate?.name[language]} ទៅជា ${safeVotes.toLocaleString()} សំឡេង`
        : `Updated ${candidate?.name[language]} to ${safeVotes.toLocaleString()} votes`
    );
  };

  // Add delta votes (Requirement: "can insert value")
  const handleAddCandidateVotes = (candidateId: string, delta: number) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, votes: Math.max(0, c.votes + delta) } : c))
    );
    const candidate = candidates.find((c) => c.id === candidateId);
    showToast(
      language === 'km'
        ? `បានបន្ថែម +${delta} សំឡេងជូន ${candidate?.name[language]}`
        : `Added +${delta} votes to ${candidate?.name[language]}`
    );
  };

  // Set all candidates' votes in bulk
  const handleSetAllCandidateVotes = (votesMap: Record<string, number>) => {
    setCandidates((prev) =>
      prev.map((c) => ({
        ...c,
        votes: votesMap[c.id] !== undefined ? Math.max(0, votesMap[c.id]) : c.votes,
      }))
    );
    showToast(
      language === 'km' ? 'បានអនុវត្តចំនួនសំឡេងទាំងអស់ជោគជ័យ' : 'All candidate vote values updated'
    );
  };

  // Reset to initial demo default
  const handleResetToDefault = () => {
    setCandidates(INITIAL_CANDIDATES);
    setRecentVotes(INITIAL_RECENT_VOTES);
    showToast(
      language === 'km'
        ? 'ទិន្នន័យត្រូវបានកំណត់ឡើងវិញ'
        : 'Restored initial shortlisted vote values'
    );
  };

  // Handle vote cast from modal ("ពេលបញ្ចូលការបោះឆ្នោត")
  const handleVoteSubmit = (record: Omit<VoteRecord, 'id' | 'timestamp'>) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === record.candidateId ? { ...c, votes: c.votes + 1 } : c))
    );

    const newRecord: VoteRecord = {
      ...record,
      id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      timestamp: Date.now(),
    };

    setRecentVotes((prev) => [newRecord, ...prev.slice(0, 24)]);

    const candidate = candidates.find((c) => c.id === record.candidateId);
    showToast(
      language === 'km'
        ? `ការបោះឆ្នោតបានបញ្ចូលជោគជ័យ! បេក្ខជន ${candidate?.name[language]} ទទួលបាន +១ សំឡេង`
        : `Ballot recorded! 1 vote added for ${candidate?.name[language]}`
    );
  };

  // Quick vote helper
  const handleQuickVote = (candidateId: string) => {
    handleAddCandidateVotes(candidateId, 1);
  };

  // Simulation toggle
  const handleToggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  useEffect(() => {
    if (isSimulating) {
      simulationTimerRef.current = window.setInterval(() => {
        const candidateWeights = [0.32, 0.28, 0.18, 0.22];
        const rand = Math.random();
        let cumulative = 0;
        let chosenIdx = 0;
        for (let i = 0; i < candidateWeights.length; i++) {
          cumulative += candidateWeights[i];
          if (rand < cumulative) {
            chosenIdx = i;
            break;
          }
        }

        const candidate = candidates[chosenIdx];
        if (candidate) {
          handleQuickVote(candidate.id);
        }
      }, 3500);
    } else {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
    }

    return () => {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
      }
    };
  }, [isSimulating, candidates, language]);

  // Open Vote Modal for candidate
  const handleOpenVoteModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsVoteModalOpen(true);
  };

  const handleOpenDetailModal = (candidate: Candidate) => {
    setDetailCandidate(candidate);
  };

  const handleScrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* 3-Zone Clean Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={handleScrollTo}
        onOpenCastVote={() => handleOpenVoteModal(candidates[0])}
        totalParticipants={totalParticipants}
      />

      {/* Main Single-Page Focused Dashboard */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Leading Candidate & Total Participants Banner */}
        <section id="leader" aria-label="Leading Candidate Summary">
          <LeaderBanner
            candidates={candidates}
            language={language}
            totalParticipants={totalParticipants}
            registeredVoters={TOTAL_REGISTERED_VOTERS}
            onSelectCandidate={handleOpenVoteModal}
          />
        </section>

        {/* 2. Candidate Vote Distribution Section (Live Graphs & Comparative Analytics) */}
        <section id="graphs" aria-label="Candidate Vote Distribution">
          <LiveAnalytics
            candidates={candidates}
            language={language}
            totalParticipants={totalParticipants}
            registeredVoters={TOTAL_REGISTERED_VOTERS}
            isSimulating={isSimulating}
            onToggleSimulation={handleToggleSimulation}
            onQuickVote={handleQuickVote}
            onResetVotes={handleResetToDefault}
          />
        </section>

        {/* 3. Direct Value Insertion & Adjustment Controller (Requirement: "can insert value") */}
        <section id="editor" aria-label="Insert Vote Values">
          <ValueInsertionManager
            candidates={candidates}
            language={language}
            onUpdateCandidateVotes={handleUpdateCandidateVotes}
            onSetAllCandidateVotes={handleSetAllCandidateVotes}
            onResetToDefault={handleResetToDefault}
          />
        </section>

        {/* 4. Official 4-Candidate Shortlist Cards with in-card value insertion */}
        <section id="ballot" className="space-y-4" aria-label="Official 4-Candidate Shortlist">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {t('shortlistTitle', language)}
              </h2>
              <p className="mt-1 text-xs text-slate-500 max-w-2xl">
                {t('shortlistDesc', language)}
              </p>
            </div>

            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-900">4 candidates</span>{' '}
              <span>· {language === 'km' ? 'អាចបញ្ចូលតម្លៃដោយផ្ទាល់' : 'Direct value insertion enabled'}</span>
            </div>
          </div>

          {/* 4 Candidate Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {candidates.map((candidate) => {
              const rank = sortedCandidates.findIndex((c) => c.id === candidate.id) + 1;
              const isLeader = candidate.id === leaderId;

              return (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isLeader={isLeader}
                  rank={rank}
                  totalVotes={totalParticipants}
                  language={language}
                  onVote={handleOpenVoteModal}
                  onOpenDetails={handleOpenDetailModal}
                  onUpdateVotes={handleUpdateCandidateVotes}
                  onAddVotes={handleAddCandidateVotes}
                />
              );
            })}
          </div>
        </section>

        {/* 5. Live Verified Audit Trail */}
        <section id="audit" aria-label="Live Verified Audit Trail">
          <LiveAuditTrail recentVotes={recentVotes} language={language} />
        </section>
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Interactive Modal: "ពេលបញ្ចូលការបោះឆ្នោត" (When casting/submitting vote) */}
      <VoteModal
        isOpen={isVoteModalOpen}
        candidate={selectedCandidate}
        language={language}
        onClose={() => setIsVoteModalOpen(false)}
        onSubmitVote={handleVoteSubmit}
      />

      {/* Candidate Manifesto & Biography Modal */}
      <CandidateDetailModal
        candidate={detailCandidate}
        language={language}
        onClose={() => setDetailCandidate(null)}
        onVote={handleOpenVoteModal}
        isLeader={detailCandidate ? detailCandidate.id === leaderId : false}
        totalVotes={totalParticipants}
      />
    </div>
  );
}
