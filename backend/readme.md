# Project Setup for Mentor-Mentee Platform Backend

## Step 1: Initialize the Project
Run the following command to initialize the project:
```bash
npm init -y
```

## Step 2: Install Required Packages
Install the necessary dependencies using:
```bash
npm install dotenv nodemon express mongoose cors jsonwebtoken bcrypt bcryptjs body-parser multer node-cron nodemailer
```

## Environment Variables
Create a `.env` file in the root directory and configure it as follows:
```plaintext
PORT=3001
MONGODB_URI="mongodb_uri"
ACCESS_TOKEN_SECRET="your_access_token"
ACCESS_TOKEN_EXPIRY="1d"
REFRESH_TOKEN_SECRET="your_refresh_token"
REFRESH_TOKEN_EXPIRY="7d"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false  # only set true if using port 465

EMAIL_USER="your_app_email"
EMAIL_PASS="your_app_password"
```

## README.md
# Mentor-Mentee Platform Backend

This is the backend implementation of an exclusive Mentor-Mentee platform, built with Node.js and MongoDB Atlas.

## Features
- Authentication using JWT
- Password hashing with bcrypt
- RESTful API with Express
- MongoDB Atlas for data storage
- Email notifications using Nodemailer
- Scheduling tasks with node-cron
- File uploads using multer

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mentor-mentee-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm start`: Start the production server
- `npm run dev`: Start the development server with Nodemon

## Technologies Used
- **Express.js**: For building RESTful APIs
- **MongoDB Atlas**: For cloud-based database management
- **Nodemailer**: For sending email notifications
- **node-cron**: For task scheduling
- **Multer**: For handling file uploads
- **bcrypt**: For password hashing

## License
This project is licensed under the MIT License.
