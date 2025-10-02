import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { healthAPI } from '../services/api';
import {
    Heart,
    LogOut,
    Utensils,
    Pill,
    Droplets,
    Dumbbell,
    Plus,
    Check,
    X,
    TrendingUp
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [healthData, setHealthData] = useState({
        meals: [],
        medicines: [],
        waterIntake: { glasses: 0, goal: 8 },
        exercises: []
    });

    const [showAddMeal, setShowAddMeal] = useState(false);
    const [showAddMedicine, setShowAddMedicine] = useState(false);
    const [showAddExercise, setShowAddExercise] = useState(false);

    const [newMeal, setNewMeal] = useState({ time: '', description: '' });
    const [newMedicine, setNewMedicine] = useState({ name: '', time: '', dosage: '' });
    const [newExercise, setNewExercise] = useState({ name: '', duration: '' });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
        loadHealthData();
    }, [navigate]);

    const loadHealthData = async () => {
        try {
            const response = await healthAPI.getTodayData();
            setHealthData(response.data);
        } catch (error) {
            console.error('Error loading health data:', error);
        }
    };

    const saveHealthData = async (updatedData) => {
        try {
            await healthAPI.updateHealthData(updatedData);
            setHealthData(updatedData);
        } catch (error) {
            console.error('Error saving health data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Meal Functions
    const addMeal = () => {
        if (newMeal.time && newMeal.description) {
            const updatedMeals = [...healthData.meals, { ...newMeal, completed: false }];
            saveHealthData({ ...healthData, meals: updatedMeals });
            setNewMeal({ time: '', description: '' });
            setShowAddMeal(false);
        }
    };

    const toggleMeal = (index) => {
        const updatedMeals = [...healthData.meals];
        updatedMeals[index].completed = !updatedMeals[index].completed;
        saveHealthData({ ...healthData, meals: updatedMeals });
    };

    const deleteMeal = (index) => {
        const updatedMeals = healthData.meals.filter((_, i) => i !== index);
        saveHealthData({ ...healthData, meals: updatedMeals });
    };

    // Medicine Functions
    const addMedicine = () => {
        if (newMedicine.name && newMedicine.time && newMedicine.dosage) {
            const updatedMedicines = [...healthData.medicines, { ...newMedicine, taken: false }];
            saveHealthData({ ...healthData, medicines: updatedMedicines });
            setNewMedicine({ name: '', time: '', dosage: '' });
            setShowAddMedicine(false);
        }
    };

    const toggleMedicine = (index) => {
        const updatedMedicines = [...healthData.medicines];
        updatedMedicines[index].taken = !updatedMedicines[index].taken;
        saveHealthData({ ...healthData, medicines: updatedMedicines });
    };

    const deleteMedicine = (index) => {
        const updatedMedicines = healthData.medicines.filter((_, i) => i !== index);
        saveHealthData({ ...healthData, medicines: updatedMedicines });
    };

    // Water Functions
    const addWater = () => {
        const updatedWater = { ...healthData.waterIntake, glasses: healthData.waterIntake.glasses + 1 };
        saveHealthData({ ...healthData, waterIntake: updatedWater });
    };

    const removeWater = () => {
        if (healthData.waterIntake.glasses > 0) {
            const updatedWater = { ...healthData.waterIntake, glasses: healthData.waterIntake.glasses - 1 };
            saveHealthData({ ...healthData, waterIntake: updatedWater });
        }
    };

    // Exercise Functions
    const addExercise = () => {
        if (newExercise.name && newExercise.duration) {
            const updatedExercises = [...healthData.exercises, { ...newExercise, completed: false }];
            saveHealthData({ ...healthData, exercises: updatedExercises });
            setNewExercise({ name: '', duration: '' });
            setShowAddExercise(false);
        }
    };

    const toggleExercise = (index) => {
        const updatedExercises = [...healthData.exercises];
        updatedExercises[index].completed = !updatedExercises[index].completed;
        saveHealthData({ ...healthData, exercises: updatedExercises });
    };

    const deleteExercise = (index) => {
        const updatedExercises = healthData.exercises.filter((_, i) => i !== index);
        saveHealthData({ ...healthData, exercises: updatedExercises });
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-left">
                        <Heart className="header-icon" size={32} />
                        <div>
                            <h1>HealthSphere</h1>
                            <p>Welcome back, {user?.name}!</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-grid">

                    {/* Meals Section */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <Utensils className="card-icon" />
                                <h2>Meal Tracker</h2>
                            </div>
                            <button onClick={() => setShowAddMeal(!showAddMeal)} className="add-btn">
                                <Plus size={20} />
                            </button>
                        </div>

                        {showAddMeal && (
                            <div className="add-form">
                                <input
                                    type="time"
                                    value={newMeal.time}
                                    onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                                    placeholder="Time"
                                />
                                <input
                                    type="text"
                                    value={newMeal.description}
                                    onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                                    placeholder="What did you eat?"
                                />
                                <button onClick={addMeal} className="save-btn">Add Meal</button>
                            </div>
                        )}

                        <div className="items-list">
                            {healthData.meals.length === 0 ? (
                                <p className="empty-state">No meals tracked yet</p>
                            ) : (
                                healthData.meals.map((meal, index) => (
                                    <div key={index} className={`item ${meal.completed ? 'completed' : ''}`}>
                                        <div className="item-content">
                                            <span className="item-time">{meal.time}</span>
                                            <span className="item-text">{meal.description}</span>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => toggleMeal(index)} className="check-btn">
                                                {meal.completed ? <Check size={18} /> : <div className="empty-check" />}
                                            </button>
                                            <button onClick={() => deleteMeal(index)} className="delete-btn">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Medicine Section */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <Pill className="card-icon" />
                                <h2>Medicine Reminder</h2>
                            </div>
                            <button onClick={() => setShowAddMedicine(!showAddMedicine)} className="add-btn">
                                <Plus size={20} />
                            </button>
                        </div>

                        {showAddMedicine && (
                            <div className="add-form">
                                <input
                                    type="text"
                                    value={newMedicine.name}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                                    placeholder="Medicine name"
                                />
                                <input
                                    type="time"
                                    value={newMedicine.time}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
                                    placeholder="Time"
                                />
                                <input
                                    type="text"
                                    value={newMedicine.dosage}
                                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                                    placeholder="Dosage (e.g., 1 tablet)"
                                />
                                <button onClick={addMedicine} className="save-btn">Add Medicine</button>
                            </div>
                        )}

                        <div className="items-list">
                            {healthData.medicines.length === 0 ? (
                                <p className="empty-state">No medicines added yet</p>
                            ) : (
                                healthData.medicines.map((medicine, index) => (
                                    <div key={index} className={`item ${medicine.taken ? 'completed' : ''}`}>
                                        <div className="item-content">
                                            <span className="item-text">{medicine.name}</span>
                                            <span className="item-detail">{medicine.time} - {medicine.dosage}</span>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => toggleMedicine(index)} className="check-btn">
                                                {medicine.taken ? <Check size={18} /> : <div className="empty-check" />}
                                            </button>
                                            <button onClick={() => deleteMedicine(index)} className="delete-btn">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Water Intake Section */}
                    <div className="card water-card">
                        <div className="card-header">
                            <div className="card-title">
                                <Droplets className="card-icon" />
                                <h2>Water Intake</h2>
                            </div>
                        </div>

                        <div className="water-content">
                            <div className="water-visual">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`water-glass ${i < healthData.waterIntake.glasses ? 'filled' : ''}`}
                                    >
                                        <Droplets size={24} />
                                    </div>
                                ))}
                            </div>

                            <div className="water-info">
                                <h3>{healthData.waterIntake.glasses} / {healthData.waterIntake.goal} glasses</h3>
                                <div className="water-controls">
                                    <button onClick={removeWater} className="water-btn minus">-</button>
                                    <button onClick={addWater} className="water-btn plus">+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Exercise Section */}
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">
                                <Dumbbell className="card-icon" />
                                <h2>Exercise Tracker</h2>
                            </div>
                            <button onClick={() => setShowAddExercise(!showAddExercise)} className="add-btn">
                                <Plus size={20} />
                            </button>
                        </div>

                        {showAddExercise && (
                            <div className="add-form">
                                <input
                                    type="text"
                                    value={newExercise.name}
                                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                                    placeholder="Exercise name"
                                />
                                <input
                                    type="text"
                                    value={newExercise.duration}
                                    onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                                    placeholder="Duration (e.g., 30 minutes)"
                                />
                                <button onClick={addExercise} className="save-btn">Add Exercise</button>
                            </div>
                        )}

                        <div className="items-list">
                            {healthData.exercises.length === 0 ? (
                                <p className="empty-state">No exercises planned yet</p>
                            ) : (
                                healthData.exercises.map((exercise, index) => (
                                    <div key={index} className={`item ${exercise.completed ? 'completed' : ''}`}>
                                        <div className="item-content">
                                            <span className="item-text">{exercise.name}</span>
                                            <span className="item-detail">{exercise.duration}</span>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => toggleExercise(index)} className="check-btn">
                                                {exercise.completed ? <Check size={18} /> : <div className="empty-check" />}
                                            </button>
                                            <button onClick={() => deleteExercise(index)} className="delete-btn">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;