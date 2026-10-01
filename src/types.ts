export type Language = 'en' | 'km';

export interface Candidate {
  id: string;
  number: number;
  name: {
    en: string;
    km: string;
  };
  role: {
    en: string;
    km: string;
  };
  party: {
    en: string;
    km: string;
  };
  avatar: string;
  color: string;
  bgLight: string;
  borderColor: string;
  bio: {
    en: string;
    km: string;
  };
  manifesto: {
    en: string[];
    km: string[];
  };
  votes: number;
  tagline: {
    en: string;
    km: string;
  };
}

export interface VoteRecord {
  id: string;
  ballotHash: string;
  voterName: string;
  voterId: string;
  candidateId: string;
  candidateName: string;
  timestamp: number;
  station: string;
  verified: boolean;
}

export interface PollingStation {
  id: string;
  name: {
    en: string;
    km: string;
  };
  region: string;
  totalVotes: number;
}
