# ChaosDeal

An open-source, web-based version of Monopoly Deal with an exciting Chaos Mode that adds unpredictable events to shake up the gameplay.

## Features

- **Classic Monopoly Deal**: Full implementation of the beloved card game
- **Chaos Mode**: Unique events that temporarily change game rules
- **Multiplayer**: Play with 2-5 friends online in real-time
- **Open Source**: Community-driven development with easy contribution guidelines
- **Modern Tech Stack**: Built with React, Node.js, and Socket.IO

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/chaosdeal.git
   cd chaosdeal
   ```

2. **Install dependencies**

   ```bash
   # Frontend
   cd frontend
   npm install
   cd ..

   # Backend
   cd backend
   npm install
   cd ..
   ```

3. **Start the development servers**

   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## How to Play

ChaosDeal follows the standard Monopoly Deal rules with an exciting twist:

### Standard Rules

- Collect 3 complete property sets to win
- Draw 2 cards, play up to 3 cards per turn
- Use money cards, property cards, and action cards strategically
- Charge rent, steal properties, and block opponents

### Chaos Mode

At the start of each round, a random Chaos Event may activate:

- **Market Boom**: All rent is doubled
- **Recession**: All payments are halved
- **Property Swap**: Players must trade one property
- **And many more!**

## Project Structure

```
chaosdeal/
├── frontend/          # React + TypeScript + Tailwind CSS
├── backend/           # Node.js + Express + Socket.IO
├── shared/            # Shared types and utilities
├── data/              # Game data (cards, chaos events)
├── docs/              # Documentation
└── tests/             # Test files
```

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Socket.IO Client** for real-time communication

### Backend

- **Node.js** with TypeScript
- **Express.js** for REST API
- **Socket.IO** for WebSocket connections
- **CORS** for cross-origin requests

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute

- Report bugs or suggest features
- Create new Chaos Events
- Improve UI/UX design
- Improve documentation
- Optimize performance

## Development Roadmap

- [x] **Milestone 0**: Project foundation and setup
- [ ] **Milestone 1**: Single-player core game engine
- [ ] **Milestone 2**: Multiplayer functionality
- [ ] **Milestone 3**: Chaos Mode implementation
- [ ] **Milestone 4**: Polish and community features

## Game Rules

Complete game rules can be found in [GAME_RULES.md](GAME_RULES.md).

## Current Status

**In Development** - Milestone 0 Complete

The foundation is set! We have:

- Project structure and documentation
- Frontend and backend setup
- Card data structure defined
- Basic UI wireframes
- Contributing guidelines

Next up: Building the core game engine!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the original Monopoly Deal card game
- Built for the open-source community
- Special thanks to all contributors
