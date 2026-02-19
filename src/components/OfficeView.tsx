'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  status: 'active' | 'idle' | 'away';
  currentTask?: string;
  color: string;
}

const agents: Agent[] = [
  {
    id: 'vie',
    name: 'Vie',
    emoji: '⟢',
    role: 'Chief of Staff',
    status: 'active',
    currentTask: 'Building Mission Control',
    color: '#a855f7',
  },
  {
    id: 'levelsio',
    name: 'Levelsio',
    emoji: '🚀',
    role: 'Dev Lead',
    status: 'idle',
    currentTask: 'Awaiting orders',
    color: '#22c55e',
  },
  {
    id: 'scearpo',
    name: 'Scearpo',
    emoji: '⚔️',
    role: 'Financial Warfare',
    status: 'idle',
    currentTask: 'Monitoring markets',
    color: '#ef4444',
  },
  {
    id: 'flint',
    name: 'Flint',
    emoji: '🔥',
    role: 'Risk & Stress Testing',
    status: 'away',
    currentTask: 'Off duty',
    color: '#f97316',
  },
];

const statusColors = {
  active: '#22c55e',
  idle: '#eab308',
  away: '#71717a',
};

export default function OfficeView() {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-medium text-zinc-50 flex items-center gap-2">
          🏢 The Office
        </h2>
        <span className="text-[13px] text-zinc-500">
          {time.toLocaleTimeString()}
        </span>
      </div>

      {/* Office Floor */}
      <div className="relative bg-zinc-900/50 rounded-lg p-8 min-h-[280px] border border-zinc-800/50">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] rounded-lg"
          style={{
            backgroundImage: 'linear-gradient(rgba(250,250,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Agent Desks */}
        <div className="relative grid grid-cols-2 gap-6 max-w-md mx-auto">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className="relative flex flex-col items-center cursor-pointer transition-transform duration-150"
              style={{
                transform: hoveredAgent === agent.id ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
            >
              {/* Desk */}
              <div 
                className="w-20 h-14 rounded-md flex items-center justify-center relative transition-all duration-150"
                style={{
                  background: `linear-gradient(135deg, ${agent.color}15, ${agent.color}08)`,
                  border: `1px solid ${hoveredAgent === agent.id ? agent.color + '60' : agent.color + '30'}`,
                  boxShadow: hoveredAgent === agent.id 
                    ? `0 0 24px ${agent.color}20` 
                    : 'none',
                }}
              >
                {/* Avatar */}
                <div className={`text-2xl ${agent.status === 'active' ? 'float' : ''}`}>
                  {agent.emoji}
                </div>

                {/* Status indicator */}
                <div 
                  className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${
                    agent.status === 'active' ? 'pulse' : ''
                  }`}
                  style={{ backgroundColor: statusColors[agent.status] }}
                />
              </div>

              {/* Name plate */}
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-zinc-50">{agent.name}</div>
                <div className="text-[12px] text-zinc-500">{agent.role}</div>
              </div>

              {/* Tooltip */}
              {hoveredAgent === agent.id && (
                <div 
                  className="absolute -top-14 left-1/2 -translate-x-1/2 bg-zinc-800 px-3 py-2 rounded-md text-[13px] whitespace-nowrap z-20 border border-zinc-700"
                >
                  <div className="text-zinc-50">{agent.currentTask}</div>
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-zinc-800 border-r border-b border-zinc-700"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* War Room indicator */}
        <div className="absolute bottom-3 right-3 text-[12px] text-zinc-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse" />
          War Room Active
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-[12px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors.active }} />
          Active
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors.idle }} />
          Idle
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors.away }} />
          Away
        </div>
      </div>
    </div>
  );
}
