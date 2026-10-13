

EquipTrack is a Full-Stack RESTful API for managing equipment loans. Built with Node.js and Express, it provides a secure and efficient way to track equipment inventory, manage users, and handle the loaning process.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: SQLite

ORM: Sequelize

Security: bcrypt (Password Hashing), JSON Web Tokens (JWT) for Authentication

Protection: express-rate-limit (DDoS protection)

Architecture: MVC (Model-View-Controller)

🚀 Getting Started

1. Installation

Clone the repository and install the required dependencies:

npm install


2. Environment Variables

Create a .env file in the root directory of the project and add the following required variables:

PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here


3. Running the Server

Start the server in development mode (with auto-restart):

npm run dev


The server will start, automatically connect to the SQLite database, and sync the tables.

📡 Main API Endpoints

👤 Users / Authentication

POST /api/users/register - Register a new user

POST /api/users/login - Login and receive a JWT token

🖥️ Equipment (Items)

GET /api/items - Get all equipment

POST /api/items - Add new equipment

GET /api/items/:id - Get a specific item by ID

🔄 Loans (Protected Routes - Requires JWT)

GET /api/loans - Get all active loans

POST /api/loans - Create a new loan (Requires userId, itemId, dueDate)

PATCH /api/loans/:loanId/return - Mark a loan as returned