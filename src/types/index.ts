export interface EpisodeSec {
  _id?: string;
  createdBy?: string;
  createdAt?: Date;
  episodeLink: string;
  participant_id: string;
  amountWon: number;
  availableAmountToWin: number;
  episodeDate: string;
  participantFullName?: string;
  episodeNumber: number;
}
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

export type EventActionSignal = {
  id: string,
  type: 'DELETE' | 'EDIT'
}
export type ModalActionSignal = {
  id: string,
  type: 'DELETE' | 'EDIT'
}

export interface Participant {
  hasEpisode: boolean;
  mobileNumber: string;
  _id: string;
  fullName: string;
  email: string;
  gender: string;
  socialMediaHandle: string;
  state: string;
  status: string;
}
export interface Users {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
}

export interface EpisodeEventsApiResponse {
  participantFullName: string;
  events: EpisodeEvent[];
  message: string;
  episode: Episode

}
export type EpisodeResponse = {
  events: EpisodeEvent[],
  participantFullName: string,
  episode: Episode,
  editEpisode?: Episode;
}

export interface EpisodeFormProps {
  onSaveEpisode: (episode: EpisodeSec) => void;
  episodeId?: string;
  editEpisode?: EpisodeSec;
  episode?: EpisodeSec;
}

export interface EpisodeEventsFormProps {
  onSave: (episode: EpisodeEvent) => void;
  episodeId?: string;
  event?: EpisodeEvent
}
export type LossTypeKeys = "CODE_MIX" | "QUESTION_NUMBER" | "QUESTION"


export type LossType = {
  words: any;
  type: LossTypeKeys
  totalAmountLost: number,
  count: number
}

export type CodemixWordsTableProps  = {
  lossTypeData: LossType[],
  totalAmountLost: number,
  count: number,
  words: string,
  color: string,
}
export type groupByAmountProps  = {
  count: number,
  amountWon:number;
}
export type Stats = {
  totalEpisodes: number;
  totalAmountWon: number;
  totalAmountLost: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  totalWaitingParticipants: number;
  totalParticipants: number;
  totalUsers: number;
  totalAmountAvailable: number;
  totalWrongAnswers: number;
  recentEpisodes: Episode[]
  codemixData: CodemixWordsTableProps [];
  amountWonStats: groupByAmountProps[]
  lossTypeData: LossType[];
}

export type EventActionsProps = {
  event: EpisodeEvent;
  index: number;
  episodeId: string;
  events: EpisodeEvent[];
  updateEvents: (updatedEvents: EpisodeEvent[]) => void;
}

export type ChartData = {
  name: string;
  value: number,
  color: string,
  label?: string,
  legendLabel?: string
}