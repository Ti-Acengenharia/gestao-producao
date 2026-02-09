require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rotas
const agreementsRoutes = require('./routes/agreements');
const employeesRoutes = require('./routes/employees');
const productionRoutes = require('./routes/production');

// Inicializar banco de dados
require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger simples
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas da API
app.use('/api/agreements', agreementsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/production', productionRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API rodando!' });
});

// Servir arquivos estáticos do frontend (opcional)
app.use(express.static(path.join(__dirname, '../dist')));

// Error handler
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';

  // Encontrar IP local da rede
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      // Ignorar IPs internos e não IPv4
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
  }

  console.log(`
🚀 Servidor rodando!
📡 Local:   http://localhost:${PORT}/api
🌐 Rede:    http://${localIP}:${PORT}/api
🏥 Health:  http://localhost:${PORT}/api/health
  `);
});
