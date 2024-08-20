Reaction Time Game



Overview
This game is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and is designed to record and analyze user reaction times. The game provides insightful statistics such as total attempts, best time, and average reaction time for each player. Additionally, a leaderboard displays the top 3 fastest users.

Features
Reaction Time Measurement: Tracks the user's reaction time in milliseconds.
Personal Insights:
Total Attempts: The total number of times the user has played.
Best Time: The fastest recorded reaction time.
Average Reaction Time: The user's average reaction time across all attempts.
Leaderboard: Displays the top 3 fastest reaction times from all users.
Tech Stack
Frontend: React.js (with hooks and functional components)
Backend: Node.js, Express.js
Database: MongoDB (for storing user data and scores)
Authentication: JWT (JSON Web Token) for securing user accounts
Styling: Tailwind CSS for responsive and modern UI
Setup & Installation
Prerequisites
Ensure you have the following installed:

Node.js
MongoDB (local or cloud)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/reaction-time-game.git
cd reaction-time-game
Install server dependencies:

bash
Copy code
cd server
npm install
Install client dependencies:

bash
Copy code
cd ../client
npm install
Start the development servers:

For the server:

bash
Copy code
cd server
npm run dev
For the client:

bash
Copy code
cd ../client
npm start
Configuration
Create a .env file in the server directory and add your MongoDB URI and JWT secret:

env
Copy code
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
Adjust the API and client configurations if necessary.

