🌐 HealthSphereHealthSphere is a full-stack web application designed for health data management, built with React (frontend) and Node.js/Express (backend), using MongoDB for persistent data storage.This README will guide you step-by-step on how to set up and run the project on your local machine.📋 Table of ContentsFeaturesPrerequisitesInstallationEnvironment VariablesRunning the ProjectDeploymentAuthor✨ FeaturesFrontend built with modern ReactRobust Backend API using Express.jsData persistence via MongoDB (supports local server or cloud via MongoDB Atlas)Simple, modular project structure for easy understanding and scalingOptimized and ready for standard cloud deployment⚙️ PrerequisitesBefore starting, ensure you have the following software installed on your system:Node.js (v16 or later)npm (comes bundled with Node.js)GitMongoDB (Required for local development, or you can use a cloud-hosted MongoDB Atlas instance).📥 InstallationFollow these steps to get the project files and install all necessary dependencies.1. Clone the RepositoryClone the project from GitHub and navigate into the main directory:git clone [https://github.com/neelutekar/healthsphere.git](https://github.com/neelutekar/healthsphere.git)
cd healthsphere
2. Install Backend DependenciesNavigate to the backend folder and install all Node.js dependencies:cd backend
npm install
3. Install Frontend DependenciesReturn to the root directory, navigate into the frontend folder, and install React dependencies:cd ../frontend
npm install
4. Environment VariablesYou need to configure your environment variables to connect the backend to the database.Create a file named .env inside the backend folder and add the following variables:# The port the Express server will run on (e.g., http://localhost:5000)
PORT=5000

# Connection string for your MongoDB database. 
# Use the local URI if running MongoDB locally, or your Atlas URI.
MONGO_URI=mongodb://localhost:27017/healthsphere

# Example for a secure JWT secret (important for authentication/authorization)
JWT_SECRET=YOUR_VERY_SECURE_SECRET_KEY_HERE
5. Running the ProjectWith dependencies installed and environment variables set, you can now start the application.1. Start the Backend ServerMake sure you are in the backend directory:cd backend
npm start
The backend API server will start running, typically on http://localhost:5000.2. Start the Frontend ApplicationNavigate to the frontend directory and start the React development server:cd ../frontend
npm start
The application will open automatically in your browser (usually on a new tab) at http://localhost:3000.You can now interact with the HealthSphere application!6. DeploymentThe backend can be deployed to services like Heroku, AWS, or Render. The frontend (a static React application) can be deployed to services like Vercel, Netlify, or as static files on any server.Build Frontend: Run npm run build inside the frontend directory to create the production-ready static assets.Configure Backend: Ensure your MongoDB connection string in the .env file is set to a production-ready cloud database (like MongoDB Atlas).7. AuthorNeel Uttekar - Initial Work - neelutekar
