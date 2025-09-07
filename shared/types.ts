// Shared types for ChaosDeal game

export interface Card {
  id: string;
  type: 'money' | 'property' | 'action';
  name: string;
  value: number;
  color: string | null;
  description: string;
  quantity?: number;
}

export interface MoneyCard extends Card {
  type: 'money';
}

export interface PropertyCard extends Card {
  type: 'property';
  colorSet: string;
  setSize: number;
  rentValues: number[];
  isWild: boolean;
  wildColors: string[];
}

export interface ActionCard extends Card {
  type: 'action';
  actionType: string;
  canBeUsedAsMoney: boolean;
  targetColors?: string[];
  chaosInteractions: string[];
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  bank: Card[];
  properties: PropertyCard[][];
  isHost: boolean;
  isReady: boolean;
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  discardPile: Card[];
  phase: 'waiting' | 'playing' | 'finished';
  winner: string | null;
  activeChaosEvent: ChaosEvent | null;
  turnCount: number;
}

export interface ChaosEvent {
  id: string;
  name: string;
  description: string;
  duration: 'turn' | 'round' | 'permanent';
  effects: {
    rentMultiplier?: number;
    cardDrawBonus?: number;
    playLimitChange?: number;
    specialRules?: string[];
  };
}

export interface GameAction {
  type: 'draw' | 'play' | 'discard' | 'end_turn';
  playerId: string;
  cardId?: string;
  targetPlayerId?: string;
  targetCardId?: string;
  data?: any;
}

export interface SocketEvents {
  // Client to Server
  'join-game': (roomCode: string) => void;
  'leave-game': (roomCode: string) => void;
  'create-game': (playerName: string) => void;
  'player-ready': (roomCode: string) => void;
  'game-action': (action: GameAction) => void;

  // Server to Client
  'player-joined': (data: { playerId: string; message: string }) => void;
  'player-left': (data: { playerId: string; message: string }) => void;
  'game-created': (data: { roomCode: string; gameState: GameState }) => void;
  'game-updated': (gameState: GameState) => void;
  'error': (message: string) => void;
}

// Color mapping for UI
export const COLOR_STYLES = {
  brown: 'bg-amber-800 text-white',
  light_blue: 'bg-sky-300 text-black',
  pink: 'bg-pink-300 text-black',
  orange: 'bg-orange-400 text-black',
  red: 'bg-red-500 text-white',
  yellow: 'bg-yellow-400 text-black',
  green: 'bg-green-500 text-white',
  dark_blue: 'bg-blue-800 text-white',
  railroad: 'bg-gray-700 text-white',
  utility: 'bg-yellow-600 text-white',
  wild: 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
} as const;
