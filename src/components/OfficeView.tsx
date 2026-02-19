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
    color: '#a855f7', // purple
  },
  {
    id: 'levelsio',
    name: 'Levelsio',
    emoji: '🚀',
    role: 'Dev Lead',
    status: 'idle',
    currentTask: 'Awaiting orders',
    color: '#22c55e', // green
  },
  {
    id: 'scearpo',
    name: 'Scearpo',
    emoji: '⚔️',
    role: 'Financial Warfare',
    status: 'idle',
    currentTask: 'Monitoring markets',
    color: '#ef4444', // red
  },
  {
    id: 'flint',
    name: 'Flint',
    emoji: '🔥',
    role: 'Risk & Stress Testing',
    status: 'away',
    currentTask: 'Off duty',
    color: '#f97316', // orange
  },
];

const statusColors = {
  active: '#22c55e',
  idle: '#eab308',
  away: '#6b7280',
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
        <h2 className="text-xl font-bold flex items-center gap-2">
          🏢 The Office
        </h2>
        <span className="text-sm text-gray-400">
          {time.toLocaleTimeString()}
        </span>
      </div>

      {/* Office Floor */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-8 min-h-[300px]">
        {/* Grid floor pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Agent Desks */}
        <div className="relative grid grid-cols-2 gap-8 max-w-lg mx-auto">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                hoveredAgent === agent.id ? 'scale-110 z-10' : ''
              }`}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              style={{
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {/* Desk */}
              <div 
                className="w-24 h-16 rounded-lg flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${agent.color}20, ${agent.color}10)`,
                  border: `2px solid ${agent.color}40`,
                  boxShadow: hoveredAgent === agent.id 
                    ? `0 0 30px ${agent.color}40` 
                    : 'none',
                }}
              >
                {/* Avatar */}
                <div 
                  className={`text-3xl ${agent.status === 'active' ? 'float' : ''}`}
                >
                  {agent.emoji}
                </div>

                {/* Status indicator */}
                <div 
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                    agent.status === 'active' ? 'pulse' : ''
                  }`}
                  style={{ backgroundColor: statusColors[agent.status] }}
                />
              </div>

              {/* Name plate */}
              <div className="mt-2 text-center">
                <div className="font-semibold text-sm">{agent.name}</div>
                <div className="text-xs text-gray-500">{agent.role}</div>
              </div>

              {/* Tooltip */}
              {hoveredAgent === agent.id && (
                <div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-20"
                  style={{ border: `1px solid ${agent.color}40` }}
                >
                  <div className="font-medium">{agent.currentTask}</div>
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"
                    style={{ borderRight: `1px solid ${agent.color}40`, borderBottom: `1px solid ${agent.color}40` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* War Room indicator */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse" />
          War Room Active
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors.active }} />
          Active
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors.idle }} />
          Idle
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors.away }} />
          Away
        </div>
      </div>
    </div>
  );
}
