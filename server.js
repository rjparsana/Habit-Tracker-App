const PORT = process.env.PORT || 5000;
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const reminderService = require('./reminders/reminderService');
const adminRoutes = require('./routes/adminRoutes');

// Start the cron job 
reminderService.checkPendingHabits();

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/admin', adminRoutes); 

app.get('/', (req, res) => {
    res.send('Habit Tracker APP is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
