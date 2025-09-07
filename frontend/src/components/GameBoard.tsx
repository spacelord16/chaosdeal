import React from "react";
import { useGameStore } from "../stores/gameStore";
import Card from "./Card";
import PlayerArea from "./PlayerArea";
import GameControls from "./GameControls";

const GameBoard: React.FC = () => {
  const {
    players,
    currentPlayerIndex,
    phase,
    winner,
    turnCount,
    cardsPlayedThisTurn,
    deck,
    discardPile,
    getCurrentPlayer,
    selectCard,
    deselectCard,
    selectedCards,
  } = useGameStore();

  const currentPlayer = getCurrentPlayer();

  if (players.length === 0) {
    return (
      <div className="game-board">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Game Not Started
          </h2>
          <p className="text-gray-300">Initialize a game to begin playing.</p>
        </div>
      </div>
    );
  }

  if (winner) {
    const winningPlayer = players.find((p) => p.id === winner);
    return (
      <div className="game-board">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            Game Over!
          </h2>
          <p className="text-2xl text-white mb-6">
            {winningPlayer?.name} wins with 3 complete property sets!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const handleCardClick = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      deselectCard(cardId);
    } else {
      selectCard(cardId);
    }
  };

  return (
    <div className="min-h-screen bg-green-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Game Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">ChaosDeal</h1>
          <div className="flex justify-center space-x-6 text-white">
            <span>Turn: {turnCount}</span>
            <span>Phase: {phase.toUpperCase()}</span>
            <span>Cards Played: {cardsPlayedThisTurn}/3</span>
          </div>
        </div>

        {/* Deck and Discard Pile */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-white mb-2">Deck ({deck.length})</div>
            <div className="w-24 h-36 bg-blue-800 border-2 border-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">DECK</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-white mb-2">
              Discard ({discardPile.length})
            </div>
            <div className="w-24 h-36 bg-gray-600 border-2 border-gray-400 rounded-lg flex items-center justify-center">
              {discardPile.length > 0 ? (
                <Card
                  card={discardPile[discardPile.length - 1]}
                  size="small"
                  isPlayable={false}
                />
              ) : (
                <span className="text-white">EMPTY</span>
              )}
            </div>
          </div>
        </div>

        {/* Current Player Info */}
        {currentPlayer && (
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {currentPlayer.name}'s Turn
            </h2>
            <p className="text-gray-300">
              Hand: {currentPlayer.hand.length} cards | Bank: $
              {currentPlayer.bank.reduce((sum, card) => sum + card.value, 0)}M |
              Properties: {currentPlayer.properties.length}
            </p>
          </div>
        )}

        {/* Game Controls */}
        <GameControls />

        {/* Players Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {players.map((player, index) => (
            <PlayerArea
              key={player.id}
              player={player}
              isCurrentPlayer={index === currentPlayerIndex}
              onCardClick={handleCardClick}
              selectedCards={selectedCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
