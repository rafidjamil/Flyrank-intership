const Database = require('better-sqlite3');

// 1. Database file connect ya create karna
const db = new Database('tasks.db');

// 2. Tasks Table create karna (agar pehle se nahi hai)
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

// 3. Check karna ke table me pehle se data hai ya nahi
const countQuery = db.prepare('SELECT COUNT(*) AS count FROM tasks').get();

if (countQuery.count === 0) {
  // Agar table khali hai to 3 initial tasks insert karna
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('Learn SQL basics', 0);
  insert.run('Connect database to API', 0);
  insert.run('Complete Stage 0', 1);
  console.log('Sample tasks inserted into database.');
}

module.exports = db;