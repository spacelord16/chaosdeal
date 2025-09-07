"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
    socket.on('join-game', (roomCode) => {
        socket.join(roomCode);
        console.log(`Player ${socket.id} joined room ${roomCode}`);
        // Notify others in the room
        socket.to(roomCode).emit('player-joined', {
            playerId: socket.id,
            message: 'A new player has joined the game'
        });
    });
    // Handle player leaving a game
    socket.on('leave-game', (roomCode) => {
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
    console.log(`🚀 ChaosDeal server running on port ${PORT}`);
    console.log(`🎮 Ready for game connections!`);
});
exports.default = app;
//# sourceMappingURL=index.js.map