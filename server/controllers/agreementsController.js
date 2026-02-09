const Agreement = require('../models/Agreement');

const agreementsController = {
  // GET /api/agreements
  getAll: (req, res) => {
    try {
      const agreements = Agreement.getAll();
      res.json(agreements);
    } catch (error) {
      console.error('Erro ao buscar acordos:', error);
      res.status(500).json({ error: 'Erro ao buscar acordos' });
    }
  },

  // GET /api/agreements/:id
  getById: (req, res) => {
    try {
      const agreement = Agreement.getById(req.params.id);
      if (!agreement) {
        return res.status(404).json({ error: 'Acordo não encontrado' });
      }
      res.json(agreement);
    } catch (error) {
      console.error('Erro ao buscar acordo:', error);
      res.status(500).json({ error: 'Erro ao buscar acordo' });
    }
  },

  // POST /api/agreements
  create: (req, res) => {
    try {
      const { name, unit, price } = req.body;

      if (!name || !unit || price === undefined) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const agreementData = {
        id: crypto.randomUUID(),
        name: name.trim(),
        unit: unit.trim(),
        price: Number(price),
        createdAt: Date.now(),
      };

      const agreement = Agreement.create(agreementData);
      res.status(201).json(agreement);
    } catch (error) {
      console.error('Erro ao criar acordo:', error);
      res.status(500).json({ error: 'Erro ao criar acordo' });
    }
  },

  // PUT /api/agreements/:id
  update: (req, res) => {
    try {
      const { name, unit, price } = req.body;

      if (!name || !unit || price === undefined) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const agreement = Agreement.update(req.params.id, {
        name: name.trim(),
        unit: unit.trim(),
        price: Number(price),
      });

      if (!agreement) {
        return res.status(404).json({ error: 'Acordo não encontrado' });
      }

      res.json(agreement);
    } catch (error) {
      console.error('Erro ao atualizar acordo:', error);
      res.status(500).json({ error: 'Erro ao atualizar acordo' });
    }
  },

  // DELETE /api/agreements/:id
  delete: (req, res) => {
    try {
      const deleted = Agreement.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Acordo não encontrado' });
      }
      res.json({ message: 'Acordo deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar acordo:', error);
      res.status(500).json({ error: 'Erro ao deletar acordo' });
    }
  },
};

module.exports = agreementsController;
