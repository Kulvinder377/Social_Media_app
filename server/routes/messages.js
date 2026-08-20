import express from 'express'; import Message from '../models/Message.js'; import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/:userId', protect, async (req, res) => { const messages = await Message.find({ $or: [{ sender: req.userId, recipient: req.params.userId }, { sender: req.params.userId, recipient: req.userId }] }).sort('createdAt'); res.json(messages); });
router.post('/', protect, async (req, res) => { const message = await Message.create({ sender: req.userId, recipient: req.body.recipient, text: req.body.text }); const data = message.toObject(); req.app.get('io').to(`user:${req.body.recipient}`).emit('message:new', data); res.status(201).json(data); });
export default router;
