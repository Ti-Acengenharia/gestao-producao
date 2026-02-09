const db = require('../database');

class Employee {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM employees ORDER BY name');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM employees WHERE id = ?');
    return stmt.get(id);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO employees (id, name, role, cpf, agency, operation, account, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      data.id,
      data.name,
      data.role,
      data.cpf || null,
      data.agency || null,
      data.operation || null,
      data.account || null,
      data.createdAt
    );
    return this.getById(data.id);
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE employees
      SET name = ?, role = ?, cpf = ?, agency = ?, operation = ?, account = ?
      WHERE id = ?
    `);
    stmt.run(
      data.name,
      data.role,
      data.cpf || null,
      data.agency || null,
      data.operation || null,
      data.account || null,
      id
    );
    return this.getById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM employees WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

module.exports = Employee;
