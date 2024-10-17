const cron = require('node-cron');
const Habit = require('../models/Habit');
const User = require('../models/User');

const checkPendingHabits = async () => {
    try {
       
        const habits = await Habit.find({ progress: false, frequency: 'daily' });

        if (habits.length === 0) {
            console.log('No pending habits for today.');
            return;
        }

        habits.forEach(async habit => {
            const user = await User.findById(habit.user);
            console.log(`Reminder: ${user.username}, don't forget to complete your habit: ${habit.title}`);
            
        });
    } catch (error) {
        console.error('Error fetching pending habits:', error);
    }
};

cron.schedule('0 9 * * *', () => {
    console.log('Checking for pending habits at 9 AM');
    checkPendingHabits();
});

module.exports = { checkPendingHabits };
