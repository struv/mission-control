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
  active: { color: '#22c55e' },
  paused: { color: '#eab308' },
  error: { color: '#ef4444' },
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
        <h2 className="text-base font-medium text-zinc-50 flex items-center gap-2">
          ⏰ Scheduled Jobs
        </h2>
        <button className="btn btn-ghost text-[13px] py-1.5 px-3">
          + Add Job
        </button>
      </div>

      <div className="space-y-2">
        {jobs.map(job => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 rounded-md bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-150"
          >
            <div className="flex items-center gap-4">
              {/* Toggle switch */}
              <button
                onClick={() => toggleJob(job.id)}
                className="relative w-9 h-5 rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 focus-visible:ring-indigo-500"
                style={{ 
                  backgroundColor: job.status === 'active' ? '#22c55e30' : '#27272a'
                }}
                aria-label={`Toggle ${job.name}`}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: statusConfig[job.status].color,
                    left: job.status === 'active' ? '18px' : '2px',
                  }}
                />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-50">{job.name}</span>
                  <span className="text-[13px]">{ownerEmoji[job.owner]}</span>
                </div>
                <div className="text-[12px] text-zinc-500">{job.schedule}</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Last run */}
              {job.lastRun && (
                <div className="text-right">
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wide">Last</div>
                  <div className="text-[13px] text-zinc-400">{formatTimeAgo(job.lastRun)}</div>
                </div>
              )}

              {/* Next run */}
              <div className="text-right min-w-[60px]">
                <div className="text-[11px] text-zinc-500 uppercase tracking-wide">Next</div>
                <div 
                  className="text-[13px] font-medium"
                  style={{ color: job.status === 'active' ? statusConfig.active.color : '#71717a' }}
                >
                  {job.status === 'active' ? formatTimeUntil(job.nextRun) : '—'}
                </div>
              </div>

              {/* Run now button */}
              <button
                className="btn btn-ghost text-[12px] py-1 px-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
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
