'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const percentage = Math.round((current / total) * 100);
  const isComplete = current === total;

  // Animate progress bar on mount and when current changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-b from-stone-950 via-stone-950/95 to-stone-950/80 backdrop-blur-sm border-b border-stone-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          {/* Text indicator */}
          <div className="flex items-center gap-2.5">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500',
              isComplete
                ? 'bg-emerald-500/20 border-2 border-emerald-500/50'
                : 'bg-stone-800/50 border-2 border-stone-700/50'
            )}>
              <Users className={cn(
                'w-4 h-4 transition-colors duration-500',
                isComplete ? 'text-emerald-400' : 'text-stone-400'
              )} />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-300">
                <span className={cn(
                  'font-bold transition-colors duration-500',
                  isComplete ? 'text-emerald-400' : 'text-stone-100'
                )}>
                  {current}
                </span>
                <span className="text-stone-500 mx-1">/</span>
                <span className="text-stone-400">{total}</span>
                <span className="text-stone-500 ml-2">
                  {current === 1 ? 'jugador ha' : 'jugadores han'} visto su palabra
                </span>
              </p>
            </div>
          </div>

          {/* Percentage badge */}
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-bold transition-all duration-500',
            isComplete
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'
          )}>
            {percentage}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-stone-900/50 rounded-full overflow-hidden border border-stone-800/50">
          {/* Background shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/10 to-transparent animate-pulse-subtle" />

          {/* Progress fill */}
          <div
            className={cn(
              'absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out',
              isComplete
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500'
                : 'bg-gradient-to-r from-stone-600 via-stone-500 to-stone-600'
            )}
            style={{
              width: `${progress}%`,
              boxShadow: isComplete
                ? '0 0 10px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)'
                : '0 0 8px rgba(120, 113, 108, 0.3)',
            }}
          >
            {/* Animated shine effect on progress bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>

          {/* Completion celebration effect */}
          {isComplete && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 animate-pulse-subtle" />
          )}
        </div>
      </div>
    </div>
  );
}
