import { Category, GameConfig, Player } from './types';
import { GAME_WORDS } from './game-data';

const STORAGE_KEY = 'impostor_game_state';
const SETUP_STORAGE_KEY = 'impostor_last_setup';

interface LastSetup {
  playerNames: string[];
  categories: Category[];
  includePlayersAsWords: boolean;
}

/**
 * Select random word from selected categories
 */
export function selectRandomWord(
  categories: Category[],
  playerNames: string[] = [],
  includePlayersAsWords: boolean = false
): { word: string; isPlayer: boolean } {
  const allWords: string[] = [];

  categories.forEach((category) => {
    allWords.push(...GAME_WORDS[category]);
  });

  // Add player names if option is enabled
  if (includePlayersAsWords && playerNames.length > 0) {
    allWords.push(...playerNames);
  }

  const randomIndex = Math.floor(Math.random() * allWords.length);
  const selectedWord = allWords[randomIndex];
  const isPlayer = playerNames.includes(selectedWord);

  return { word: selectedWord, isPlayer };
}

/**
 * Randomly assign impostor role to one player
 */
export function assignImpostor(players: Player[]): Player[] {
  const impostorIndex = Math.floor(Math.random() * players.length);

  return players.map((player, index) => ({
    ...player,
    isImpostor: index === impostorIndex,
  }));
}

/**
 * Get word for specific player (real word or "IMPOSTOR")
 */
export function getWordForPlayer(player: Player, word: string): string {
  return player.isImpostor ? 'IMPOSTOR' : word;
}

/**
 * Move to next player
 */
export function nextPlayer(currentIndex: number, totalPlayers: number): number {
  return (currentIndex + 1) % totalPlayers;
}

/**
 * Check if game round is complete
 */
export function allPlayersRevealed(players: Player[]): boolean {
  return players.every((player) => player.hasSeenWord);
}

/**
 * Create game configuration
 */
export function createGameConfig(
  playerNames: string[],
  categories: Category[],
  includePlayersAsWords: boolean = false
): GameConfig {
  const { word, isPlayer } = selectRandomWord(categories, playerNames, includePlayersAsWords);

  const players: Player[] = playerNames.map((name, index) => ({
    id: `player-${index}-${Date.now()}`,
    name,
    isImpostor: false,
    hasSeenWord: false,
  }));

  const playersWithImpostor = assignImpostor(players);

  return {
    players: playersWithImpostor,
    categories,
    selectedWord: word,
    currentPlayerIndex: 0,
    includePlayersAsWords,
    isWordAPlayer: isPlayer,
  };
}

/**
 * Encode game config to base64 for URL
 */
export function encodeGameConfig(config: GameConfig): string {
  const json = JSON.stringify(config);
  return btoa(encodeURIComponent(json));
}

/**
 * Decode game config from base64
 */
export function decodeGameConfig(encoded: string): GameConfig | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as GameConfig;
  } catch {
    return null;
  }
}

/**
 * Save game state to sessionStorage
 */
export function saveGameState(config: GameConfig): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

/**
 * Load game state from sessionStorage
 */
export function loadGameState(): GameConfig | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as GameConfig;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

/**
 * Clear game state from sessionStorage
 */
export function clearGameState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
}

/**
 * Save last setup configuration (players and categories)
 */
export function saveLastSetup(
  playerNames: string[],
  categories: Category[],
  includePlayersAsWords: boolean = false
): void {
  try {
    const setup: LastSetup = { playerNames, categories, includePlayersAsWords };
    sessionStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(setup));
  } catch (error) {
    console.error('Failed to save last setup:', error);
  }
}

/**
 * Load last setup configuration
 */
export function loadLastSetup(): LastSetup | null {
  try {
    const stored = sessionStorage.getItem(SETUP_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as LastSetup;
  } catch (error) {
    console.error('Failed to load last setup:', error);
    return null;
  }
}
