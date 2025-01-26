const User = require('../models/user');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: 'Error registering user', details: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) return res.status(404).json({ error: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
};
