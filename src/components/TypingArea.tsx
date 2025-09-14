import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

const TypingArea: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { 
    isActive, 
    currentSnippet, 
    userInput, 
    updateUserInput 
  } = useAppStore();

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive || !currentSnippet) return;
    
    const value = e.target.value;
    
    // Prevent input beyond the snippet length
    if (value.length <= currentSnippet.code.length) {
      updateUserInput(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isActive) return;
    
    // Prevent certain keys that could interfere with typing
    if (e.key === 'Tab') {
      e.preventDefault();
      // Allow tab character in input
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '\t' + value.substring(end);
      
      if (newValue.length <= (currentSnippet?.code.length || 0)) {
        updateUserInput(newValue);
        // Set cursor position after the tab
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      }
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl">
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Type the code below
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click outside or press Escape to pause
            </p>
          </div>
          
          <div className="relative">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Start typing..."
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 dark:text-gray-400">
              {userInput.length} / {currentSnippet?.code.length || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingArea;