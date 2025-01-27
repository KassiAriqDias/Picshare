const express = require('express');
const router = express.Router();
const { registerUser, loginUser, generateName, genearatePFP } = require('../controllers/userController');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

router.get('/generate_name', generateName);

router.get('/generate_pfp', genearatePFP )

module.exports = router;


