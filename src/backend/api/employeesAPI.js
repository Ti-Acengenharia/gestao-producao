/**
 * API futura para gerenciamento de colaboradores
 * 
 * Endpoints planejados:
 * - GET    /api/employees       - Listar todos os colaboradores
 * - POST   /api/employees       - Criar novo colaborador
 * - PUT    /api/employees/:id   - Atualizar colaborador
 * - DELETE /api/employees/:id   - Deletar colaborador
 */

export const employeesAPI = {
  // Implementação futura com fetch/axios para a API real
  getAll: async () => {
    // return await fetch('/api/employees').then(res => res.json());
  },
  
  create: async (data) => {
    // return await fetch('/api/employees', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // }).then(res => res.json());
  },
  
  update: async (id, data) => {
    // return await fetch(`/api/employees/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // }).then(res => res.json());
  },
  
  delete: async (id) => {
    // return await fetch(`/api/employees/${id}`, {
    //   method: 'DELETE',
    // }).then(res => res.json());
  },
};
