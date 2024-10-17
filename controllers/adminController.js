const User = require('../models/User');
const Habit = require('../models/Habit');

// Admin: Get all users and their habit completion stats
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const userStats = [];

        for (let user of users) {
            const habits = await Habit.find({ user: user._id });
            const completedHabits = habits.filter(habit => habit.progress === true).length;
            const totalHabits = habits.length;

            userStats.push({
                username: user.username,
                email: user.email,
                role: user.role,
                totalHabits,
                completedHabits,
            });
        }

        res.status(200).json(userStats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: Create habit templates
exports.createHabitTemplate = async (req, res) => {
    try {
        const { title, description, frequency } = req.body;

        const habitTemplate = {
            title,
            description,
            frequency,
        };
        res.status(201).json(habitTemplate);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
