# 🚀 ProManage - Advanced MERN Project Management System

**ProManage** is a modern, scalable project management platform built on the **MERN Stack (MongoDB, Express, React, Node.js)**. It is optimized for performance and developer experience using **Tailwind CSS** for UI, **Zustand** and **React Query** for state and server state management, and **Zod** for robust validation. Real-time collaboration, RBAC, and enterprise-level architecture make it ideal for teams seeking efficient project, task, and user management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Live Demo](#live-demo)
- [Deployment Guide](#deployment-guide)
- [Contributing](#contributing)
- [License](#license)
- [Connect](#connect)

---

## ✨ Features

- 🔐 **Authentication & RBAC** for secure user roles
- 📁 **Project & Task Management** with easy CRUD
- 📊 **Live Dashboard** for real-time updates
- 🤝 **Team Collaboration** with role-based access
- 🔔 **Instant Notifications** (Socket.IO)
- 🗂️ **Kanban Task Scheduling**
- 🧩 **Modular & Scalable Codebase**
- 🌐 **RESTful API** (Express.js)
- 🎨 **Optimized UI** (Tailwind CSS)
- 🗃️ **State Management** (Zustand, React Query)
- 🛡️ **Validation** (Zod)

---

## 🧱 Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Frontend     | React.js (Vite)                   |
| State Mgmt   | Zustand, React Query              |
| Backend      | Node.js + Express.js              |
| Database     | MongoDB + Mongoose                |
| Realtime     | Socket.IO                         |
| Validation   | Zod                               |
| Styling      | Tailwind CSS                      |
| Deployment   | Render / Docker                   |

---

## 📁 Project Structure

The project is structured to maximize clarity, scalability, and maintainability. Below is a breakdown of the primary directories:

promanage/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Application pages
│   │   ├── services/           # API service calls
│   │   ├── store/              # Zustand state management
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # Application entry point
│   ├── .env.example            # Example environment variables
│   └── package.json            # Frontend dependencies and scripts
│
├── server/                     # Backend Node.js/Express application
│   ├── config/                 # Configuration files (e.g., DB)
│   ├── controllers/            # Request handlers and business logic
│   ├── middleware/             # Custom middleware (e.g., auth)
│   ├── models/                 # Mongoose data models
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Backend utility functions
│   ├── .env.example            # Example environment variables
│   ├── index.ts                # Main server entry point
│   └── package.json            # Backend dependencies and scripts
│
├── .gitignore                  # Git ignored files and folders
└── README.md                   # Project documentation

## 🔩 Installation and Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/cloud/atlas) (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/sreeharshrajan/promanage.git
cd promanage
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🔑 Setup Environment Variables
Environment variables are used to store sensitive information like API keys and database credentials. You will need to create .env files in both the client and server directories.

### Backend (/server/.env)
Create a .env file in the server/ directory and add the following:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
CLIENT_URL=http://localhost:3000
```

### Frontend (/client/.env)
Create a .env file in the client/ directory and add:

```env
VITE_API_URL=http://localhost:5000/api
```
You can refer to .env.example files available.

## ▶️ Start the Development Servers
To run the application, you’ll need to start both the backend and frontend servers.

1. Start the Backend Server
```bash
cd server
npm start
```
The Express server will start on the port you defined (e.g., http://localhost:5000).

2. Start the Frontend Server
Open another terminal and run:

```bash
cd client
npm run dev
```
The React development server will run on http://localhost:3000.

## 🚀 Live Demo
Coming Soon on Render or Cloudflare Pages
A live demo of ProManage will be deployed soon. Both platforms offer modern cloud solutions for deployment.

## 🤝 Contributing
Pull requests and feature suggestions are welcome!
Please follow our Contribution Guidelines (coming soon).

## 📜 License
This project is licensed under the MIT License.

## 🔗 Connect
Created with ❤️ by Sreeharsh Rajan
