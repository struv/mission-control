'use client';

interface Activity {
  id: string;
  agent: string;
  action: string;
  target?: string;
  time: Date;
  type: 'task' | 'message' | 'system' | 'alert';
}

const mockActivities: Activity[] = [
  { id: '1', agent: 'vie', action: 'Started building', target: 'Mission Control UI', time: new Date(Date.now() - 5 * 60 * 1000), type: 'task' },
  { id: '2', agent: 'scearpo', action: 'Detected whale signal on', target: 'BONK', time: new Date(Date.now() - 15 * 60 * 1000), type: 'alert' },
  { id: '3', agent: 'vie', action: 'Processed drop from', target: '#drop channel', time: new Date(Date.now() - 30 * 60 * 1000), type: 'task' },
  { id: '4', agent: 'levelsio', action: 'Completed code review for', target: 'ShiftSwap PR #42', time: new Date(Date.now() - 1 * 60 * 60 * 1000), type: 'task' },
  { id: '5', agent: 'system', action: 'Heartbeat check completed', time: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'system' },
];

const agentEmoji: Record<string, string> = {
  vie: '⟢',
  levelsio: '🚀',
  scearpo: '⚔️',
  flint: '🔥',
  system: '⚙️',
};

const typeColors: Record<string, string> = {
  task: 'border-blue-500/30',
  message: 'border-purple-500/30',
  system: 'border-gray-500/30',
  alert: 'border-yellow-500/30',
};

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export default function ActivityFeed() {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📡 Activity Feed
      </h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {mockActivities.map(activity => (
          <div 
            key={activity.id}
            className={`flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 border-l-2 ${typeColors[activity.type]}`}
          >
            <span className="text-lg">{agentEmoji[activity.agent]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium capitalize">{activity.agent}</span>
                {' '}{activity.action}
                {activity.target && (
                  <span className="text-indigo-400"> {activity.target}</span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{formatTime(activity.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
