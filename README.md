# Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB. This application allows users to register, login, create tasks, mark them as complete, delete them, and filter them by status.

Task Management App

https://github.com/user-attachments/assets/1ae8fefc-31d3-4760-bb9e-de4e3467450f

## Features

### User Authentication

Register with name, email, and password
Login with email and password
JWT-based authentication
Protected routes

### Task Management

Create, read, update, and delete tasks
Mark tasks as complete/incomplete
Set task priority (low, medium, high)
Filter tasks by status (all, active, completed)

### UI/UX

Responsive design with Tailwind CSS
Form validation
Loading states
Error handling and display

## Tech Stack

### Frontend

React (with Vite)
React Router for navigation
Context API for state management
Custom hooks for reusable logic
Tailwind CSS for styling
Axios for API requests

### Backend

Node.js
Express.js
MongoDB with Mongoose
JWT for authentication
bcrypt for password hashing

## Setup Instructions

### Prerequisites

Node.js (v14 or higher)
MongoDB (local installation or MongoDB Atlas account)

### Setup

1. Clone the repository

```bash
git clone https://github.com/vishnuu5/task-management-Assignment.git
cd task-management
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. **Configure environment variables**

- Create a `.env` file in the backend directory
- Add the following variables:

```bash
PORT=5000
MONGO_URI=
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

- Replace `MONGO_URI` with your MongoDB connection string
- Set a strong, unique `JWT_SECRET` for production

4. **Seed the database (optional)**

```bash
npm run seed
```

This will create sample users and tasks for testing:

- User 1: [user1@example.com](mailto:user1@example.com) / 123456
- User 2: [user2@example.com](mailto:user2@example.com) / 123456

5. **Start the backend server**

```bash
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000)

### Frontend Setup

1. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

2. **Start the frontend development server**

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

```markdown project="Task Management Application" file="README.md"
```

2. **Install backend dependencies**

```shellscript
cd backend
npm install
```

3. **Configure environment variables**

1. Create a `.env` file in the backend directory
1. Add the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

3. Replace `MONGO_URI` with your MongoDB connection string
4. Set a strong, unique `JWT_SECRET` for production

5. **Seed the database (optional)**

```shellscript
npm run seed
```

This will create sample users and tasks for testing:

1. User 1: [john@example.com](mailto:john@example.com) / 123456
2. User 2: [jane@example.com](mailto:jane@example.com) / 123456

3. **Start the backend server**

```shellscript
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000)

### Frontend Setup

1. **Install frontend dependencies**

```shellscript
cd ../frontend
npm install
```

2. **Start the frontend development server**

```shellscript
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Running the Application Locally

1. **Start the backend server**

```bash
cd backend
npm run dev
```

2. **In a separate terminal, start the frontend server**

```bash
cd frontend
npm run dev
```

3. **Access the application**

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
1. Register a new account or use the seeded test accounts

```markdown project="Task Management Application" file="README.md"
```

2. **Install backend dependencies**

```shellscript
cd backend
npm install
```

3. **Configure environment variables**

1. Create a `.env` file in the backend directory
1. Add the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

3. Replace `MONGO_URI` with your MongoDB connection string
4. Set a strong, unique `JWT_SECRET` for production

5. **Seed the database (optional)**

```shellscript
npm run seed
```

This will create sample users and tasks for testing:

1. User 1: [john@example.com](mailto:john@example.com) / 123456
2. User 2: [jane@example.com](mailto:jane@example.com) / 123456

3. **Start the backend server**

```shellscript
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000)

### Frontend Setup

1. **Install frontend dependencies**

```shellscript
cd ../frontend
npm install
```

2. **Start the frontend development server**

```shellscript
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Running the Application Locally

1. **Start the backend server**

```shellscript
cd backend
npm run dev
```

2. **In a separate terminal, start the frontend server**

```shellscript
cd frontend
npm run dev
```

3. **Access the application**

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
1. Register a new account or use the seeded test accounts

## Database Schema

### User Model

```bash
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```bash
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  user: ObjectId (reference to User model),
  createdAt: Date,
  updatedAt: Date
}
```

## Technical Choices and Architecture

### Frontend Architecture

The frontend is built with React using a component-based architecture. Key architectural decisions include:

1. **Context API for State Management**

1. AuthContext manages user authentication state
1. Provides login, register, and logout functionality
1. Stores JWT token in localStorage for persistence

1. **Custom Hooks**

1. `useAuth` hook for authentication-related functionality
1. `useTasks` hook for task CRUD operations and filtering

1. **Component Structure**

1. Reusable UI components (TaskItem, TaskForm, etc.)
1. Page components for different routes
1. Responsive design with Tailwind CSS

### Backend Architecture

The backend follows a Model-View-Controller (MVC) pattern:

1. **Models**

1. Mongoose schemas for User and Task
1. Data validation and relationships

1. **Controllers**

1. Separate controllers for user and task operations
1. Async/await pattern with express-async-handler

1. **Routes**

1. RESTful API endpoints
1. Protected routes with JWT middleware

1. **Middleware**

1. Authentication middleware
1. Error handling middleware

### Security Considerations

- Passwords are hashed using bcrypt
- JWT for secure authentication
- Protected API routes
- Input validation
- CORS configuration

## API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate a user
- `GET /api/users/me` - Get user profile (protected)

### Task Routes

- `GET /api/tasks` - Get all tasks for logged-in user (protected)
- `POST /api/tasks` - Create a new task (protected)
- `GET /api/tasks/:id` - Get a specific task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)

## Future Improvements

- Add task due dates and reminders
- Implement task categories/tags
- Add search functionality
- Implement drag-and-drop for task reordering
- Add user profile management
- Implement task sharing between users
- Add dark mode support

## License

[MIT](LICENSE)
