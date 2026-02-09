import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, Users, Vote, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-stone-700/10 rounded-full blur-3xl animate-pulse-subtle" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_48%,rgba(255,255,255,0.1)_50%,transparent_52%)] bg-[length:40px_40px]" />
        </div>

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-stone-600 rounded-full animate-pulse-subtle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-stone-700 rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[20%] w-1 h-1 bg-stone-600 rounded-full animate-pulse-subtle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-[25%] w-1.5 h-1.5 bg-stone-700 rounded-full animate-pulse-subtle" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        {/* Hero section */}
        <div className="max-w-5xl mx-auto text-center space-y-8 mb-16">
          {/* Sparkle icon */}
          <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-stone-600/20 blur-2xl rounded-full" />
              <Sparkles className="relative w-12 h-12 text-stone-400" />
            </div>
          </div>

          {/* Main title with staggered animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="block animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
              <span className="bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 bg-clip-text text-transparent">
                Juego del
              </span>
            </span>
            <span className="block mt-2 animate-fade-in-up" style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}>
              <span className="bg-gradient-to-br from-red-400 via-rose-300 to-orange-400 bg-clip-text text-transparent">
                Impostor
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-stone-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
            Un juego de engaño y deducción donde todos conocen la palabra secreta...{' '}
            <span className="text-red-400 font-semibold">excepto uno</span>
          </p>

          {/* CTA Button */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '550ms', animationFillMode: 'backwards' }}>
            <Link href="/crear-partida">
              <Button
                size="lg"
                className="group relative px-10 py-7 text-xl font-bold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 hover:from-stone-600 hover:via-stone-500 hover:to-stone-600 border-2 border-stone-500 hover:border-stone-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl hover:shadow-stone-500/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Crear Partida
                  <div className="w-2 h-2 rounded-full bg-stone-300 animate-pulse-subtle" />
                </span>
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-600/0 via-stone-400/20 to-stone-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </Link>
          </div>
        </div>

        {/* How to play section */}
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-200 text-center mb-10 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
            ¿Cómo jugar?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900/80 to-stone-950/80 border border-stone-800/50 hover:border-stone-700/70 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stone-950/50 animate-fade-in-up"
              style={{ animationDelay: '850ms', animationFillMode: 'backwards' }}
            >
              {/* Decorative number */}
              <div className="absolute top-4 right-4 text-6xl font-black text-stone-800/30 group-hover:text-stone-700/40 transition-colors">
                01
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-7 h-7 text-emerald-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-stone-100 mb-3">
                Palabra Secreta
              </h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Todos los jugadores reciben la misma palabra secreta, excepto el impostor quien ve{' '}
                <span className="text-red-400 font-semibold">"IMPOSTOR"</span>
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Step 2 */}
            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900/80 to-stone-950/80 border border-stone-800/50 hover:border-stone-700/70 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stone-950/50 animate-fade-in-up"
              style={{ animationDelay: '1000ms', animationFillMode: 'backwards' }}
            >
              {/* Decorative number */}
              <div className="absolute top-4 right-4 text-6xl font-black text-stone-800/30 group-hover:text-stone-700/40 transition-colors">
                02
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-2 border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-blue-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-stone-100 mb-3">
                Discutir y Deducir
              </h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Conversen sobre la palabra sin revelarla directamente. Descubran quién no conoce la palabra real.
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Step 3 */}
            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900/80 to-stone-950/80 border border-stone-800/50 hover:border-stone-700/70 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-stone-950/50 animate-fade-in-up"
              style={{ animationDelay: '1150ms', animationFillMode: 'backwards' }}
            >
              {/* Decorative number */}
              <div className="absolute top-4 right-4 text-6xl font-black text-stone-800/30 group-hover:text-stone-700/40 transition-colors">
                03
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border-2 border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Vote className="w-7 h-7 text-purple-400" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-stone-100 mb-3">
                Votar y Eliminar
              </h3>
              <p className="text-stone-400 leading-relaxed text-sm">
                Después de la discusión, voten para eliminar al jugador que crean que es el impostor.
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '1300ms', animationFillMode: 'backwards' }}>
          <p className="text-sm text-stone-600">
            Mejor jugado con 3 o más jugadores en un solo dispositivo
          </p>
        </div>
      </div>
    </div>
  );
}
