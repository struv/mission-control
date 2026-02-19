'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 card-glass border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎛️</span>
            <div>
              <h1 className="text-lg font-medium text-zinc-50">Mission Control</h1>
              <p className="text-[13px] text-zinc-500">OpenClaw HQ</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Connection status */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse" />
              <span className="text-[13px] text-zinc-400">Connected</span>
            </div>

            {/* Time */}
            <div className="text-right">
              <div className="text-sm font-medium text-zinc-50">
                {time.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-[13px] text-zinc-500">
                {time.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/80 to-violet-600/80 flex items-center justify-center text-sm font-medium text-zinc-50">
              W
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
