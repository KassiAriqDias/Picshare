const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
