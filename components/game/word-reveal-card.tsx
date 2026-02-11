'use client';

import { Button } from '@/components/ui/button';
import { cn, triggerHaptic } from '@/lib/utils';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface WordRevealCardProps {
  word: string;
  isRevealed: boolean;
  playerName: string;
  onReveal: () => void;
  isWordAPlayer?: boolean;
}

export function WordRevealCard({
  word,
  isRevealed,
  playerName,
  onReveal,
  isWordAPlayer = false,
}: WordRevealCardProps) {
  const isImpostor = word === 'IMPOSTOR';
  const displayWord = isWordAPlayer && !isImpostor ? `${word} (jugador)` : word;

  const handleReveal = () => {
    triggerHaptic('heavy');
    onReveal();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Player turn indicator */}
      <div className="mb-4 sm:mb-6 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold text-stone-100 mb-2">
          Turno de{' '}
          <span className="bg-gradient-to-r from-stone-300 via-stone-100 to-stone-300 bg-clip-text text-transparent">
            {playerName}
          </span>
        </h2>
      </div>

      {/* Card Container - Using 2D flip (scaleX) for mobile compatibility */}
      <div className="relative w-full h-[450px]">
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transform: isRevealed ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        >
          {/* Front Face - Hidden State */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300',
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
          >
            <div className="w-full h-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-black border-2 border-stone-800/50 shadow-2xl">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_50%,transparent_52%)] bg-[length:20px_20px]" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                {/* Warning icon */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse-subtle" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 flex items-center justify-center">
                    <EyeOff className="w-10 h-10 text-amber-400" />
                  </div>
                </div>

                {/* Privacy warning */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-2 text-amber-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Privacidad
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-100">
                    Cubre la pantalla
                  </h3>
                  <p className="text-stone-400 text-base max-w-md mx-auto leading-relaxed">
                    Asegúrate de que nadie más pueda ver tu palabra secreta antes de revelarla
                  </p>
                </div>

                {/* Reveal button */}
                <Button
                  onClick={handleReveal}
                  size="lg"
                  className="relative group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-600 hover:to-stone-700 border-2 border-stone-600 hover:border-stone-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Revelar Palabra
                </Button>
              </div>
            </div>
          </div>

          {/* Back Face - Revealed State */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300 delay-300',
              isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            style={{
              transform: 'scaleX(-1)', // Counter-flip to show content correctly
            }}
          >
            <div
              className={cn(
                'w-full h-full relative overflow-hidden rounded-3xl border-2 shadow-2xl',
                isImpostor
                  ? 'bg-gradient-to-br from-red-950/90 via-rose-950/90 to-black border-red-500/50 shadow-red-500/20'
                  : 'bg-gradient-to-br from-stone-900 via-stone-950 to-black border-stone-700/50'
              )}
            >
              {/* Dramatic background for IMPOSTOR */}
              {isImpostor && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.2),transparent_70%)] animate-pulse-subtle" />
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(239,68,68,0.1)_50%,transparent_52%)] bg-[length:30px_30px] animate-pulse-subtle" />
                  </div>
                </>
              )}

              {/* Elegant background for normal words */}
              {!isImpostor && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
                </div>
              )}

              {/* Word display */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
                {/* Label */}
                <div className="mb-6">
                  <span
                    className={cn(
                      'text-sm font-bold uppercase tracking-widest',
                      isImpostor ? 'text-red-400' : 'text-stone-500'
                    )}
                  >
                    {isImpostor ? 'Tu Rol' : 'Tu Palabra'}
                  </span>
                </div>

                {/* The Word */}
                <div className="relative">
                  {isImpostor && (
                    <>
                      {/* Glowing effect for IMPOSTOR */}
                      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-red-500 via-rose-500 to-red-500 opacity-50 animate-pulse-subtle" />
                      <div className="absolute -inset-4 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 blur-xl" />
                    </>
                  )}

                  <h1
                    className={cn(
                      'relative font-black tracking-tight leading-none text-center',
                      isImpostor
                        ? 'text-7xl sm:text-8xl lg:text-9xl bg-gradient-to-br from-red-400 via-rose-300 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                        : isWordAPlayer
                        ? 'text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 bg-clip-text text-transparent'
                        : 'text-6xl sm:text-7xl lg:text-8xl bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 bg-clip-text text-transparent'
                    )}
                    style={{
                      textShadow: isImpostor
                        ? '0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(239, 68, 68, 0.2)'
                        : 'none',
                    }}
                  >
                    {displayWord}
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="mt-8">
                  <p
                    className={cn(
                      'text-base font-medium',
                      isImpostor
                        ? 'text-red-300/80'
                        : 'text-stone-400'
                    )}
                  >
                    {isImpostor
                      ? 'Descubre quién conoce la palabra real'
                      : 'Memoriza esta palabra'}
                  </p>
                </div>

                {/* Decorative elements */}
                {!isImpostor && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-stone-700"
                        style={{
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper text */}
      {!isRevealed && (
        <p className="mt-6 text-center text-sm text-stone-500 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Toca el botón cuando estés listo
        </p>
      )}
    </div>
  );
}
