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
  task: '#3b82f6',
  message: '#a855f7',
  system: '#71717a',
  alert: '#eab308',
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
      <h2 className="text-base font-medium text-zinc-50 mb-4 flex items-center gap-2">
        📡 Activity Feed
      </h2>

      <div className="space-y-1 max-h-[360px] overflow-y-auto">
        {mockActivities.map(activity => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-md hover:bg-zinc-800/30 transition-colors duration-150"
            style={{
              borderLeft: `2px solid ${typeColors[activity.type]}30`,
            }}
          >
            <span className="text-base flex-shrink-0">{agentEmoji[activity.agent]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-zinc-50">
                <span className="font-medium capitalize">{activity.agent}</span>
                <span className="text-zinc-400"> {activity.action}</span>
                {activity.target && (
                  <span className="text-indigo-400"> {activity.target}</span>
                )}
              </p>
              <p className="text-[12px] text-zinc-500 mt-0.5">{formatTime(activity.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
