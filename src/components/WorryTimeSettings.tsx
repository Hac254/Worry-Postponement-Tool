import { Clock } from 'lucide-react';
import { WorryTimeSettings as Settings } from '../types';

interface WorryTimeSettingsProps {
  worryTime: Settings;
  onWorryTimeChange: (settings: Settings) => void;
}

export function WorryTimeSettings({ worryTime, onWorryTimeChange }: WorryTimeSettingsProps) {
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onWorryTimeChange({ ...worryTime, hour: parseInt(e.target.value) });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onWorryTimeChange({ ...worryTime, minute: parseInt(e.target.value) });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onWorryTimeChange({ ...worryTime, duration: parseInt(e.target.value) });
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-purple-500" size={20} />
        <h2 className="font-medium text-gray-800">Set Your Daily Worry Time</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Time:</label>
          <select
            value={worryTime.hour}
            onChange={handleHourChange}
            className="border rounded px-2 py-1 text-gray-700"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {i.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          <span>:</span>
          <select
            value={worryTime.minute}
            onChange={handleMinuteChange}
            className="border rounded px-2 py-1 text-gray-700"
          >
            {[0, 15, 30, 45].map(minute => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Duration:</label>
          <select
            value={worryTime.duration}
            onChange={handleDurationChange}
            className="border rounded px-2 py-1 text-gray-700"
          >
            {[15, 20, 25, 30].map(duration => (
              <option key={duration} value={duration}>
                {duration} minutes
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
