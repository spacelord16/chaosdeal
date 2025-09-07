# Contributing to ChaosDeal

Thank you for your interest in contributing to ChaosDeal! This document provides guidelines and instructions for contributors.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Setting Up the Development Environment

1. **Fork and Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/chaosdeal.git
   cd chaosdeal
   ```

2. **Install Dependencies**

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Start Development Servers**

   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm run dev

   # Terminal 2: Start frontend development server
   cd frontend
   npm run dev
   ```

## Project Structure

```
chaosdeal/
├── frontend/           # React + Vite frontend
├── backend/           # Node.js + Express backend
├── shared/            # Shared types and utilities
├── docs/              # Additional documentation
├── data/              # Game data (cards, chaos events)
└── tests/             # Test files
```

## How to Contribute

### 1. Types of Contributions

- **Bug Fixes**: Fix issues in game logic, UI, or server functionality
- **New Chaos Events**: Add creative new chaos events to the game
- **UI/UX Improvements**: Enhance the visual design and user experience
- **Performance Optimizations**: Improve game performance and responsiveness
- **Documentation**: Improve or add to project documentation
- **Tests**: Add or improve automated tests

### 2. Creating a New Chaos Event

Chaos Events are one of the easiest ways to contribute! Here's how:

1. **Define the Event**

   - Add your event to `data/chaos-events.json`
   - Include: id, name, description, duration, and effects

2. **Implement the Logic**

   - Add event logic in `shared/chaos-events/`
   - Follow existing event patterns
   - Ensure proper cleanup when event ends

3. **Add Tests**

   - Create tests in `tests/chaos-events/`
   - Test both the event activation and deactivation

4. **Update Documentation**
   - Add event description to `docs/CHAOS_EVENTS.md`

### 3. Submitting Changes

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**

   - Follow the coding standards below
   - Write tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   npm run test
   npm run lint
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add new chaos event - Market Crash"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

## Coding Standards

### JavaScript/TypeScript

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### React Components

- Use functional components with hooks
- Follow the component structure in existing files
- Use Tailwind CSS for styling
- Keep components small and focused

### Git Commits

Follow conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Game Logic Guidelines

### Core Game Rules

- All game logic must follow the rules defined in `GAME_RULES.md`
- Any rule changes must be discussed in an issue first
- Maintain backward compatibility when possible

### Chaos Events

- Events should be fun but balanced
- Avoid events that make the game unwinnable
- Events should have clear start and end conditions
- Test events with multiple players

### State Management

- Use Zustand for client-side state
- Keep server as the source of truth for multiplayer
- Handle network disconnections gracefully

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Writing Tests

- Write unit tests for game logic
- Add integration tests for component interactions
- Include end-to-end tests for critical user flows
- Test chaos events thoroughly

## Code Review Process

1. **Automated Checks**: All PRs must pass automated tests and linting
2. **Peer Review**: At least one maintainer must review and approve
3. **Testing**: Changes should be tested in a multiplayer environment
4. **Documentation**: Ensure documentation is updated if needed

## Getting Help

- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## Recognition

Contributors will be:

- Listed in the README.md contributors section
- Credited in release notes for significant contributions
- Invited to join the core team for sustained contributions

## License

By contributing to ChaosDeal, you agree that your contributions will be licensed under the MIT License.

Thank you for helping make ChaosDeal awesome!
