'use client';

import { useState, useEffect } from 'react';

interface CronJob {
  id: string;
  name: string;
  schedule: string;
  nextRun: Date;
  lastRun?: Date;
  status: 'active' | 'paused' | 'error';
  owner: string;
}

const mockJobs: CronJob[] = [
  {
    id: '1',
    name: 'Heartbeat Check',
    schedule: 'Every 4 hours',
    nextRun: new Date(Date.now() + 2 * 60 * 60 * 1000),
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'active',
    owner: 'vie',
  },
  {
    id: '2',
    name: 'Whale Signal Monitor',
    schedule: 'Every 15 minutes',
    nextRun: new Date(Date.now() + 5 * 60 * 1000),
    lastRun: new Date(Date.now() - 10 * 60 * 1000),
    status: 'active',
    owner: 'scearpo',
  },
  {
    id: '3',
    name: 'Learning Pipeline',
    schedule: 'On #drop message',
    nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: 'active',
    owner: 'vie',
  },
  {
    id: '4',
    name: 'Memory Backup',
    schedule: 'Daily at 3am',
    nextRun: new Date(Date.now() + 8 * 60 * 60 * 1000),
    lastRun: new Date(Date.now() - 16 * 60 * 60 * 1000),
    status: 'paused',
    owner: 'levelsio',
  },
];

const statusConfig = {
  active: { color: '#22c55e', label: 'Active' },
  paused: { color: '#eab308', label: 'Paused' },
  error: { color: '#ef4444', label: 'Error' },
};

const ownerEmoji: Record<string, string> = {
  vie: '⟢',
  levelsio: '🚀',
  scearpo: '⚔️',
  flint: '🔥',
};

function formatTimeUntil(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff < 0) return 'Now';
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
}

export default function CronCalendar() {
  const [jobs, setJobs] = useState<CronJob[]>(mockJobs);
  const [, forceUpdate] = useState({});

  // Update times every minute
  useEffect(() => {
    const timer = setInterval(() => forceUpdate({}), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleJob = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id 
        ? { ...job, status: job.status === 'active' ? 'paused' : 'active' }
        : job
    ));
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          ⏰ Scheduled Jobs
        </h2>
        <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm transition-colors">
          + Add Job
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map(job => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <button
                onClick={() => toggleJob(job.id)}
                className="relative w-10 h-6 rounded-full transition-colors"
                style={{ 
                  backgroundColor: job.status === 'active' 
                    ? statusConfig.active.color + '30'
                    : '#374151'
                }}
              >
                <span
                  className="absolute top-1 w-4 h-4 rounded-full transition-all"
                  style={{
                    backgroundColor: statusConfig[job.status].color,
                    left: job.status === 'active' ? '22px' : '4px',
                  }}
                />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{job.name}</span>
                  <span className="text-sm">{ownerEmoji[job.owner]}</span>
                </div>
                <div className="text-xs text-gray-500">{job.schedule}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              {/* Last run */}
              {job.lastRun && (
                <div className="text-right">
                  <div className="text-gray-500 text-xs">Last run</div>
                  <div className="text-gray-400">{formatTimeAgo(job.lastRun)}</div>
                </div>
              )}

              {/* Next run */}
              <div className="text-right">
                <div className="text-gray-500 text-xs">Next run</div>
                <div 
                  className="font-medium"
                  style={{ color: statusConfig[job.status].color }}
                >
                  {job.status === 'active' ? formatTimeUntil(job.nextRun) : '—'}
                </div>
              </div>

              {/* Run now button */}
              <button
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs transition-colors"
                disabled={job.status !== 'active'}
              >
                Run Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
