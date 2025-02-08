const express = require('express');
const router = express.Router();
const { registerUser, loginUser, userInfo, generateName, genearatePFP } = require('../controllers/userController');


//UserInfo route
router.get('/user', userInfo)

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

router.get('/generate_name', generateName);

router.get('/generate_pfp', genearatePFP )

module.exports = router;


