import { useState } from "react";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState<"menu" | "lobby" | "game">("menu");

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
                  Create Game
                </button>

                <button
                  onClick={() => setGameState("lobby")}
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg"
                >
                  Join Game
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
              <h2 className="text-3xl font-bold text-white mb-6">Game Lobby</h2>

              <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  Room Code: DEMO123
                </h3>
                <p className="text-gray-300">
                  Share this code with your friends to join the game!
                </p>
              </div>

              <div className="player-area mb-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Players (1/5)
                </h3>
                <div className="space-y-2">
                  <div className="bg-white bg-opacity-10 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-white">You (Host)</span>
                    <span className="text-green-400">Ready</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setGameState("game")}
                  className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg"
                >
                  Start Game
                </button>

                <button
                  onClick={() => setGameState("menu")}
                  className="w-full bg-gray-500 hover:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
                >
                  ← Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === "game" && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Game in Progress
              </h2>
              <div className="chaos-banner mb-4">
                CHAOS EVENT: Market Boom - All rent is doubled!
              </div>
            </div>

            {/* Placeholder for game board */}
            <div className="game-board">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">
                  Game Board Coming Soon!
                </h3>
                <p className="text-gray-300 mb-6">
                  This is where the magic will happen. The game board will show:
                </p>
                <ul className="text-left text-gray-300 space-y-2 max-w-md mx-auto">
                  <li>- Your hand of cards</li>
                  <li>- Property sets on the table</li>
                  <li>- Money in your bank</li>
                  <li>- Other players' areas</li>
                  <li>- Active chaos events</li>
                </ul>

                <button
                  onClick={() => setGameState("menu")}
                  className="mt-6 bg-gray-500 hover:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
                >
                  ← Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}

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
