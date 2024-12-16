import { Check, Clock } from 'lucide-react';
import { Worry, WorryTimeSettings } from '../types';

interface WorryListProps {
  worries: Worry[];
  onToggleWorry: (id: string) => void;
  worryTime: WorryTimeSettings;
}

export function WorryList({ worries, onToggleWorry, worryTime }: WorryListProps) {
  const formatWorryTime = () => {
    return `${worryTime.hour.toString().padStart(2, '0')}:${worryTime.minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-gray-700 font-medium">Your Worries</h3>
      <p className="text-sm text-gray-500">
        These worries are postponed until your worry time at {formatWorryTime()}
      </p>
      
      <div className="space-y-3">
        {worries.map((worry) => (
          <div
            key={worry.id}
            className={`p-4 rounded-lg border transition-all ${
              worry.isDealtWith
                ? 'bg-gray-50 border-gray-100'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p
                className={`flex-1 ${
                  worry.isDealtWith ? 'text-gray-400 line-through' : 'text-gray-700'
                }`}
              >
                {worry.content}
              </p>
              <button
                onClick={() => onToggleWorry(worry.id)}
                className={`shrink-0 p-1 rounded-full transition-colors ${
                  worry.isDealtWith
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-purple-400 hover:text-purple-500'
                }`}
                title={worry.isDealtWith ? 'Mark as unresolved' : 'Mark as resolved'}
              >
                {worry.isDealtWith ? <Check size={20} /> : <Clock size={20} />}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Added {new Date(worry.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {worries.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No worries logged yet. When something's on your mind, write it down here and
              we'll help you address it during your worry time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
