const express = require('express');
const router = express.Router();
const { register, getMe, login } = require('../controllers/userControllers')
const {protect} = require('../middleware/authMiddleware');


router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, getMe);

module.exports = router;