import React from "react";
import { useGameStore } from "../stores/gameStore";

const GameControls: React.FC = () => {
  const {
    phase,
    selectedCards,
    cardsPlayedThisTurn,
    drawCards,
    playCard,
    discardCard,
    endTurn,
    clearSelection,
    getCurrentPlayer,
    canEndTurn,
  } = useGameStore();

  const currentPlayer = getCurrentPlayer();

  if (!currentPlayer) return null;

  const handleDrawCards = () => {
    if (phase === "draw") {
      drawCards(currentPlayer.id, 2);
    }
  };

  const handlePlaySelectedCards = () => {
    if (selectedCards.length > 0 && phase === "play") {
      selectedCards.forEach((cardId) => {
        playCard(currentPlayer.id, cardId);
      });
      clearSelection();
    }
  };

  const handleDiscardSelected = () => {
    if (selectedCards.length > 0) {
      selectedCards.forEach((cardId) => {
        discardCard(currentPlayer.id, cardId);
      });
      clearSelection();
    }
  };

  const handleEndTurn = () => {
    if (canEndTurn()) {
      endTurn();
    }
  };

  return (
    <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
      <div className="text-center">
        <h3 className="text-white font-bold mb-4">Game Controls</h3>

        <div className="flex justify-center space-x-4 flex-wrap gap-2">
          {/* Draw Phase */}
          {phase === "draw" && (
            <button
              onClick={handleDrawCards}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg"
            >
              Draw 2 Cards
            </button>
          )}

          {/* Play Phase */}
          {phase === "play" && (
            <>
              <button
                onClick={handlePlaySelectedCards}
                disabled={
                  selectedCards.length === 0 || cardsPlayedThisTurn >= 3
                }
                className={`font-bold py-2 px-4 rounded-lg ${
                  selectedCards.length > 0 && cardsPlayedThisTurn < 3
                    ? "bg-green-500 hover:bg-green-400 text-white"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                Play Selected ({selectedCards.length})
              </button>

              <button
                onClick={handleEndTurn}
                disabled={!canEndTurn()}
                className={`font-bold py-2 px-4 rounded-lg ${
                  canEndTurn()
                    ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                End Turn
              </button>
            </>
          )}

          {/* Discard Phase */}
          {phase === "discard" && (
            <>
              <div className="text-red-400 mb-2">
                Hand size exceeds 7! Must discard{" "}
                {currentPlayer.hand.length - 7} card(s)
              </div>
              <button
                onClick={handleDiscardSelected}
                disabled={selectedCards.length === 0}
                className={`font-bold py-2 px-4 rounded-lg ${
                  selectedCards.length > 0
                    ? "bg-red-500 hover:bg-red-400 text-white"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                Discard Selected ({selectedCards.length})
              </button>

              {currentPlayer.hand.length <= 7 && (
                <button
                  onClick={handleEndTurn}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg"
                >
                  Continue Turn
                </button>
              )}
            </>
          )}

          {/* Clear Selection */}
          {selectedCards.length > 0 && (
            <button
              onClick={clearSelection}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Clear Selection
            </button>
          )}
        </div>

        {/* Phase Info */}
        <div className="mt-4 text-sm text-gray-300">
          <div>Current Phase: {phase.toUpperCase()}</div>
          <div>Cards Played This Turn: {cardsPlayedThisTurn}/3</div>
          {selectedCards.length > 0 && (
            <div>Selected Cards: {selectedCards.length}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameControls;
