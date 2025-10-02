# 🌐 HealthSphere

HealthSphere is a full-stack web application built with **React (frontend)** and **Node.js/Express (backend)**, using **MongoDB** for data storage. This README will guide you step-by-step on how to set up and run the project on your own computer.

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Prerequisites](#-prerequisites)
3. [Installation](#-installation)
4. [Environment Variables](#-environment-variables)
5. [Running the Project](#-running-the-project)
6. [Deployment](#-deployment)
7. [Author](#-author)

---

## ✨ Features

- Frontend built with **React**
- Backend API with **Express.js**
- Database using **MongoDB** (local or cloud via MongoDB Atlas)
- Simple project structure for easy understanding
- Ready for deployment

---

## ⚙️ Prerequisites

Before starting, make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (local server OR Atlas cloud database)

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/neelutekar/healthsphere.git
cd healthsphere
```

### 2. Install Dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder and add the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthsphere
```

If using **MongoDB Atlas**, replace the `MONGO_URI` with your Atlas connection string.

---

## ▶️ Running the Project

### Start the Backend

```bash
cd backend
npm start
```

Backend will run on: **http://localhost:5000**

### Start the Frontend (in a new terminal)

```bash
cd frontend
npm start
```

Frontend will run on: **http://localhost:3000**

---

## 👨‍💻 Author

**Neel Utekar**

🔗 [GitHub Profile](https://github.com/neelutekar)
