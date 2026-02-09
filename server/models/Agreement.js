const db = require('../database');

class Agreement {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM agreements ORDER BY name');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM agreements WHERE id = ?');
    return stmt.get(id);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO agreements (id, name, unit, price, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.id,
      data.name,
      data.unit,
      data.price,
      data.createdAt
    );
    return this.getById(data.id);
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE agreements
      SET name = ?, unit = ?, price = ?
      WHERE id = ?
    `);
    stmt.run(data.name, data.unit, data.price, id);
    return this.getById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM agreements WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

module.exports = Agreement;
