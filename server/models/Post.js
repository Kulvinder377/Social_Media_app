import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, trim: true, maxlength: 500 },
  mediaUrl: { type: String, default: '' },
  mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: { type: String, maxlength: 250 }, createdAt: { type: Date, default: Date.now } }]
}, { timestamps: true });
export default mongoose.model('Post', postSchema);
