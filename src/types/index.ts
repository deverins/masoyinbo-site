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
  type: 'DELETE'|'EDIT'
}
export type ModalActionSignal = {
  id: string,
  type: 'DELETE'|'EDIT'
}

export interface Participant {
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

export type LossTypeKeys = "CODE_MIX" | "QUESTION_NUMBER" | "QUESTION"


export type LossType = {
  type: LossTypeKeys
  totalAmountLost: number,
  count: number
}

export type CodemixWords = {
  lossTypeData: LossType[],
  words: string,
  totalAmountLost: number,
  count: number
}

export type Stats = {
  totalEpisodes: number;
  totalAmountWon: number;
  totalCorrectAnwers: number;
  totalQuestions: number;
  totalWaitingPaticipants: number;
  totalParticipants: number;
  totalUsers: number;
  totalAmountAvailable: number;
  recentEpisodes: Episode[]
  codemixData: CodemixWords[];
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
  color:string 
}