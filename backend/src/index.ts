import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'ChaosDeal Server is running!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Handle player joining a game
  socket.on('join-game', (roomCode: string) => {
    socket.join(roomCode);
    console.log(`Player ${socket.id} joined room ${roomCode}`);
    
    // Notify others in the room
    socket.to(roomCode).emit('player-joined', {
      playerId: socket.id,
      message: 'A new player has joined the game'
    });
  });

  // Handle player leaving a game
  socket.on('leave-game', (roomCode: string) => {
    socket.leave(roomCode);
    console.log(`Player ${socket.id} left room ${roomCode}`);
    
    // Notify others in the room
    socket.to(roomCode).emit('player-left', {
      playerId: socket.id,
      message: 'A player has left the game'
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`ChaosDeal server running on port ${PORT}`);
  console.log(`Ready for game connections!`);
});

export default app;
