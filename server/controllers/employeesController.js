const Employee = require('../models/Employee');

const employeesController = {
  // GET /api/employees
  getAll: (req, res) => {
    try {
      const employees = Employee.getAll();
      res.json(employees);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      res.status(500).json({ error: 'Erro ao buscar colaboradores' });
    }
  },

  // GET /api/employees/:id
  getById: (req, res) => {
    try {
      const employee = Employee.getById(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: 'Colaborador não encontrado' });
      }
      res.json(employee);
    } catch (error) {
      console.error('Erro ao buscar colaborador:', error);
      res.status(500).json({ error: 'Erro ao buscar colaborador' });
    }
  },

  // POST /api/employees
  create: (req, res) => {
    try {
      const { name, role, cpf, agency, operation, account } = req.body;

      if (!name || !role) {
        return res.status(400).json({ error: 'Nome e função são obrigatórios' });
      }

      const employeeData = {
        id: crypto.randomUUID(),
        name: name.trim(),
        role: role.trim(),
        cpf: cpf || '',
        agency: agency || '',
        operation: operation || '',
        account: account || '',
        createdAt: Date.now(),
      };

      const employee = Employee.create(employeeData);
      res.status(201).json(employee);
    } catch (error) {
      console.error('Erro ao criar colaborador:', error);
      res.status(500).json({ error: 'Erro ao criar colaborador' });
    }
  },

  // PUT /api/employees/:id
  update: (req, res) => {
    try {
      const { name, role, cpf, agency, operation, account } = req.body;

      if (!name || !role) {
        return res.status(400).json({ error: 'Nome e função são obrigatórios' });
      }

      const employee = Employee.update(req.params.id, {
        name: name.trim(),
        role: role.trim(),
        cpf: cpf || '',
        agency: agency || '',
        operation: operation || '',
        account: account || '',
      });

      if (!employee) {
        return res.status(404).json({ error: 'Colaborador não encontrado' });
      }

      res.json(employee);
    } catch (error) {
      console.error('Erro ao atualizar colaborador:', error);
      res.status(500).json({ error: 'Erro ao atualizar colaborador' });
    }
  },

  // DELETE /api/employees/:id
  delete: (req, res) => {
    try {
      const deleted = Employee.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Colaborador não encontrado' });
      }
      res.json({ message: 'Colaborador deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar colaborador:', error);
      res.status(500).json({ error: 'Erro ao deletar colaborador' });
    }
  },
};

module.exports = employeesController;
