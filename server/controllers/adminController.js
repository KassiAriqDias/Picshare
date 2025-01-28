const User = require('../models/user');

// Add a new user (Admin only)
exports.addUser = async (req, res) => {
    try {
        const { username, password, isAdmin } = req.body;
        const user = new User({ username, password, isAdmin });
        await user.save();
        res.status(201).json({ message: 'User added successfully', user });
    } catch (err) {
        res.status(400).json({ error: 'Error adding user', details: err.message });
    }
};

// Edit an existing user (Admin only)
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, profilePicture, isAdmin } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, password, profilePicture, isAdmin, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        res.status(400).json({ error: 'Error updating user', details: err.message });
    }
};

// Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
        res.status(400).json({ error: 'Error deleting user', details: err.message });
    }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users', details: err.message });
    }
};
