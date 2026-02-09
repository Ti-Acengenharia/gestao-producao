const Database = require('better-sqlite3');
const path = require('path');

// Criar diretório de dados se não existir
const dbPath = path.join(__dirname, 'data', 'gestao-obras.db');

// Inicializar banco de dados
const db = new Database(dbPath, { verbose: console.log });

// Habilitar foreign keys
db.pragma('foreign_keys = ON');

// Criar tabelas
const createTables = () => {
  // Tabela de acordos/serviços
  db.exec(`
    CREATE TABLE IF NOT EXISTS agreements (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      unit TEXT NOT NULL,
      price REAL NOT NULL,
      createdAt INTEGER NOT NULL
    )
  `);

  // Tabela de colaboradores
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      cpf TEXT,
      agency TEXT,
      operation TEXT,
      account TEXT,
      createdAt INTEGER NOT NULL
    )
  `);

  // Tabela de produção
  db.exec(`
    CREATE TABLE IF NOT EXISTS production (
      id TEXT PRIMARY KEY,
      serviceName TEXT NOT NULL,
      unit TEXT NOT NULL,
      unitPrice REAL NOT NULL,
      employeeName TEXT NOT NULL,
      employeeRole TEXT NOT NULL,
      employeeId TEXT NOT NULL,
      projectName TEXT NOT NULL,
      quantity REAL NOT NULL,
      total REAL NOT NULL,
      date TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Tabelas criadas com sucesso!');
};

// Inicializar banco
createTables();

module.exports = db;
