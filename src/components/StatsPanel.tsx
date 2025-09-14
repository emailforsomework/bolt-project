import React, { useState, useEffect } from 'react';
import { Clock, Target, Zap, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const StatsPanel: React.FC = () => {
  const { 
    isActive, 
    startTime, 
    currentSnippet, 
    userInput, 
    correctCharacters, 
    errors 
  } = useAppStore();
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);
        
        // Calculate WPM (Words per minute - standard: 5 characters = 1 word)
        const timeInMinutes = elapsed / 60;
        const wordsTyped = userInput.length / 5;
        const currentWpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
        setWpm(currentWpm);
        
        // Calculate accuracy
        const totalTyped = userInput.length;
        if (totalTyped > 0) {
          const currentAccuracy = Math.round((correctCharacters / totalTyped) * 100);
          setAccuracy(Math.max(0, currentAccuracy));
        }
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, userInput.length, correctCharacters]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = currentSnippet ? (userInput.length / currentSnippet.code.length) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-2">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {wpm}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-2">
            <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {accuracy}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-2">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {userInput.length} / {currentSnippet?.code.length || 0}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
        </div>
      </div>
      
      {errors > 0 && (
        <div className="flex items-center justify-center text-red-600 dark:text-red-400 text-sm">
          <span>Errors: {errors}</span>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;