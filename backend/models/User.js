const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    meals: [{
        time: String,
        description: String,
        completed: Boolean
    }],
    medicines: [{
        name: String,
        time: String,
        dosage: String,
        taken: Boolean
    }],
    waterIntake: {
        glasses: { type: Number, default: 0 },
        goal: { type: Number, default: 8 }
    },
    exercises: [{
        name: String,
        duration: String,
        completed: Boolean
    }]
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    healthData: [HealthDataSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);