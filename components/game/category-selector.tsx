'use client';

import { Category } from '@/lib/types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/game-data';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: Category[];
  onToggle: (category: Category) => void;
  minCategories?: number;
}

// Category-specific color palettes with sophisticated gradients
const CATEGORY_COLORS: Record<Category, {
  gradient: string;
  glow: string;
  border: string;
  icon: string;
}> = {
  animales: {
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/50',
    icon: 'text-emerald-400',
  },
  comida: {
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    glow: 'shadow-orange-500/20',
    border: 'border-orange-500/50',
    icon: 'text-orange-400',
  },
  paises: {
    gradient: 'from-blue-500/20 via-indigo-500/20 to-violet-500/20',
    glow: 'shadow-blue-500/20',
    border: 'border-blue-500/50',
    icon: 'text-blue-400',
  },
  profesiones: {
    gradient: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
    glow: 'shadow-purple-500/20',
    border: 'border-purple-500/50',
    icon: 'text-purple-400',
  },
  deportes: {
    gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
    glow: 'shadow-red-500/20',
    border: 'border-red-500/50',
    icon: 'text-red-400',
  },
  objetos: {
    gradient: 'from-slate-500/20 via-zinc-500/20 to-stone-500/20',
    glow: 'shadow-slate-500/20',
    border: 'border-slate-500/50',
    icon: 'text-slate-400',
  },
  futbol: {
    gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
    glow: 'shadow-yellow-500/20',
    border: 'border-yellow-500/50',
    icon: 'text-yellow-400',
  },
  celebridades: {
    gradient: 'from-pink-500/20 via-fuchsia-500/20 to-rose-500/20',
    glow: 'shadow-pink-500/20',
    border: 'border-pink-500/50',
    icon: 'text-pink-400',
  },
  marcas: {
    gradient: 'from-cyan-500/20 via-sky-500/20 to-blue-500/20',
    glow: 'shadow-cyan-500/20',
    border: 'border-cyan-500/50',
    icon: 'text-cyan-400',
  },
};

export function CategorySelector({
  categories,
  selectedCategories,
  onToggle,
  minCategories = 1,
}: CategorySelectorProps) {
  const isValid = selectedCategories.length >= minCategories;

  return (
    <div className="space-y-4">
      {/* Header with selection count */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-100">Temáticas</h3>
        <Badge
          variant="secondary"
          className={cn(
            'px-3 py-1 text-sm font-medium transition-colors duration-300',
            isValid
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          )}
        >
          {selectedCategories.length} {selectedCategories.length === 1 ? 'seleccionada' : 'seleccionadas'}
        </Badge>
      </div>

      {/* Validation warning */}
      {!isValid && selectedCategories.length === 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30 animate-fade-in-up">
          <AlertDescription className="text-amber-400 text-sm">
            Selecciona al menos {minCategories} temática para comenzar
          </AlertDescription>
        </Alert>
      )}

      {/* Category grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category, index) => {
          const isSelected = selectedCategories.includes(category);
          const Icon = CATEGORY_ICONS[category];
          const colors = CATEGORY_COLORS[category];

          return (
            <button
              key={category}
              onClick={() => onToggle(category)}
              className={cn(
                'group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 animate-fade-in-up',
                'hover:scale-105 active:scale-95 min-h-[140px]',
                isSelected
                  ? cn(
                      'bg-gradient-to-br',
                      colors.gradient,
                      colors.border,
                      'shadow-lg',
                      colors.glow
                    )
                  : 'bg-stone-900/40 border-stone-800/50 hover:border-stone-700/70 hover:bg-stone-900/60'
              )}
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'backwards',
              }}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? 'Deseleccionar' : 'Seleccionar'} ${CATEGORY_LABELS[category]}`}
            >
              {/* Animated background gradient on selection */}
              {isSelected && (
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    colors.gradient
                  )}
                  style={{ filter: 'blur(8px)' }}
                />
              )}

              {/* Icon container */}
              <div
                className={cn(
                  'relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                  isSelected
                    ? cn('bg-stone-950/50 border-2', colors.border)
                    : 'bg-stone-800/50 border-2 border-stone-700/50 group-hover:border-stone-600'
                )}
              >
                <Icon
                  className={cn(
                    'w-8 h-8 transition-all duration-300',
                    isSelected
                      ? cn(colors.icon, 'scale-110')
                      : 'text-stone-400 group-hover:text-stone-300'
                  )}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'relative z-10 text-sm font-semibold transition-colors duration-300',
                  isSelected ? 'text-stone-100' : 'text-stone-400 group-hover:text-stone-300'
                )}
              >
                {CATEGORY_LABELS[category]}
              </span>

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center animate-fade-in-up">
                  <svg
                    className="w-4 h-4 text-stone-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/5 transition-all duration-500 pointer-events-none" />
            </button>
          );
        })}
      </div>

      {/* Selection summary */}
      {selectedCategories.length > 0 && (
        <div className="pt-2 text-xs text-stone-500 text-center">
          {isValid
            ? `✓ ${selectedCategories.length} temática${selectedCategories.length === 1 ? '' : 's'} seleccionada${selectedCategories.length === 1 ? '' : 's'}`
            : `Selecciona al menos ${minCategories} temática`}
        </div>
      )}
    </div>
  );
}
