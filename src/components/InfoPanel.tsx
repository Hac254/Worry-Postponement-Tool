import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

export function InfoPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-purple-100 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-purple-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info size={20} className="text-purple-500" />
          <span className="font-medium text-gray-800">How Worry Postponement Works</span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-purple-100">
          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-gray-800">What is Worry Postponement?</strong><br />
              It's a cognitive technique that helps you manage anxiety by scheduling a specific time to address your worries,
              allowing you to stay present and focused throughout your day.
            </p>
            
            <p>
              <strong className="text-gray-800">How to use this tool:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Set your daily "worry time" - a 15-30 minute period when you'll address your concerns</li>
              <li>Throughout the day, when a worry appears, write it down here</li>
              <li>Remind yourself that you'll deal with it during your designated worry time</li>
              <li>During worry time, review and process your collected worries</li>
            </ol>
            
            <p>
              <strong className="text-gray-800">The Science:</strong><br />
              This technique engages your prefrontal cortex to better regulate emotional responses and reduces activity in the Default Mode Network,
              helping break repetitive thought patterns and improve emotional control.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
