import express from 'express'; import Post from '../models/Post.js'; import User from '../models/User.js'; import { protect } from '../middleware/auth.js';
const router = express.Router(); const full = (query) => query.populate('author', 'name username avatar').populate('comments.author', 'name username avatar');
router.get('/feed', protect, async (req, res) => { const me = await User.findById(req.userId); const posts = await full(Post.find({ author: { $in: [...me.following, me._id] } }).sort('-createdAt')); res.json(posts); });
router.get('/explore', protect, async (_, res) => res.json(await full(Post.find().sort('-createdAt').limit(50))));
router.post('/', protect, async (req, res) => { const post = await Post.create({ ...req.body, author: req.userId }); res.status(201).json(await full(Post.findById(post._id))); });
router.post('/:id/like', protect, async (req, res) => { const post = await Post.findById(req.params.id); if (!post) return res.sendStatus(404); const index = post.likes.findIndex((id) => id.toString() === req.userId); index >= 0 ? post.likes.splice(index, 1) : post.likes.push(req.userId); await post.save(); res.json({ likes: post.likes }); });
router.post('/:id/comments', protect, async (req, res) => { const post = await Post.findById(req.params.id); post.comments.push({ author: req.userId, text: req.body.text }); await post.save(); res.status(201).json(await full(Post.findById(post._id))); });
export default router;
