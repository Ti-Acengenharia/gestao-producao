const Production = require('../models/Production');

const productionController = {
  // GET /api/production
  getAll: (req, res) => {
    try {
      const { month, project } = req.query;
      const filters = {};

      if (month) filters.month = month;
      if (project) filters.project = project;

      const production = Production.getAll(filters);
      res.json(production);
    } catch (error) {
      console.error('Erro ao buscar produção:', error);
      res.status(500).json({ error: 'Erro ao buscar produção' });
    }
  },

  // GET /api/production/:id
  getById: (req, res) => {
    try {
      const item = Production.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Lançamento não encontrado' });
      }
      res.json(item);
    } catch (error) {
      console.error('Erro ao buscar lançamento:', error);
      res.status(500).json({ error: 'Erro ao buscar lançamento' });
    }
  },

  // POST /api/production
  create: (req, res) => {
    try {
      const {
        serviceName,
        unit,
        unitPrice,
        employeeName,
        employeeRole,
        employeeId,
        projectName,
        quantity,
        date,
      } = req.body;

      if (!serviceName || !employeeId || !quantity || !date) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const total = Number(quantity) * Number(unitPrice);

      const productionData = {
        id: crypto.randomUUID(),
        serviceName,
        unit,
        unitPrice: Number(unitPrice),
        employeeName,
        employeeRole,
        employeeId,
        projectName,
        quantity: Number(quantity),
        total,
        date,
        createdAt: Date.now(),
      };

      const item = Production.create(productionData);
      res.status(201).json(item);
    } catch (error) {
      console.error('Erro ao criar lançamento:', error);
      res.status(500).json({ error: 'Erro ao criar lançamento' });
    }
  },

  // DELETE /api/production/:id
  delete: (req, res) => {
    try {
      const deleted = Production.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Lançamento não encontrado' });
      }
      res.json({ message: 'Lançamento deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar lançamento:', error);
      res.status(500).json({ error: 'Erro ao deletar lançamento' });
    }
  },

  // GET /api/production/summary
  getSummary: (req, res) => {
    try {
      const { month, project } = req.query;

      if (!month || !project) {
        return res.status(400).json({ error: 'Mês e projeto são obrigatórios' });
      }

      const summary = Production.getSummary(month, project);
      res.json(summary);
    } catch (error) {
      console.error('Erro ao buscar resumo:', error);
      res.status(500).json({ error: 'Erro ao buscar resumo' });
    }
  },

  // GET /api/production/total
  getTotal: (req, res) => {
    try {
      const { month, project } = req.query;

      if (!month || !project) {
        return res.status(400).json({ error: 'Mês e projeto são obrigatórios' });
      }

      const total = Production.getTotal(month, project);
      res.json({ total });
    } catch (error) {
      console.error('Erro ao buscar total:', error);
      res.status(500).json({ error: 'Erro ao buscar total' });
    }
  },
};

module.exports = productionController;
