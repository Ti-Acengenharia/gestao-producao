const db = require('../database');

class Production {
  static getAll(filters = {}) {
    let query = 'SELECT * FROM production WHERE 1=1';
    const params = [];

    if (filters.month) {
      query += ' AND date LIKE ?';
      params.push(`${filters.month}%`);
    }

    if (filters.project) {
      query += ' AND projectName = ?';
      params.push(filters.project);
    }

    query += ' ORDER BY date DESC, createdAt DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM production WHERE id = ?');
    return stmt.get(id);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO production (
        id, serviceName, unit, unitPrice, employeeName, employeeRole,
        employeeId, projectName, quantity, total, date, createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      data.id,
      data.serviceName,
      data.unit,
      data.unitPrice,
      data.employeeName,
      data.employeeRole,
      data.employeeId,
      data.projectName,
      data.quantity,
      data.total,
      data.date,
      data.createdAt
    );
    return this.getById(data.id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM production WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static getSummary(month, project) {
    const stmt = db.prepare(`
      SELECT 
        employeeId,
        employeeName,
        employeeRole,
        SUM(total) as total
      FROM production
      WHERE date LIKE ? AND projectName = ?
      GROUP BY employeeId
      ORDER BY employeeName
    `);
    return stmt.all(`${month}%`, project);
  }

  static getTotal(month, project) {
    const stmt = db.prepare(`
      SELECT SUM(total) as total
      FROM production
      WHERE date LIKE ? AND projectName = ?
    `);
    const result = stmt.get(`${month}%`, project);
    return result.total || 0;
  }
}

module.exports = Production;
