# Habit Tracker API

This project is a backend API for a habit-tracking application, built using Node.js and MongoDB. It allows users to manage their habits, track progress, set reminders, and includes admin functionalities like managing users and creating habit templates.

## Features

##### JWT-based authentication for secure login and registration.
##### CRUD operations for managing habits, including streak tracking and progress management.
##### Daily reminders for pending habits using a cron job.
##### Admin controls to view users and their stats, and create habit templates.

## Environment Variables
Create a .env file in the root of your project and add the following variables:

 PORT=5000
 MONGO_URI=mongodb+srv://rjparsana8:cebtHgD8btYig6EM@cluster0.8lcsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 JWT_SECRET=RJ_SECRET

## API Endpoints

### Authentication
#### Register User: POST /api/auth/register
Registers a new user and returns a JWT token.

#### Login User: POST /api/auth/login
Logs in a user and returns a JWT token.

### Habit Management
#### Create Habit: POST /api/habits/
Creates a new habit for the authenticated user.

#### Get All Habits: GET /api/habits/
Retrieves all habits for the authenticated user.

#### Update Habit: PUT /api/habits/:id
Updates an existing habit.

#### Delete Habit: DELETE /api/habits/:id
Deletes a specific habit.

#### Reminders & Notifications
Daily Habit Reminders: Automated reminders are sent daily at a specific time (e.g., 9 AM). The system checks for habits that haven’t been completed and sends a notification.

### Admin Controls
#### Get All Users: GET /api/admin/users
Retrieves all users and their habit completion stats (admin only).

#### Create Habit Template: POST /api/admin/habits/template
Creates a habit template that can be adopted by users (admin only).

## Running the Project
Start the server: node server.js


