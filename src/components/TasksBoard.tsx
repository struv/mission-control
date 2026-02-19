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
  'todo': { label: 'To Do', color: '#6b7280', bg: 'bg-gray-800' },
  'in-progress': { label: 'In Progress', color: '#3b82f6', bg: 'bg-blue-900/30' },
  'blocked': { label: 'Blocked', color: '#ef4444', bg: 'bg-red-900/30' },
  'done': { label: 'Done', color: '#22c55e', bg: 'bg-green-900/30' },
};

const priorityConfig = {
  'low': { label: '○', color: '#6b7280' },
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
        <h2 className="text-xl font-bold flex items-center gap-2">
          📋 Tasks
        </h2>
        
        {/* Owner filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              filter === 'all' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {Object.entries(ownerEmoji).map(([owner, emoji]) => (
            <button
              key={owner}
              onClick={() => setFilter(owner)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                filter === owner ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
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
              <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="font-medium text-sm">{config.label}</span>
                <span className="text-xs text-gray-500">({columnTasks.length})</span>
              </div>

              {/* Tasks */}
              <div className="space-y-2 min-h-[200px]">
                {columnTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg ${config.bg} border border-gray-700/50 hover:border-gray-600 transition-colors cursor-pointer`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm">{task.title}</span>
                      <span 
                        className="text-xs"
                        style={{ color: priorityConfig[task.priority].color }}
                      >
                        {priorityConfig[task.priority].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{ownerEmoji[task.owner] || '👤'}</span>
                      {task.project && (
                        <span className="px-1.5 py-0.5 rounded bg-gray-700/50">
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
