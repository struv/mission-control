'use client';

interface Stat {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
}

const stats: Stat[] = [
  { label: 'Active Agents', value: 3, icon: '🤖', change: '+1 today', trend: 'up' },
  { label: 'Tasks Completed', value: 12, icon: '✅', change: 'this week', trend: 'neutral' },
  { label: 'Pending Tasks', value: 5, icon: '📋', change: '2 high priority', trend: 'neutral' },
  { label: 'Cron Jobs', value: 4, icon: '⏰', change: '3 active', trend: 'neutral' },
];

const trendColors = {
  up: 'text-green-400',
  down: 'text-red-400',
  neutral: 'text-gray-500',
};

export default function QuickStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              {stat.change && (
                <p className={`text-xs mt-1 ${trendColors[stat.trend || 'neutral']}`}>
                  {stat.change}
                </p>
              )}
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
