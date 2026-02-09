"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/game/progress-indicator";
import { WordRevealCard } from "@/components/game/word-reveal-card";
import { GameConfig } from "@/lib/types";
import {
  decodeGameConfig,
  loadGameState,
  saveGameState,
  getWordForPlayer,
  nextPlayer,
  allPlayersRevealed,
  clearGameState,
} from "@/lib/game-logic";
import { ArrowRight, Home, RefreshCw, Crown, Skull } from "lucide-react";

function JuegoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [firstPlayerToDiscuss, setFirstPlayerToDiscuss] = useState<string | null>(
    null,
  );

  // Load game config on mount
  useEffect(() => {
    const configParam = searchParams.get("config");
    let config: GameConfig | null = null;

    // Try to load from URL param first
    if (configParam) {
      config = decodeGameConfig(configParam);
    }

    // Fallback to sessionStorage
    if (!config) {
      config = loadGameState();
    }

    // Redirect if no valid config
    if (!config) {
      router.push("/crear-partida");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGameConfig(config);
    setIsLoading(false);
  }, [searchParams, router]);

  // Select random player to start discussion when game is complete
  useEffect(() => {
    if (gameConfig && !firstPlayerToDiscuss) {
      const isComplete = allPlayersRevealed(gameConfig.players) && !isRevealed;
      if (isComplete) {
        const randomIndex = Math.floor(Math.random() * gameConfig.players.length);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFirstPlayerToDiscuss(gameConfig.players[randomIndex].name);
      }
    }
  }, [gameConfig, firstPlayerToDiscuss, isRevealed]);

  if (isLoading || !gameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-black flex items-center justify-center">
        <div className="text-stone-400 text-lg">Cargando...</div>
      </div>
    );
  }

  const currentPlayer = gameConfig.players[gameConfig.currentPlayerIndex];
  const currentWord = getWordForPlayer(currentPlayer, gameConfig.selectedWord);
  const revealedCount = gameConfig.players.filter((p) => p.hasSeenWord).length;

  // Check if this is the last player viewing their word
  // If revealed count equals total players and card is revealed, this is the last player
  const willBeLastPlayer =
    isRevealed && revealedCount === gameConfig.players.length;

  const isGameComplete = allPlayersRevealed(gameConfig.players) && !isRevealed;

  const handleReveal = () => {
    setIsRevealed(true);

    // Mark current player as having seen their word
    const updatedConfig = {
      ...gameConfig,
      players: gameConfig.players.map((p, i) =>
        i === gameConfig.currentPlayerIndex ? { ...p, hasSeenWord: true } : p,
      ),
    };

    setGameConfig(updatedConfig);
    saveGameState(updatedConfig);
  };

  const handleNextPlayer = () => {
    // If this was the last player, just hide the card and show completion
    if (willBeLastPlayer) {
      setIsRevealed(false);
      return;
    }

    // Set transitioning state to disable button
    setIsTransitioning(true);

    // First, hide the card by flipping it back
    setIsRevealed(false);

    // Wait for the flip animation to complete before changing player
    setTimeout(() => {
      const nextIndex = nextPlayer(
        gameConfig.currentPlayerIndex,
        gameConfig.players.length,
      );

      const updatedConfig = {
        ...gameConfig,
        currentPlayerIndex: nextIndex,
      };

      setGameConfig(updatedConfig);
      saveGameState(updatedConfig);
      setIsTransitioning(false);
    }, 750); // Wait for flip animation (700ms) + small buffer
  };

  const handleNewGame = () => {
    clearGameState();
    router.push("/crear-partida");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-stone-700/5 rounded-full blur-3xl animate-pulse-subtle" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-stone-800/5 rounded-full blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
      </div>

      {/* Exit button - top right */}
      <Link
        href="/"
        className="absolute top-24 right-4 sm:top-6 sm:right-6 z-50 group"
      >
        <button
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-900/80 backdrop-blur-sm border-2 border-stone-700/50 hover:border-stone-600 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-stone-800/80 shadow-lg"
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress indicator */}
        {!isGameComplete && (
          <ProgressIndicator
            current={revealedCount}
            total={gameConfig.players.length}
          />
        )}

        {/* Game content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
          {!isGameComplete ? (
            <div className="w-full max-w-3xl space-y-8">
              {/* Word reveal card */}
              <WordRevealCard
                word={currentWord}
                isRevealed={isRevealed}
                playerName={currentPlayer.name}
                onReveal={handleReveal}
                isWordAPlayer={gameConfig.isWordAPlayer}
              />

              {/* Next player button */}
              {isRevealed && !isTransitioning && (
                <div className="flex justify-center animate-fade-in-up">
                  <Button
                    onClick={handleNextPlayer}
                    disabled={isTransitioning}
                    size="lg"
                    className="group relative px-10 py-6 text-lg font-bold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 hover:from-stone-600 hover:via-stone-500 hover:to-stone-600 disabled:from-stone-800 disabled:via-stone-800 disabled:to-stone-800 border-2 border-stone-500 hover:border-stone-400 disabled:border-stone-800 disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {willBeLastPlayer
                        ? "Comenzar Discusión"
                        : "Siguiente Jugador"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-600/0 via-stone-400/20 to-stone-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Game complete screen
            <div className="w-full max-w-2xl space-y-8 text-center">
              {/* Completion icon */}
              <div className="flex justify-center animate-fade-in-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse-subtle" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30 flex items-center justify-center">
                    <Crown className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Completion message */}
              <div
                className="space-y-4 animate-fade-in-up"
                style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
              >
                <h1 className="text-4xl sm:text-5xl font-black text-stone-100">
                  ¡Todos han visto su palabra!
                </h1>
                <p className="text-xl text-stone-400 max-w-md mx-auto">
                  Es hora de discutir y descubrir quién es el{" "}
                  <span className="text-red-400 font-bold">impostor</span>
                </p>
                {firstPlayerToDiscuss && (
                  <div className="pt-4">
                    <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                      <p className="text-base text-blue-300">
                        <span className="font-bold text-blue-200">
                          {firstPlayerToDiscuss}
                        </span>{" "}
                        comienza la discusión
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Player list summary */}
              <div
                className="bg-stone-900/50 border border-stone-800/50 rounded-2xl p-6 sm:p-8 animate-fade-in-up"
                style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
              >
                <h3 className="text-lg font-bold text-stone-300 mb-4 flex items-center justify-center gap-2">
                  <Skull className="w-5 h-5 text-stone-500" />
                  Jugadores en esta partida
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gameConfig.players.map((player, index) => (
                    <div
                      key={player.id}
                      className="px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700/50 text-stone-300 text-sm font-medium"
                    >
                      {index + 1}. {player.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up"
                style={{ animationDelay: "450ms", animationFillMode: "backwards" }}
              >
                <Button
                  onClick={handleNewGame}
                  size="lg"
                  className="group relative px-8 py-6 text-lg font-bold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 hover:from-stone-600 hover:via-stone-500 hover:to-stone-600 border-2 border-stone-500 hover:border-stone-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <RefreshCw className="w-5 h-5" />
                    Nueva Partida
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-600/0 via-stone-400/20 to-stone-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>

                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg font-semibold border-2 border-stone-700 hover:border-stone-600 bg-transparent hover:bg-stone-800/50 text-stone-300 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JuegoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-black flex items-center justify-center">
          <div className="text-stone-400 text-lg">Cargando...</div>
        </div>
      }
    >
      <JuegoContent />
    </Suspense>
  );
}
