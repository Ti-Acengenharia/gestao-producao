// Estrutura preparada para backend futuro

/**
 * API futura para gerenciamento de acordos/serviços
 * 
 * Endpoints planejados:
 * - GET    /api/agreements       - Listar todos os acordos
 * - POST   /api/agreements       - Criar novo acordo
 * - PUT    /api/agreements/:id   - Atualizar acordo
 * - DELETE /api/agreements/:id   - Deletar acordo
 */

export const agreementsAPI = {
  // Implementação futura com fetch/axios para a API real
  getAll: async () => {
    // return await fetch('/api/agreements').then(res => res.json());
  },
  
  create: async (data) => {
    // return await fetch('/api/agreements', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // }).then(res => res.json());
  },
  
  update: async (id, data) => {
    // return await fetch(`/api/agreements/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // }).then(res => res.json());
  },
  
  delete: async (id) => {
    // return await fetch(`/api/agreements/${id}`, {
    //   method: 'DELETE',
    // }).then(res => res.json());
  },
};
