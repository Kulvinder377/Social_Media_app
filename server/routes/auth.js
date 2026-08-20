import express from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import User from '../models/User.js';
const router = express.Router();
const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const profile = (user) => ({ id: user._id, name: user.name, username: user.username, email: user.email, bio: user.bio, avatar: user.avatar, followers: user.followers, following: user.following });
router.post('/register', async (req, res) => { try { const { name, username, email, password } = req.body; if (await User.findOne({ $or: [{ email }, { username: username?.toLowerCase() }] })) return res.status(409).json({ message: 'Email or username is already in use' }); const user = await User.create({ name, username, email, password: await bcrypt.hash(password, 12) }); res.status(201).json({ token: tokenFor(user._id), user: profile(user) }); } catch (e) { res.status(400).json({ message: e.message }); } });
router.post('/login', async (req, res) => { const user = await User.findOne({ email: req.body.email.toLowerCase() }).select('+password'); if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Incorrect email or password' }); res.json({ token: tokenFor(user._id), user: profile(user) }); });
export default router;
