const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Determinar caminho do banco de dados
let dbPath;
let dbDir;

if (process.env.USER_DATA_PATH) {
  // Em produção (app instalado), usar pasta de dados do usuário fornecida pelo Electron
  dbDir = path.join(process.env.USER_DATA_PATH, 'data');
  dbPath = path.join(dbDir, 'gestao-obras.db');
  
  // Criar diretório se não existir
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  // Copiar banco de dados inicial se não existir
  if (!fs.existsSync(dbPath)) {
    const sourceDb = path.join(__dirname, 'data', 'gestao-obras.db');
    if (fs.existsSync(sourceDb)) {
      console.log('📦 Copiando banco de dados inicial...');
      fs.copyFileSync(sourceDb, dbPath);
      console.log('✅ Banco de dados copiado para:', dbPath);
    }
  }
} else {
  // Em desenvolvimento, usar pasta local
  dbDir = path.join(__dirname, 'data');
  dbPath = path.join(dbDir, 'gestao-obras.db');
  
  // Criar diretório se não existir
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

console.log('📍 Caminho do banco de dados:', dbPath);

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
