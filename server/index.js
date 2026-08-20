import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true } });
app.set('io', io);
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'pulse-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const onlineUsers = new Map();
io.on('connection', (socket) => {
  socket.on('presence:online', (userId) => { onlineUsers.set(userId, socket.id); socket.join(`user:${userId}`); io.emit('presence:list', [...onlineUsers.keys()]); });
  socket.on('message:send', (message) => { const recipientSocket = onlineUsers.get(message.recipient); if (recipientSocket) io.to(recipientSocket).emit('message:new', message); });
  socket.on('typing:start', ({ recipient, sender }) => { const id = onlineUsers.get(recipient); if (id) io.to(id).emit('typing:start', sender); });
  socket.on('typing:stop', ({ recipient, sender }) => { const id = onlineUsers.get(recipient); if (id) io.to(id).emit('typing:stop', sender); });
  socket.on('disconnect', () => { for (const [userId, id] of onlineUsers) if (id === socket.id) onlineUsers.delete(userId); io.emit('presence:list', [...onlineUsers.keys()]); });
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI).then(() => server.listen(port, () => console.log(`Pulse API running on :${port}`))).catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
