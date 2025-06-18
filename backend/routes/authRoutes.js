const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/signup', registerUser);
router.post('/login', authUser);

module.exports = router;