# Hostel Complaint Management System - Backend

## Overview
This is the backend for the Hostel Complaint Management System, built using Node.js and Express.js. It provides RESTful APIs for managing user authentication and complaints.

## Features
- User authentication (login/logout)
- Complaint management (create, view, resolve)
- File uploads for complaint proofs
- Role-based access control

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (for file uploads)
- Express-session (for session management)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up your MongoDB database and update the connection string in `src/config/database.js`.

## Running the Application
To start the server, run:
```
npm start
```

## API Documentation
Refer to the individual route files in the `src/routes` directory for detailed API documentation.

## License
This project is licensed under the MIT License.