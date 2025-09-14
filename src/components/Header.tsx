import React from 'react';
import { Code2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Code Snippet Gym
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Master your coding speed and accuracy
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Header actions can be added here if needed */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;