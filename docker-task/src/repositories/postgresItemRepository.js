const pool = require('../config/db');

class PostgresItemRepository {
  async getAll() {
    const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
    return result.rows;
  }

  async create(data) {
    const { title } = data;
    const result = await pool.query(
      'INSERT INTO items (title) VALUES ($1) RETURNING *',
      [title]
    );
    return result.rows[0];
  }
}

module.exports = PostgresItemRepository;