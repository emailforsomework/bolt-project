import { CodeSnippet } from '../types';

export const codeSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'React Hook useState',
    language: 'javascript',
    difficulty: 'easy',
    code: `const [count, setCount] = useState(0);

const handleIncrement = () => {
  setCount(count + 1);
};

return (
  <div className="counter">
    <h2>Count: {count}</h2>
    <button onClick={handleIncrement}>
      Increment
    </button>
  </div>
);`
  },
  {
    id: '2',
    title: 'Python List Comprehension',
    language: 'python',
    difficulty: 'medium',
    code: `def filter_even_squares(numbers):
    return [x**2 for x in numbers if x % 2 == 0]

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = filter_even_squares(numbers)
print(f"Even squares: {even_squares}")`
  },
  {
    id: '3',
    title: 'TypeScript Interface',
    language: 'typescript',
    difficulty: 'medium',
    code: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const createUser = (userData: Partial<User>): User => {
  return {
    id: Date.now(),
    isActive: true,
    ...userData,
  } as User;
};`
  },
  {
    id: '4',
    title: 'CSS Grid Layout',
    language: 'css',
    difficulty: 'easy',
    code: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

.item {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}`
  },
  {
    id: '5',
    title: 'Async/Await API Call',
    language: 'javascript',
    difficulty: 'hard',
    code: `const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};`
  },
  {
    id: '6',
    title: 'Python Class Definition',
    language: 'python',
    difficulty: 'hard',
    code: `class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def get_history(self):
        return self.history.copy()
    
    def clear_history(self):
        self.history.clear()`
  }
];

export const getSnippetsByLanguage = (language: string): CodeSnippet[] => {
  return codeSnippets.filter(snippet => snippet.language === language);
};

export const getSnippetsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): CodeSnippet[] => {
  return codeSnippets.filter(snippet => snippet.difficulty === difficulty);
};

export const getRandomSnippet = (language?: string, difficulty?: 'easy' | 'medium' | 'hard'): CodeSnippet => {
  let filteredSnippets = [...codeSnippets];
  
  if (language) {
    filteredSnippets = filteredSnippets.filter(s => s.language === language);
  }
  
  if (difficulty) {
    filteredSnippets = filteredSnippets.filter(s => s.difficulty === difficulty);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredSnippets.length);
  return filteredSnippets[randomIndex] || codeSnippets[0];
};