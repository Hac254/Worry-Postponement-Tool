export interface Worry {
  id: string;
  content: string;
  createdAt: string;
  isDealtWith: boolean;
  reflection?: {
    isSolvable?: boolean;
    actionSteps?: string[];
    insights?: string;
  };
}

export interface WorryTimeSettings {
  hour: number;
  minute: number;
  duration: number;
}
