export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  hasSeenWord: boolean;
}

export interface GameConfig {
  players: Player[];
  categories: Category[];
  selectedWord: string;
  currentPlayerIndex: number;
  includePlayersAsWords: boolean;
  isWordAPlayer: boolean;
}

export type Category =
  | 'animales'
  | 'comida'
  | 'paises'
  | 'profesiones'
  | 'deportes'
  | 'objetos'
  | 'futbol'
  | 'celebridades'
  | 'marcas';

export type GamePhase = 'waiting' | 'revealed' | 'complete';
