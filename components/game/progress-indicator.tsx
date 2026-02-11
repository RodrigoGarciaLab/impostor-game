"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import Link from "next/link";

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
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                isComplete
                  ? "bg-emerald-500/20 border-2 border-emerald-500/50"
                  : "bg-stone-800/50 border-2 border-stone-700/50",
              )}
            >
              <Users
                className={cn(
                  "w-4 h-4 transition-colors duration-500",
                  isComplete ? "text-emerald-400" : "text-stone-400",
                )}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-300">
                <span
                  className={cn(
                    "font-bold transition-colors duration-500",
                    isComplete ? "text-emerald-400" : "text-stone-100",
                  )}
                >
                  {current}
                </span>
                <span className="text-stone-500 mx-1">/</span>
                <span className="text-stone-400">{total}</span>
                <span className="text-stone-500 ml-2">
                  {current === 1 ? "jugador ha" : "jugadores han"} visto su palabra
                </span>
              </p>
            </div>
          </div>

          {/* Exit button - top right */}
          <Link
            href="/"
            className="absolute top-2 right-4 sm:top-6 sm:right-6 z-50 group"
          >
            <button
              className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-stone-900/80 backdrop-blur-sm border-2 border-stone-700/50 hover:border-stone-600 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-stone-800/80 shadow-lg"
              aria-label="Salir al inicio"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-stone-400 group-hover:text-stone-200 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-stone-900/50 rounded-full overflow-hidden border border-stone-800/50">
          {/* Background shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-700/10 to-transparent animate-pulse-subtle" />

          {/* Progress fill */}
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out",
              isComplete
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"
                : "bg-gradient-to-r from-stone-600 via-stone-500 to-stone-600",
            )}
            style={{
              width: `${progress}%`,
              boxShadow: isComplete
                ? "0 0 10px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)"
                : "0 0 8px rgba(120, 113, 108, 0.3)",
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
