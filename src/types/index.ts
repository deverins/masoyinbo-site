//src/types/index.ts
export interface Episode {
  _id: string;
  episodeLink: string;
  episodeDate: string;
  amountWon: number;
  availableAmountToWin: number;
  participant_id: string;
  createdBy: string;
  createdAt: string;
  episodeNumber: number
}

export interface EpisodeEvent {
  _id: string;
  question: string;
  correctAnswer: string;
  response: string;
  type: string;
  amount: number;
  balance: number;
  isCorrect: boolean;
  participantFullName?: string;
}

export interface EpisodeEventsApiResponse {
  events: EpisodeEvent[];
  message: string;
  episode: Episode
}


export type LossType = {
  type: string
  totalAmountLost: number,
  count: number
}

export type CodemixWords = {
  words: string
  totalAmountLost: number,
  count: number
}


export type PerformanceStats = {
  totalEpisodes: number,
  totalQuestions: number,
  totalCorrectAnwers: number,
  totalAmountAvailable: number,
  totalAmountWon: number,
  totalWaitingPaticipants: number,
  recentEpisodes: Episode[],
  lossTypeData: LossType[],
  codemixData: CodemixWords[]
}

export const formatType = (type: string) => {
  return type
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toLowerCase());
};


export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};


export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};
