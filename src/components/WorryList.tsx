import { Clock } from 'lucide-react';
import { Worry, WorryTimeSettings } from '../types';

interface WorryListProps {
  worries: Worry[];
  onToggleWorry: (id: string) => void;
  worryTime: WorryTimeSettings;
}

export function WorryList({ worries, onToggleWorry, worryTime }: WorryListProps) {
  const unresolvedWorries = worries.filter(w => !w.isDealtWith);
  
  const formatWorryTime = () => {
    return `${worryTime.hour.toString().padStart(2, '0')}:${worryTime.minute.toString().padStart(2, '0')}`;
  };

  if (unresolvedWorries.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No active worries right now. When something's on your mind, write it down here and
          we'll help you address it during your worry time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700 font-medium">Your Active Worries</h3>
        <span className="text-sm text-purple-600">
          Scheduled for {formatWorryTime()}
        </span>
      </div>
      
      <div className="space-y-3">
        {unresolvedWorries.map((worry) => (
          <div
            key={worry.id}
            className="p-4 rounded-lg bg-white border border-gray-200 hover:border-purple-200 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-gray-700">{worry.content}</p>
              <Clock size={20} className="shrink-0 text-purple-400" />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Added {new Date(worry.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
