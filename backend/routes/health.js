const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get today's health data
router.get('/today', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let todayData = user.healthData.find(data => {
            const dataDate = new Date(data.date);
            dataDate.setHours(0, 0, 0, 0);
            return dataDate.getTime() === today.getTime();
        });

        if (!todayData) {
            todayData = {
                date: today,
                meals: [],
                medicines: [],
                waterIntake: { glasses: 0, goal: 8 },
                exercises: []
            };
        }

        res.json(todayData);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update health data
router.post('/update', authMiddleware, async (req, res) => {
    try {
        const { meals, medicines, waterIntake, exercises } = req.body;
        const user = await User.findById(req.userId);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingDataIndex = user.healthData.findIndex(data => {
            const dataDate = new Date(data.date);
            dataDate.setHours(0, 0, 0, 0);
            return dataDate.getTime() === today.getTime();
        });

        const newData = {
            date: today,
            meals: meals || [],
            medicines: medicines || [],
            waterIntake: waterIntake || { glasses: 0, goal: 8 },
            exercises: exercises || []
        };

        if (existingDataIndex >= 0) {
            user.healthData[existingDataIndex] = newData;
        } else {
            user.healthData.push(newData);
        }

        await user.save();
        res.json({ message: 'Health data updated', data: newData });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get health history
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user.healthData.sort((a, b) => b.date - a.date));
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;