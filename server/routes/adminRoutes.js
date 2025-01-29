const express = require('express');
const router = express.Router();
const { addUser, editUser, deleteUser, getAllUsers, getUser } = require('../controllers/adminController');

// Admin-only routes
router.post('/add', addUser); // Add a new user
router.put('/edit/:id', editUser); // Edit an existing user by ID
router.delete('/delete/:id', deleteUser); // Delete a user by ID
router.get('/user/:id', getUser); // Get single user
router.get('/users', getAllUsers); // Get a list of all users

module.exports = router;
