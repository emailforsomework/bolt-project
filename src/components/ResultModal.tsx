import React from 'react';
import { X, Trophy, Target, Clock, Zap, RotateCcw, Shuffle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    wpm: number;
    accuracy: number;
    totalCharacters: number;
    correctCharacters: number;
    errors: number;
    startTime: number;
    endTime: number;
  } | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, session }) => {
  const { resetSession, getNewSnippet, startSession, currentSnippet } = useAppStore();

  if (!isOpen || !session) return null;

  const duration = Math.round((session.endTime - session.startTime) / 1000);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRetry = () => {
    onClose();
    resetSession();
    if (currentSnippet) {
      startSession(currentSnippet);
    }
  };

  const handleNewSnippet = () => {
    onClose();
    resetSession();
    getNewSnippet();
  };

  const getPerformanceMessage = () => {
    const { wpm, accuracy } = session;
    
    if (wpm >= 60 && accuracy >= 95) {
      return { message: "Outstanding Performance! 🏆", color: "text-yellow-600 dark:text-yellow-400" };
    } else if (wpm >= 40 && accuracy >= 90) {
      return { message: "Great Job! Keep it up! 🎉", color: "text-green-600 dark:text-green-400" };
    } else if (wpm >= 25 && accuracy >= 80) {
      return { message: "Good Progress! 👍", color: "text-blue-600 dark:text-blue-400" };
    } else {
      return { message: "Keep Practicing! 💪", color: "text-purple-600 dark:text-purple-400" };
    }
  };

  const performance = getPerformanceMessage();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Session Complete!
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className={`font-semibold ${performance.color}`}>
              {performance.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-2">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.wpm}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-2">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.accuracy}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-2">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(duration)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg mx-auto mb-2">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.errors}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Errors</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleRetry}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry
            </button>
            
            <button
              onClick={handleNewSnippet}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              New Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;