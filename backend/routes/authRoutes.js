const express = require('express');
const router = express.Router();
const { registerUser, authUser, refreshToken } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authUser);

router.post('/refresh', refreshToken);

module.exports = router;
