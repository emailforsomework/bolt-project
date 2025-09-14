import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getRandomSnippet } from '../data/codeSnippets';

const ControlPanel: React.FC = () => {
  const { 
    selectedLanguage,
    difficulty,
    setLanguage,
    setDifficulty,
  } = useAppStore();

  const languages = ['javascript', 'python', 'typescript', 'css'];
  const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col space-y-6">
        {/* Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <div className="relative">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="font-medium mb-2">Instructions:</p>
          <ul className="space-y-1 text-xs">
            <li>• Select your preferred language and difficulty level</li>
            <li>• Click on the code area and start typing to begin</li>
            <li>• Type exactly as shown, including spaces and punctuation</li>
            <li>• Green highlight indicates correct typing, red indicates errors</li>
            <li>• Your WPM and accuracy are calculated in real-time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;