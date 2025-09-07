import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import { useGameStore } from "./stores/gameStore";

function App() {
  const [gameState, setGameState] = useState<"menu" | "lobby" | "game">("menu");
  const [playerNames, setPlayerNames] = useState<string[]>(["Player 1"]);
  const { initializeGame } = useGameStore();

  return (
    <div className="min-h-screen bg-green-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
            ChaosDeal
          </h1>
          <p className="text-xl text-green-200">
            The Ultimate Monopoly Deal Experience with Chaos Mode
          </p>
        </header>

        {gameState === "menu" && (
          <div className="max-w-md mx-auto game-board">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Welcome to ChaosDeal!
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => setGameState("lobby")}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg"
                >
                  Start Single Player
                </button>

                <button
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg opacity-50 cursor-not-allowed"
                  disabled
                >
                  Multiplayer (Coming Soon)
                </button>

                <button className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg">
                  How to Play
                </button>
              </div>

              <div className="mt-8 p-4 bg-red-600 bg-opacity-20 rounded-lg border border-red-500">
                <h3 className="text-lg font-bold text-red-400 mb-2">
                  Chaos Mode
                </h3>
                <p className="text-sm text-red-200">
                  Experience Monopoly Deal like never before with unpredictable
                  events that change the game!
                </p>
              </div>
            </div>
          </div>
        )}

        {gameState === "lobby" && (
          <div className="max-w-2xl mx-auto game-board">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Setup Game</h2>

              <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  Single Player Mode
                </h3>
                <p className="text-gray-300 mb-4">
                  Practice the game mechanics and learn how to play. Multiplayer
                  and AI opponents coming soon!
                </p>

                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    value={playerNames[0]}
                    onChange={(e) => setPlayerNames([e.target.value])}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    initializeGame(playerNames);
                    setGameState("game");
                  }}
                  className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg"
                >
                  Start Game
                </button>

                <button
                  onClick={() => setGameState("menu")}
                  className="w-full bg-gray-500 hover:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === "game" && <GameBoard />}

        <footer className="text-center mt-12 text-green-300">
          <p className="text-sm">
            Built for the open-source community •
            <a
              href="https://github.com/yourusername/chaosdeal"
              className="underline ml-1"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
