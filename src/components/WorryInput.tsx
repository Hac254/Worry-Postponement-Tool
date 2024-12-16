import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface WorryInputProps {
  onAddWorry: (content: string) => void;
}

export function WorryInput({ onAddWorry }: WorryInputProps) {
  const [worry, setWorry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (worry.trim()) {
      onAddWorry(worry);
      setWorry('');
    }
  };

  return (
    <div>
      <h3 className="text-gray-700 font-medium mb-2">Log a New Worry</h3>
      <p className="text-sm text-gray-500 mb-4">
        Write down your worry and we'll save it for your designated worry time.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={worry}
            onChange={(e) => setWorry(e.target.value)}
            placeholder="What's worrying you right now?"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-600 transition-colors"
          >
            <PlusCircle size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}
