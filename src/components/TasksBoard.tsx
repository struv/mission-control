'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'blocked' | 'done';
  owner: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  project?: string;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Build Mission Control UI', status: 'in-progress', owner: 'vie', priority: 'high', project: 'mission-control' },
  { id: '2', title: 'Set up Convex backend', status: 'todo', owner: 'vie', priority: 'high', project: 'mission-control' },
  { id: '3', title: 'Whale signal monitoring', status: 'in-progress', owner: 'scearpo', priority: 'medium', project: 'trading' },
  { id: '4', title: 'Learning pipeline audit', status: 'blocked', owner: 'levelsio', priority: 'low', project: 'learning' },
  { id: '5', title: 'ShiftSwap API integration', status: 'todo', owner: 'levelsio', priority: 'high', project: 'shiftswap' },
];

const statusConfig = {
  'todo': { label: 'To Do', color: '#71717a' },
  'in-progress': { label: 'In Progress', color: '#3b82f6' },
  'blocked': { label: 'Blocked', color: '#ef4444' },
  'done': { label: 'Done', color: '#22c55e' },
};

const priorityConfig = {
  'low': { label: '○', color: '#71717a' },
  'medium': { label: '●', color: '#eab308' },
  'high': { label: '●', color: '#f97316' },
  'critical': { label: '◉', color: '#ef4444' },
};

const ownerEmoji: Record<string, string> = {
  vie: '⟢',
  levelsio: '🚀',
  scearpo: '⚔️',
  flint: '🔥',
  william: '👤',
};

export default function TasksBoard() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<string>('all');

  const columns = ['todo', 'in-progress', 'blocked', 'done'] as const;

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.owner === filter);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-medium text-zinc-50 flex items-center gap-2">
          📋 Tasks
        </h2>
        
        {/* Owner filter */}
        <div className="flex gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 ${
              filter === 'all' 
                ? 'bg-zinc-800 text-zinc-50 border border-zinc-700' 
                : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50'
            }`}
          >
            All
          </button>
          {Object.entries(ownerEmoji).map(([owner, emoji]) => (
            <button
              key={owner}
              onClick={() => setFilter(owner)}
              className={`px-2.5 py-1.5 rounded-md text-[13px] transition-all duration-150 ${
                filter === owner 
                  ? 'bg-zinc-800 border border-zinc-700' 
                  : 'hover:bg-zinc-800/50'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {columns.map(status => {
          const config = statusConfig[status];
          const columnTasks = filteredTasks.filter(t => t.status === status);
          
          return (
            <div key={status} className="space-y-3">
              {/* Column Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-sm font-medium text-zinc-50">{config.label}</span>
                <span className="text-[12px] text-zinc-500">({columnTasks.length})</span>
              </div>

              {/* Tasks */}
              <div className="space-y-2 min-h-[180px]">
                {columnTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 rounded-md bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-150 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[13px] text-zinc-50 group-hover:text-zinc-50">
                        {task.title}
                      </span>
                      <span 
                        className="text-[11px] flex-shrink-0"
                        style={{ color: priorityConfig[task.priority].color }}
                      >
                        {priorityConfig[task.priority].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[13px]">{ownerEmoji[task.owner] || '👤'}</span>
                      {task.project && (
                        <span className="px-1.5 py-0.5 rounded text-[11px] bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                          {task.project}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
