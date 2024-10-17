const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
    streak: { type: Number, default: 0 },
    progress: { type: Boolean, default: false },  
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
