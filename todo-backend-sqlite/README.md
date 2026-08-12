# Week 3 - Assignment 1: Connecting CRUD to SQLite Database

A lightweight backend REST API built with **Node.js**, **Express**, and **SQLite** (`better-sqlite3`). This project transitions an in-memory task management system into a persistent, file-based database architecture while keeping the API endpoints identical.

---

## 📌 Project Overview & Purpose

In the previous version, data was stored in a temporary JavaScript array in memory, meaning all tasks were erased every time the server restarted. 

In this assignment, persistence is handled by **SQLite**. The API contract (`GET`, `POST`, `PUT`, `DELETE`) remains unchanged for the client, but the backend now interacts directly with a database file (`tasks.db`). Data now safely survives server restarts.

### Architecture Shift
* **Before:** `Client ➔ Express API ➔ JavaScript Array (In-Memory)`
* **After:** `Client ➔ Express API ➔ SQLite Database (tasks.db)`

---

## ⚙️ Why SQLite Was Chosen

1. **Zero Configuration:** SQLite is a self-contained, serverless database engine that requires no external database server installation.
2. **Single-File Persistence:** The entire database resides inside a single file (`tasks.db`) within the project root.
3. **Speed & Reliability:** Combined with the `better-sqlite3` driver, it provides fast synchronous operations ideal for local testing and lightweight applications.

---

## 📁 File Structure

```text
todo-backend-sqlite/
├── node_modules/
├── assets/
│   └── database-screenshot.png   <-- Screenshot of SQLite viewer
├── db.js                         <-- Database creation & seeding
├── server.js                     <-- Express API & SQL queries
├── tasks.db                      <-- SQLite database file (Auto-created)
├── package.json
└── README.md