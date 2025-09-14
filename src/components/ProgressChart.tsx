import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAppStore } from '../store/useAppStore';

const ProgressChart: React.FC = () => {
  const { sessions } = useAppStore();

  if (sessions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Complete some typing sessions to see your progress here!
        </p>
      </div>
    );
  }

  const chartData = sessions.slice(-10).map((session, index) => ({
    session: index + 1,
    wpm: session.wpm,
    accuracy: session.accuracy,
    date: new Date(session.startTime).toLocaleDateString(),
  }));

  const averageWPM = Math.round(sessions.reduce((sum, session) => sum + session.wpm, 0) / sessions.length);
  const averageAccuracy = Math.round(sessions.reduce((sum, session) => sum + session.accuracy, 0) / sessions.length);
  const bestWPM = Math.max(...sessions.map(s => s.wpm));
  const bestAccuracy = Math.max(...sessions.map(s => s.accuracy));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Progress
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {averageWPM}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg WPM</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {averageAccuracy}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {bestWPM}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Best WPM</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {bestAccuracy}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Best Accuracy</div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="session" 
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(31 41 55)',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="wpm" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="WPM"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#10B981" 
              strokeWidth={3}
              name="Accuracy %"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;