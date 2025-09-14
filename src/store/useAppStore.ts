import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TypingSession, TypingState, AppSettings, CodeSnippet } from '../types';
import { getRandomSnippet } from '../data/codeSnippets';

interface AppStore extends TypingState, AppSettings {
  // Actions
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (language: string) => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  startSession: (snippet: CodeSnippet) => void;
  updateUserInput: (input: string) => void;
  resetSession: () => void;
  completeSession: () => void;
  addSession: (session: TypingSession) => void;
  getNewSnippet: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSnippet: null,
      currentPosition: 0,
      userInput: '',
      isActive: false,
      startTime: null,
      errors: 0,
      correctCharacters: 0,
      sessions: [],
      theme: 'dark',
      selectedLanguage: 'javascript',
      difficulty: 'easy',

      // Actions
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ selectedLanguage: language }),
      setDifficulty: (difficulty) => set({ difficulty }),

      startSession: (snippet) =>
        set({
          currentSnippet: snippet,
          currentPosition: 0,
          userInput: '',
          isActive: true,
          startTime: Date.now(),
          errors: 0,
          correctCharacters: 0,
        }),

      updateUserInput: (input) => {
        const { currentSnippet, currentPosition, errors, correctCharacters } = get();
        if (!currentSnippet) return;

        const targetText = currentSnippet.code;
        const newPosition = input.length;
        
        let newErrors = errors;
        let newCorrectCharacters = correctCharacters;

        // Check if the last character typed is correct
        if (input.length > currentPosition) {
          const lastTypedChar = input[input.length - 1];
          const expectedChar = targetText[input.length - 1];
          
          if (lastTypedChar === expectedChar) {
            newCorrectCharacters++;
          } else {
            newErrors++;
          }
        }

        set({
          userInput: input,
          currentPosition: newPosition,
          errors: newErrors,
          correctCharacters: newCorrectCharacters,
        });

        // Check if session is complete
        if (input === targetText) {
          get().completeSession();
        }
      },

      resetSession: () =>
        set({
          currentPosition: 0,
          userInput: '',
          isActive: false,
          startTime: null,
          errors: 0,
          correctCharacters: 0,
        }),

      completeSession: () => {
        const state = get();
        const { currentSnippet, startTime, errors, correctCharacters } = state;
        
        if (!currentSnippet || !startTime) return;

        const endTime = Date.now();
        const timeInSeconds = (endTime - startTime) / 1000;
        const timeInMinutes = timeInSeconds / 60;
        const totalCharacters = currentSnippet.code.length;
        const wpm = Math.round((totalCharacters / 5) / timeInMinutes);
        const accuracy = Math.round((correctCharacters / totalCharacters) * 100);

        const session: TypingSession = {
          id: Date.now().toString(),
          snippet: currentSnippet,
          startTime,
          endTime,
          wpm,
          accuracy,
          totalCharacters,
          correctCharacters,
          errors,
          isCompleted: true,
        };

        set((state) => ({
          isActive: false,
          sessions: [...state.sessions, session],
        }));
      },

      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, session],
        })),

      getNewSnippet: () => {
        const { selectedLanguage, difficulty, resetSession } = get();
        resetSession(); // Reset current session when getting new snippet
        const snippet = getRandomSnippet(selectedLanguage, difficulty);
        set({ currentSnippet: snippet });
      },
    }),
    {
      name: 'code-snippet-gym',
      partialize: (state) => ({
        sessions: state.sessions,
        theme: state.theme,
        selectedLanguage: state.selectedLanguage,
        difficulty: state.difficulty,
      }),
    }
  )
);