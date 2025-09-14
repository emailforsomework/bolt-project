export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TypingSession {
  id: string;
  snippet: CodeSnippet;
  startTime: number;
  endTime: number | null;
  wpm: number;
  accuracy: number;
  totalCharacters: number;
  correctCharacters: number;
  errors: number;
  isCompleted: boolean;
}

export interface TypingState {
  currentSnippet: CodeSnippet | null;
  currentPosition: number;
  userInput: string;
  isActive: boolean;
  startTime: number | null;
  errors: number;
  correctCharacters: number;
  sessions: TypingSession[];
}

export type Theme = 'dark' | 'light';

export interface AppSettings {
  theme: Theme;
  selectedLanguage: string;
  difficulty: 'easy' | 'medium' | 'hard';
}