const express = require('express');
const { getAllUsers, createHabitTemplate } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.post('/habits/template', protect, admin, createHabitTemplate);

module.exports = router;
