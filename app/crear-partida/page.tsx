"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PlayerList } from "@/components/game/player-list";
import { CategorySelector } from "@/components/game/category-selector";
import { Category } from "@/lib/types";
import {
  createGameConfig,
  saveGameState,
  encodeGameConfig,
  saveLastSetup,
  loadLastSetup,
} from "@/lib/game-logic";
import { ArrowLeft, Play, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ALL_CATEGORIES: Category[] = [
  "animales",
  "comida",
  "paises",
  "profesiones",
  "deportes",
  "objetos",
  "futbol",
  "celebridades",
  "marcas",
];

export default function CrearPartida() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [includePlayersAsWords, setIncludePlayersAsWords] = useState(false);
  const [showError, setShowError] = useState(false);

  const minPlayers = 3;
  const minCategories = 1;
  const isPlayersValid = players.length >= minPlayers;
  const isCategoriesValid = selectedCategories.length >= minCategories;
  const canStartGame = isPlayersValid && isCategoriesValid;

  // Load last setup configuration on mount
  useEffect(() => {
    const lastSetup = loadLastSetup();
    if (lastSetup) {
      setPlayers(lastSetup.playerNames);
      setSelectedCategories(lastSetup.categories);
      setIncludePlayersAsWords(lastSetup.includePlayersAsWords || false);
    }
  }, []);

  const handleAddPlayer = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = playerName.trim();

    if (trimmedName && !players.includes(trimmedName)) {
      setPlayers([...players, trimmedName]);
      setPlayerName("");
      setShowError(false);
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleToggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setShowError(false);
  };

  const handleStartGame = () => {
    if (!canStartGame) {
      setShowError(true);
      return;
    }

    // Save last setup configuration for future games
    saveLastSetup(players, selectedCategories, includePlayersAsWords);

    // Create game configuration
    const gameConfig = createGameConfig(
      players,
      selectedCategories,
      includePlayersAsWords,
    );

    // Save to sessionStorage
    saveGameState(gameConfig);

    // Encode and navigate
    const encoded = encodeGameConfig(gameConfig);
    router.push(`/juego?config=${encoded}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-stone-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-800/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_50%,transparent_52%)] bg-[length:30px_30px]" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-stone-800/50 bg-stone-950/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-stone-800/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-stone-400" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-black text-stone-100 tracking-tight">
                  Configurar Partida
                </h1>
                <p className="text-sm text-stone-500 mt-1">
                  Agrega jugadores y selecciona temáticas
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main form content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
            {/* Section 1: Add Players */}
            <section
              className="space-y-6 animate-fade-in-up"
              style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
            >
              <div>
                <h2 className="text-2xl font-bold text-stone-200 mb-2">
                  Agregar Jugadores
                </h2>
                <p className="text-stone-500 text-sm">
                  Mínimo {minPlayers} jugadores para comenzar
                </p>
              </div>

              {/* Add player form */}
              <form onSubmit={handleAddPlayer} className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Nombre del jugador"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 h-12 text-base bg-stone-900/50 border-stone-800 focus:border-stone-600 text-stone-100 placeholder:text-stone-600"
                  maxLength={30}
                />
                <Button
                  type="submit"
                  disabled={!playerName.trim()}
                  className="h-12 px-6 bg-stone-400 hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Agregar
                </Button>
              </form>

              {/* Player list */}
              <PlayerList
                players={players}
                onRemove={handleRemovePlayer}
                minPlayers={minPlayers}
              />
            </section>

            <Separator className="bg-stone-800/50" />

            {/* Section 2: Select Categories */}
            <section
              className="space-y-6 animate-fade-in-up"
              style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
            >
              <div>
                <h2 className="text-2xl font-bold text-stone-200 mb-2">
                  Seleccionar Temáticas
                </h2>
                <p className="text-stone-500 text-sm">
                  Elige al menos {minCategories} temática para las palabras
                  secretas
                </p>
              </div>

              {/* Category selector */}
              <CategorySelector
                categories={ALL_CATEGORIES}
                selectedCategories={selectedCategories}
                onToggle={handleToggleCategory}
                minCategories={minCategories}
              />
            </section>

            <Separator className="bg-stone-800/50" />

            {/* Section 3: Include Players Option */}
            <section
              className="space-y-4 animate-fade-in-up"
              style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
            >
              <div className="flex items-center justify-between p-6 rounded-2xl bg-stone-900/50 border border-stone-800/50 hover:border-stone-700/70 transition-all duration-300">
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-bold text-stone-200">
                    Incluir jugadores
                  </h3>
                  <p className="text-sm text-stone-500">
                    Los nombres de los jugadores pueden aparecer como palabras
                    secretas
                  </p>
                </div>
                <Switch
                  checked={includePlayersAsWords}
                  onCheckedChange={setIncludePlayersAsWords}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>

              {includePlayersAsWords && players.length > 0 && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-sm text-blue-400">
                    <span className="font-semibold">Nota:</span> Si un jugador es
                    seleccionado como palabra, se mostrará como "{players[0]}{" "}
                    (jugador)"
                  </p>
                </div>
              )}
            </section>

            {/* Validation error */}
            {showError && !canStartGame && (
              <Alert className="bg-red-500/10 border-red-500/30 animate-fade-in-up">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <AlertDescription className="text-red-400 text-sm">
                  {!isPlayersValid && `Agrega al menos ${minPlayers} jugadores`}
                  {!isPlayersValid && !isCategoriesValid && " y "}
                  {!isCategoriesValid &&
                    `selecciona al menos ${minCategories} temática`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Fixed footer with start button */}
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-stone-800/50 bg-stone-950/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Validation status */}
              <div className="flex-1 min-w-0">
                {canStartGame ? (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
                    <span>Listo para comenzar</span>
                  </div>
                ) : (
                  <div className="text-stone-500 text-sm">
                    <span className="block sm:hidden">
                      {!isPlayersValid && "Agrega jugadores"}
                      {!isPlayersValid && !isCategoriesValid && " • "}
                      {!isCategoriesValid && "Elige temáticas"}
                    </span>
                    <span className="hidden sm:block">
                      {!isPlayersValid &&
                        `Falta${players.length === minPlayers - 1 ? "" : "n"} ${minPlayers - players.length} jugador${minPlayers - players.length === 1 ? "" : "es"}`}
                      {!isPlayersValid && !isCategoriesValid && " • "}
                      {!isCategoriesValid && "Selecciona una temática"}
                    </span>
                  </div>
                )}
              </div>

              {/* Start game button */}
              <Button
                onClick={handleStartGame}
                disabled={!canStartGame}
                size="lg"
                className="group relative px-8 py-6 text-lg font-bold bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 hover:from-stone-600 hover:via-stone-500 hover:to-stone-600 disabled:from-stone-800 disabled:via-stone-800 disabled:to-stone-800 border-2 border-stone-500 hover:border-stone-400 disabled:border-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Comenzar Juego
                  <Play className="w-5 h-5" />
                </span>
                {canStartGame && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-600/0 via-stone-400/20 to-stone-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
