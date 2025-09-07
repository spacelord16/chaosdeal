import React from "react";
import type { Player } from "../stores/gameStore";
import Card from "./Card";

interface PlayerAreaProps {
  player: Player;
  isCurrentPlayer: boolean;
  onCardClick: (cardId: string) => void;
  selectedCards: string[];
}

const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  isCurrentPlayer,
  onCardClick,
  selectedCards,
}) => {
  return (
    <div
      className={`player-area ${
        isCurrentPlayer ? "ring-2 ring-yellow-400" : ""
      }`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2">
          {player.name} {isCurrentPlayer && "(Current)"}
        </h3>

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
          <div>Hand: {player.hand.length}</div>
          <div>
            Bank: ${player.bank.reduce((sum, card) => sum + card.value, 0)}M
          </div>
          <div>Properties: {player.properties.length}</div>
        </div>
      </div>

      {/* Player's Hand (only show if current player) */}
      {isCurrentPlayer && (
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2">Hand:</h4>
          <div className="flex flex-wrap gap-2">
            {player.hand.map((card) => (
              <Card
                key={card.id}
                card={card}
                isSelected={selectedCards.includes(card.id)}
                onClick={() => onCardClick(card.id)}
                size="small"
              />
            ))}
          </div>
        </div>
      )}

      {/* Player's Bank */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">
          Bank (${player.bank.reduce((sum, card) => sum + card.value, 0)}M):
        </h4>
        <div className="flex flex-wrap gap-1">
          {player.bank.map((card) => (
            <Card key={card.id} card={card} size="small" isPlayable={false} />
          ))}
          {player.bank.length === 0 && (
            <div className="text-gray-400 text-sm">No money in bank</div>
          )}
        </div>
      </div>

      {/* Player's Properties */}
      <div>
        <h4 className="text-white font-semibold mb-2">Properties:</h4>
        <div className="flex flex-wrap gap-1">
          {player.properties.map((card) => (
            <Card key={card.id} card={card} size="small" isPlayable={false} />
          ))}
          {player.properties.length === 0 && (
            <div className="text-gray-400 text-sm">No properties</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerArea;
