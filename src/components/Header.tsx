'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎛️</span>
            <div>
              <h1 className="text-xl font-bold">Mission Control</h1>
              <p className="text-xs text-gray-500">OpenClaw HQ</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Connection status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 pulse" />
              <span className="text-gray-400">Connected</span>
            </div>

            {/* Time */}
            <div className="text-right">
              <div className="text-sm font-medium">
                {time.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-xs text-gray-500">
                {time.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              W
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
