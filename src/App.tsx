import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import CodeDisplay from './components/CodeDisplay';
import ControlPanel from './components/ControlPanel';
import ResultModal from './components/ResultModal';
import ProgressChart from './components/ProgressChart';
import { useAppStore } from './store/useAppStore';

function App() {
  const { 
    isActive, 
    sessions, 
    currentSnippet, 
    userInput, 
    getNewSnippet 
  } = useAppStore();
  
  const [showResult, setShowResult] = useState(false);
  const [lastCompletedSession, setLastCompletedSession] = useState<any>(null);

  // Always use dark theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Load initial snippet
    if (!currentSnippet) {
      getNewSnippet();
    }
  }, [currentSnippet, getNewSnippet]);

  useEffect(() => {
    // Check for completed session
    const lastSession = sessions[sessions.length - 1];
    if (lastSession && lastSession.isCompleted && !showResult) {
      setLastCompletedSession(lastSession);
      setShowResult(true);
    }
  }, [sessions, showResult]);

  useEffect(() => {
    // Check if current session is complete
    if (currentSnippet && userInput === currentSnippet.code && isActive) {
      // Small delay to show completion state
      setTimeout(() => {
        const lastSession = sessions[sessions.length - 1];
        if (lastSession) {
          setLastCompletedSession(lastSession);
          setShowResult(true);
        }
      }, 500);
    }
  }, [currentSnippet, userInput, isActive, sessions]);

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-900 text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1">
            <StatsPanel />
          </div>
          
          {/* Middle Column - Code Display */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <CodeDisplay />
              <ControlPanel />
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        {sessions.length > 0 && (
          <div className="mt-8">
            <ProgressChart />
          </div>
        )}
      </main>

      {/* Result Modal */}
      <ResultModal 
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        session={lastCompletedSession}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2025 Code Snippet Gym. Built with React, TypeScript & Tailwind CSS</p>
            <p className="mt-1">Practice makes perfect. Keep coding! 💪</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;