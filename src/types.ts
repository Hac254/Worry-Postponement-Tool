export interface Worry {
  id: string;
  content: string;
  createdAt: string;
  status: 'new' | 'postponed' | 'completed' | 'in-progress';
  isDealtWith: boolean;
  reflection?: {
    decisionTree?: {
      isHappeningNow: boolean;
      concernsMe: boolean;
      canTakeAction: boolean;
      goodUseOfResources: boolean;
    };
    insights?: string;
    postponedUntil?: string; // Date string for when to address the worry
  };
}

export interface WorryTimeSettings {
  hour: number;
  minute: number;
  duration: number;
}

export interface ProblemSolution {
  id: string;
  createdAt: string;
  worry: string;
  practicalProblem: string;
  solutions: string[];
  analysis: {
    solution: string;
    pros: string[];
    cons: string[];
  }[];
  chosenSolution: string;
  actionPlan: string[];
  progress: string;
  review: string;
  status: 'in-progress' | 'completed';
  completedAt?: string;
}
