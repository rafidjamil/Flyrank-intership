# Task Manager

A full-stack Task Manager application built with React, TypeScript, Tailwind CSS, Node.js, and Express.js.

The application allows users to create, view, update, complete, and delete tasks through a RESTful API and a responsive React user interface.

## 🚀 Features

- Create new tasks
- View all tasks
- View a single task
- Update tasks
- Mark tasks as completed
- Delete tasks
- Input validation
- RESTful CRUD API
- Swagger API documentation
- Responsive UI
- React + TypeScript frontend
- Tailwind CSS styling
- In-memory data storage
- Git/GitHub version control

## 🛠️ Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- TypeScript
- CORS

### API Documentation

- Swagger UI

### Development Tools

- Git
- GitHub
- VS Code

## 📁 Project Structure

```text
task-manager/
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   │   └── taskRoutes.ts
│   │   └── data/
│   │       └── tasks.ts
│   │
│   ├── swagger.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── types/
│   │   │   └── Task.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md