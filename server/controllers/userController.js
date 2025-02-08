const User = require('../models/user');
const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'my_jwt_key'

async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err){
        console.err(err);
    }
}

async function checkPassword(enteredPassword, storedHashedPassword) {
    try {
        const match = await bcrypt.compare(enteredPassword, storedHashedPassword);
        return match; // Returns true if passwords match, otherwise false
    } catch (err) {
        console.error(err);
    }
}



// Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await hashPassword(password);

        // Generate a random number for the profile picture seed
        const randomSeed = Math.floor(Math.random() * 1000);

        // Construct the profile picture URL
        const profilePictureUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomSeed}`;

        // Create a new user with the profile picture
        const user = new User({ username, password: hashedPassword, profilePicture: profilePictureUrl });
    
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
        const user = await User.findOne({ username});
        if (!user) return res.status(404).json({ error: 'Invalid credentials' });

        const isMatch = await checkPassword(password, user.password);

        if(!isMatch) return res.status(401).json({error: 'Invaild credentials'});

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
};

exports.userInfo = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded.userId);
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: "Invalid token", details: err });
    }
}


exports.generateName = async (req, res) => {
    try {
        // Call the Parser Name API to generate a random username
        const response = await axios.get(
            'https://api.parser.name/?api_key=d98fa2444efa8ea7a28fa6166affaf20&endpoint=generate&results=1'
        );

        // Extract the generated name from the API response
        if (response.data && response.data.data && response.data.data.length > 0) {
            const generatedUsername = response.data.data[0].name.firstname.name_ascii; // Use the generated first name
            return res.status(200).json({ username: generatedUsername });
        } else {
            throw new Error('Failed to generate a random username - Invalid API response');
        }
    } catch (err) {
        console.error('Error in generateName function:', err.message); // Debugging log
        return res.status(500).json({
            error: 'Error generating username',
            details: err.message,
        });
    }
};

exports.genearatePFP = async (req, res) => {
    const randomSeed = Math.floor(Math.random() * 1000);

    // Construct the profile picture URL
    const profilePictureUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomSeed}`;

    // Send the URL in the JSON response
    res.status(200).json({ generated_pfp_url: profilePictureUrl });
};
