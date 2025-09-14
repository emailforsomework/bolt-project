import React from 'react';
import { RotateCcw, Shuffle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getRandomSnippet } from '../data/codeSnippets';

const CodeDisplay: React.FC = () => {
  const { 
    currentSnippet, 
    userInput, 
    isActive,
    selectedLanguage,
    difficulty,
    updateUserInput,
    startSession,
    resetSession,
    getNewSnippet
  } = useAppStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!currentSnippet) return;
    
    // Start session on first character typed
    if (!isActive && value.length > 0) {
      startSession(currentSnippet);
    }
    
    // Prevent input beyond the snippet length
    if (value.length <= currentSnippet.code.length) {
      updateUserInput(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!currentSnippet) return;
    
    // Handle tab character
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '\t' + value.substring(end);
      
      if (newValue.length <= currentSnippet.code.length) {
        if (!isActive && newValue.length > 0) {
          startSession(currentSnippet);
        }
        updateUserInput(newValue);
        // Set cursor position after the tab
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      }
    }
  };

  const handleReset = () => {
    resetSession();
  };

  const handleNewSnippet = () => {
    resetSession();
    getNewSnippet();
  };

  if (!currentSnippet) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Select a code snippet to start practicing
        </p>
      </div>
    );
  }

  const renderCodeWithHighlighting = () => {
    const code = currentSnippet.code;
    
    return (
      <div className="relative font-mono text-sm leading-relaxed">
        {code.split('').map((char, index) => {
          let className = 'inline-block';
          
          if (index < userInput.length) {
            // Character has been typed
            if (userInput[index] === char) {
              className += ' bg-green-200 dark:bg-green-900/40 text-green-800 dark:text-green-200';
            } else {
              className += ' bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200';
            }
          } else if (index === userInput.length) {
            // Current character to type
            className += ' bg-blue-200 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 animate-pulse';
          } else {
            // Untyped character
            className += ' text-gray-700 dark:text-gray-300';
          }
          
          // Handle special characters
          if (char === '\n') {
            return <br key={index} />;
          }
          if (char === ' ') {
            return (
              <span key={index} className={className}>
                &nbsp;
              </span>
            );
          }
          
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {currentSnippet.title}
            </h3>
            <div className="flex items-center space-x-3 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                {currentSnippet.language}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                currentSnippet.difficulty === 'easy' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : currentSnippet.difficulty === 'medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}>
                {currentSnippet.difficulty}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
            
            <button
              onClick={handleNewSnippet}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              New Code
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
          {renderCodeWithHighlighting()}
        </div>
        
        <textarea
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full h-32 p-4 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Click here and start typing the code above..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
};

export default CodeDisplay;