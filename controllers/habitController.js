const Habit = require('../models/Habit');

// Create a new habit
exports.createHabit = async (req, res) => {
    try {
        const { title, description, frequency } = req.body;

        const habit = new Habit({
            user: req.user.id,  
            title,
            description,
            frequency,
        });

        const savedHabit = await habit.save();
        res.status(201).json(savedHabit);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all habits of the logged-in user
exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id });
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a habit
exports.updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedHabit = await Habit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // Return the updated habit
        );
        res.status(200).json(updatedHabit);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await habit.remove();
        res.status(200).json({ message: 'Habit deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
