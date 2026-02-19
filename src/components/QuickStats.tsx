'use client';

interface Stat {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
}

const stats: Stat[] = [
  { label: 'Active Agents', value: 3, icon: '🤖', change: '+1 today' },
  { label: 'Tasks Completed', value: 12, icon: '✅', change: 'This week' },
  { label: 'Pending Tasks', value: 5, icon: '📋', change: '2 high priority' },
  { label: 'Cron Jobs', value: 4, icon: '⏰', change: '3 active' },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className="card p-5 transition-all duration-150 hover:border-zinc-700"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-zinc-500 uppercase tracking-wide font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-zinc-50 mt-1">{stat.value}</p>
              {stat.change && (
                <p className="text-[13px] text-zinc-500 mt-1">{stat.change}</p>
              )}
            </div>
            <span className="text-2xl opacity-80">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
