'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface PlayerListProps {
  players: string[];
  onRemove: (index: number) => void;
  minPlayers?: number;
}

export function PlayerList({ players, onRemove, minPlayers = 3 }: PlayerListProps) {
  const isValid = players.length >= minPlayers;
  const isEmpty = players.length === 0;

  return (
    <div className="space-y-4">
      {/* Header with player count badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-100">Jugadores</h3>
        <Badge
          variant="secondary"
          className={cn(
            'px-3 py-1 text-sm font-medium transition-colors duration-300',
            isValid
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          )}
        >
          {players.length} {players.length === 1 ? 'jugador' : 'jugadores'}
        </Badge>
      </div>

      {/* Validation warning */}
      {!isValid && players.length > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30 animate-fade-in-up">
          <AlertDescription className="text-amber-400 text-sm">
            Se necesitan al menos {minPlayers} jugadores para comenzar
          </AlertDescription>
        </Alert>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-12 px-6 rounded-xl border-2 border-dashed border-stone-800 bg-stone-950/30 animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-stone-900/50 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full border-2 border-stone-700 border-dashed" />
          </div>
          <p className="text-stone-400 text-center text-sm font-medium">
            Agrega jugadores para comenzar
          </p>
          <p className="text-stone-600 text-center text-xs mt-1">
            Mínimo {minPlayers} jugadores
          </p>
        </div>
      )}

      {/* Player list */}
      {!isEmpty && (
        <div className="space-y-2">
          {players.map((player, index) => (
            <div
              key={`${player}-${index}`}
              className="group relative flex items-center justify-between gap-4 px-5 py-4 rounded-xl bg-gradient-to-br from-stone-900/80 to-stone-950/80 border border-stone-800/50 hover:border-stone-700/70 transition-all duration-300 hover:shadow-lg hover:shadow-stone-950/50 hover:scale-[1.02] animate-fade-in-up"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'backwards',
              }}
            >
              {/* Player number indicator */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-800/50 border border-stone-700/50 flex items-center justify-center text-stone-400 text-sm font-semibold group-hover:border-stone-600 transition-colors">
                  {index + 1}
                </div>
                <span className="text-stone-100 font-medium truncate text-base">
                  {player}
                </span>
              </div>

              {/* Remove button */}
              <button
                onClick={() => onRemove(index)}
                className="flex-shrink-0 w-12 h-12 rounded-lg bg-stone-800/30 hover:bg-red-500/20 border border-stone-700/50 hover:border-red-500/50 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
                aria-label={`Eliminar ${player}`}
              >
                <X className="w-5 h-5 text-stone-400 group-hover/btn:text-red-400 transition-colors" />
              </button>

              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-stone-700/0 to-transparent group-hover:via-stone-700/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      )}

      {/* Player count summary */}
      {!isEmpty && (
        <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
          <span>
            {isValid
              ? '✓ Listo para comenzar'
              : `Faltan ${minPlayers - players.length} jugador${minPlayers - players.length === 1 ? '' : 'es'}`}
          </span>
          <span>{players.length} / ∞</span>
        </div>
      )}
    </div>
  );
}
