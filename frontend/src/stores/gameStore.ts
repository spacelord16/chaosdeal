import { create } from 'zustand';
import type { Card } from '../types';
import { generateDeck, shuffleDeck, checkWinCondition } from '../utils/cardUtils';

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  bank: Card[];
  properties: Card[];
}

export interface GameState {
  // Game data
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  discardPile: Card[];
  
  // Game flow
  phase: 'setup' | 'draw' | 'play' | 'discard' | 'finished';
  winner: string | null;
  turnCount: number;
  cardsPlayedThisTurn: number;
  
  // UI state
  selectedCards: string[];
  actionInProgress: boolean;
  
  // Actions
  initializeGame: (playerNames: string[]) => void;
  drawCards: (playerId: string, count: number) => void;
  playCard: (playerId: string, cardId: string, targetPlayerId?: string) => void;
  discardCard: (playerId: string, cardId: string) => void;
  endTurn: () => void;
  selectCard: (cardId: string) => void;
  deselectCard: (cardId: string) => void;
  clearSelection: () => void;
  
  // Getters
  getCurrentPlayer: () => Player | null;
  getPlayer: (playerId: string) => Player | null;
  canPlayCard: (cardId: string) => boolean;
  canEndTurn: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  players: [],
  currentPlayerIndex: 0,
  deck: [],
  discardPile: [],
  phase: 'setup',
  winner: null,
  turnCount: 0,
  cardsPlayedThisTurn: 0,
  selectedCards: [],
  actionInProgress: false,

  // Initialize a new game
  initializeGame: (playerNames: string[]) => {
    const deck = shuffleDeck(generateDeck());
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player_${index}`,
      name,
      hand: [],
      bank: [],
      properties: []
    }));

    // Deal initial hands (5 cards each)
    let currentDeck = [...deck];
    players.forEach(player => {
      for (let i = 0; i < 5; i++) {
        if (currentDeck.length > 0) {
          player.hand.push(currentDeck.pop()!);
        }
      }
    });

    set({
      players,
      currentPlayerIndex: 0,
      deck: currentDeck,
      discardPile: [],
      phase: 'draw',
      winner: null,
      turnCount: 1,
      cardsPlayedThisTurn: 0,
      selectedCards: [],
      actionInProgress: false
    });
  },

  // Draw cards from deck
  drawCards: (playerId: string, count: number) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || state.deck.length === 0) return;

    const newDeck = [...state.deck];
    const newHand = [...player.hand];

    for (let i = 0; i < count && newDeck.length > 0; i++) {
      newHand.push(newDeck.pop()!);
    }

    // If deck is empty, shuffle discard pile
    if (newDeck.length === 0 && state.discardPile.length > 0) {
      const shuffledDiscard = shuffleDeck([...state.discardPile]);
      newDeck.push(...shuffledDiscard);
      set(state => ({ ...state, discardPile: [] }));
    }

    const updatedPlayers = state.players.map(p =>
      p.id === playerId ? { ...p, hand: newHand } : p
    );

    set({
      players: updatedPlayers,
      deck: newDeck,
      phase: 'play'
    });
  },

  // Play a card
  playCard: (playerId: string, cardId: string, _targetPlayerId?: string) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    const card = player?.hand.find(c => c.id === cardId);
    
    if (!player || !card || state.cardsPlayedThisTurn >= 3) return;

    const newHand = player.hand.filter(c => c.id !== cardId);
    let updatedPlayers = [...state.players];

    // Handle different card types
    if (card.type === 'money') {
      // Add to bank
      const updatedPlayer = {
        ...player,
        hand: newHand,
        bank: [...player.bank, card]
      };
      updatedPlayers = updatedPlayers.map(p => 
        p.id === playerId ? updatedPlayer : p
      );
    } else if (card.type === 'property') {
      // Add to properties
      const updatedPlayer = {
        ...player,
        hand: newHand,
        properties: [...player.properties, card]
      };
      updatedPlayers = updatedPlayers.map(p => 
        p.id === playerId ? updatedPlayer : p
      );
    } else if (card.type === 'action') {
      // Handle action cards (simplified for now)
      if (card.actionType === 'pass_go') {
        // Draw 2 cards
        const newDeck = [...state.deck];
        const extraCards: Card[] = [];
        for (let i = 0; i < 2 && newDeck.length > 0; i++) {
          extraCards.push(newDeck.pop()!);
        }
        
        const updatedPlayer = {
          ...player,
          hand: [...newHand, ...extraCards]
        };
        updatedPlayers = updatedPlayers.map(p => 
          p.id === playerId ? updatedPlayer : p
        );
        
        set(state => ({ ...state, deck: newDeck }));
      } else {
        // For now, just remove from hand and add to discard
        const updatedPlayer = { ...player, hand: newHand };
        updatedPlayers = updatedPlayers.map(p => 
          p.id === playerId ? updatedPlayer : p
        );
        
        set(state => ({ 
          ...state, 
          discardPile: [...state.discardPile, card] 
        }));
      }
    }

    // Check for win condition
    const currentPlayer = updatedPlayers.find(p => p.id === playerId);
    const hasWon = currentPlayer ? checkWinCondition(currentPlayer.properties) : false;

    set({
      players: updatedPlayers,
      cardsPlayedThisTurn: state.cardsPlayedThisTurn + 1,
      selectedCards: state.selectedCards.filter(id => id !== cardId),
      winner: hasWon ? playerId : null,
      phase: hasWon ? 'finished' : state.phase
    });
  },

  // Discard a card
  discardCard: (playerId: string, cardId: string) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    const card = player?.hand.find(c => c.id === cardId);
    
    if (!player || !card) return;

    const newHand = player.hand.filter(c => c.id !== cardId);
    const updatedPlayers = state.players.map(p =>
      p.id === playerId ? { ...p, hand: newHand } : p
    );

    set({
      players: updatedPlayers,
      discardPile: [...state.discardPile, card],
      selectedCards: state.selectedCards.filter(id => id !== cardId)
    });
  },

  // End current turn
  endTurn: () => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayerIndex];
    
    // Force discard if hand size > 7
    if (currentPlayer.hand.length > 7) {
      set({ phase: 'discard' });
      return;
    }

    const nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    
    set({
      currentPlayerIndex: nextPlayerIndex,
      phase: 'draw',
      cardsPlayedThisTurn: 0,
      turnCount: nextPlayerIndex === 0 ? state.turnCount + 1 : state.turnCount,
      selectedCards: [],
      actionInProgress: false
    });
  },

  // Card selection methods
  selectCard: (cardId: string) => {
    set(state => ({
      selectedCards: [...state.selectedCards, cardId]
    }));
  },

  deselectCard: (cardId: string) => {
    set(state => ({
      selectedCards: state.selectedCards.filter(id => id !== cardId)
    }));
  },

  clearSelection: () => {
    set({ selectedCards: [] });
  },

  // Getter methods
  getCurrentPlayer: () => {
    const state = get();
    return state.players[state.currentPlayerIndex] || null;
  },

  getPlayer: (playerId: string) => {
    const state = get();
    return state.players.find(p => p.id === playerId) || null;
  },

  canPlayCard: (_cardId: string) => {
    const state = get();
    return state.phase === 'play' && 
           state.cardsPlayedThisTurn < 3 && 
           !state.actionInProgress;
  },

  canEndTurn: () => {
    const state = get();
    return state.phase === 'play' && !state.actionInProgress;
  }
}));
